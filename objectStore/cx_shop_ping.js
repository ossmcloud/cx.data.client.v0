'use strict'
//
const _persistentTable = require('./persistent/p-cx_shop_ping');
//
class cx_shop_ping_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_shop_ping(this, defaults);
    }

    async select(params) {
        if (this.cx.cxSvc == true) { return await super.select(); }

        if (!params) { params = {}; }
        var query = { sql: '', params: [] };
        query.sql = `select  top 1000 p.*, s.shopCode, s.shopName
                     from    cx_shop_ping p, cx_shop s
                     where   p.shopId = s.shopId
                     and     p.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;
        
        if (params.s) {
            query.sql += ' and p.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }
        if (params.df) {
            query.sql += ' and p.created >= @dateFrom';
            query.params.push({ name: 'dateFrom', value: params.df });
        }

        query.sql += ' order by p.created desc';

        await super.select(query);
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: 'pingId', value: id }] };
        query.sql = `select  p.*, s.shopCode, s.shopName
                     from    cx_shop_ping p, cx_shop s
                     where   p.shopId = s.shopId
                     and     p.pingId = @pingId
                     and     p.${this.FieldNames.SHOPID} in ${this.cx.shopList} `;
        
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }

}
//
//
//
class cx_shop_ping extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    async save() {
        if (this.isNew()) { this.created = new Date(); }
        await super.save()
    }
}
//
//
//
module.exports = {
    Table: cx_shop_ping_Collection,
    Record: cx_shop_ping,
}


'use strict'
//
const _core = require('cx-core');
const _persistentTable = require('./persistent/p-cr_cb_transaction');
const _declarations = require('../cx-client-declarations');
const _cx_render = require('../cx-client-render');
//
class cr_cb_transaction_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_cb_transaction(this, defaults);
    }

    
    async select(params) {

        if (!params) { params = {}; }

        if (params.sql) {
            return await super.select(params);
            
        } else {

            var query = { sql: '', params: [] };
            query.sql = ` select  top ${_declarations.SQL.MAX_ROWS} l.*, s.shopCode, s.shopName
                      from    ${this.type} l, cx_shop s
                      where   l.${this.FieldNames.SHOPID} = s.shopId
                      and     l.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

            if (params.s) {
                query.sql += ' and l.shopId = @shopId';
                query.params.push({ name: 'shopId', value: params.s });
            }
            if (params.tr) {
                query.sql += ' and l.transmissionId like @transmissionId';
                query.params.push({ name: 'transmissionId', value: ('%' + params.tr + '%') });
            }
            if (params.df) {
                query.sql += ' and l.date >= @from';
                query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
            }
            if (params.dt) {
                query.sql += ' and l.date <= @to';
                query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
            }
            if (params.st) {
                query.sql += ' and l.status = @status';
                query.params.push({ name: 'status', value: params.st });
            }
            query.sql += ' order by l.date desc';
            return await super.select(query);
        }
    }


    async fetch(id) {
        if (this.cx.cxSvc == true) { return await super.fetch(id); }

        var query = { sql: '', params: [{ name: 'cbTranId', value: id }] };
        query.sql = ` select  l.*, s.shopCode, s.shopName
                      from    ${this.type} l, cx_shop s
                      where   l.${this.FieldNames.SHOPID} = s.shopId
                      and     l.${this.FieldNames.CBTRANID} = @cbTranId`;
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist or was deleted!`); }

        return super.populate(rawRecord);
    }

}
//
// ----------------------------------------------------------------------------------------
//
class cr_cb_transaction extends _persistentTable.Record {
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
    get transmissionIdText() { return this.transmissionId.toString(); }
    get dateStr() { return _core.date.format({ date: this.date }) }



    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cr_cb_transaction_Collection,
    Record: cr_cb_transaction,
}


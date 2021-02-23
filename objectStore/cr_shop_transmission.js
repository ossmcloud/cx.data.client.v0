'use strict'
//
const _persistentTable = require('./persistent/p-cr_shop_transmission');
const _declarations = require('../cx-client-declarations');
const _cx_render = require('../cx-client-render');
//
class cr_shop_transmission_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_shop_transmission(this, defaults);
    }

    async select(params) {
        
        if (this.cx.cxSvc == true) { return await super.select(); }

        if (!params) { params = {}; }

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
            query.sql += ' and l.created >= @from';
            query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
        }
        if (params.dt) {
            query.sql += ' and l.created <= @to';
            query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
        }
        if (params.st) {
            query.sql += ' and l.status = @status';
            query.params.push({ name: 'status', value: params.st });
        }
        query.sql += ' order by l.created desc';
        return await super.select(query);
    }

    async fetch(id) {
        if (this.cx.cxSvc == true) { return await super.fetch(id); }

        var query = { sql: '', params: [{ name: 'transmissionId', value: id }] };
        query.sql = ` select  l.*, s.shopCode, s.shopName
                      from    ${this.type} l, cx_shop s
                      where   l.${this.FieldNames.SHOPID} = s.shopId
                      and     l.${this.FieldNames.TRANSMISSIONID} = @transmissionId
                      and     l.${this.FieldNames.SHOPID} in ${this.cx.shopList}
                      and     l.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist or was deleted!`); }

        return super.populate(rawRecord);
    }
}

//
class cr_shop_transmission extends _persistentTable.Record {
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

    async abort(message) {
        if (this.status != _declarations.CR_SHOP_TRANSMISSION.STATUS.PENDING && this.status != _declarations.CR_SHOP_TRANSMISSION.STATUS.TRANSMITTING) {
            throw new Error(`transmission cannot be aborted as the current status is ${this.status}`)
        }
        this.status = _declarations.CR_SHOP_TRANSMISSION.STATUS.ERROR;
        
        this.message = message || ('transmission manually aborted by: ' + this.cx.userName);

        // TODO: we should also set the correspondent raw_getLog adn raw_getRequest (if there)

        await this.save();
    }

    async save() {
        if (this.isNew()) { this.created = new Date(); }
        if (this.message.length > 255) {
            this.message = this.message.substr(0, 255);
        }
        await super.save()
    }

}
//
module.exports = {
    Table: cr_shop_transmission_Collection,
    Record: cr_shop_transmission,
}


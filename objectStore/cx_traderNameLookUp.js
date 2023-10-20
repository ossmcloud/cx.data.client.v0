'use strict'
//
const _persistentTable = require('./persistent/p-cx_traderNameLookUp');
const _declarations = require('../cx-client-declarations');
//
class cx_traderNameLookUp_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_traderNameLookUp(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select	    l.*, s.shopCode, s.shopName
                from	    cx_traderNameLookUp l
                inner join  cx_shop s ON s.shopId = l.shopId
                where	    s.shopId in ${this.cx.shopList}
            `
        }
        
        this.queryFromParams(query, params, 'l');
        query.sql += ' order by traderCode';

        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }


        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cx_traderNameLookUp extends _persistentTable.Record {
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
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cx_traderNameLookUp_Collection,
    Record: cx_traderNameLookUp,
}


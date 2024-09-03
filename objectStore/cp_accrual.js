'use strict'
//
const _persistentTable = require('./persistent/p-cp_accrual');
//
class cp_accrual_Collection extends _persistentTable.Table {
   
    createNew(defaults) {
        return new cp_accrual(this, defaults);
    }


    async select(params) {
        if (!params) { params = {}; }
        if (params.sql) { return await super.select(params); }

        var query = {
            sql: `
                select      a.*,
                            s.shopCode, s.shopName
                from        cp_accrual a
                inner join  cx_shop    s ON s.shopId = a.shopId
                where       a.${this.FieldNames.SHOPID} in ${this.cx.shopList}
                `
        };
        this.queryFromParams(query, params, 'a');
        query.sql += ' order by a.created desc';

        return await super.select(query);
    }


    
}
//
// ----------------------------------------------------------------------------------------
//
class cp_accrual extends _persistentTable.Record {
    #shopCode = '';
    #shopName = '';
    constructor(table, defaults) {
        super(table, defaults);

        this.#shopCode = defaults['shopCode'] || '';
        this.#shopName = defaults['shopName'] || '';
    };

    get status() {
        return _declarations.CP_DOCUMENT.STATUS.getName(this.documentStatus);
    }

    get shopCode() { return this.#shopCode; }
    get shopName() { return this.#shopName; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_accrual_Collection,
    Record: cp_accrual,
}


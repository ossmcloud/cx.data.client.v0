'use strict'
//
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cp_erp_transaction_tax');
//
class cp_erp_transaction_tax_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_erp_transaction_tax(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  gl.*
                      from    ${this.type} gl
                      inner join cp_erp_transaction t ON t.erpTranId = gl.erpTranId
                      where   t.invCreId = @invCreId`;
        query.params.push({ name: 'invCreId', value: params.id });

        // if (params.id) {
        //     query.sql += ' and invCreLineId = @invCreLineId';
        //     query.params.push({ name: 'invCreLineId', value: params.id });
        // }
        // query.sql += ' order by lineNumber';

        query.sql += ' order by gl.taxTranId';
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
class cp_erp_transaction_tax extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_erp_transaction_tax_Collection,
    Record: cp_erp_transaction_tax,
}


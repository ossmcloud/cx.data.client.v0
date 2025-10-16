'use strict'
//
const _persistentTable = require('./persistent/p-cs_erp_transaction_gl');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
//
class cs_erp_transaction_gl_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cs_erp_transaction_gl(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  tt.tranSign, gl.*
                      from    ${this.type} gl
                      inner join cs_erp_transaction t ON t.erpTranId = gl.erpTranId
                      inner join sys_erp_tran_type tt ON tt.tranTypeId = t.erpTranTypeId`;


        if (params.id) {
            query.sql += ' where   t.stockValuationId = @stockValuationId';
            query.params.push({ name: 'stockValuationId', value: params.id });
        }
      
        query.sql += ' order by gl.glTranId';
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
class cs_erp_transaction_gl extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }

    get editedIcon() {
        if (this.isUserEdited) { return '&#x270E;'; }
        return '';
    }

    get filterItemsIcon() {
        return `<span class="icon_filter_lines" title="filter items by this gl code" data-gl-code="${this.glAccountSeg1}" data-gl-code-2="${this.glAccountSeg2}" data-gl-code-3="${this.glAccountSeg3}" data-gl-tax="${this.taxAccount}">&#x25BC;</span>`;
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cs_erp_transaction_gl_Collection,
    Record: cs_erp_transaction_gl,
}


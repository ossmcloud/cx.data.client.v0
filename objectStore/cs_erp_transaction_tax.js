'use strict'
//
const _persistentTable = require('./persistent/p-cs_erp_transaction_tax');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
//
class cs_erp_transaction_tax_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cs_erp_transaction_tax(this, defaults);
    }

    async select(params, forEdit) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` 
            select  tt.tranSign, gl.*
            from    ${this.type} gl
            inner join cs_erp_transaction t ON t.erpTranId = gl.erpTranId
            inner join sys_erp_tran_type tt ON tt.tranTypeId = t.erpTranTypeId
            where   1 = 1
        `;

        if (params.id) {

            if (forEdit) {
                query.sql += `
                    and     t.erpTranId = (
                        SELECT  MIN(erpTranId)
                        FROM    cs_erp_transaction
                        where   stockValuationId = @stockValuationId
                    )
                `;
            }

            query.sql += ' and   t.stockValuationId = @stockValuationId';
            query.params.push({ name: 'stockValuationId', value: params.id });
        }

        if (params.erpTranId) {
            query.sql += ' and   gl.erpTranId = @erpTranId';
            query.params.push({ name: 'erpTranId', value: params.erpTranId });
        }
        
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
class cs_erp_transaction_tax extends _persistentTable.Record {
    #tranSign = 1;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#tranSign = defaults['tranSign'] || '';
    };


    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }

    get tranSign() { return this.#tranSign; }

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
    Table: cs_erp_transaction_tax_Collection,
    Record: cs_erp_transaction_tax,
}


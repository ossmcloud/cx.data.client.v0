'use strict'
//
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cp_erp_transaction_gl');
//
class cp_erp_transaction_gl_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_erp_transaction_gl(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  tt.tranSign, gl.*
                      from    ${this.type} gl
                      inner join cp_erp_transaction t ON t.erpTranId = gl.erpTranId
                      inner join sys_erp_tran_type tt ON tt.tranTypeId = t.erpTranTypeId`;
                      
        
        if (params.id) {
            query.sql += ' where   t.invCreId = @invCreId';
            query.params.push({ name: 'invCreId', value: params.id });
        }
        if (params.invGrpId) {
            query.sql += ' where   t.invGrpId = @invGrpId';
            query.params.push({ name: 'invGrpId', value: params.invGrpId });
        }
        if (params.accrId) {
            query.sql += ' where   t.accrId = @accrId';
            query.params.push({ name: 'accrId', value: params.accrId });
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
class cp_erp_transaction_gl extends _persistentTable.Record {
    #tranSign = 1;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#tranSign = defaults['tranSign'] || 1;
    };

    get tranSign() {
        return this.#tranSign;   
    }

    get valueNetSigned() {
        return this.valueNet * this.tranSign;
    }
    get valueTaxSigned() {
        return this.valueTax * this.tranSign;
    }
    get valueGrossSigned() {
        return this.valueGross * this.tranSign;
    }

    async save() {
        if (this.valueTax == null) { this.valueTax = 0; }
        if (this.valueNet == null) { this.valueNet = 0; }
        this.valueGross = this.valueNet + this.valueTax;
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
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
    Table: cp_erp_transaction_gl_Collection,
    Record: cp_erp_transaction_gl,
}


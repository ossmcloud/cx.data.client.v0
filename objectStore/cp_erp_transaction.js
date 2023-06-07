'use strict'
//
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cp_erp_transaction');
//
class cp_erp_transaction_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_erp_transaction(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = `select  * from    ${this.type}`;

        if (params.invCreId) {
            query.sql += ' where   invCreId = @invCreId';
            query.params.push({ name: 'invCreId', value: params.invCreId });
        }
        if (params.invGrpId) {
            query.sql += ' where   invGrpId = @invGrpId';
            query.params.push({ name: 'invGrpId', value: params.invGrpId });
        }

        query.sql += ' order by created';
        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }

        return await super.select(query);
    }

    async fetchByDocId(invCreId) {
        var query = { sql: '', params: [{ name: 'invCreId', value: invCreId }] };
        query.sql = ` select  *
                      from    ${this.type}
                      where     ${this.FieldNames.INVCREID} = @invCreId`;
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) {
            //throw new Error(`${this.type} record [${id}] does not exist, was deleted or you do not have permission!`);
            return null;
        }

        return super.populate(rawRecord);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_erp_transaction extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        if (this.valueTax == null) { this.valueTax = 0; }
        if (this.valueNet == null) { this.valueNet = 0; }
        this.valueGross = this.valueNet + this.valueTax;
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_erp_transaction_Collection,
    Record: cp_erp_transaction,
}


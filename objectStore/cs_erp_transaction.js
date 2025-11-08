'use strict'
//
const _persistentTable = require('./persistent/p-cs_erp_transaction');
const _declarations = require('../cx-client-declarations');
//
class cs_erp_transaction_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cs_erp_transaction(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = `select  * from    ${this.type}`;

        if (params.stockValuationId) {
            query.sql += ' where   stockValuationId = @stockValuationId';
            query.params.push({ name: 'stockValuationId', value: params.stockValuationId });
        }
    
        query.sql += ' order by created';
        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }

        return await super.select(query);
    }

    async fetchByDocId(stockValuationId) {
        var query = { sql: '', params: [{ name: 'stockValuationId', value: stockValuationId }] };
        query.sql = ` select  *
                      from    ${this.type}
                      where     ${this.FieldNames.STOCKVALUATIONID} = @stockValuationId`;
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
class cs_erp_transaction extends _persistentTable.Record {
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
    Table: cs_erp_transaction_Collection,
    Record: cs_erp_transaction,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cp_deliveryReturnLine');
//
class cp_deliveryReturnLine_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_deliveryReturnLine(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  *
                      from    ${this.type}
                      where   delRetId = @delRetId`;
        query.params.push({ name: 'delRetId', value: params.pid });

        if (params.id) {
            query.sql += ' and delRetLineId = @delRetLineId';
            query.params.push({ name: 'delRetLineId', value: params.id });
        }
        query.sql += ' order by lineNumber';

        // query.paging = {
        //     page: params.page || 1,
        //     pageSize: _declarations.SQL.PAGE_SIZE
        // }

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_deliveryReturnLine extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    get lineDRSAmountInfo() {
        if (!this.lineDRSQuantity || !this.lineDRSUnitCharge) { return ''; }
        return `${this.lineDRSQuantity} * ${this.lineDRSUnitCharge}`;
    }
    get lineDRSAmountDisplay() {
        if (!this.lineDRSAmount) { return ''; }
        return this.lineDRSAmount;
    }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_deliveryReturnLine_Collection,
    Record: cp_deliveryReturnLine,
}


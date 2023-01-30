'use strict'
//
const _persistentTable = require('./persistent/p-cp_deliveryReturnLog');
//
class cp_deliveryReturnLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_deliveryReturnLog(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  *
                      from    ${this.type}
                      where   delRetId = @delRetId`;
        query.params.push({ name: 'delRetId', value: params.pid });

        if (params.id) {
            query.sql += ' and delRetLogId = @delRetLogId';
            query.params.push({ name: 'delRetLogId', value: params.id });
        }
        query.sql += ' order by created desc';

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
class cp_deliveryReturnLog extends _persistentTable.Record {
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
    Table: cp_deliveryReturnLog_Collection,
    Record: cp_deliveryReturnLog,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cp_invoiceGroupLog');
//
class cp_invoiceGroupLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_invoiceGroupLog(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  *
                      from    ${this.type}
                      where   invGrpId = @invGrpId`;
        query.params.push({ name: 'invGrpId', value: params.pid });

        if (params.id) {
            query.sql += ' and invGrpIdLogId = @invGrpIdLogId';
            query.params.push({ name: 'invGrpIdLogId', value: params.id });
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
class cp_invoiceGroupLog extends _persistentTable.Record {
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
    Table: cp_invoiceGroupLog_Collection,
    Record: cp_invoiceGroupLog,
}


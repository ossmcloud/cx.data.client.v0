'use strict'
//
const _persistentTable = require('./persistent/p-cp_invoiceCreditLog');
//
class cp_invoiceCreditLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_invoiceCreditLog(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  *
                      from    ${this.type}
                      where   invCreId = @invCreId`;
        query.params.push({ name: 'invCreId', value: params.pid });

        if (params.id) {
            query.sql += ' and invCreLogId = @invCreLogId';
            query.params.push({ name: 'invCreLogId', value: params.id });
        }
        query.sql += ' order by created desc';

        // query.paging = {
        //     page: params.page || 1,
        //     pageSize: _declarations.SQL.PAGE_SIZE
        // }

        return await super.select(query);
    }

    async log(invCreId, type, message, info) {
        try {
            var log = this.createNew();
            log.invCreId = invCreId;
            log.logType = type || 'NONE';
            log.logMessage = message || 'no log message';
            log.logInfo = info || '';
            //log.Fields.TruncateValues();
            await log.save();

        } catch (error) {
            // @@TODO: @EX: what to do here ??
            console.log("cp_invoiceCreditLogCollection.Log", error);
        }
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_invoiceCreditLog extends _persistentTable.Record {
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
    Table: cp_invoiceCreditLog_Collection,
    Record: cp_invoiceCreditLog,
}


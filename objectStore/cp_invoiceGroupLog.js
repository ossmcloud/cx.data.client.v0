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

    async log(invCreId, type, message, info) {
        try {
            var log = this.createNew();
            log.invGrpId = invCreId;
            log.logType = type || 'NONE';
            log.logMessage = message || 'no log message';
            log.logInfo = info || '';
            //log.Fields.TruncateValues();
            await log.save();

        } catch (error) {
            // @@TODO: @EX: what to do here ??
            console.log("cp_invoiceGroupLogCollection.Log", error);
        }
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


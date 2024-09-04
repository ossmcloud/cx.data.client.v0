'use strict'
//
const _persistentTable = require('./persistent/p-cp_accrualLog');
//
class cp_accrualLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_accrualLog(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  *
                      from    ${this.type}
                      where   accrId = @accrId`;
        query.params.push({ name: 'accrId', value: params.pid });

        if (params.id) {
            query.sql += ' and accrLogId = @accrLogId';
            query.params.push({ name: 'accrLogId', value: params.id });
        }
        query.sql += ' order by created desc';

        return await super.select(query);
    }

    async log(accrId, type, message, info) {
        try {
            var log = this.createNew();
            log.accrId = accrId;
            log.logType = type || 'NONE';
            log.logMessage = message || 'no log message';
            log.logInfo = info || '';
            //log.Fields.TruncateValues();
            await log.save();

        } catch (error) {
            // @@TODO: @EX: what to do here ??
            console.log("cp_accrualLog_Collection.Log", error);
        }
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_accrualLog extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_accrualLog_Collection,
    Record: cp_accrualLog,
}


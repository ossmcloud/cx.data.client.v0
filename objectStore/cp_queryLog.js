'use strict'
//
const _persistentTable = require('./persistent/p-cp_queryLog');
//
class cp_queryLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_queryLog(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  *
                      from    ${this.type}
                      where   queryId = @queryId`;
        query.params.push({ name: 'queryId', value: params.qid });

        if (params.id) {
            query.sql += ' and queryLogId = @queryLogId';
            query.params.push({ name: 'invCreLogId', value: params.id });
        }
        query.sql += ' order by created desc';

        // query.paging = {
        //     page: params.page || 1,
        //     pageSize: _declarations.SQL.PAGE_SIZE
        // }

        return await super.select(query);
    }

    async log(queryId, type, title, message, info) {
        try {
            var log = this.createNew();
            log.queryId = queryId;
            log.logType = (type || 'NONE').substring(0, 10);
            log.logTitle = (title || 'no title').substring(0, 50);
            log.logMessage = (message || 'no log message').substring(0,255);
            log.logInfo = (info || '').substring(0, 2000);
            await log.save();

        } catch (error) {
            // @@TODO: @EX: what to do here ??
            console.log("cp_queryLog_Collection.Log", error);
        }
    }


}
//
// ----------------------------------------------------------------------------------------
//
class cp_queryLog extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
        this.getField(this.FieldNames.LOGTITLE).truncate = true;
        this.getField(this.FieldNames.LOGMESSAGE).truncate = true;
        this.getField(this.FieldNames.LOGINFO).truncate = true;
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
    Table: cp_queryLog_Collection,
    Record: cp_queryLog,
}


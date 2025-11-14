'use strict'
//
const _persistentTable = require('./persistent/p-cs_stockValuationLog');
//
class cs_stockValuationLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cs_stockValuationLog(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  *
                      from    ${this.type}
                      where   stockValuationId = @stockValuationId`;
        query.params.push({ name: 'stockValuationId', value: params.pid });

        if (params.id) {
            query.sql += ' and stockValuationIdLogId = @stockValuationIdLogId';
            query.params.push({ name: 'stockValuationIdLogId', value: params.id });
        }
        query.sql += ' order by created desc';

        // query.paging = {
        //     page: params.page || 1,
        //     pageSize: _declarations.SQL.PAGE_SIZE
        // }

        return await super.select(query);
    }


    async log(stockValuationId, type, message, info) {
        try {
            var log = this.createNew();
            log.stockValuationId = stockValuationId;
            log.logType = type || 'NONE';
            log.logMessage = message || 'no log message';
            log.logInfo = info || '';
            await log.save();

        } catch (error) {
            // @@TODO: @EX: what to do here ??
            console.log("cs_stockValuationLog_Collection.Log", error);
        }
    }

}
//
// ----------------------------------------------------------------------------------------
//
class cs_stockValuationLog extends _persistentTable.Record {
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
    Table: cs_stockValuationLog_Collection,
    Record: cs_stockValuationLog,
}


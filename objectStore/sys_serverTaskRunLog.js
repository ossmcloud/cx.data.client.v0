'use strict'
//
const _persistentTable = require('./persistent/p-sys_serverTaskRunLog');
const _declarations = require('../cx-client-declarations');
//
class sys_serverTaskRunLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_serverTaskRunLog(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {};
        query.sql = `
            select  trl.*, t.taskName
            from    sys_serverTaskRunLog trl
            join    sys_serverTask t ON t.taskId = trl.taskId
            where 1=1
        `;

        this.queryFromParams(query, params, 'trl');
        query.sql += ' order by trl.created desc';
        

        if (!params.noPaging) {
            query.paging = {
                page: params.page || 1,
                pageSize: _declarations.SQL.PAGE_SIZE
            }
        }

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_serverTaskRunLog extends _persistentTable.Record {
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
    Table: sys_serverTaskRunLog_Collection,
    Record: sys_serverTaskRunLog,
}


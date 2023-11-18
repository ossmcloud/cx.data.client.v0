'use strict'
//
const _persistentTable = require('./persistent/p-sys_serverTaskRun');
const _declarations = require('../cx-client-declarations');
//
class sys_serverTaskRun_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_serverTaskRun(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {};
        query.sql = `
            select  tr.*, t.taskName
            from    sys_serverTaskRun tr
            join    sys_serverTask t ON t.taskId = tr.taskId
            where 1=1
        `;

        this.queryFromParams(query, params, 'tr');
        query.sql += ' order by tr.created desc';

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
class sys_serverTaskRun extends _persistentTable.Record {
    #taskName = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#taskName = defaults['taskName'] || '';
    };

    get taskName() { return this.#taskName; }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: sys_serverTaskRun_Collection,
    Record: sys_serverTaskRun,
}


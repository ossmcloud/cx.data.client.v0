'use strict'
//
const _persistentTable = require('./persistent/p-sys_serverTask');
//
class sys_serverTask_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_serverTask(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {};
        query.sql = 'select * from sys_serverTask t where 1=1';

        this.queryFromParams(query, params, 't');
        query.sql += ' order by t.workerTypeId, t.runSequence, t.created';

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_serverTask extends _persistentTable.Record {
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
    Table: sys_serverTask_Collection,
    Record: sys_serverTask,
}


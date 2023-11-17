'use strict'
//
const _persistentTable = require('./persistent/p-sys_serverTaskRunLog');
//
class sys_serverTaskRunLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_serverTaskRunLog(this, defaults);
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


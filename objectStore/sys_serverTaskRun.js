'use strict'
//
const _persistentTable = require('./persistent/p-sys_serverTaskRun');
//
class sys_serverTaskRun_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_serverTaskRun(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_serverTaskRun extends _persistentTable.Record {
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
    Table: sys_serverTaskRun_Collection,
    Record: sys_serverTaskRun,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cp_accrualLog');
//
class cp_accrualLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_accrualLog(this, defaults);
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
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_accrualLog_Collection,
    Record: cp_accrualLog,
}


'use strict'
//
const _persistentTable = require('./persistent/p-ca_settingApprover');
//
class ca_settingApprover_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new ca_settingApprover(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class ca_settingApprover extends _persistentTable.Record {
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
    Table: ca_settingApprover_Collection,
    Record: ca_settingApprover,
}


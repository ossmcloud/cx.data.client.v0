'use strict'
//
const _persistentTable = require('./persistent/p-ca_oneTimeAccess');
//
class ca_oneTimeAccess_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new ca_oneTimeAccess(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class ca_oneTimeAccess extends _persistentTable.Record {
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
    Table: ca_oneTimeAccess_Collection,
    Record: ca_oneTimeAccess,
}


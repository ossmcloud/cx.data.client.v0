'use strict'
//
const _persistentTable = require('./persistent/p-ca_oneTimeAccessLog');
//
class ca_oneTimeAccessLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new ca_oneTimeAccessLog(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class ca_oneTimeAccessLog extends _persistentTable.Record {
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
    Table: ca_oneTimeAccessLog_Collection,
    Record: ca_oneTimeAccessLog,
}


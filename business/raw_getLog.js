'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _persistentTable = require('../persistent/p-raw_getLog');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class raw_getLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_getLog(this, defaults);
    }
}
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class raw_getLog extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// EXPORTS ONLY TABLE AND RECORD
//
module.exports = {
    Table: raw_getLog_Collection,
    Record: raw_getLog,
}


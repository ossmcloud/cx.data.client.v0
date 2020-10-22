'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _persistentTable = require('../persistent/p-raw_getRequest');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class raw_getRequest_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_getRequest(this, defaults);
    }
}
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class raw_getRequest extends _persistentTable.Record {
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
    Table: raw_getRequest_Collection,
    Record: raw_getRequest,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cr_preference_record');
//
class cr_preference_record_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_preference_record(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cr_preference_record extends _persistentTable.Record {
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
    Table: cr_preference_record_Collection,
    Record: cr_preference_record,
}


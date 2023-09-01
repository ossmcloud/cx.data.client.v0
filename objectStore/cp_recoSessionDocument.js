'use strict'
//
const _persistentTable = require('./persistent/p-cp_recoSessionDocument');
//
class cp_recoSessionDocument_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_recoSessionDocument(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_recoSessionDocument extends _persistentTable.Record {
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
    Table: cp_recoSessionDocument_Collection,
    Record: cp_recoSessionDocument,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cp_accrualDocument');
//
class cp_accrualDocument_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_accrualDocument(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_accrualDocument extends _persistentTable.Record {
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
    Table: cp_accrualDocument_Collection,
    Record: cp_accrualDocument,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cp_recoSessionDocumentLine');
//
class cp_recoSessionDocumentLine_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_recoSessionDocumentLine(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_recoSessionDocumentLine extends _persistentTable.Record {
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
    Table: cp_recoSessionDocumentLine_Collection,
    Record: cp_recoSessionDocumentLine,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cp_accrualDocumentLine');
//
class cp_accrualDocumentLine_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_accrualDocumentLine(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_accrualDocumentLine extends _persistentTable.Record {
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
    Table: cp_accrualDocumentLine_Collection,
    Record: cp_accrualDocumentLine,
}


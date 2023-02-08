'use strict'
//
const _persistentTable = require('./persistent/p-cp_invoiceGroupLog');
//
class cp_invoiceGroupLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_invoiceGroupLog(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_invoiceGroupLog extends _persistentTable.Record {
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
    Table: cp_invoiceGroupLog_Collection,
    Record: cp_invoiceGroupLog,
}


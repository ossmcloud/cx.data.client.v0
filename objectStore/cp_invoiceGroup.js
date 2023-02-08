'use strict'
//
const _persistentTable = require('./persistent/p-cp_invoiceGroup');
//
class cp_invoiceGroup_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_invoiceGroup(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_invoiceGroup extends _persistentTable.Record {
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
    Table: cp_invoiceGroup_Collection,
    Record: cp_invoiceGroup,
}


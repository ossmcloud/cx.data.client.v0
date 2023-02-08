'use strict'
//
const _persistentTable = require('./persistent/p-cp_wholesaler');
//
class cp_wholesaler_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_wholesaler(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_wholesaler extends _persistentTable.Record {
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
    Table: cp_wholesaler_Collection,
    Record: cp_wholesaler,
}


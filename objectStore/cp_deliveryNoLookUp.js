'use strict'
//
const _persistentTable = require('./persistent/p-cp_deliveryNoLookUp');
//
class cp_deliveryNoLookUp_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_deliveryNoLookUp(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_deliveryNoLookUp extends _persistentTable.Record {
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
    Table: cp_deliveryNoLookUp_Collection,
    Record: cp_deliveryNoLookUp,
}


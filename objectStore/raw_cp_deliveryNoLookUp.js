'use strict'
//
const _persistentTable = require('./persistent/p-raw_cp_deliveryNoLookUp');
//
class raw_cp_deliveryNoLookUp_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_cp_deliveryNoLookUp(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class raw_cp_deliveryNoLookUp extends _persistentTable.Record {
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
    Table: raw_cp_deliveryNoLookUp_Collection,
    Record: raw_cp_deliveryNoLookUp,
}


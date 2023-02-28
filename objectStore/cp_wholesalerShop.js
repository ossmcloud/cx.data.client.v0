'use strict'
//
const _persistentTable = require('./persistent/p-cp_wholesalerShop');
//
class cp_wholesalerShop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_wholesalerShop(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_wholesalerShop extends _persistentTable.Record {
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
    Table: cp_wholesalerShop_Collection,
    Record: cp_wholesalerShop,
}


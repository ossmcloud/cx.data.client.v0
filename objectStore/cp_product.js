'use strict'
//
const _persistentTable = require('./persistent/p-cp_product');
//
class cp_product_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_product(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_product extends _persistentTable.Record {
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
    Table: cp_product_Collection,
    Record: cp_product,
}


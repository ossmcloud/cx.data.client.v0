'use strict'
//
const _persistentTable = require('./persistent/p-raw_cp_product');
//
class raw_cp_product_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_cp_product(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class raw_cp_product extends _persistentTable.Record {
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
    Table: raw_cp_product_Collection,
    Record: raw_cp_product,
}


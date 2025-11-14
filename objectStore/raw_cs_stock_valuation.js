'use strict'
//
const _persistentTable = require('./persistent/p-raw_cs_stock_valuation');
//
class raw_cs_stock_valuation_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_cs_stock_valuation(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class raw_cs_stock_valuation extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: raw_cs_stock_valuation_Collection,
    Record: raw_cs_stock_valuation,
}


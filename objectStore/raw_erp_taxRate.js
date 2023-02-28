'use strict'
//
const _persistentTable = require('./persistent/p-raw_erp_taxRate');
//
class raw_erp_taxRate_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_erp_taxRate(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class raw_erp_taxRate extends _persistentTable.Record {
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
    Table: raw_erp_taxRate_Collection,
    Record: raw_erp_taxRate,
}


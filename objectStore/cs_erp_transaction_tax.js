'use strict'
//
const _persistentTable = require('./persistent/p-cs_erp_transaction_tax');
//
class cs_erp_transaction_tax_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cs_erp_transaction_tax(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cs_erp_transaction_tax extends _persistentTable.Record {
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
    Table: cs_erp_transaction_tax_Collection,
    Record: cs_erp_transaction_tax,
}


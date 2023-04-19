'use strict'
//
const _persistentTable = require('./persistent/p-cp_erp_transaction');
//
class cp_erp_transaction_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_erp_transaction(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_erp_transaction extends _persistentTable.Record {
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
    Table: cp_erp_transaction_Collection,
    Record: cp_erp_transaction,
}


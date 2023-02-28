'use strict'
//
const _persistentTable = require('./persistent/p-raw_erp_traderAccount');
//
class raw_erp_traderAccount_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_erp_traderAccount(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class raw_erp_traderAccount extends _persistentTable.Record {
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
    Table: raw_erp_traderAccount_Collection,
    Record: raw_erp_traderAccount,
}


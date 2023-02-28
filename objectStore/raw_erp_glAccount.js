'use strict'
//
const _persistentTable = require('./persistent/p-raw_erp_glAccount');
//
class raw_erp_glAccount_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_erp_glAccount(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class raw_erp_glAccount extends _persistentTable.Record {
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
    Table: raw_erp_glAccount_Collection,
    Record: raw_erp_glAccount,
}


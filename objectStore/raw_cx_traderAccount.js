'use strict'
//
const _persistentTable = require('./persistent/p-raw_cx_traderAccount');
//
class raw_cx_traderAccount_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_cx_traderAccount(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class raw_cx_traderAccount extends _persistentTable.Record {
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
    Table: raw_cx_traderAccount_Collection,
    Record: raw_cx_traderAccount,
}


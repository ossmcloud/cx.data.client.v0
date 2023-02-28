'use strict'
//
const _persistentTable = require('./persistent/p-cr_cb_transactionAudit');
//
class cr_cb_transactionAudit_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_cb_transactionAudit(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cr_cb_transactionAudit extends _persistentTable.Record {
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
    Table: cr_cb_transactionAudit_Collection,
    Record: cr_cb_transactionAudit,
}


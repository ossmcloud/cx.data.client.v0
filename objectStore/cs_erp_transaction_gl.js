'use strict'
//
const _persistentTable = require('./persistent/p-cs_erp_transaction_gl');
//
class cs_erp_transaction_gl_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cs_erp_transaction_gl(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cs_erp_transaction_gl extends _persistentTable.Record {
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
    Table: cs_erp_transaction_gl_Collection,
    Record: cs_erp_transaction_gl,
}


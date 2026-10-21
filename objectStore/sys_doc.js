'use strict'
//
const _persistentTable = require('./persistent/p-sys_doc');
//
class sys_doc_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_doc(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_doc extends _persistentTable.Record {
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
    Table: sys_doc_Collection,
    Record: sys_doc,
}


'use strict'
//
const _persistentTable = require('./persistent/p-sys_provider');
//
class sys_provider_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_provider(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_provider extends _persistentTable.Record {
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
    Table: sys_provider_Collection,
    Record: sys_provider,
}


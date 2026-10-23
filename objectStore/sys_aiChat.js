'use strict'
//
const _persistentTable = require('./persistent/p-sys_aiChat');
//
class sys_aiChat_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_aiChat(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_aiChat extends _persistentTable.Record {
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
    Table: sys_aiChat_Collection,
    Record: sys_aiChat,
}


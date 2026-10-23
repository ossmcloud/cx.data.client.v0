'use strict'
//
const _persistentTable = require('./persistent/p-sys_aiChatToolCall');
//
class sys_aiChatToolCall_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_aiChatToolCall(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_aiChatToolCall extends _persistentTable.Record {
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
    Table: sys_aiChatToolCall_Collection,
    Record: sys_aiChatToolCall,
}


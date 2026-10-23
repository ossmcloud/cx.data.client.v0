'use strict'
//
const _persistentTable = require('./persistent/p-sys_aiChatTurn');
//
class sys_aiChatTurn_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_aiChatTurn(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_aiChatTurn extends _persistentTable.Record {
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
    Table: sys_aiChatTurn_Collection,
    Record: sys_aiChatTurn,
}


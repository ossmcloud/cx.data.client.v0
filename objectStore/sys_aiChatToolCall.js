'use strict'
//
const { escapeHtml } = require('./sys_aiChat');
const _persistentTable = require('./persistent/p-sys_aiChatToolCall');
//
class sys_aiChatToolCall_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_aiChatToolCall(this, defaults);
    }

    // NOTE: all the tool calls of a chat ({ aiChatId }) or of one turn ({ aiChatTurnId })
    async select(params) {
        if (!params) { params = {} };
        var query = {
            sql: `
                select      c.*, t.turnNo
                from        sys_aiChatToolCall  c
                inner join  sys_aiChatTurn      t ON t.aiChatTurnId = c.aiChatTurnId
                where       1 = 1
            `,
            params: []
        };
        if (params.aiChatTurnId) {
            query.sql += ' and c.aiChatTurnId = @aiChatTurnId';
            query.params.push({ name: 'aiChatTurnId', value: params.aiChatTurnId });
        } else {
            query.sql += ' and c.aiChatId = @aiChatId';
            query.params.push({ name: 'aiChatId', value: params.aiChatId });
        }
        query.sql += ' order by t.turnNo, c.seq';
        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_aiChatToolCall extends _persistentTable.Record {
    #turnNo = null;
    constructor(table, defaults) {
        super(table, defaults);
        if (defaults) { this.#turnNo = defaults['turnNo'] ?? null; }
    };

    get turnNo() { return this.#turnNo; }
    get argumentsHtml() { return escapeHtml(this.arguments); }

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

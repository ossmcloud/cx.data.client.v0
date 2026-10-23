'use strict'
//
const { escapeHtml } = require('./sys_aiChat');
const _persistentTable = require('./persistent/p-sys_aiChatTurn');
//
const PROMPT_PREVIEW_CHARS = 150;
//
class sys_aiChatTurn_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_aiChatTurn(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };
        var query = { sql: 'select t.* from sys_aiChatTurn t where t.aiChatId = @aiChatId order by t.turnNo', params: [{ name: 'aiChatId', value: params.aiChatId }] };
        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_aiChatTurn extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    get promptPreview() {
        var prompt = this.prompt || '';
        if (prompt.length > PROMPT_PREVIEW_CHARS) { prompt = prompt.substring(0, PROMPT_PREVIEW_CHARS) + '...'; }
        return escapeHtml(prompt);
    }
    get errorMessageHtml() { return escapeHtml(this.errorMessage); }

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

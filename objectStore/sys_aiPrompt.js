'use strict'
//
const _persistentTable = require('./persistent/p-sys_aiPrompt');
const { escapeHtml } = require('./sys_aiChat');
//
// NOTE: account specific instructions injected as a system message at the start of every ai chat (cx-ai-engine.js createChat)
class sys_aiPrompt_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_aiPrompt(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = { sql: 'select * from sys_aiPrompt where 1 = 1', params: [] };
        if (params.activeOnly) {
            query.sql += ' and inactive = 0';
        }
        if (params.name) {
            query.sql += ' and name like @name';
            query.params.push({ name: 'name', value: `%${params.name}%` });
        }
        query.sql += ' order by execSequence, aiPromptId';

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_aiPrompt extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    // NOTE: read-only fields and table cells are rendered as raw html, prompts can contain tags (i.e.: <example>)
    get nameHtml() { return escapeHtml(this.name); }
    get descriptionHtml() { return escapeHtml(this.description); }
    get promptHtml() { return escapeHtml(this.prompt)?.replace(/\r?\n/g, '<br />'); }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        if (!this.name || !this.name.trim()) { throw new Error('the prompt name is required'); }
        if (!this.prompt || !this.prompt.trim()) { throw new Error('the prompt text is required'); }
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: sys_aiPrompt_Collection,
    Record: sys_aiPrompt,
}

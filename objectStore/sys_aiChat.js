'use strict'
//
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-sys_aiChat');
//
// NOTE: table cells and read-only fields are rendered as raw html, any text from the user or the model must be escaped
function escapeHtml(text) {
    if (text === null || text === undefined) { return text; }
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
//
class sys_aiChat_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_aiChat(this, defaults);
    }

    // NOTE: only CX_ADMIN can see the chats of other users
    get ownChatsOnly() { return this.cx.roleId < _declarations.CX_ROLE.CX_ADMIN; }

    async select(params) {
        if (!params) { params = {} };

        var query = { sql: 'select c.* from sys_aiChat c where 1 = 1', params: [] };
        if (this.ownChatsOnly) {
            query.sql += ' and c.loginId = @loginId';
            query.params.push({ name: 'loginId', value: this.cx.tUserId });
        } else if (params.loginId) {
            query.sql += ' and c.loginId = @loginId';
            query.params.push({ name: 'loginId', value: params.loginId });
        }
        if (params.df) {
            query.sql += ' and c.created >= @from';
            query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
        }
        if (params.dt) {
            query.sql += ' and c.created <= @to';
            query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
        }
        if (params.title) {
            query.sql += ' and c.title like @title';
            query.params.push({ name: 'title', value: `%${params.title}%` });
        }
        query.sql += ' order by c.created desc';

        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }

        return await super.select(query);
    }

    async fetch(id, returnNull) {
        if (!id) { throw new Error('sys_aiChat::fetch - missing required argument [id]'); }
        var query = { sql: 'select c.* from sys_aiChat c where c.aiChatId = @aiChatId', params: [{ name: 'aiChatId', value: id }] };
        if (this.ownChatsOnly) {
            query.sql += ' and c.loginId = @loginId';
            query.params.push({ name: 'loginId', value: this.cx.tUserId });
        }
        query.noResult = 'null';
        query.returnFirst = true;
        var rawRecord = await this.db.exec(query);
        if (!rawRecord) {
            if (returnNull) { return null; }
            throw new Error(`${this.type} record [${id}] does not exist or was deleted!`);
        }
        return super.populate(rawRecord);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_aiChat extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    get titleHtml() { return escapeHtml(this.title); }
    get pathHtml() { return escapeHtml(this.path); }
    get isMine() { return this.loginId == this.cx.tUserId; }

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
    escapeHtml: escapeHtml,
}

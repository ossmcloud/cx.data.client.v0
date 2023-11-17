'use strict'
//
const _persistentTable = require('./persistent/p-sys_customScript');
//
class sys_customScript_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_customScript(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = { sql: `select *, (select count(*) from sys_customScriptShop scriptShop where scriptShop.scriptId = script.scriptId) as shopCount from sys_customScript script where 1 = 1` };
        this.queryFromParams(query, params, 'script');
        query.sql += ' order by svcName, stage, execSequence, scriptName';

        return await super.select(query);
    }


}
//
// ----------------------------------------------------------------------------------------
//
class sys_customScript extends _persistentTable.Record {
    #shopCount = 0;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopCount = defaults['shopCount'] || 0;
    };

    get shopCount() { return this.#shopCount; }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        if (this.isNew()) { this.inactive = true; }
        
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: sys_customScript_Collection,
    Record: sys_customScript,
}


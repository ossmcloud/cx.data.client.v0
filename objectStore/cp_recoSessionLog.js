'use strict'
//
const _persistentTable = require('./persistent/p-cp_recoSessionLog');
//
class cp_recoSessionLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_recoSessionLog(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = { sql: `select top 200 * from cp_recoSessionLog where 1 = 1 `, params: [] };
        this.queryFromParams(query, params);
        query.sql += ' order by created desc';

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_recoSessionLog extends _persistentTable.Record {
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
    Table: cp_recoSessionLog_Collection,
    Record: cp_recoSessionLog,
}


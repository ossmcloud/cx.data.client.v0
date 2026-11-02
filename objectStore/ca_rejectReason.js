'use strict'
//
const _persistentTable = require('./persistent/p-ca_rejectReason');
//
class ca_rejectReason_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new ca_rejectReason(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = { sql: 'select * from ca_rejectReason' };
        this.queryFromParams(query, params);
        query.sql += ' order by sortIndex, reason';

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class ca_rejectReason extends _persistentTable.Record {
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
    Table: ca_rejectReason_Collection,
    Record: ca_rejectReason,
}


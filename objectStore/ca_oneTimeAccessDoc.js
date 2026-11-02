'use strict'
//
const _persistentTable = require('./persistent/p-ca_oneTimeAccessDoc');
//
class ca_oneTimeAccessDoc_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new ca_oneTimeAccessDoc(this, defaults);
    }

    buildQuery() {
        return `
                select	            docs.*
                                    
                from	            ca_oneTimeAccessDoc      docs
                where   1 = 1
            `;
    }

    async select(params) {
        if (!params) { params = {} };

        var query = { sql: this.buildQuery() };

        this.queryFromParams(query, params);

        query.sql += ' order by docs.created';

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class ca_oneTimeAccessDoc extends _persistentTable.Record {
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
    Table: ca_oneTimeAccessDoc_Collection,
    Record: ca_oneTimeAccessDoc,
}


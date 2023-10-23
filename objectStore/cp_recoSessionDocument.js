'use strict'
//
const _persistentTable = require('./persistent/p-cp_recoSessionDocument');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
//
class cp_recoSessionDocument_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_recoSessionDocument(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `select * from cp_recoSessionDocument where 1=1 `
        };
                
        this.queryFromParams(query, params);

        query.sql += ' order by isMainDocument desc, created';

        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_recoSessionDocument extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_recoSessionDocument_Collection,
    Record: cp_recoSessionDocument,
}


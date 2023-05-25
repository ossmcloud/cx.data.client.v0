'use strict'
//
const _persistentTable = require('./persistent/p-cp_invoiceCreditLine');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
//
class cp_invoiceCreditLine_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_invoiceCreditLine(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  *
                      from    ${this.type}
                      where   invCreId = @invCreId`;
        query.params.push({ name: 'invCreId', value: params.pid });

        if (params.id) {
            query.sql += ' and invCreLineId = @invCreLineId';
            query.params.push({ name: 'invCreLineId', value: params.id });
        }
        query.sql += ' order by lineNumber';

        // query.paging = {
        //     page: params.page || 1,
        //     pageSize: _declarations.SQL.PAGE_SIZE
        // }

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_invoiceCreditLine extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    get lineStatusMsg() {
        if (this.lineStatus == _declarations.CP_DOCUMENT_LINE.STATUS.Ready) {
            if (!this.depMapConfigId || !this.taxMapConfigId) {
                return 'not mapped';
            }
        }
        return this.lineStatus
    }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_invoiceCreditLine_Collection,
    Record: cp_invoiceCreditLine,
}


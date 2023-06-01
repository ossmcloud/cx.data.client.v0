'use strict'
//
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cp_documentImport');
//
class cp_documentImport_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_documentImport(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  d.*, s.shopCode, s.shopName
                      from    ${this.type} d, cx_shop s
                      where   d.${this.FieldNames.SHOPID} = s.shopId
                      and     d.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

        if (params.s) {
            query.sql += ' and d.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }
        if (params.ff) {
            query.sql += ' and d.fileName = @fileName';
            query.params.push({ name: 'fileName', value: params.ff });
        }
        if (params.df) {
            query.sql += ' and d.created >= @from';
            query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
        }
        if (params.dt) {
            query.sql += ' and d.created <= @to';
            query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
        }
        if (params.type == 'cpDocImportValidate') {
            query.sql += ` and d.importStatus not in (${_declarations.CP_DOCUMENT.IMPORT_STATUS.Deleted}, ${_declarations.CP_DOCUMENT.IMPORT_STATUS.Cancelled})`;
        } else if (params.st) {
            query.sql += ' and d.importStatus = @importStatus';
            query.params.push({ name: 'importStatus', value: params.st });
        }
        query.sql += ' order by d.created desc';

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
class cp_documentImport extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get status() {
        return _declarations.CP_DOCUMENT.IMPORT_STATUS.getName(this.importStatus);
    }

    get fileTypeView() {
        return this.fileType;
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
    Table: cp_documentImport_Collection,
    Record: cp_documentImport,
}


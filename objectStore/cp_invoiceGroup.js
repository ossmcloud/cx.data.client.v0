'use strict'
//
const _schema = require('../cx-client-schema');
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cp_invoiceGroup');
//
class cp_invoiceGroup_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_invoiceGroup(this, defaults);
    }
    async select(params) {
        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  d.*, s.shopCode, s.shopName, i.fileName, whs.code, whs.name
                      from    ${this.type} d
                      inner join cx_shop s ON s.shopId = d.shopId
                      inner join cp_wholesaler whs ON whs.wholesalerId = d.wholesalerId
                      left outer join cp_documentImport i ON i.documentImportId = d.documentImportId
                      where   d.${this.FieldNames.SHOPID} in ${this.cx.shopList}
        `;

        if (params.s) {
            query.sql += ' and d.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }
        if (params.df) {
            query.sql += ' and d.documentDate >= @from';
            query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
        }
        if (params.dt) {
            query.sql += ' and d.documentDate <= @to';
            query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
        }
        if (params.udf) {
            query.sql += ' and d.created >= @uFrom';
            query.params.push({ name: 'uFrom', value: params.udf + ' 00:00:00' });
        }
        if (params.udt) {
            query.sql += ' and d.created <= @uTo';
            query.params.push({ name: 'uTo', value: params.udt + ' 23:59:59' });
        }
        if (params.st) {
            query.sql += ' and d.documentStatus = @documentStatus';
            query.params.push({ name: 'documentStatus', value: params.st });
        }
        if (params.tno) {
            query.sql += ' and d.documentNumber like @documentNumber';
            query.params.push({ name: 'documentNumber', value: '%' + params.tno });
        }
        if (params.tt) {
            query.sql += ' and d.documentType = @documentType';
            query.params.push({ name: 'documentType', value: params.tt });
        }
        if (params.id) {
            query.sql += ' and d.invGrpId = @invGrpId';
            query.params.push({ name: 'invGrpId', value: params.id });
        }
        if (params.imp == 'true') {
            query.sql += ' and d.documentImportId is not null';
        }
        if (params.impid) {
            query.sql += ' and d.documentImportId = @documentImportId';
            query.params.push({ name: 'documentImportId', value: params.impid });
        }
        query.sql += ' order by d.documentDate desc';

        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }

        return await super.select(query);
    }

    async fetch(id, returnNull) {
        var query = { sql: '', params: [{ name: 'invGrpId', value: id }] };

        query.sql = `
            select  d.*, s.shopCode, s.shopName, i.fileName, whs.code, whs.name
            from    ${this.type} d
            inner join cx_shop s ON s.shopId = d.shopId
            inner join cp_wholesaler whs ON whs.wholesalerId = d.wholesalerId
            left outer join cp_documentImport i ON i.documentImportId = d.documentImportId
            where   d.${this.FieldNames.SHOPID} in ${this.cx.shopList}
            and     d.invGrpId = @invGrpId
        `
        query.noResult = 'null';
        query.returnFirst = true;

        var rec = await this.db.exec(query);
        if (!rec) { return rec; }

        return super.populate(rec);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_invoiceGroup extends _persistentTable.Record {
    #whsName = '';
    #whsCode = '';
    #shopName = '';
    #shopCode = '';
    #importedFile = '';
    #logs = null;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#whsName = defaults['name'] || '';
        this.#whsCode = defaults['code'] || '';
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#importedFile = defaults['fileName'] || '';
    };

    get wholesalerName() { return this.#whsName; }
    get wholesalerCode() { return this.#whsCode; }
    get wholesalerInfo() { return `[${this.#whsCode}] ${this.#whsName}`; }
    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }
    get importedFile() { return this.#importedFile; }
    get documentTypeName() {
        return _declarations.CP_DOCUMENT.TYPE.getName(this.documentType);
    }

    get logs() {
        return this.#logs;
    } set logs(logs) {
        this.#logs = logs;
    }

    get isManualIcon() {
        if (this.isManual) { return '&#x1F590;' }
        return '';
    }

    
    async log(message, info) {
        await this.logBase(_declarations.CP_DOCUMENT_LOG.STATUS.INFO, message, info);
    }
    async logWarning(message, info) {
        await this.logBase(_declarations.CP_DOCUMENT_LOG.STATUS.WARNING, message, info);
    }
    async logError(error, info) {
        if (!info && error.stack) { info = error.stack; }
        if (error && error.message) { error = error.message; }
        await this.logBase(_declarations.CP_DOCUMENT_LOG.STATUS.ERROR, error, info);

    }
    async logBase(type, message, info) {
        if (!this.#logs) {
            this.#logs = this.cx.table(_schema.cp_invoiceGroupLog);
        }
        var log = await this.#logs.log(this.invGrpId, type, message, info);
        this.#logs.records.push(log);
        return log;
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
    Table: cp_invoiceGroup_Collection,
    Record: cp_invoiceGroup,
}


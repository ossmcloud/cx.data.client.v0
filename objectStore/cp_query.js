'use strict'
//
const _persistentTable = require('./persistent/p-cp_query');
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
//
class cp_query_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_query(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select	    q.*, 
                            qt.code as queryType, qt.name as queryTypeName,
                            s.shopCode, s.shopName,
                            w.wholesalerId, w.code as wholesalerCode, w.name as wholesalerName,
                            doc.documentNumber, doc.documentDate,
                            grp.documentNumber as groupInvoice, grp.documentDate as groupInvoiceDate
                from	    cp_query                     q
                inner join  cx_shop                      s ON s.shopId = q.shopId
                inner join  cp_queryType                qt ON qt.queryTypeId = q.queryTypeId
                inner join  cp_invoiceCredit           doc ON doc.invCreId = q.invCreId
                left outer  join cp_invoiceGroup       grp ON grp.invGrpId = doc.invGrpId
                left outer  join cp_wholesaler           w ON w.wholesalerId = grp.wholesalerId
                where       1 = 1
                `
        };
        this.queryFromParams(query, params, 'q');
        query.sql += ' order by q.created desc';

        return await super.select(query);
    }

    async fetchOpenQuery(invCreId) {
        var query = {
            sql: `
                select	    q.*, 
                            qt.code as queryType, qt.name as queryTypeName,
                            s.shopCode, s.shopName,
                            w.wholesalerId, w.code as wholesalerCode, w.name as wholesalerName,
                            doc.documentNumber, doc.documentDate,
                            grp.documentNumber as groupInvoice, grp.documentDate as groupInvoiceDate
                from	    cp_query                     q
                inner join  cx_shop                      s ON s.shopId = q.shopId
                inner join  cp_queryType                qt ON qt.queryTypeId = q.queryTypeId
                inner join  cp_invoiceCredit           doc ON doc.invCreId = q.invCreId
                left outer  join cp_invoiceGroup       grp ON grp.invGrpId = doc.invGrpId
                left outer  join cp_wholesaler           w ON w.wholesalerId = grp.wholesalerId
                where       doc.invCreId =              ${invCreId}
                and         q.statusId   <               ${_cxConst.CP_QUERY_STATUS.RESOLVED}
                `
        };
        await super.select(query)
        return this.first();
    }

    async fetch(id) {

        await this.select({ queryId: id });
        return this.first();
    }

}
//
// ----------------------------------------------------------------------------------------
//
class cp_query extends _persistentTable.Record {
    #queryCode = '';
    #queryName = '';
    #shopCode = '';
    #shopName = '';
    #wholesalerId = null;
    #wholesalerCode = '';
    #wholesalerName = '';
    #documentNumber = '';
    #documentDate = null;
    #groupInvoice = '';
    #groupInvoiceDate = null;
    #queryType = null;
    #queryTypeName = '';
    #logs = null;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#wholesalerId = defaults['wholesalerId'] || null;
        this.#wholesalerCode = defaults['wholesalerCode'] || '';
        this.#wholesalerName = defaults['wholesalerName'] || '';

        this.#queryCode = defaults['queryCode'] || '';
        this.#queryName = defaults['queryName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#shopName = defaults['shopName'] || '';

        this.#documentNumber = defaults['documentNumber'] || '';
        this.#documentDate = defaults['documentDate'] || null;

        this.#groupInvoice = defaults['groupInvoice'] || '';
        this.#groupInvoiceDate = defaults['groupInvoiceDate'] || null;

        this.#queryTypeName = defaults['queryTypeName'] || '';
        this.#queryType = defaults['queryType'] || null;
    };

    get wholesalerId() { return this.#wholesalerId; }
    get wholesalerCode() { return this.#wholesalerCode; }
    get wholesalerName() { return this.#wholesalerName; }
    get wholesalerInfo() { return `[${this.#wholesalerCode}] ${this.#wholesalerName}`; }

    get queryCode() { return this.#queryCode; }
    get queryName() { return this.#queryName; }
    get queryInfo() { return `[${this.#queryCode}] ${this.#queryName}`; }

    get shopCode() { return this.#shopCode; }
    get shopName() { return this.#shopName; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get documentNumber() { return this.#documentNumber; }
    get documentDate() { return this.#documentDate; }

    get groupInvoice() { return this.#groupInvoice; }
    get groupInvoiceDate() { return this.#groupInvoiceDate; }

    get queryType() { return this.#queryType; }
    get queryTypeName() { return this.#queryTypeName; }

    get logs() {
        return this.#logs;
    } set logs(logs) {
        this.#logs = logs;
    }


    async save(saveAudits) {
        if (this.statusMessage && this.statusMessage.length > 255) {
            this.statusMessage = this.statusMessage.substring(0, 255);
        }

        var editedFields = []; var newRecord = this.isNew();
        if (!newRecord) {
            for (var f in this.fields) {
                var field = this.fields[f];
                if (field.dirty) {
                    editedFields.push({ name: field.name, new: field.value, old: field.valueOriginal })
                }
            }
        }

        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save();
        
        if (saveAudits) {
            for (var f = 0; f < editedFields.length; f++) {
                var field = editedFields[f];
                this.log('Field Edited: ' + field.name, `new value: ${field.new} | old value: ${field.old}`);
            }
        }
    }



    async log(title, message, info) {
        await this.logBase(_cxConst.CX_LOG_TYPE.INFO, title, message, info);
    }
    async logWarning(title, message, info) {
        await this.logBase(_cxConst.CX_LOG_TYPE.WARN, title, message, info);
    }
    async logError(title, error, info, critical) {
        if (!info && error.stack) { info = error.stack; }
        if (error && error.message) { error = error.message; }
        await this.logBase((critical) ? _cxConst.CX_LOG_TYPE.CRITICAL : _cxConst.CX_LOG_TYPE.ERROR, title, error, info);
    }

    async logBase(type, title, message, info) {
        if (!this.#logs) { this.#logs = this.cx.table(_cxSchema.cp_queryLog); }
        var log = await this.#logs.log(this.queryId, type, title, message, info);
        this.#logs.records.push(log);
        return log;
    }

}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_query_Collection,
    Record: cp_query,
}



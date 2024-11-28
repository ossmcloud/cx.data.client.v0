'use strict'
//
const _schema = require('../cx-client-schema');
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cp_accrual');
//
class cp_accrual_Collection extends _persistentTable.Table {
   
    createNew(defaults) {
        return new cp_accrual(this, defaults);
    }


    async select(params) {
        if (!params) { params = {}; }
        if (params.sql) { return await super.select(params); }

        var query = {
            sql: `
                select      a.*,
                            s.shopCode, s.shopName
                from        cp_accrual a
                inner join  cx_shop    s ON s.shopId = a.shopId
                where       a.${this.FieldNames.SHOPID} in ${this.cx.shopList}
                `
        };

        if (params.SKIP_sta) { query.sql += ' and a.documentStatus in (' + params.SKIP_sta + ')'; }
        if (params.SKIP_ref) {
            query.sql += `
                and (
                    a.documentNumber like '${params.SKIP_ref}%' or
                    a.documentReference like '${params.SKIP_ref}%' or
                    a.documentSecondReference like '${params.SKIP_ref}%'
                )
            `;
        }

        this.queryFromParams(query, params, 'a');
        query.sql += ' order by a.created desc';

        return await super.select(query);
    }


    
}
//
// ----------------------------------------------------------------------------------------
//
class cp_accrual extends _persistentTable.Record {
    #shopCode = '';
    #shopName = '';
    #logs = null;
    constructor(table, defaults) {
        super(table, defaults);

        this.#shopCode = defaults['shopCode'] || '';
        this.#shopName = defaults['shopName'] || '';
    };

    get status() {
        return _declarations.CP_DOCUMENT.STATUS.getName(this.documentStatus);
    }

    get shopCode() { return this.#shopCode; }
    get shopName() { return this.#shopName; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get logs() {
        return this.#logs;
    } set logs(logs) {
        this.#logs = logs;
    }

    get documentTypeSource() {
        if (this.documentType == 'cp_invoiceCredit') {
            return 'Invoices';
        } else {
            return 'Deliveries';
        }
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
            this.#logs = this.cx.table(_schema.cp_accrualLog);
        }
        var log = await this.#logs.log(this.accrId, type, message, info);
        this.#logs.records.push(log);
        return log;
    }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_accrual_Collection,
    Record: cp_accrual,
}


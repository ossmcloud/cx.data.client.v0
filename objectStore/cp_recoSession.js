'use strict'
//
const _persistentTable = require('./persistent/p-cp_recoSession');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
//
class cp_recoSession_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_recoSession(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select	            reco.*, s.shopCode, s.shopName, doc.documentNumber, doc.documentDate, doc.supplierCode
                from	            cp_recoSession          reco
                left outer join     cp_recoSessionDocument	recoDoc ON recoDoc.recoSessionId = reco.recoSessionId and recoDoc.isMainDocument = 1
                left outer join     cp_invoiceCredit        doc     ON doc.invCreId = recoDoc.documentId
                inner join          cx_shop s ON s.shopId = reco.shopId
            `
        };

        if (params.s) {
            query.sql += ' where s.shopId = @shopId\n';
            query.params = [{ name: 'shopId', value: params.s }];
        } else {
            this.queryFromParams(query, params);
        }

        query.sql += ' order by doc.documentDate desc';

        return await super.select(query);
    }


}
//
// ----------------------------------------------------------------------------------------
//
class cp_recoSession extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #documentNumber = '';
    #documentDate = '';
    #supplierCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#documentNumber = defaults['documentNumber'] || '';
        this.#documentDate = defaults['documentDate'] || '';
        this.#supplierCode = defaults['supplierCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get documentNumber() { return this.#documentNumber; }
    get documentDate() { return this.#documentDate; }
    get supplierCode() { return this.#supplierCode; }

    get recoStatusName() {
        return _declarations.CP_DOCUMENT.RECO_STATUS.getName(this.recoStatusId);
    }

    get recoSourceName() {
        if (this.recoSourceId == 0) { return 'auto'; }
        return 'manual'
    }

    get recoScoreDisplay() {
        var sc = parseFloat(this.recoScore);
        sc = sc / 100;

        return sc;
    }

    get notesDisplay() {
        if (!this.notes) { return ''; }
        if (this.notes.length > 30) { return this.notes.substring(0, 30) + '...'; }
        return this.notes;
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
    Table: cp_recoSession_Collection,
    Record: cp_recoSession,
}


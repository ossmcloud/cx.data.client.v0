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
                select	            distinct reco.*, s.shopCode, s.shopName, 
                                    doc.documentNumber, doc.documentDate, doc.supplierCode, doc.documentType, doc.invCreId, recoDoc.recoMatchLevel,
                                    (
                                        select  top 1 traderName 
                                        from    cx_traderAccount supp
                                        where	supp.shopId      = doc.shopId
                                        and		supp.traderType  = 'S'
                                        and		(
                                            isnull(supp.traderAccountId, '')     = isnull(doc.traderAccountId, '')	
                                            or	 supp.traderCode                 = doc.supplierCode 
                                            or   supp.wholesalerCode             = doc.supplierCode	
                                        )
                                        order by created desc
                                    ) as supplierName
                
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
    #documentType = '';
    #documentDate = '';
    #supplierCode = '';
    #supplierName = null;
    #recoMatchLevel = -1;
    #invCreId = null;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#documentNumber = defaults['documentNumber'] || '';
        this.#documentType = defaults['documentType'] || '';
        this.#documentDate = defaults['documentDate'] || '';
        this.#supplierCode = defaults['supplierCode'] || '';
        this.#supplierName = defaults['supplierName'] || null;
        this.#recoMatchLevel = defaults['recoMatchLevel'];
        if (this.#recoMatchLevel == undefined) { this.#recoMatchLevel = -1; }
        this.#invCreId = defaults['invCreId'] || null;
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get documentType() { return this.#documentType; }
    get documentNumber() { return this.#documentNumber; }
    get documentDate() { return this.#documentDate; }
    get supplierCode() { return this.#supplierCode; }
    get supplierName() { return this.#supplierName; }
    get recoMatchLevel() { return this.#recoMatchLevel; }
    get invCreId() { return this.#invCreId; }

    get recoStatusName() {
        return _declarations.CP_DOCUMENT.RECO_STATUS.getName(this.recoStatusId);
    }

    get recoSourceName() {
        if (this.recoSourceId == 0) { return 'auto'; }
        return 'manual'
    }

    get recoScoreDisplay() {
        if (this.recoScore == null) { return null; }
        var sc = parseFloat(this.recoScore);
        sc = sc / 100;

        return sc;
    }

    get matchByUserDisplay() {
        if (this.matchedAlone) { return '&cross;'; }
        if (this.matchedByUser) { return '&check;'; }
        return '';
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


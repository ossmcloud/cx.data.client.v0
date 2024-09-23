'use strict'
//
const _persistentTable = require('./persistent/p-cp_recoSession');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
const _core = require('cx-core');
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
                                    doc.documentNumber, doc.docketNumber, doc.documentDate, doc.supplierCode, doc.documentType, doc.invCreId, 
                                    recoDoc.recoMatchLevel, grp.documentNumber as groupInvoice, grp.wholesalerId,
                                    isnull(supp.traderName, isnull(supp2.traderName, case when suppName.traderName is null then null else '&#x2048;' + suppName.traderName end)) as supplierName,
                                    ( select count(q.queryId) from cp_query q where q.invCreId = doc.invCreId ) as queryCount,
                                    ( select count(q.queryId) from cp_query q where q.invCreId = doc.invCreId and q.statusId < 8 ) as queryCountOpen,
                                    convert(varchar, DATEPART(yyyy, doc.documentDate)) + '-' + RIGHT('00' + convert(varchar, DATEPART(ISO_WEEK, doc.documentDate)), 2) as weekNumber
                
                                    from	            cp_recoSession          reco
                left outer join     cp_recoSessionDocument	recoDoc ON recoDoc.recoSessionId = reco.recoSessionId and recoDoc.isMainDocument = 1
                left outer join     cp_invoiceCredit        doc     ON doc.invCreId = recoDoc.documentId
                left outer join     cp_invoiceGroup         grp     ON grp.invGrpId = doc.invGrpId

                left outer join	    cx_traderAccount supp           ON supp.traderAccountId = doc.traderAccountId
                left outer join     cx_traderAccount supp2          ON supp2.shopId = doc.shopId AND supp2.traderCode = doc.supplierCode AND supp2.traderType = 'S'
                left outer join     cx_traderAccount supp3          ON supp3.shopId = doc.shopId AND supp3.wholesalerCode = doc.supplierCode AND supp3.traderType = 'S'
                left outer join     cx_traderNameLookUp suppName    ON suppName.shopId = doc.shopId AND suppName.traderCode = doc.supplierCode AND suppName.traderType = 'S' 
                
                inner join          cx_shop s ON s.shopId = reco.shopId
                where               reco.${this.FieldNames.SHOPID} in ${this.cx.shopList}
            `
        };

        // if (params.s) {
        //     query.sql += ' where s.shopId = @shopId\n';
        //     query.params = [{ name: 'shopId', value: params.s }];
        // } else {
            this.queryFromParams(query, params, 'reco');
        //}

        if (!query.params) { query.params = []; }

        if (params.SKIP_documentDate || params.SKIP_documentDateTo) {
            if (params.SKIP_documentDate && params.SKIP_documentDateTo) {
                query.sql += ` and doc.documentDate between @documentDate and @documentDateTo`;
                query.params.push({ name: 'documentDate', value: params.SKIP_documentDate });
                query.params.push({ name: 'documentDateTo', value: params.SKIP_documentDateTo });
            } else if (params.SKIP_documentDate) {
                query.sql += ` and doc.documentDate >= @documentDate`;
                query.params.push({ name: 'documentDate', value: params.SKIP_documentDate });
            } else if (params.SKIP_documentDateTo) {
                query.sql += ` and doc.documentDate <= @documentDate`;
                query.params.push({ name: 'documentDate', value: params.SKIP_documentDateTo });
            }
        }
        if (params.SKIP_documentNumber) {
            query.sql += ` and doc.documentNumber like @documentNumber`;
            query.params.push({ name: 'documentNumber', value: params.SKIP_documentNumber + '%' });
        }
        if (params.SKIP_weekNumber) {
            var weekNo = _core.date.parseWeekNo(params.SKIP_weekNumber);

            query.sql += ` and convert(varchar, DATEPART(yyyy, doc.documentDate)) + '-' + RIGHT('00' + convert(varchar, DATEPART(ISO_WEEK, doc.documentDate)), 2) = @weekNo`;
            query.params.push({ name: 'weekNo', value: weekNo });
        }
        if (params.SKIP_docketNumber) {
            query.sql += ` and doc.docketNumber like @docketNumber`;
            query.params.push({ name: 'docketNumber', value: params.SKIP_docketNumber + '%' });
        }
        if (params.SKIP_groupInvoice) {
            var noGrpInvoice = ['none', 'empty', 'no', 'blank', 'n', 'null'];
            if (noGrpInvoice.indexOf(params.SKIP_groupInvoice.toLowerCase()) >= 0) {
                query.sql += ' and grp.documentNumber is null';
            } else {
                query.sql += ` and grp.documentNumber = @groupInvoice`;
                query.params.push({ name: 'groupInvoice', value: params.SKIP_groupInvoice });
            }
            
        }

        if (params['reco.recoStatusId'] == _declarations.CP_DOCUMENT.RECO_STATUS.Pending) {
            query.sql += ' order by reco.recoScore';
        } else {
            query.sql += ' order by doc.documentDate desc';
        }

        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }
        

        return await super.select(query);
    }

    async fetch(id, throwError) {
        await this.select({ recoSessionId: id });
        var reco = this.first();
        if (reco == null && throwError) { throw new Error(`no matching session found with id: ${id}`); }
        return reco;
    }

}
//
// ----------------------------------------------------------------------------------------
//
class cp_recoSession extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #documentNumber = '';
    #docketNumber = '';
    #documentType = '';
    #documentDate = '';
    #weekNumber = '';
    #supplierCode = '';
    #supplierName = null;
    #recoMatchLevel = -1;
    #invCreId = null;
    #groupInvoice = '';
    #queryCount = null;
    #queryCountOpen = null;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#documentNumber = defaults['documentNumber'] || '';
        this.#docketNumber = defaults['docketNumber'] || '';
        this.#documentType = defaults['documentType'] || '';
        this.#documentDate = defaults['documentDate'] || '';
        this.#weekNumber = defaults['weekNumber'] || '';
        this.#supplierCode = defaults['supplierCode'] || '';
        this.#supplierName = defaults['supplierName'] || null;
        this.#recoMatchLevel = defaults['recoMatchLevel'];
        if (this.#recoMatchLevel == undefined) { this.#recoMatchLevel = -1; }
        this.#invCreId = defaults['invCreId'] || null;
        this.#groupInvoice = defaults['groupInvoice'] || '';
        this.#queryCount = defaults['queryCount'] || null;
        this.#queryCountOpen = defaults['queryCountOpen'] || null;
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get documentType() { return this.#documentType; }
    get documentNumber() { return this.#documentNumber; }
    get docketNumber() { return this.#docketNumber; }
    get documentDate() { return this.#documentDate; }
    get weekNumber() { return this.#weekNumber; }
    get supplierCode() { return this.#supplierCode; }
    get supplierName() { return this.#supplierName; }
    get recoMatchLevel() { return this.#recoMatchLevel; }
    get invCreId() { return this.#invCreId; }
    get groupInvoice() { return this.#groupInvoice; }

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

    get queryCount() { return this.#queryCount; }
    get queryCountOpen() { return this.#queryCountOpen; }
    get queryCountDisplay() {
        if (this.queryCount) {
            if (this.#queryCountOpen) {
                return `${this.queryCount} queries (${this.#queryCountOpen} open)`;
            }
            return `${this.queryCount} queries`;
        }
        return this.queryCount;
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


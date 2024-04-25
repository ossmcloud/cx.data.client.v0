'use strict'
//
const _persistentTable = require('./persistent/p-cp_invoiceCredit');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
//
class cp_invoiceCredit_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_invoiceCredit(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var isBatchProcessing = (params.batch == 'T' || params.batch == 'true');


        var query = { sql: '', params: [] };
        query.sql = ` select    d.*, s.shopCode, s.shopName, 
                                isnull(supp.traderName, isnull(supp2.traderName, case when suppName.traderName is null then null else '&#x2048;' + suppName.traderName end)) as supplierName,        
                                grp.documentNumber as groupDocumentNumber, recoDoc.recoSessionId, reco.recoStatusId,
                                ( select count(q.queryId) from cp_query q where q.invCreId = d.invCreId ) as queryCount,
                                ( select count(q.queryId) from cp_query q where q.invCreId = d.invCreId and statusId < 8 ) as queryCountOpen
                      from    ${this.type} d
                      inner join        cx_shop s ON s.shopId = d.${this.FieldNames.SHOPID}
                      left outer join	cx_traderAccount supp           ON supp.traderAccountId = d.traderAccountId
                      left outer join   cx_traderAccount supp2          ON supp2.shopId = d.shopId AND supp2.traderCode = d.supplierCode AND supp2.traderType = 'S' 
                      left outer join   cx_traderNameLookUp suppName    ON suppName.shopId = d.shopId AND suppName.traderCode = d.supplierCode AND suppName.traderType = 'S' 

                      left outer join   cp_invoiceGroup  grp            ON grp.invGrpId = d.invGrpId 
                      left outer join   cp_recoSessionDocument recoDoc  ON recoDoc.documentId = d.invCreId and recoDoc.documentType = 'cp_invoiceCredit'
                      left outer join   cp_recoSession         reco     ON reco.recoSessionId = recoDoc.recoSessionId
                      where             d.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

        if (params.s) {
            query.sql += ' and d.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }
        if (params.gid) {
            query.sql += ' and d.invGrpId = @invGrpId';
            query.params.push({ name: 'invGrpId', value: params.gid });
        }
        if (params.impid) {
            query.sql += ' and d.docImpId = @docImpId';
            query.params.push({ name: 'docImpId', value: params.impid });
        }
        if (params.gno) {
            var noGrpInvoice = ['none', 'empty', 'no', 'blank', 'n', 'null'];
            if (noGrpInvoice.indexOf(params.gno.toLowerCase()) >= 0) {
                query.sql += ' and grp.documentNumber is null';
            } else {
                query.sql += ' and grp.documentNumber = @groupInvoiceNo';
                query.params.push({ name: 'groupInvoiceNo', value: params.gno });
            }
        }
        if (params.tr) {
            query.sql += ' and d.transmissionId like @transmissionId';
            query.params.push({ name: 'transmissionId', value: ('%' + params.tr + '%') });
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
            query.sql += ' and d.uploadDate >= @uFrom';
            query.params.push({ name: 'uFrom', value: params.udf + ' 00:00:00' });
        }
        if (params.udt) {
            query.sql += ' and d.uploadDate <= @uTo';
            query.params.push({ name: 'uTo', value: params.udt + ' 23:59:59' });
        }

        if (isBatchProcessing) {
            var validStatuses = [];
            if (params.action == _declarations.CP_DOCUMENT.BATCH_ACTIONS.REFRESH) {
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.New);
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.Ready);
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.PostingReady);
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.PendingReview);
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.NEED_ATTENTION);
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.ERROR);
                query.sql += ' and isnull(d.isUserEdited, 0) = 0';
                // IMPORTANT: grouped invoices cannot be refreshed individually
                query.sql += ' and d.invGrpId is null';
            } else if (params.action == _declarations.CP_DOCUMENT.BATCH_ACTIONS.POST) {
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.PostingReady);
                // IMPORTANT: grouped invoices cannot be posted individually
                query.sql += ' and d.invGrpId is null';
            } else if (params.action == _declarations.CP_DOCUMENT.BATCH_ACTIONS.UNPOST) {
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.Posted);
                // IMPORTANT: grouped invoices cannot be posted individually
                query.sql += ' and d.invGrpId is null';
            } else if (params.action == _declarations.CP_DOCUMENT.BATCH_ACTIONS.RESET) {
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.PostingError);
                // IMPORTANT: grouped invoices cannot be posted individually
                query.sql += ' and d.invGrpId is null';
            }

            if (validStatuses.length > 0) {
                query.sql += ' and d.documentStatus in (' + validStatuses.join(',') + ')';
            }
        }

        if (params.st) {
            query.sql += ' and d.documentStatus = @documentStatus';
            query.params.push({ name: 'documentStatus', value: params.st });
        }
        if (params.sta) {
            query.sql += ' and d.documentStatus in (' + params.sta + ')';
        }

        if (params.su) {
            query.sql += ' and (d.supplierCode like @supplierCode or supp.traderName like @supplierCode)';
            query.params.push({ name: 'supplierCode', value: '%' + params.su + '%' });
        }
        if (params.tno) {
            query.sql += ' and d.documentNumber like @documentNumber';
            query.params.push({ name: 'documentNumber', value: '%' + params.tno });
        }
        if (params.tref) {
            query.sql += ' and d.documentReference like @documentReference';
            query.params.push({ name: 'documentReference', value: '%' + params.tref });
        }
        if (params.tref2) {
            query.sql += ' and d.documentSecondReference like @documentSecondReference';
            query.params.push({ name: 'documentSecondReference', value: '%' + params.tref2 });
        }
        if (params.tt) {
            query.sql += ' and d.documentType = @documentType';
            query.params.push({ name: 'documentType', value: params.tt });
        }
        if (params.id) {
            query.sql += ' and d.invCreId = @invCreId';
            query.params.push({ name: 'invCreId', value: params.id });
        }
        if (params.ued) {
            query.sql += ' and isnull(d.isUserEdited, 0) = @isUserEdited';
            query.params.push({ name: 'isUserEdited', value: (params.ued == 'true') });
        }
        if (params.from) {
            query.sql += ' and d.createdFrom = @createdFrom';
            query.params.push({ name: 'createdFrom', value: params.from });
        }

        if (params.mstatus) {
            query.sql += ' and reco.recoStatusId = @recoStatusId';
            query.params.push({ name: 'recoStatusId', value: params.mstatus });
        }

        query.sql += ' order by d.documentDate desc';

        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }

        return await super.select(query);
    }

    async fetch(id, returnNull) {
        //return super.fetch(id, returnNull);##
        if (this.cx.cxSvc == true) { return await super.fetch(id); }

        var query = { sql: '', params: [{ name: 'invCreId', value: id }] };
        query.sql = ` select  d.*, s.shopCode, s.shopName, 
                                erp.postingURN, erp.postingReference, erp.status as postingStatus, erp.statusMessage as postingStatusMessage, 
                                erp.transactionReference, erp.transactionSecondReference, erp.accountReference, erp.accountName,
                                erp.modified as postedOn, erp.modifiedBy as postedBy,
                                recoDoc.recoSessionId, reco.recoStatusId,
                                ( select count(q.queryId) from cp_query q where q.invCreId = d.invCreId ) as queryCount,
                                ( select count(q.queryId) from cp_query q where q.invCreId = d.invCreId and statusId < 8 ) as queryCountOpen

                      from    ${this.type} d
                      inner join   cx_shop s ON s.shopId = d.shopId
                      left outer join cp_erp_transaction erp ON erp.invCreId = d.invCreId
                      left outer join   cp_recoSessionDocument recoDoc  ON recoDoc.documentId = d.invCreId and recoDoc.documentType = 'cp_invoiceCredit'
                      left outer join   cp_recoSession         reco     ON reco.recoSessionId = recoDoc.recoSessionId
                      where     d.${this.FieldNames.SHOPID}  in ${this.cx.shopList}
                      and     d.${this.FieldNames.INVCREID} = @invCreId`;
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist, was deleted or you do not have permission!`); }

        return super.populate(rawRecord);
    }


}
//
// ----------------------------------------------------------------------------------------
//
class cp_invoiceCredit extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #supplierName = null;
    #documentSign = 1;
    #postingStatus = '';
    #postingStatusMessage = '';
    #postingURN = '';
    #postingReference = '';
    #transactionReference = '';
    #transactionSecondReference = '';
    #accountReference = '';
    #accountName = '';
    #postedOn = '';
    #postedBy = '';
    #groupDocumentNumber = '';
    #recoSessionId = null;
    #recoStatus = null;
    #logs = null;
    #queryCount = null;
    #queryCountOpen = null;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#supplierName = defaults['supplierName'];
        this.#postingStatus = defaults['postingStatus'] || '';
        this.#postingStatusMessage = defaults['postingStatusMessage'] || '';
        this.#postingURN = defaults['postingURN'] || '';
        this.#postingReference = defaults['postingReference'] || '';
        this.#transactionReference = defaults['transactionReference'] || '';
        this.#transactionSecondReference = defaults['transactionSecondReference'] || '';
        this.#accountReference = defaults['accountReference'] || '';
        this.#accountName = defaults['accountName'] || '';
        this.#postedOn = defaults['postedOn'] || '';
        this.#postedBy = defaults['postedBy'] || '';
        this.#groupDocumentNumber = defaults['groupDocumentNumber'] || '';
        this.#recoSessionId = defaults['recoSessionId'] || null;
        this.#recoStatus = defaults['recoStatusId'] || 0;
        this.#queryCount = defaults['queryCount'] || null;
        this.#queryCountOpen = defaults['queryCountOpen'] || null;
        if (defaults[this.FieldNames.DOCUMENTTYPE] == _declarations.CP_DOCUMENT.TYPE.CreditNote) { this.#documentSign = -1; }

    };

    get supplierName() { return this.#supplierName; }
    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }
    get transmissionIdText() { return this.transmissionId.toString(); }
    //get dateStr() { return _core.date.format({ date: this.date }) }

    get postingStatus() { return this.#postingStatus; }
    get postingStatusMessage() { return this.#postingStatusMessage; }
    get postingURN() { return this.#postingURN; }
    get postingReference() { return this.#postingReference; }
    get transactionReference() { return this.#transactionReference; }
    get transactionSecondReference() { return this.#transactionSecondReference; }
    get transactionErpInfo() {
        if (this.transactionSecondReference) { return this.transactionReference + ' / ' + this.transactionSecondReference; }
        return this.transactionReference;
    }
    get accountReference() { return this.#accountReference; }
    get accountName() { return this.#accountName; }
    get accountErpInfo() {
        return `[${this.accountReference}] ${this.accountName}`;
    }
    get postedOn() { return this.#postedOn; }
    get postedBy() { return this.#postedBy; }


    get status() {
        return _declarations.CP_DOCUMENT.STATUS.getName(this.documentStatus);
    }
    get documentTypeName() {
        return _declarations.CP_DOCUMENT.TYPE.getName(this.documentType);
    }

    get totalNetSign() { return this.totalNet * this.#documentSign; }
    get totalVatSign() { return this.totalVat * this.#documentSign; }
    get totalGrossSign() { return this.totalGross * this.#documentSign; }
    get totalDiscountSign() { return this.totalDiscount * this.#documentSign; }
    get totalDRSSign() {
        if (!this.totalDRS) { return ''; }
        return this.totalDRS * this.#documentSign;
    }

    get groupDocumentNumber() { return this.#groupDocumentNumber; }

    get editedIcon() {
        if (this.createdFrom) { return '&#x2699;'; }
        if (this.isUserEdited) { return '&#x270E;'; }
        return '';
    }

    get recoSessionId() { return this.#recoSessionId; }
    get recoStatus() { return this.#recoStatus || 0; }
    get recoStatusName() { return _declarations.CP_DOCUMENT.RECO_STATUS.getName(this.recoStatus); }

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

    get logs() {
        return this.#logs;
    } set logs(logs) {
        this.#logs = logs;
    }

    async save() {
        this.totalGross = (this.totalNet + this.totalVat + this.totalDRS);
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
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
            this.#logs = this.cx.table(_schema.cp_invoiceCreditLog);
        }
        var log = await this.#logs.log(this.invCreId, type, message, info);
        this.#logs.records.push(log);
        return log;
    }

    async generate() {
        throw new Error('Generating delivery/return from invoice/credit is not yet supported');
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_invoiceCredit_Collection,
    Record: cp_invoiceCredit,
}


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
        query.sql = ` select  d.*, s.shopCode, s.shopName, isnull(supp.traderName, supp2.traderName) as supplierName, grp.documentNumber as groupDocumentNumber, recoDoc.recoSessionId
                      from    ${this.type} d
                      inner join        cx_shop s ON s.shopId = d.${this.FieldNames.SHOPID}
                      left outer join	cx_traderAccount supp           ON supp.traderAccountId = d.traderAccountId
                      left outer join   cx_traderAccount supp2          ON supp2.shopId = d.shopId AND supp2.traderCode = d.supplierCode AND supp2.traderType = 'S' 
                      left outer join   cp_invoiceGroup  grp            ON grp.invGrpId = d.invGrpId 
                      left outer join   cp_recoSessionDocument recoDoc  ON recoDoc.documentId = d.invCreId and recoDoc.documentType = 'cp_invoiceCredit'
                      where             d.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

        if (params.s) {
            query.sql += ' and d.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }
        if (params.gid) {
            query.sql += ' and d.invGrpId = @invGrpId';
            query.params.push({ name: 'invGrpId', value: params.gid });
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
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.NEED_ATTENTION);
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.ERROR);
                query.sql += ' and isnull(d.isUserEdited, 0) = 0';
            } else if (params.action == _declarations.CP_DOCUMENT.BATCH_ACTIONS.POST) {
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.PostingReady);
            } else if (params.action == _declarations.CP_DOCUMENT.BATCH_ACTIONS.UNPOST) {
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.Posted);
            } else if (params.action == _declarations.CP_DOCUMENT.BATCH_ACTIONS.RESET) {
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.PostingError);
            }
            if (validStatuses.length > 0) {
                query.sql += ' and d.documentStatus in (' + validStatuses.join(',') + ')';
            }
        }

        if (params.st) {
            query.sql += ' and d.documentStatus = @documentStatus';
            query.params.push({ name: 'documentStatus', value: params.st });
        }

        if (params.su) {
            query.sql += ' and d.supplierCode like @supplierCode';
            query.params.push({ name: 'supplierCode', value: '%' + params.su });
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
        query.sql = ` select  l.*, s.shopCode, s.shopName, 
                                erp.postingURN, erp.postingReference, erp.status as postingStatus, erp.statusMessage as postingStatusMessage, 
                                erp.transactionReference, erp.transactionSecondReference, erp.accountReference, erp.accountName,
                                erp.modified as postedOn, erp.modifiedBy as postedBy,
                                recoDoc.recoSessionId

                      from    ${this.type} l
                      inner join   cx_shop s ON s.shopId = l.shopId
                      left outer join cp_erp_transaction erp ON erp.invCreId = l.invCreId
                      left outer join   cp_recoSessionDocument recoDoc  ON recoDoc.documentId = l.invCreId and recoDoc.documentType = 'cp_invoiceCredit'
                      
                      where     l.${this.FieldNames.SHOPID}  in ${this.cx.shopList}
                      and     l.${this.FieldNames.INVCREID} = @invCreId`;
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
    #logs = null;
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

    get groupDocumentNumber() { return this.#groupDocumentNumber; }

    get editedIcon() {
        if (this.createdFrom) { return '&#x2699;'; }

        if (this.isUserEdited) { return '&#x270E;'; }

        return '';
    }

    get recoStatusName() {
        return _declarations.CP_DOCUMENT.RECO_STATUS.getName(this.recoStatus);
    }

    get recoStatus() {
        return super.recoStatus || 0;
    } set recoStatus(val) {
        super.recoStatus = val || 0;
    }

    get recoSessionId() { return this.#recoSessionId; }

    get logs() {
        return this.#logs;
    } set logs(logs) {
        this.#logs = logs;
    }

    async save() {
        this.totalGross = this.totalNet + this.totalVat;
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


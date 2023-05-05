'use strict'
//
const _persistentTable = require('./persistent/p-cp_invoiceCredit');
const _declarations = require('../cx-client-declarations');
//
class cp_invoiceCredit_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_invoiceCredit(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var isBatchProcessing = (params.batch == 'T' || params.batch == 'true');
        

        var query = { sql: '', params: [] };
        query.sql = ` select  d.*, s.shopCode, s.shopName
                      from    ${this.type} d, cx_shop s
                      where   d.${this.FieldNames.SHOPID} = s.shopId
                      and     d.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

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
                validStatuses.push(_declarations.CP_DOCUMENT.STATUS.ERROR);
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
        if (params.tt) {
            query.sql += ' and d.documentType = @documentType';
            query.params.push({ name: 'documentType', value: params.tt });
        }
        if (params.id) {
            query.sql += ' and d.invCreId = @invCreId';
            query.params.push({ name: 'invCreId', value: params.id });
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
                                erp.modified as postedOn, erp.modifiedBy as postedBy

                      from    ${this.type} l
                      inner join   cx_shop s ON s.shopId = l.shopId
                      left outer join cp_erp_transaction erp ON erp.invCreId = l.invCreId
                      
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
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
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
        if (defaults[this.FieldNames.DOCUMENTTYPE] == _declarations.CP_DOCUMENT.TYPE.CreditNote) {
            this.#documentSign = -1;
        }
    };

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
        return this.transactionReference + ' / ' + this.transactionSecondReference;
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


    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_invoiceCredit_Collection,
    Record: cp_invoiceCredit,
}


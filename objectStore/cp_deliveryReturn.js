'use strict'
//
const _persistentTable = require('./persistent/p-cp_deliveryReturn');
const _core = require('cx-core');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
const _cx_render = require('../cx-client-render');

//
class cp_deliveryReturn_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_deliveryReturn(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        if (params.sql) {
            return await super.select(params);
        }

        var invoiceJoin = '';
        var isGenerateInvoice = (params.generate == 'T' || params.generate == 'true' || params.grp == 'T');
        if (isGenerateInvoice) { invoiceJoin = 'left join cp_invoiceCredit inv on inv.createdFrom = d.delRetId'; }

        var accrualJoin = ''; var accrualTotals = '';
        if (params.accrId) {
            accrualJoin = `
                join cp_accrualDocument accrDoc on accrDoc.delRetId = d.delRetId and accrDoc.accrId = ${params.accrId}
                join (
                    select  accrDocId, sum(lineNet) as accrTotNet, sum(lineVat) as accrTotVat, sum(lineGross) as accrTotGross, sum(lineDRS) as accrTotDRS
                    from	cp_accrualDocumentLine 
                    group by accrDocId
                ) accrDocTotals on accrDocTotals.accrDocId = accrDoc.accrDocId
            `;
            accrualTotals =', accrDocTotals.accrTotNet, accrDocTotals.accrTotVat, accrDocTotals.accrTotGross, accrDocTotals.accrTotDRS'
        }

        var query = { sql: '', params: [] };
        query.sql = ` select            distinct d.*, s.shopCode, s.shopName, 
                                        isnull(supp.traderName, (
                                                select  top 1 '&#x2048;' + tx.traderName 
                                                from    cx_traderAccount tx 
                                                where   tx.shopId = d.shopId and tx.traderType = 'S' 
                                                and     (tx.traderCode = d.supplierCode or tx.wholesalerCode = d.supplierCode) 
                                                order by traderAccountId desc
                                            )
                                        ) as supplierName,
                                        recoDoc.recoSessionId, reco.recoStatusId,
                                        ( select count(q.queryId) from cp_query q where q.delRetId = d.delRetId ) as queryCount,
                                        ( select count(q.queryId) from cp_query q where q.delRetId = d.delRetId and statusId < 8 ) as queryCountOpen,
                                        ( select count(a.attachmentId) from cx_attachment a where a.recordType = 'cp_deliveryReturn' and a.recordId = d.delRetId ) as attachCount,
                                        ( select top 1 a.externalFlags from cx_attachment a where a.recordType = 'cp_deliveryReturn' and a.recordId = d.delRetId order by a.created desc ) as attachFlag,
                                        ( select top 1 a.externalLink from cx_attachment a where a.recordType = 'cp_deliveryReturn' and a.recordId = d.delRetId order by a.created desc ) as attachLink,
                                        ( select count(*) from cp_invoiceCredit a where a.createdFrom = d.delRetId ) as invoiceCount
                                        ${accrualTotals}
                      from              ${this.type} d
                      inner join        cx_shop s ON s.shopId = d.${this.FieldNames.SHOPID}
                      left outer join	cx_traderAccount supp ON supp.traderAccountId = d.traderAccountId
                      left outer join   cx_traderAccount supp2 ON supp2.shopId = d.shopId AND supp2.traderCode = d.supplierCode AND supp2.traderType = 'S' 
                      left outer join   cp_recoSessionDocument recoDoc  ON recoDoc.documentId = d.delRetId and recoDoc.documentType = 'cp_deliveryReturn'
                      left outer join   cp_recoSession         reco     ON reco.recoSessionId = recoDoc.recoSessionId
                      ${invoiceJoin}
                      ${accrualJoin}
                      where             d.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

        if (isGenerateInvoice) {
            query.sql += ' and d.documentStatus = @documentStatus';
            query.params.push({ name: 'documentStatus', value: _declarations.CP_DOCUMENT.STATUS.Ready });
        }

        if (params.s) {
            query.sql += ' and d.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }

        if (params.grp == 'T') {
            query.sql += ' and isnull(inv.documentStatus, -1) in (' + _declarations.CP_DOCUMENT.STATE_INV.Pending.join(',') + ',' + _declarations.CP_DOCUMENT.STATE_INV.PendingPost.join(',') + ')';
        }

        if (params.gid) {
            if (params.gid == 'none') {
                query.sql += ' and d.invGrpId is null';
            } else {
                query.sql += ' and d.invGrpId = @invGrpId';
                query.params.push({ name: 'invGrpId', value: params.gid });
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
        if (params.vf) {
            query.sql += ' and isnull(d.totalNet, 0) >= @vfrom';
            query.params.push({ name: 'vfrom', value: params.vf });
        }
        if (params.vt) {
            query.sql += ' and isnull(d.totalNet, 0) <= @vto';
            query.params.push({ name: 'vto', value: params.vt });
        }
        if (params.udf) {
            query.sql += ' and d.uploadDate >= @uFrom';
            query.params.push({ name: 'uFrom', value: params.udf + ' 00:00:00' });
        }
        if (params.udt) {
            query.sql += ' and d.uploadDate <= @uTo';
            query.params.push({ name: 'uTo', value: params.udt + ' 23:59:59' });
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
            query.params.push({ name: 'documentNumber', value: params.tno + '%' });
        }
        if (params.tref) {
            query.sql += ' and (d.documentReference like @documentReference or d.documentSecondReference like @documentReference)';
            query.params.push({ name: 'documentReference', value: params.tref + '%' });
        }

        if (params.tt) {
            query.sql += ' and d.documentType = @documentType';
            query.params.push({ name: 'documentType', value: params.tt });
        }
        if (params.id) {
            query.sql += ' and d.delRetId = @delRetId';
            query.params.push({ name: 'delRetId', value: params.id });
        }
        if (params.matched) {
            if (params.matched == 'T') {
                query.sql += ' and reco.recoSessionId >' + _declarations.CP_DOCUMENT.RECO_STATUS.NotReconciled;
            } else {
                query.sql += ' and  isnull(reco.recoSessionId,0) <=' + _declarations.CP_DOCUMENT.RECO_STATUS.NotReconciled;
            }
        }
        if (params.whs) {
            query.sql += ' and (isnull(supp.traderCode, supp2.traderCode) = @wholesalerCode OR isnull(supp.wholesalerCode, supp2.wholesalerCode) = @wholesalerCode)'
            query.params.push({ name: 'wholesalerCode', value: params.whs });
        }
        if (params.whsn) {
            query.sql += ' and isnull(supp.traderName, supp2.traderName) like @supplierName'
            query.params.push({ name: 'supplierName', value: '%' + params.whsn + '%' });
        }

        if (params.mstatus) {
            // @@NOTE: Not analysed and not matched are kind of the same thing for deliveries
            if (params.mstatus == '0' || params.mstatus == '1') {
                query.sql += ' and reco.recoStatusId is null';
            } else {
                query.sql += ' and reco.recoStatusId = @recoStatusId';
                query.params.push({ name: 'recoStatusId', value: params.mstatus });
            }
        }

        if (params.inv === 'true') {
            query.sql += ' and (select count(*) from cp_invoiceCredit a where a.createdFrom = d.delRetId) > 0 '
        } else if (params.inv === 'false') {
            query.sql += ' and (select count(*) from cp_invoiceCredit a where a.createdFrom = d.delRetId) = 0 '
        }

        if (params.attach == 'true') {
            query.sql += " and ( select count(a.attachmentId) from cx_attachment a where a.recordType = 'cp_deliveryReturn' and a.recordId = d.delRetId ) > 0";
        } else if (params.attach == 'false') {
            query.sql += " and ( select count(a.attachmentId) from cx_attachment a where a.recordType = 'cp_deliveryReturn' and a.recordId = d.delRetId ) = 0";
        }

        if (isGenerateInvoice) {
            query.sql += " and inv.invCreId is null"
        }

        query.sql += ' order by d.documentDate desc';

        if (!params.noPaging) {
            if (params.paging) {
                query.paging = params.paging;
            } else {
                query.paging = {
                    page: params.page || 1,
                    pageSize: _declarations.SQL.PAGE_SIZE
                }
            }
        }

        return await super.select(query);
    }

    async fetch(id, returnNull) {
        //return super.fetch(id, returnNull);##
        if (this.cx.cxSvc == true) { return await super.fetch(id); }

        var query = { sql: '', params: [{ name: 'delRetId', value: id }] };
        query.sql = ` select            distinct d.*, s.shopCode, s.shopName, isnull(supp.traderName, supp2.traderName) as supplierName, recoDoc.recoSessionId, reco.recoStatusId
                      from              ${this.type} d
                      inner join        cx_shop s ON s.shopId = d.${this.FieldNames.SHOPID}
                      left outer join	cx_traderAccount supp ON supp.traderAccountId = d.traderAccountId
                      left outer join   cx_traderAccount supp2 ON supp2.shopId = d.shopId AND supp2.traderCode = d.supplierCode AND supp2.traderType = 'S' 
                      left outer join   cp_recoSessionDocument recoDoc  ON recoDoc.documentId = d.delRetId and recoDoc.documentType = 'cp_deliveryReturn'
                      left outer join   cp_recoSession         reco     ON reco.recoSessionId = recoDoc.recoSessionId
                      where             d.${this.FieldNames.SHOPID} in ${this.cx.shopList}
                      and               d.${this.FieldNames.DELRETID} = @delRetId`;
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
class cp_deliveryReturn extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #documentSign = 1;
    #supplierName = null;
    #recoSessionId = null;
    #recoStatus = null;
    #queryCount = null;
    #queryCountOpen = null;
    #attachCount = null;
    #attachFlag = '';
    #attachLink = null;
    #invoiceCount = 0;
    #accrTotNet = null;
    #accrTotVat = null;
    #accrTotGross = null;
    #accrTotDRS = null;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#supplierName = defaults['supplierName'];
        this.#recoSessionId = defaults['recoSessionId'] || null;
        this.#recoStatus = defaults['recoStatusId'] || 0;
        this.#queryCount = defaults['queryCount'] || null;
        this.#queryCountOpen = defaults['queryCountOpen'] || null;
        this.#attachCount = defaults['attachCount'] || null;
        this.#attachFlag = defaults['attachFlag'] || null;
        this.#attachLink = defaults['attachLink'] || null;
        this.#invoiceCount = defaults['invoiceCount'] || 0;
        this.#accrTotNet = defaults['accrTotNet'] || null;
        this.#accrTotVat = defaults['accrTotVat'] || null;
        this.#accrTotGross = defaults['accrTotGross'] || null;
        this.#accrTotDRS = defaults['accrTotDRS'] || null;
        if (defaults[this.FieldNames.DOCUMENTTYPE] == _declarations.CP_DOCUMENT.TYPE.Return) {
            this.#documentSign = -1;
        }
    };

    get supplierName() { return this.#supplierName; }
    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }
    get transmissionIdText() { return this.transmissionId.toString(); }
    //get dateStr() { return _core.date.format({ date: this.date }) }

    get status() {
        return _declarations.CP_DOCUMENT.STATUS.getName(this.documentStatus);
    }
    get documentTypeName() {
        return _declarations.CP_DOCUMENT.TYPE.getName(this.documentType);
    }

    get editedIcon() {
        if (this.#accrTotNet !== null) {
            if (this.#accrTotNet != this.totalNet) {
                return '&#x270E;';
            }
        }
        if (this.#invoiceCount > 0) { return '&#x2699;'; }
        if (this.isUserEdited) { return '&#x270E;'; }
        return '';
    }

    get totalNetSign() {
        if (this.#accrTotNet !== null) { return this.accrTotNet; }
        return this.totalNet * this.#documentSign;
    }
    get totalVatSign() {
        // @@NOTE: accruals have no VAT but we still store it in the table
        if (this.#accrTotNet !== null) { return 0; }
        return this.totalVat * this.#documentSign;
    }
    get totalGrossSign() {
        if (this.#accrTotGross !== null) { return this.#accrTotGross; }
        return this.totalGross * this.#documentSign;
    }
    get totalDRSSign() {
        if (this.#accrTotDRS !== null) { return this.#accrTotDRS; }
        if (!this.totalDRS) { return ''; }
        return this.totalDRS * this.#documentSign;
    }
    get totalDiscountSign() { return this.totalDiscount * this.#documentSign; }


    get accrTotNet() { return this.#accrTotNet * this.#documentSign; }
    get accrTotVat() { return this.#accrTotVat * this.#documentSign; }
    get accrTotGross() { return this.#accrTotGross * this.#documentSign; }
    get accrTotDRS() { return this.#accrTotDRS * this.#documentSign; }


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

    get attachCount() {
        //if (this.#attachFlag) { return this.#attachFlag; }
        return this.#attachCount;
    }
    get attachCountDisplay() {
        if (this.attachCount) { return `${this.attachCount} attachments`; }
        return '';
    }
    get attachFlag() {
        //if (this.#attachFlag) { return this.#attachFlag; }
        return this.#attachFlag;
    }

    get attachIcon() {
        var attachIcon = '';
        if (this.#attachFlag && (this.#attachFlag[0] == '&' || this.#attachFlag[0] == '<')) {
            attachIcon = this.#attachFlag;
        } else if (this.attachCount) {
            attachIcon = `<img src="/public/images/attach_${this.cx.theme}.png" style="width: 20px" />`;
        }
        if (attachIcon) {
            return `<a class="jx-list-view-link" href="${this.#attachLink}" target="_blank">${attachIcon}</a>`;
        }
        return '';
    }

    get invoiceCount() {
        return this.#invoiceCount;
    }
    get invoiceCountIcon() {
        if (this.#invoiceCount > 0) { return '&#x2699;'; }
        return '';
    }


    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }

    async log(message, info) {
        // @@TODO:
    }

    async generate() {
        var doc = this.cx.table(_schema.cp_invoiceCredit).createNew();
        doc.populate(this.toObject());
        doc.transmissionID = -1;
        doc.documentType = (this.documentType == _declarations.CP_DOCUMENT.TYPE.Delivery) ? _declarations.CP_DOCUMENT.TYPE.Invoice : _declarations.CP_DOCUMENT.TYPE.CreditNote;
        doc.documentStatus = _declarations.CP_DOCUMENT.STATUS.Generating;
        doc.documentStatusMessage = `document is being generated from ${this.documentTypeName} ${this.documentNumber}...`;
        doc.createdFrom = this.delRetId;
        doc.createdFromType = this.documentType;
        doc.createdBy = null;
        doc.created = null;
        doc.modifiedBy = null;
        doc.modified = null;
        await doc.save();
        doc.log('document generated from delivery: ' + this.documentId);
        return doc;
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_deliveryReturn_Collection,
    Record: cp_deliveryReturn,
}


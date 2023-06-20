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

        var query = { sql: '', params: [] };
        query.sql = ` select            d.*, s.shopCode, s.shopName, isnull(supp.traderName, supp2.traderName) as supplierName
                      from              ${this.type} d
                      inner join        cx_shop s ON s.shopId = d.${this.FieldNames.SHOPID}
                      left outer join	cx_traderAccount supp ON supp.traderAccountId = d.traderAccountId
                      left outer join   cx_traderAccount supp2 ON supp2.shopId = d.shopId AND supp2.traderCode = d.supplierCode AND supp2.traderType = 'S' 
                      where             d.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

        if (params.s) {
            query.sql += ' and d.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
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
            query.sql += ' and d.delRetId = @delRetId';
            query.params.push({ name: 'delRetId', value: params.id });
        }
        query.sql += ' order by d.documentDate desc';

        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }

        return await super.select(query);
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
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#supplierName = defaults['supplierName'];
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


    get totalNetSign() { return this.totalNet * this.#documentSign; }
    get totalVatSign() { return this.totalVat * this.#documentSign; }
    get totalGrossSign() { return this.totalGross * this.#documentSign; }
    get totalDiscountSign() { return this.totalDiscount * this.#documentSign; }


    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
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


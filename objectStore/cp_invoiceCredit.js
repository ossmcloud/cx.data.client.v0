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
}
//
// ----------------------------------------------------------------------------------------
//
class cp_invoiceCredit extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #documentSign = 1;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        if (defaults[this.FieldNames.DOCUMENTTYPE] == _declarations.CP_DOCUMENT.TYPE.CreditNote) {
            this.#documentSign = -1;
        }
    };

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


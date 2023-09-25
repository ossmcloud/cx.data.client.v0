'use strict'
//
const _persistentTable = require('./persistent/p-cp_query');
//
class cp_query_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_query(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select	    q.*, 
                            qt.code as queryType, qt.name as queryTypeName,
                            s.shopCode, s.shopName,
                            w.code as wholesalerCode, w.name as wholesalerName,
                            doc.documentNumber, doc.documentDate,
                            grp.documentNumber as groupInvoice, grp.documentDate as groupInvoiceDate
                from	    cp_query                    q
                inner join  cx_shop                     s ON s.shopId = q.shopId
                inner join  cp_queryType                qt ON qt.queryTypeId = q.queryTypeId
                inner join  cp_wholesaler               w ON w.wholesalerId = q.wholesalerId
                inner join  cp_invoiceCredit           doc ON doc.invCreId = q.invCreId
                left outer  join cp_invoiceGroup       grp ON grp.invGrpId = q.invGrpId
                `
        };
        this.queryFromParams(query, params, 'q');
        query.sql += ' order by doc.documentDate desc';

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_query extends _persistentTable.Record {
    #queryCode = '';
    #queryName = '';
    #shopCode = '';
    #shopName = '';
    #wholesalerCode = '';
    #wholesalerName = '';
    #documentNumber = '';
    #documentDate = null;
    #groupInvoice = '';
    #groupInvoiceDate = null;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#wholesalerCode = defaults['wholesalerCode'] || '';
        this.#wholesalerName = defaults['wholesalerName'] || '';

        this.#queryCode = defaults['queryCode'] || '';
        this.#queryName = defaults['queryName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#shopName = defaults['shopName'] || '';

        this.#documentNumber = defaults['documentNumber'] || '';
        this.#documentDate = defaults['documentDate'] || null;

        this.#groupInvoice = defaults['groupInvoice'] || '';
        this.#groupInvoiceDate = defaults['groupInvoiceDate'] || null;
    };

    get wholesalerCode() { return this.#wholesalerCode; }
    get wholesalerName() { return this.#wholesalerName; }
    get wholesalerInfo() { return `[${this.#wholesalerCode}] ${this.#wholesalerName}`; }

    get queryCode() { return this.#queryCode; }
    get queryName() { return this.#queryName; }
    get queryInfo() { return `[${this.#queryCode}] ${this.#queryName}`; }

    get shopCode() { return this.#shopCode; }
    get shopName() { return this.#shopName; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get documentNumber() { return this.#documentNumber; }
    get documentDate() { return this.#documentDate; }

    get groupInvoice() { return this.#groupInvoice; }
    get groupInvoiceDate() { return this.#groupInvoiceDate; }


    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_query_Collection,
    Record: cp_query,
}


'use strict'
//
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cr_transaction');
//
class cr_transaction_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_transaction(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select  ${(params.cb) ? 'top 2000' : 'top 1000'} t.*, s.shopCode, s.shopName
                      from    ${this.type} t
                      inner join cx_shop s ON s.shopId = t.shopId
                      left outer join cr_tran_type_config tranType ON tranType.tranTypeConfigId = t.tranTypeConfigId
                      where   t.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

        if (params.s) {
            query.sql += ' and t.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }
        if (params.cb) {
            query.sql += ' and t.cbTranId = @cbTranId';
            query.params.push({ name: 'cbTranId', value: params.cb });
        }
        if (params.cb_h) {
            query.sql += ' and tranType.cbHeading = @cbHeading';
            query.params.push({ name: 'cbHeading', value: params.cb_h });
        }

        if (params.tt) {
            query.sql += ' and tranType.cbTranTypeId = @cbTranTypeId';
            query.params.push({ name: 'cbTranTypeId', value: params.tt });
        }
        if (params.df) {
            query.sql += ' and t.transactionDate >= @from';
            query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
        }
        if (params.dt) {
            query.sql += ' and t.transactionDate <= @to';
            query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
        }
        if (params.e_tn) {
            query.sql += ` and t.${this.FieldNames.EPOSTRANSACTIONNO} like @${this.FieldNames.EPOSTRANSACTIONNO}`;
            query.params.push({ name: this.FieldNames.EPOSTRANSACTIONNO, value: params.e_tn + '%' });
        }
        if (params.e_tt) {
            query.sql += ` and t.${this.FieldNames.TRANSACTIONTYPE} like @${this.FieldNames.TRANSACTIONTYPE}`;
            query.params.push({ name: this.FieldNames.TRANSACTIONTYPE, value: params.e_tt + '%'});
        }
        if (params.e_ts) {
            query.sql += ` and t.${this.FieldNames.TRANSACTIONSUBTYPE} like @${this.FieldNames.TRANSACTIONSUBTYPE}`;
            query.params.push({ name: this.FieldNames.TRANSACTIONSUBTYPE, value: params.e_ts + '%' });
        }

        query.sql += ' order by ' + this.FieldNames.TRANSACTIONDATETIME;
        return await super.select(query);
    }


    async fetch(id) {
        if (this.cx.cxSvc == true) { return await super.fetch(id); }

        var query = { sql: '', params: [{ name: this.FieldNames.TRANID, value: id }] };
        query.sql = ` select  t.*, s.shopCode, s.shopName
                      from    ${this.type} t, cx_shop s
                      where   t.${this.FieldNames.SHOPID} = s.shopId
                      and     t.${this.FieldNames.TRANID} = @tranId`;
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist or was deleted!`); }

        return super.populate(rawRecord);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cr_transaction extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cr_transaction_Collection,
    Record: cr_transaction,
}


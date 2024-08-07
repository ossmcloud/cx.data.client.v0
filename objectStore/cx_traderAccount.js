'use strict'
//
const _persistentTable = require('./persistent/p-cx_traderAccount');
const _declarations = require('../cx-client-declarations');
//
class cx_traderAccount_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_traderAccount(this, defaults);
    }

    async select(params) {
        if (!params) { params = {}; }
        var query = { sql: '', params: [] };

        var shopFilter = 'in';
        var shopFilterValue = this.cx.shopList;
        if (params.s) {
            shopFilter = '=';
            shopFilterValue = '@shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }

        query.sql = `select	t.*, s.shopCode, s.shopName, erp.traderCode as erpTraderCode, erp.traderName as erpTraderName
                    from	cx_traderAccount t
                    inner join cx_shop s on s.shopId = t.shopId
                    left outer join erp_traderAccount erp on erp.traderAccountId = t.erpTraderAccountId
                    where	s.shopId ${shopFilter} ${shopFilterValue}`;

        if (params.tt) {
            query.sql += ' and t.traderType = @traderType';
            query.params.push({ name: 'traderType', value: params.tt });
        }

        if (params.tc) {
            query.sql += ' and t.traderCode like @traderCode';
            query.params.push({ name: 'traderCode', value: params.tc + '%' });
        }
        if (params.tn) {
            query.sql += ' and t.traderName like @traderName';
            query.params.push({ name: 'traderName', value: params.tn + '%' });
        }
        if (params.erp) {
            query.sql += ' and t.erpTraderAccountId like @erpTraderAccountId';
            query.params.push({ name: 'erpTraderAccountId', value: params.erp });
        }
        if (params.whs) {
            query.sql += ' and t.wholesalerCode like @wholesalerCode';
            query.params.push({ name: 'wholesalerCode', value: params.whs + '%' });
        }

        if (params.a1) {
            query.sql += ' and t.analysis1 like @analysis1';
            query.params.push({ name: 'analysis1', value: params.a1 + '%' });
        }
        if (params.a2) {
            query.sql += ' and t.analysis2 like @analysis2';
            query.params.push({ name: 'analysis2', value: params.a2 + '%' });
        }
        if (params.a3) {
            query.sql += ' and t.analysis3 like @analysis3';
            query.params.push({ name: 'analysis3', value: params.a3 + '%' });
        }

        query.sql += ' order by s.shopCode, t.traderCode';

        if (!params.noPaging) {
            query.paging = {
                page: params.page || 1,
                pageSize: _declarations.SQL.PAGE_SIZE
            }
        }

        await super.select(query);
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: 'traderAccountId', value: id }] };

        var shopFilter = 'in';
        var shopFilterValue = this.cx.shopList;
        query.sql = `select	t.*, s.shopCode, s.shopName, erp.traderCode as erpTraderCode, erp.traderName as erpTraderName
                    from	cx_traderAccount t
                    inner join cx_shop s on s.shopId = t.shopId
                    left outer join erp_traderAccount erp on erp.traderAccountId = t.erpTraderAccountId
                    where	s.shopId ${shopFilter} ${shopFilterValue}
                    and     t.traderAccountId = @traderAccountId`;

        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }

    async toLookUpList(params) {
        params.noPaging = true;
        await this.select(params);

        var _this = this;
        var lookUpValues = [];
        super.each(function (record) {
            lookUpValues.push({
                value: record.traderAccountId,
                text: '[' + record.traderCode + '] ' + record.traderName,
            })
        });

        return lookUpValues;
    }

}
//
// ----------------------------------------------------------------------------------------
//
class cx_traderAccount extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #erpTraderCode = '';
    #erpTraderName = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#erpTraderCode = defaults['erpTraderCode'] || '';
        this.#erpTraderName = defaults['erpTraderName'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get traderInfo() { return `[${this.traderCode}] ${this.traderName}`; }

    get erpTraderName() { return this.#erpTraderName; }
    get erpTraderCode() { return this.#erpTraderCode; }
    get erpTraderInfo() {
        if (!this.#erpTraderCode) { return ''; }
        return `[${this.#erpTraderCode}] ${this.#erpTraderName}`;
    }

    get isManualIcon() {
        if (this.isManual) { return '&#9997;'; }
        return '';
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
    Table: cx_traderAccount_Collection,
    Record: cx_traderAccount,
}


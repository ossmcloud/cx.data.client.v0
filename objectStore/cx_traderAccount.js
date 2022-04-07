'use strict'
//
const _persistentTable = require('./persistent/p-cx_traderAccount');
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

        query.sql = `select	top 1000 t.*, s.shopCode, s.shopName, erp.traderCode as erpTraderCode, erp.traderName as erpTraderName
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

        query.sql += ' order by s.shopCode, t.traderCode';

        // query.sql = `select  top 1000 p.*, s.shopCode, s.shopName
        //              from    epos_dtfs_ping p, cx_shop s
        //              where   p.shopId = s.shopId
        //              and     p.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

        // if (params.s) {
        //     query.sql += ' and p.shopId = @shopId';
        //     query.params.push({ name: 'shopId', value: params.s });
        // }
        // if (params.df) {
        //     query.sql += ' and p.created >= @dateFrom';
        //     query.params.push({ name: 'dateFrom', value: params.df });
        // }

        //query.sql += ' order by p.created desc, p.pingId desc';

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

    get erpTraderName() { return this.#erpTraderName; }
    get erpTraderCode() { return this.#erpTraderCode; }
    get erpTraderInfo() {
        if (!this.#erpTraderCode) { return ''; }
        return `[${this.#erpTraderCode}] ${this.#erpTraderName}`;
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


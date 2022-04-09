'use strict'
//
const _persistentTable = require('./persistent/p-erp_shop_setting');
//
class erp_shop_setting_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new erp_shop_setting(this, defaults);
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

        query.sql = `select	top 1000 t.*, s.shopCode, s.shopName
                    from	erp_shop_setting t
                    inner join cx_shop s on s.shopId = t.shopId
                    where	s.shopId ${shopFilter} ${shopFilterValue}`;

        // if (params.tt) {
        //     query.sql += ' and t.traderType = @traderType';
        //     query.params.push({ name: 'traderType', value: params.tt });
        // }

        query.sql += ' order by s.shopCode, t.erpCompanyName';
        await super.select(query);
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: 'shopId', value: id }] };

        var shopFilter = 'in';
        var shopFilterValue = this.cx.shopList;
        query.sql = `select	t.*, s.shopCode, s.shopName
                    from	erp_shop_setting t
                    inner join cx_shop s on s.shopId = t.shopId
                    where	s.shopId ${shopFilter} ${shopFilterValue}
                    and     t.shopId = @shopId`;

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
class erp_shop_setting extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    constructor(table, defaults) {
        super(table, defaults);
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
    Table: erp_shop_setting_Collection,
    Record: erp_shop_setting,
}


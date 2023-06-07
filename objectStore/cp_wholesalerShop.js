'use strict'
//
const _persistentTable = require('./persistent/p-cp_wholesalerShop');
//
class cp_wholesalerShop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_wholesalerShop(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select	    w.code as whsCode, w.name as whsName, s.shopCode, s.shopName, trader.traderCode, trader.traderName, ws.*
                from	    cp_wholesaler w
                inner join  cp_wholesalerShop ws ON ws.wholesalerId = w.wholesalerId
                inner join  cx_shop s ON s.shopId = ws.shopId
                left outer join erp_traderAccount trader ON trader.traderAccountId = ws.erpTraderAccountId
                where       1=1
            `,
            
        };

        this.queryFromParams(query, params, 'ws');
        
        query.sql += ' order by    w.code';

        return await super.select(query);
    }

    async fetchOrNew(id) {
        if (id) {
            var rec = await this.fetch(id, true);
            if (rec) { return rec; }
            return this.createNew();
        } else {
            return this.createNew();
        }
    }

    async fetch(id, returnNull) {
        var query = {
            sql: `
                select	    w.code as whsCode, w.name as whsName, s.shopCode, s.shopName, trader.traderCode, trader.traderName, ws.*
                from	    cp_wholesaler w
                inner join  cp_wholesalerShop ws ON ws.wholesalerId = w.wholesalerId
                inner join  cx_shop s ON s.shopId = ws.shopId
                left outer join erp_traderAccount trader ON trader.traderAccountId = ws.erpTraderAccountId
                where       ws.wholesalerId = @wholesalerId
                and         ws.shopId = @shopId
            `,
            params: [
                { name: 'wholesalerId', value: id[0] },
                { name: 'shopId', value: id[1] }
            ]

        };

        query.noResult = 'null';
        query.returnFirst = true;
        var rawRecord = await this.db.exec(query);
        if (!rawRecord) {
            if (returnNull) { return null; }
            throw new Error(`${this.type} record [${id}] does not exist, was deleted or you do not have permission!`);
        }
        return super.populate(rawRecord);
    }


}
//
// ----------------------------------------------------------------------------------------
//
class cp_wholesalerShop extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #whsName = '';
    #whsCode = '';
    #traderName = '';
    #traderCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#whsName = defaults['whsName'] || '';
        this.#whsCode = defaults['whsCode'] || '';
        this.#traderName = defaults['traderName'] || '';
        this.#traderCode = defaults['traderCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get whsName() { return this.#whsName; }
    get whsCode() { return this.#whsCode; }
    get whsInfo() { return `[${this.#whsCode}] ${this.#whsName}`; }

    get traderName() { return this.#traderName; }
    get traderCode() { return this.#traderCode; }
    get traderInfo() { return `[${this.#traderCode}] ${this.#traderName}`; }

    get whsShopId() {
        return `${this.wholesalerId}-${this.shopId}`;
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
    Table: cp_wholesalerShop_Collection,
    Record: cp_wholesalerShop,
}



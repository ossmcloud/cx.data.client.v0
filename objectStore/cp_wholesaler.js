'use strict'
//
const _core = require('cx-core');
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cp_wholesaler');
//
class cp_wholesaler_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_wholesaler(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = null;
        if (params.s) {
            var query = {
                sql: `
                select	    w.*, s.shopCode, s.shopName, ws.defaultOptions
                from	    cp_wholesaler w
                inner join  cp_wholesalerShop ws ON ws.wholesalerId = w.wholesalerId
                inner join  cx_shop s ON s.shopId = ws.shopId
                where	s.shopId = @shopId
                order by    w.code
            `,
                params: [
                    { name: 'shopId', value: params.s }
                ]
            };
        } else {
            var query = { sql: 'select * from cp_wholesaler where 1=1' }
            this.queryFromParams(query, params);
            query.sql += ' order by code';
        }
       
        return await super.select(query);
    }

    async toLookUpList(shopId, addEmpty) {

        await this.select({ s: shopId });

        var lookUpValues = [];
        if (addEmpty) { lookUpValues.push({ value: '', text: '' }); };
        super.each(function (rec) {
            lookUpValues.push({
                value: rec.wholesalerId,
                text: `${rec.code} (${rec.name})`,
                options: rec.defaultOptions
            })
        });

        return lookUpValues;
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_wholesaler extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #defaultOptions = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#defaultOptions = defaults['defaultOptions'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }
    get defaultOptions() { return this.#defaultOptions; }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_wholesaler_Collection,
    Record: cp_wholesaler,
}


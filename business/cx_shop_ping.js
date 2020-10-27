'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _ui = require('cx-core-ui');
const _persistentTable = require('../persistent/p-cx_shop_ping');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class cx_shop_ping_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_shop_ping(this, defaults);
    }

    async select() {
        this.query = {
            build: function () {
                return { sql: 'select top 1000 p.*, s.shopCode, s.shopName from cx_shop_ping p, cx_shop s where p.shopId = s.shopId' }
            }
        }
        await super.select()
    }

    async render(options) {
        if (!options) { options = {}; }
        return _ui.controls.tableEx(this.records, {
            primaryKey: 'pingId',
            path: options.path || '../cx/shop-ping',
            title: options.title || 'shop ping history',
            tableId: options.tableId || 'cx_shop_ping',
            fixHeader: options.fixHeader || true, 
            filters: options.filters || null,
            allowNew: false,
            allowEdit: false,
            quickSearch: true,
            columns: options.columns || [
                { name: 'pingId', title: 'actions', align: 'center' },
                { name: 'shopInfo', title: 'shop' },
                { name: 'pingIP', title: 'ping IP' },
                { name: 'response', title: 'response' },
                { name: 'created', title: 'created', align: 'center' },
            ]
        });
    }

}
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class cx_shop_ping extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() {
        return `[${this.#shopCode}] ${this.#shopName}`;
    }

    async render(options) {
        if (!options) { options = {}; }
        return _ui.controls.form(this, {
            primaryKey: 'pingId',
            path: options.path || '../cx/shop-ping',
            listPath: options.listPath || '../cx/shop-pings',
            accountId: options.accountId,
            edit: options.edit || false,
            columns: options.columns || []
        });
    }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// EXPORTS ONLY TABLE AND RECORD
//
module.exports = {
    Table: cx_shop_ping_Collection,
    Record: cx_shop_ping,
}


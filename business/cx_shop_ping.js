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

    async select(params) {
        
        this.query = {
            build: function () {
                var query = { sql: '', params: [] };
                query.sql = `
                    select  top 1000 p.*, s.shopCode, s.shopName
                    from    cx_shop_ping p, cx_shop s
                    where   p.shopId = s.shopId
                `
                if (params.s) {
                    query.sql += ' and p.shopId = @shopId';
                    query.params.push({ name: 'shopId', value: params.s });
                }

                query.sql += ' order by p.created desc';

                //return { sql: 'select top 1000 p.*, s.shopCode, s.shopName from cx_shop_ping p, cx_shop s where p.shopId = s.shopId' }
                return query;
            }
        }
        await super.select()
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: 'pingId', value: id }] };
        query.sql = `
                    select  p.*, s.shopCode, s.shopName
                    from    cx_shop_ping p, cx_shop s
                    where   p.shopId = s.shopId
                    and     p.pingId = @pingId
                `
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }

    async render(options) {
        if (!options) { options = {}; }
        return _ui.controls.table(this.records, {
            primaryKey: 'pingId',
            path: options.path || '../dtfs/ping',
            title: options.title || 'shop ping history',
            tableId: options.tableId || 'cx_shop_ping',
            fixHeader: options.fixHeader || true, 
            filters: options.filters || null,
            allowNew: false,
            allowEdit: false,
            quickSearch: true,
            columns: options.columns || [
                { name: 'pingId', title: 'actions', align: 'center' },
                { name: 'shopInfo', title: 'shop', width: '200px' },
                { name: 'pingIP', title: 'ping IP', align: 'center', width: '100px' },
                { name: 'response', title: 'response' },
                { name: 'created', title: 'created', align: 'center', width: '130px' },
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
            path: options.path || '../dtfs/ping',
            listPath: options.listPath || '../dtfs/pings',
            accountId: options.accountId,
            edit: options.edit || false,
            columns: options.columns || [
                { name: 'pingId', label: 'id' },
                { name: 'shopInfo', label: 'shop' },
                { name: 'pingIP', label: 'ping IP' },
                { name: 'response', label: 'response' },
                { name: 'created', label: 'created' },
            ]
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


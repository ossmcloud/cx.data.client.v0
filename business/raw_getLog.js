'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _ui = require('cx-core-ui');
const _persistentTable = require('../persistent/p-raw_getLog');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class raw_getLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_getLog(this, defaults);
    }

    async select(params) {
        this.query = {
            build: function () {
                var query = { sql: '', params: [] };
                query.sql = `
                    select  top 1000 l.*, s.shopCode, s.shopName
                    from    raw_getLog l, cx_shop s
                    where   l.shopId = s.shopId
                `
                if (params.s) {
                    query.sql += ' and l.shopId = @shopId';
                    query.params.push({ name: 'shopId', value: params.s });
                }

                if (params.tr) {
                    query.sql += ' and l.transmissionId like @transmissionId';
                    query.params.push({ name: 'transmissionId', value: ('%' + params.tr + '%') });
                }

                if (params.df) {
                    query.sql += ' and l.getDate >= @from';
                    query.params.push({ name: 'from', value: params.df });
                }

                if (params.dt) {
                    query.sql += ' and l.getDate <= @to';
                    query.params.push({ name: 'to', value: params.dt });
                }

                if (params.suc) {
                    query.sql += ' and l.getSuccess = @success';
                    query.params.push({ name: 'success', value: (params.suc === 'true') });
                }

                query.sql += ' order by l.created desc';
                return query;
            }
        }
        await super.select()
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: 'shopId', value: id }] };
        query.sql = `
                    select  l.*, s.shopCode, s.shopName
                    from    raw_getLog l, cx_shop s
                    where   l.shopId = s.shopId
                    and     l.shopId = @shopId
                `
        
        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }
        
        return super.populate(rawRecord);
    }

    async render(options) {
        if (!options) { options = {}; }
        return _ui.controls.table(this.records, {
            primaryKey: 'getLogId',
            path: options.path || '../dtfs/getlog',
            title: options.title || 'shop get logs history',
            tableId: options.tableId || 'raw_getLog',
            fixHeader: options.fixHeader || true,
            filters: options.filters || null,
            allowNew: false,
            allowEdit: false,
            quickSearch: true,
            columns: options.columns || [
                { name: 'getLogId', title: '', align: 'center' },
                { name: 'shopInfo', title: 'shop', width: '200px' },
                { name: 'transmissionID', title: 'transmission ID', align: 'center', width: '150px' },
                { name: 'getDate', title: 'date', align: 'center', width: '130px' },
                { name: 'getModule', title: 'module', align: 'center', width: '70px' },
                { name: 'getReference', title: 'reference' },
                { name: 'getResponse', title: 'response' },
                { name: 'getSuccess', title: 'success', align: 'center', width: '70px' },
                { name: 'created', title: 'created', align: 'center', width: '130px' },
            ]
        });
    }
}
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class raw_getLog extends _persistentTable.Record {
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

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// EXPORTS ONLY TABLE AND RECORD
//
module.exports = {
    Table: raw_getLog_Collection,
    Record: raw_getLog,
}


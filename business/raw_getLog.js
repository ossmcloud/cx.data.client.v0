'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _persistentTable = require('../persistent/p-raw_getLog');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class raw_getLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_getLog(this, defaults);
    }

    async getDates(params) {
        var query = {};
        query.sql = `select shopId, replace(convert(varchar, getDate, 111),'/','-') as [getDate], count(getLogId) as logCount, max(getResponse) as logMessage
                    from raw_getLog
                    where	getModule = 'retail'
                        and getResponse not like '%static%'
                        and getSuccess = 1
                        and shopId = @shopId
                        and	MONTH(getDate) = @month
                        and	YEAR(getDate) = @year
                    group by shopId, getDate
                    order by getDate`;
        
        query.params = [
            { name: 'shopId', value: params.s },
            { name: 'month', value: params.m },
            { name: 'year', value: params.y }
        ];

        var dates = [];
        var rawResults = await this.db.exec(query);
        rawResults.each(function (res, idx) {
            dates.push({
                d: res.getDate,
                toolTip: `${res.logCount} transmission(s)\n${res.logMessage}`,
                link: `../cr/cashbook?s=${res.shopId}&d=${res.getDate}`,
            })
        });
        return dates;
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
                    and     l.getLogId = @shopId
                `
        query.noResult = 'null';
        query.returnFirst = true;
        
        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist or was deleted!`); }
        
        return super.populate(rawRecord);
    }

    async renderOptions(options) {
        if (!options) { options = {}; }
        // TODO: CX: this should come (or partially come) from the BD
        //           so we could have sort of customizable forms
        return {
            primaryKey: 'getLogId',
            path: options.path || '../dtfs/getlog',
            title: options.title || 'shop get logs history',
            tableId: options.tableId || 'raw_getLog',
            fixHeader: options.fixHeader || false,
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
        }
    }

    // async render(options) {
    //     if (!options) { options = {}; }
    //     return _ui.controls.table(this.records, {
    //         primaryKey: 'getLogId',
    //         path: options.path || '../dtfs/getlog',
    //         title: options.title || 'shop get logs history',
    //         tableId: options.tableId || 'raw_getLog',
    //         fixHeader: options.fixHeader || false,
    //         filters: options.filters || null,
    //         allowNew: false,
    //         allowEdit: false,
    //         quickSearch: true,
    //         columns: options.columns || [
    //             { name: 'getLogId', title: '', align: 'center' },
    //             { name: 'shopInfo', title: 'shop', width: '200px' },
    //             { name: 'transmissionID', title: 'transmission ID', align: 'center', width: '150px' },
    //             { name: 'getDate', title: 'date', align: 'center', width: '130px' },
    //             { name: 'getModule', title: 'module', align: 'center', width: '70px' },
    //             { name: 'getReference', title: 'reference' },
    //             { name: 'getResponse', title: 'response' },
    //             { name: 'getSuccess', title: 'success', align: 'center', width: '70px' },
    //             { name: 'created', title: 'created', align: 'center', width: '130px' },
    //         ]
    //     });
    // }
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

    async renderOptions(options) {
        if (!options) { options = {}; }
        // TODO: CX: this should come (or partially come) from the BD
        //           so we could have sort of customizable forms
        return {
            id: options.id || 'raw_getLog',
            primaryKey: 'getLogId',
            path: options.path || '../dtfs/getlog',
            listPath: options.listPath || '../dtfs/getlogs',
            accountId: options.accountId,
            formTitle: options.formTitle || 'dtfs get log form',
            edit: false,    // !IMPORTANT: these records cannot be edited
            groups: options.groups || [
                { name: 'main', title: 'main info' },
                { name: 'get', title: 'get info' },
                { name: 'audit', title: 'audit info' },
            ],
            fields: options.fields || [
                { group: 'main', name: 'getLogId', label: 'id', readOnly: true, column: 1 },
                //{ group: 'main', name: 'shopId', label: 'shop', type: _ui.controls.Type.SELECT, options: shopDropDownOptions },
                { group: 'main', name: 'shopInfo', label: 'shop', column: 2 },
                { group: 'main', name: 'transmissionID', label: 'transmission ID', width: '150px', column: 3 },


                { group: 'get', name: 'getModule', label: 'module', align: 'center', width: '70px', column: 1 },
                { group: 'get', name: 'getReference', label: 'reference', column: 1 },
                { group: 'get', name: 'getSuccess', label: 'success', align: 'center', width: '70px', column: 1 },

                { group: 'get', name: 'getDate', label: 'date', align: 'center', column: 2 },
                { group: 'get', name: 'getResponse', label: 'response', column: 2 },

                { group: 'audit', name: 'created', label: 'created', readOnly: true },
            ]
        }
    }

    // async render(options) {
    //     if (!options) { options = {}; }

    //     // var shops = this.table.db.table('cx_shop');
    //     // var shopDropDownOptions = await shops.renderDropDown({ value: this.shopId, doNotRender: true });
        

    //     return _ui.controls.formEx(this, {
    //         id: options.id || 'raw_getLog',
    //         primaryKey: 'getLogId',
    //         path: options.path || '../dtfs/getlog',
    //         listPath: options.listPath || '../dtfs/getlogs',
    //         accountId: options.accountId,
    //         formTitle: options.formTitle || 'dtfs get log form',
    //         edit: false,    // !IMPORTANT: these records cannot be edited
    //         groups: options.groups || [
    //             { name: 'main', title: 'main info' },
    //             { name: 'get', title: 'get info' },
    //             { name: 'audit', title: 'audit info' },
    //         ],
    //         fields: options.fields || [
    //             { group: 'main', name: 'getLogId', label: 'id', readOnly: true, column: 1 },
    //             //{ group: 'main', name: 'shopId', label: 'shop', type: _ui.controls.Type.SELECT, options: shopDropDownOptions },
    //             { group: 'main', name: 'shopInfo', label: 'shop', column: 2 },
    //             { group: 'main', name: 'transmissionID', label: 'transmission ID', width: '150px', column: 3 },
                
                
    //             { group: 'get', name: 'getModule', label: 'module', align: 'center', width: '70px', column: 1 },
    //             { group: 'get', name: 'getReference', label: 'reference', column: 1 },
    //             { group: 'get', name: 'getSuccess', label: 'success', align: 'center', width: '70px', column: 1 },

    //             { group: 'get', name: 'getDate', label: 'date', align: 'center', column: 2 },
    //             { group: 'get', name: 'getResponse', label: 'response', column: 2 },
                
    //             { group: 'audit', name: 'created', label: 'created', readOnly: true },
    //         ]
    //     });
    // }

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


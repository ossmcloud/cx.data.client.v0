'use strict'
//
const _core = require('cx-core');
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cp_wholesalerProvider');
//
class cp_wholesalerProvider_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_wholesalerProvider(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select	    wp.*, w.code, w.name
                from	    cp_wholesalerProvider wp
                inner join  cp_wholesaler w ON w.wholesalerId = wp.wholesalerId
                where	    wp.wholesalerId = @wholesalerId
                order by    wp.dataProviderName
            `,
            params: [
                { name: 'wholesalerId', value: params.whs }
            ]
        };
        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }

        return await super.select(query);
    }

    async toLookUpList(wholesalerId, addEmpty) {

        await this.select({ whs: wholesalerId });

        var lookUpValues = [];
        if (addEmpty) { lookUpValues.push({ value: '', text: '' }); };
        super.each(function (rec) {
            lookUpValues.push({
                value: rec.dataProviderId,
                text: rec.dataProviderName,
            })
        });

        return lookUpValues;
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_wholesalerProvider extends _persistentTable.Record {
    #whsName = '';
    #whsCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#whsName = defaults['name'] || '';
        this.#whsCode = defaults['code'] || '';
    };

    get wholesalerName() { return this.#whsName; }
    get wholesalerCode() { return this.#whsCode; }
    get wholesalerInfo() { return `[${this.#whsCode}] ${this.#whsName}`; }


    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_wholesalerProvider_Collection,
    Record: cp_wholesalerProvider,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cp_queryType');
//
class cp_queryType_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_queryType(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select	    q.*, w.code as wholesalerCode, w.name as wholesalerName
                from	    cp_queryType q
                inner join  cp_wholesaler w ON w.wholesalerId = q.queryTypeId`
        };
        this.queryFromParams(query, params);
        query.sql += ' order by code';
        
        return await super.select(query);
    }

    async toLookUpList(wholesalerId, addEmpty) {

        await this.select({ wholesalerId: wholesalerId });

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
class cp_queryType extends _persistentTable.Record {
    #wholesalerCode = '';
    #wholesalerName = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#wholesalerCode = defaults['wholesalerCode'] || '';
        this.#wholesalerName = defaults['wholesalerName'] || '';
    };

    get wholesalerCode() { return this.#wholesalerCode; }
    get wholesalerName() { return this.#wholesalerName; }
    get wholesalerInfo() { return `[${this.#wholesalerCode}] ${this.#wholesalerName}`; }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }

   
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_queryType_Collection,
    Record: cp_queryType,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cp_queryResolutionType');
//
class cp_queryResolutionType_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_queryResolutionType(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select	    q.*, w.code as wholesalerCode, w.name as wholesalerName
                from	    cp_queryResolutionType q
                inner join  cp_wholesaler w ON w.wholesalerId = q.wholesalerId`
        };
        this.queryFromParams(query, params);
        query.sql += ' order by code';

        return await super.select(query);
    }

    async toLookUpList(wholesalerId, addEmpty) {
        var options = {};
        if (wholesalerId) { options = { wholesalerId: wholesalerId } }
        await this.select();

        var lookUpValues = [];
        if (addEmpty) { lookUpValues.push({ value: '', text: (addEmpty === true) ? '' : addEmpty }); };
        super.each(function (rec) {
            lookUpValues.push({
                value: rec.queryResTypeId,
                text: `[${rec.wholesalerCode}] ${rec.name}`,
            })
        });

        return lookUpValues;
    }


}
//
// ----------------------------------------------------------------------------------------
//
class cp_queryResolutionType extends _persistentTable.Record {
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
    Table: cp_queryResolutionType_Collection,
    Record: cp_queryResolutionType,
}


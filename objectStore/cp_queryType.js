'use strict'
//
const _core = require('cx-core');
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
                inner join  cp_wholesaler w ON w.wholesalerId = q.wholesalerId`
        };
        this.queryFromParams(query, params);
        query.sql += ' order by code';

        return await super.select(query);
    }

    async toLookUpList(wholesalerId, addEmpty) {
        var options = {};
        if (wholesalerId) { options = { wholesalerId: wholesalerId } }
        await this.select(options);

        var lookUpValues = [];
        if (addEmpty) { lookUpValues.push({ value: '', text: (addEmpty === true) ? '' : addEmpty }); };
        super.each(function (rec) {
            var dataObject = {
                messageTemplate: rec.messageTemplate,
                requiresDisputedAmount: rec.requiresDisputedAmount
            };
            dataObject = _core.text.toBase64(JSON.stringify(dataObject));
            lookUpValues.push({
                value: rec.queryTypeId,
                text: `[${rec.wholesalerCode}] ${rec.name}`,
                object: dataObject
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

    get messageTemplateDisplay() {
        if (!this.messageTemplate) { return ''; }
        if (this.messageTemplate.length > 100) { return this.messageTemplate.substring(0, 100) + '...'; }
        return this.messageTemplate;
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
    Table: cp_queryType_Collection,
    Record: cp_queryType,
}


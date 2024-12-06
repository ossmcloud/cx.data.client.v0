'use strict'
//
const _persistentTable = require('./persistent/p-sys_listValue');
//
class sys_listValue_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_listValue(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = { sql: `select * from sys_listValue where 1 = 1` };
        this.queryFromParams(query, params);
        query.sql += ' order by listId, sortIdx, value';

        return await super.select(query);
    }

    async toLookUpList(listId, addEmpty) {
        if (!listId) { throw new Error('Argument listOd cannot be null'); }
        await this.select({ listId: listId });

        var lookUpValues = [];
        if (addEmpty) { lookUpValues.push({ value: '', text: '' }); };
        super.each(function (rec) {
            lookUpValues.push({
                value: rec.sysListValueId,
                text: rec.value
            })
        });
        return lookUpValues;
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_listValue extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: sys_listValue_Collection,
    Record: sys_listValue,
}


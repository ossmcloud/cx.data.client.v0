'use strict'
//
const _persistentTable = require('./persistent/p-cp_preference_value');
//
class cp_preference_value_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_preference_value(this, defaults);
    }


    
    async select(params) {
        if (!params) { params = {}; }
        var query = {
            sql: `select * from ${this.type} where ${this.FieldNames.PREFERENCEID} = @${this.FieldNames.PREFERENCEID}`,
            params: [
                { name: this.FieldNames.PREFERENCEID, value: params.pref }
            ]
        };

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_preference_value extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_preference_value_Collection,
    Record: cp_preference_value,
}


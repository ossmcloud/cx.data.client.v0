'use strict'
//
const _persistentTable = require('./persistent/p-cp_preference_record');
//
class cp_preference_record_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_preference_record(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `select * from ${this.type} where ${this.FieldNames.PREFERENCEID} = @${this.FieldNames.PREFERENCEID}`,
            params: [
                { name: this.FieldNames.PREFERENCEID, value: params.pref }
            ]
        };

        return await super.select(query);
    }


    async toLookUpList(prefId, addEmpty) {
        await this.select({ pref: prefId });

        var lookUpValues = [];
        if (addEmpty) { lookUpValues.push({ value: '', text: '' }); };
        super.each(function (rec) {
            lookUpValues.push({
                value: rec.preferenceRecordId,
                text: rec.recordType
            })
        });
        return lookUpValues;
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_preference_record extends _persistentTable.Record {
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
    Table: cp_preference_record_Collection,
    Record: cp_preference_record,
}


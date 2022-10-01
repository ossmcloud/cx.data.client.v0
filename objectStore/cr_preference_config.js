'use strict'
//
const _persistentTable = require('./persistent/p-cr_preference_config');
//
class cr_preference_config_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_preference_config(this, defaults);
    }



    async fetch(prefId, prefRecId, recId) {
        if (this.cx.cxSvc == true) { return await super.fetch(id); }

        var query = {
            sql: '', params: [
                { name: this.FieldNames.PREFERENCEID, value: prefId },
                { name: this.FieldNames.PREFERENCERECORDID, value: prefRecId },
                { name: this.FieldNames.RECORDID, value: recId }
            ]
        };
        query.sql = ` select  *
                      from    ${this.type}
                      where   ${this.FieldNames.PREFERENCEID} = @${this.FieldNames.PREFERENCEID}
                      and     ${this.FieldNames.PREFERENCERECORDID} = @${this.FieldNames.PREFERENCERECORDID}
                      and     ${this.FieldNames.RECORDID} = @${this.FieldNames.RECORDID}`
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }


}
//
// ----------------------------------------------------------------------------------------
//
class cr_preference_config extends _persistentTable.Record {
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
    Table: cr_preference_config_Collection,
    Record: cr_preference_config,
}


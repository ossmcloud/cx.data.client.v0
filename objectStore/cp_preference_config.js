'use strict'
//
const _persistentTable = require('./persistent/p-cp_preference_config');
const _declarations = require('../cx-client-declarations');
//
class cp_preference_config_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_preference_config(this, defaults);
    }
    

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `select * from ${this.type} where ${this.FieldNames.PREFERENCEID} = @${this.FieldNames.PREFERENCEID}`,
            params: [
                { name: this.FieldNames.PREFERENCEID, value: params.pref }
            ]
        };
        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }

        return await super.select(query);
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
class cp_preference_config extends _persistentTable.Record {
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
    Table: cp_preference_config_Collection,
    Record: cp_preference_config,
}


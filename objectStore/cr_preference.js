'use strict'
//
const _cxl = require('cx-core/core/cx-core-lists');
const _persistentTable = require('./persistent/p-cr_preference');
//
class cr_preference_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_preference(this, defaults);
    }

    async select(params) {
        if (!params) { params = {}; }

        var sqlSelectFields = '';
        for (var key in this.FieldNames) {
            if (sqlSelectFields.length > 0) { sqlSelectFields += ','; }
            if (this.FieldNames[key] == this.FieldNames.DEFAULTVALUE) {
                sqlSelectFields += `case ${this.FieldNames.TYPE} when 'value' then (select label from cr_preference_value where preferenceValueId = ${this.FieldNames.DEFAULTVALUE}) else ${this.FieldNames.DEFAULTVALUE} end as ${this.FieldNames.DEFAULTVALUE}`;
            } else {
                sqlSelectFields += this.FieldNames[key]
            }
        }

        var query = {
            sql: `  select ${sqlSelectFields}
                    from ${this.type} order by ${this.FieldNames.PREFERENCEID}`
        }

        return await super.select(query);
    }

    async getPreferenceListOptions(recordType, recordId, allowEdit) {
        var query = {
            sql: `select	p.preferenceId, pr.preferenceRecordId, pr.recordType, p.name, p.type, pr.levelId,
                        isnull(
                                (select pc.recordId from cr_preference_config pc where pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId and pc.recordId = @recordId)
                                , -1
                        ) as recordId,
                        (case p.type 
                            when 'value' then
                                (select pv.label from cr_preference_value pv where pv.preferenceValueId = (select pc.value from cr_preference_config pc where pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId and pc.recordId = @recordId) ) 
                            else
                                (select pc.value from cr_preference_config pc where pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId and pc.recordId = @recordId) 
                        end ) as [value]

                from	cr_preference p
                inner join cr_preference_record pr ON pr.preferenceId = p.preferenceId
                --left outer join cr_preference_config pc ON pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId
                where	pr.recordType = @recordType
                order by p.name desc`,
            params: [
                { name: 'recordId', value: recordId },
                { name: 'recordType', value: recordType },
            ]
        }

        var preferences = await this.db.exec(query);

        var listOptions = {
            title: 'system preferences',
            listView: true,
            quickSearch: true,
            records: preferences.rows,
            columns: [
                { name: 'name', title: 'preference' },
                { name: 'type', title: 'type', width: '75px', align: 'center' },
                { name: 'value', title: 'value', width: '250px', nullText: 'not set' },
                { name: 'preferenceId', dataHidden: 'preference-id' },
                { name: 'preferenceRecordId', dataHidden: 'preference-record-id' },
                { name: 'recordId', dataHidden: 'record-id' },
                
            ],

        }

        if (allowEdit) {
            listOptions.actions = [{ label: 'edit', funcName: 'editPreference' }];
        }

        return listOptions;
    }


}
//
// ----------------------------------------------------------------------------------------
//
class cr_preference extends _persistentTable.Record {
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
    Table: cr_preference_Collection,
    Record: cr_preference,
}


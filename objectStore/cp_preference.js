'use strict'
//
const _persistentTable = require('./persistent/p-cp_preference');
//
class cp_preference_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_preference(this, defaults);
    }

    async select(params) {
        if (!params) { params = {}; }

        var sqlSelectFields = '';
        for (var key in this.FieldNames) {
            if (sqlSelectFields.length > 0) { sqlSelectFields += ','; }
            if (this.FieldNames[key] == this.FieldNames.DEFAULTVALUE) {
                sqlSelectFields += `case ${this.FieldNames.TYPE} when 'value' then (select label from cp_preference_value where preferenceValueId = ${this.FieldNames.DEFAULTVALUE}) else ${this.FieldNames.DEFAULTVALUE} end as ${this.FieldNames.DEFAULTVALUE}`;
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

    async toLookUpList(addEmpty) {
        await this.select();

        var lookUpValues = [];
        if (addEmpty) { lookUpValues.push({ value: '', text: '' }); };
        super.each(function (rec) {
            lookUpValues.push({
                value: rec.preferenceId,
                text: rec.name
            })
        });
        return lookUpValues;
    }

    async getPreferenceListOptions(recordType, recordId, allowEdit) {
        var query = {
            sql: `select	p.preferenceId, pr.preferenceRecordId, pr.recordType, p.name, p.type, pr.levelId,
                        isnull(
                                (select pc.recordId from cp_preference_config pc where pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId and pc.recordId = @recordId)
                                , -1
                        ) as recordId,
                        (case p.type 
                            when 'value' then
                                (select pv.label from cp_preference_value pv where pv.preferenceValueId = (select pc.value from cp_preference_config pc where pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId and pc.recordId = @recordId) ) 
                            else
                                (select pc.value from cp_preference_config pc where pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId and pc.recordId = @recordId) 
                        end ) as [value]

                from	cp_preference p
                inner join cp_preference_record pr ON pr.preferenceId = p.preferenceId
                --left outer join cp_preference_config pc ON pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId
                where	pr.recordType = @recordType
                and     isnull(pr.disabled, 0) = 0
                order by p.name desc`,
            params: [
                { name: 'recordId', value: recordId },
                { name: 'recordType', value: recordType },
            ]
        }

        var preferences = await this.db.exec(query);

        var listOptions = {
            title: 'purchase preferences',
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
            listOptions.actions = [
                { label: 'edit', funcName: 'editCPPreference' },
                { label: 'delete', funcName: 'deleteCPPreference' }
            ];
        }

        return listOptions;
    }


}
//
// ----------------------------------------------------------------------------------------
//
class cp_preference extends _persistentTable.Record {
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
    Table: cp_preference_Collection,
    Record: cp_preference,
}


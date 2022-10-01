'use strict'
//
//*****************************************************************************************
//                                                                                        *
//  IMPORTANT NOTE: THIS FILE IS AUTOMATICALLY CREATED BY [peppo.nodejs.objectBuilder]    *
//                  DO NOT EDIT OR ADD CODE IN ANY WAY AS IT WILL BE OVERWRITTEN WHEN     *
//                  [peppo.nodejs.objectBuilder] REGENERATES THE FILE                     *
//                                                                                        *
//*****************************************************************************************
// 
// CORE SDK REQUIRE
//
const _cx_data = require('cx-data');
// 
// TABLE NAME
//
const _tableName = 'cr_preference_config';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    PREFERENCEID: 'preferenceId',
    PREFERENCERECORDID: 'preferenceRecordId',
    RECORDID: 'recordId',
    VALUE: 'value',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    preferenceId: { name: 'preferenceId', dataType: 'bigint', pk: true, identity: false, maxLength: 8, null: false },
    preferenceRecordId: { name: 'preferenceRecordId', dataType: 'bigint', pk: true, identity: false, maxLength: 8, null: false },
    recordId: { name: 'recordId', dataType: 'bigint', pk: true, identity: false, maxLength: 8, null: false },
    value: { name: 'value', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cr_preference_config_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cr_preference_config extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get preferenceId() {
        return super.getValue(_fieldNames.PREFERENCEID);
    } set preferenceId(val) {
        super.setValue(_fieldNames.PREFERENCEID, val);
    }

    get preferenceRecordId() {
        return super.getValue(_fieldNames.PREFERENCERECORDID);
    } set preferenceRecordId(val) {
        super.setValue(_fieldNames.PREFERENCERECORDID, val);
    }

    get recordId() {
        return super.getValue(_fieldNames.RECORDID);
    } set recordId(val) {
        super.setValue(_fieldNames.RECORDID, val);
    }

    get value() {
        return super.getValue(_fieldNames.VALUE);
    } set value(val) {
        super.setValue(_fieldNames.VALUE, val);
    }

    get created() {
        return super.getValue(_fieldNames.CREATED);
    } set created(val) {
        super.setValue(_fieldNames.CREATED, val);
    }

    get createdBy() {
        return super.getValue(_fieldNames.CREATEDBY);
    } set createdBy(val) {
        super.setValue(_fieldNames.CREATEDBY, val);
    }

    get modified() {
        return super.getValue(_fieldNames.MODIFIED);
    } set modified(val) {
        super.setValue(_fieldNames.MODIFIED, val);
    }

    get modifiedBy() {
        return super.getValue(_fieldNames.MODIFIEDBY);
    } set modifiedBy(val) {
        super.setValue(_fieldNames.MODIFIEDBY, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cr_preference_config_Collection,
    Record: Persistent_cr_preference_config,
}
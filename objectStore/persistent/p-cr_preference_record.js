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
const _tableName = 'cr_preference_record';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    PREFERENCERECORDID: 'preferenceRecordId',
    PREFERENCEID: 'preferenceId',
    LEVELID: 'levelId',
    RECORDTYPE: 'recordType',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    preferenceRecordId: { name: 'preferenceRecordId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    preferenceId: { name: 'preferenceId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    levelId: { name: 'levelId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    recordType: { name: 'recordType', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cr_preference_record_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cr_preference_record extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get preferenceRecordId() {
        return super.getValue(_fieldNames.PREFERENCERECORDID);
    }

    get preferenceId() {
        return super.getValue(_fieldNames.PREFERENCEID);
    } set preferenceId(val) {
        super.setValue(_fieldNames.PREFERENCEID, val);
    }

    get levelId() {
        return super.getValue(_fieldNames.LEVELID);
    } set levelId(val) {
        super.setValue(_fieldNames.LEVELID, val);
    }

    get recordType() {
        return super.getValue(_fieldNames.RECORDTYPE);
    } set recordType(val) {
        super.setValue(_fieldNames.RECORDTYPE, val);
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
    Table: Persistent_cr_preference_record_Collection,
    Record: Persistent_cr_preference_record,
}
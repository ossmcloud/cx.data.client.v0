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
const _tableName = 'cp_preference_value';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    PREFERENCEVALUEID: 'preferenceValueId',
    PREFERENCEID: 'preferenceId',
    TYPE: 'type',
    VALUE: 'value',
    LABEL: 'label',
    ISDEFAULT: 'isDefault',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    preferenceValueId: { name: 'preferenceValueId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    preferenceId: { name: 'preferenceId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    type: { name: 'type', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    value: { name: 'value', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: false },
    label: { name: 'label', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    isDefault: { name: 'isDefault', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_preference_value_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_preference_value extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get preferenceValueId() {
        return super.getValue(_fieldNames.PREFERENCEVALUEID);
    }

    get preferenceId() {
        return super.getValue(_fieldNames.PREFERENCEID);
    } set preferenceId(val) {
        super.setValue(_fieldNames.PREFERENCEID, val);
    }

    get type() {
        return super.getValue(_fieldNames.TYPE);
    } set type(val) {
        super.setValue(_fieldNames.TYPE, val);
    }

    get value() {
        return super.getValue(_fieldNames.VALUE);
    } set value(val) {
        super.setValue(_fieldNames.VALUE, val);
    }

    get label() {
        return super.getValue(_fieldNames.LABEL);
    } set label(val) {
        super.setValue(_fieldNames.LABEL, val);
    }

    get isDefault() {
        return super.getValue(_fieldNames.ISDEFAULT);
    } set isDefault(val) {
        super.setValue(_fieldNames.ISDEFAULT, val);
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
    Table: Persistent_cp_preference_value_Collection,
    Record: Persistent_cp_preference_value,
}
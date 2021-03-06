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
const _tableName = 'epos_dtfs_configs';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    CONFIGID: 'configId',
    SETTINGID: 'settingId',
    CONFIGNAME: 'configName',
    CONFIGVALUE: 'configValue',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    CREATED: 'created',
    CREATEDBY: 'createdBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    configId: { name: 'configId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    settingId: { name: 'settingId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    configName: { name: 'configName', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    configValue: { name: 'configValue', dataType: 'varchar', pk: false, identity: false, maxLength: 500, null: false },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_epos_dtfs_configs_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_epos_dtfs_configs extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get configId() {
        return super.getValue(_fieldNames.CONFIGID);
    }

    get settingId() {
        return super.getValue(_fieldNames.SETTINGID);
    } set settingId(val) {
        super.setValue(_fieldNames.SETTINGID, val);
    }

    get configName() {
        return super.getValue(_fieldNames.CONFIGNAME);
    } set configName(val) {
        super.setValue(_fieldNames.CONFIGNAME, val);
    }

    get configValue() {
        return super.getValue(_fieldNames.CONFIGVALUE);
    } set configValue(val) {
        super.setValue(_fieldNames.CONFIGVALUE, val);
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


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_epos_dtfs_configs_Collection,
    Record: Persistent_epos_dtfs_configs,
}
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
const _tableName = 'ca_settingApprover';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    SETTINGAPPROVERID: 'settingApproverId',
    LOGINID: 'loginId',
    LEVEL: 'level',
    WHOLESALERID: 'wholesalerId',
    SUPPLIERS: 'suppliers',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    settingApproverId: { name: 'settingApproverId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    loginId: { name: 'loginId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    level: { name: 'level', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    wholesalerId: { name: 'wholesalerId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    suppliers: { name: 'suppliers', dataType: 'varchar', pk: false, identity: false, maxLength: 1000, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_ca_settingApprover_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_ca_settingApprover extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get settingApproverId() {
        return super.getValue(_fieldNames.SETTINGAPPROVERID);
    }

    get loginId() {
        return super.getValue(_fieldNames.LOGINID);
    } set loginId(val) {
        super.setValue(_fieldNames.LOGINID, val);
    }

    get level() {
        return super.getValue(_fieldNames.LEVEL);
    } set level(val) {
        super.setValue(_fieldNames.LEVEL, val);
    }

    get wholesalerId() {
        return super.getValue(_fieldNames.WHOLESALERID);
    } set wholesalerId(val) {
        super.setValue(_fieldNames.WHOLESALERID, val);
    }

    get suppliers() {
        return super.getValue(_fieldNames.SUPPLIERS);
    } set suppliers(val) {
        super.setValue(_fieldNames.SUPPLIERS, val);
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
    Table: Persistent_ca_settingApprover_Collection,
    Record: Persistent_ca_settingApprover,
}
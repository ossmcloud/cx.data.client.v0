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
const _tableName = 'raw_cx_subDepartment';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    SUBDEPID: 'subDepId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    DEPARTMENT: 'department',
    SUBDEPARTMENT: 'subDepartment',
    SUBDEPARTMENTNAME: 'subDepartmentName',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    subDepId: { name: 'subDepId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    department: { name: 'department', dataType: 'varchar', pk: false, identity: false, maxLength: 32, null: true },
    subDepartment: { name: 'subDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    subDepartmentName: { name: 'subDepartmentName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_cx_subDepartment_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_cx_subDepartment extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get subDepId() {
        return super.getValue(_fieldNames.SUBDEPID);
    }

    get transmissionID() {
        return super.getValue(_fieldNames.TRANSMISSIONID);
    } set transmissionID(val) {
        super.setValue(_fieldNames.TRANSMISSIONID, val);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get department() {
        return super.getValue(_fieldNames.DEPARTMENT);
    } set department(val) {
        super.setValue(_fieldNames.DEPARTMENT, val);
    }

    get subDepartment() {
        return super.getValue(_fieldNames.SUBDEPARTMENT);
    } set subDepartment(val) {
        super.setValue(_fieldNames.SUBDEPARTMENT, val);
    }

    get subDepartmentName() {
        return super.getValue(_fieldNames.SUBDEPARTMENTNAME);
    } set subDepartmentName(val) {
        super.setValue(_fieldNames.SUBDEPARTMENTNAME, val);
    }

    get created() {
        return super.getValue(_fieldNames.CREATED);
    } set created(val) {
        super.setValue(_fieldNames.CREATED, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_raw_cx_subDepartment_Collection,
    Record: Persistent_raw_cx_subDepartment,
}
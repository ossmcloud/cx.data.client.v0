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
const _tableName = 'raw_cx_department';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    DEPID: 'depId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    DEPARTMENT: 'department',
    DEPARTMENTNAME: 'departmentName',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    depId: { name: 'depId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    department: { name: 'department', dataType: 'varchar', pk: false, identity: false, maxLength: 32, null: true },
    departmentName: { name: 'departmentName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_cx_department_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_cx_department extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get depId() {
        return super.getValue(_fieldNames.DEPID);
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

    get departmentName() {
        return super.getValue(_fieldNames.DEPARTMENTNAME);
    } set departmentName(val) {
        super.setValue(_fieldNames.DEPARTMENTNAME, val);
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
    Table: Persistent_raw_cx_department_Collection,
    Record: Persistent_raw_cx_department,
}
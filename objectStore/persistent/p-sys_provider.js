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
const _tableName = 'sys_provider';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TYPE: 'type',
    CODE: 'code',
    NAME: 'name',
    ISCLOUD: 'isCloud',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    type: { name: 'type', dataType: 'varchar', pk: false, identity: false, maxLength: 5, null: false },
    code: { name: 'code', dataType: 'varchar', pk: true, identity: false, maxLength: 20, null: false },
    name: { name: 'name', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    isCloud: { name: 'isCloud', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_sys_provider_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_sys_provider extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get type() {
        return super.getValue(_fieldNames.TYPE);
    } set type(val) {
        super.setValue(_fieldNames.TYPE, val);
    }

    get code() {
        return super.getValue(_fieldNames.CODE);
    } set code(val) {
        super.setValue(_fieldNames.CODE, val);
    }

    get name() {
        return super.getValue(_fieldNames.NAME);
    } set name(val) {
        super.setValue(_fieldNames.NAME, val);
    }

    get isCloud() {
        return super.getValue(_fieldNames.ISCLOUD);
    } set isCloud(val) {
        super.setValue(_fieldNames.ISCLOUD, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_sys_provider_Collection,
    Record: Persistent_sys_provider,
}
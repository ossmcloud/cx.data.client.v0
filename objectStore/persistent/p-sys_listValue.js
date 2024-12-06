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
const _tableName = 'sys_listValue';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    SYSLISTVALUEID: 'sysListValueId',
    LISTID: 'listId',
    VALUE: 'value',
    SORTIDX: 'sortIdx',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    sysListValueId: { name: 'sysListValueId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    listId: { name: 'listId', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    value: { name: 'value', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    sortIdx: { name: 'sortIdx', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_sys_listValue_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_sys_listValue extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get sysListValueId() {
        return super.getValue(_fieldNames.SYSLISTVALUEID);
    }

    get listId() {
        return super.getValue(_fieldNames.LISTID);
    } set listId(val) {
        super.setValue(_fieldNames.LISTID, val);
    }

    get value() {
        return super.getValue(_fieldNames.VALUE);
    } set value(val) {
        super.setValue(_fieldNames.VALUE, val);
    }

    get sortIdx() {
        return super.getValue(_fieldNames.SORTIDX);
    } set sortIdx(val) {
        super.setValue(_fieldNames.SORTIDX, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_sys_listValue_Collection,
    Record: Persistent_sys_listValue,
}
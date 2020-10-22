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
const _tableName = 'raw_getLog';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    GETLOGID: 'getLogId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    GETDATE: 'getDate',
    GETMODULE: 'getModule',
    GETREFERENCE: 'getReference',
    GETRESPONSE: 'getResponse',
    GETSUCCESS: 'getSuccess',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    getLogId: { name: 'getLogId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    getDate: { name: 'getDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    getModule: { name: 'getModule', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    getReference: { name: 'getReference', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    getResponse: { name: 'getResponse', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    getSuccess: { name: 'getSuccess', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_getLog_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_getLog extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get getLogId() {
        return super.getValue(_fieldNames.GETLOGID);
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

    get getDate() {
        return super.getValue(_fieldNames.GETDATE);
    } set getDate(val) {
        super.setValue(_fieldNames.GETDATE, val);
    }

    get getModule() {
        return super.getValue(_fieldNames.GETMODULE);
    } set getModule(val) {
        super.setValue(_fieldNames.GETMODULE, val);
    }

    get getReference() {
        return super.getValue(_fieldNames.GETREFERENCE);
    } set getReference(val) {
        super.setValue(_fieldNames.GETREFERENCE, val);
    }

    get getResponse() {
        return super.getValue(_fieldNames.GETRESPONSE);
    } set getResponse(val) {
        super.setValue(_fieldNames.GETRESPONSE, val);
    }

    get getSuccess() {
        return super.getValue(_fieldNames.GETSUCCESS);
    } set getSuccess(val) {
        super.setValue(_fieldNames.GETSUCCESS, val);
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
    Table: Persistent_raw_getLog_Collection,
    Record: Persistent_raw_getLog,
}
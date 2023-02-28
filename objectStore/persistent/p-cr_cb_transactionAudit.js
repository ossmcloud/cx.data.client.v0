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
const _tableName = 'cr_cb_transactionAudit';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    CBTRANAUDITID: 'cbTranAuditId',
    CBTRANID: 'cbTranId',
    LOGTYPE: 'logType',
    LOGMESSAGE: 'logMessage',
    CREATED: 'created',
    CREATEDBY: 'createdBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    cbTranAuditId: { name: 'cbTranAuditId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    cbTranId: { name: 'cbTranId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    logType: { name: 'logType', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: false },
    logMessage: { name: 'logMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cr_cb_transactionAudit_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cr_cb_transactionAudit extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get cbTranAuditId() {
        return super.getValue(_fieldNames.CBTRANAUDITID);
    }

    get cbTranId() {
        return super.getValue(_fieldNames.CBTRANID);
    } set cbTranId(val) {
        super.setValue(_fieldNames.CBTRANID, val);
    }

    get logType() {
        return super.getValue(_fieldNames.LOGTYPE);
    } set logType(val) {
        super.setValue(_fieldNames.LOGTYPE, val);
    }

    get logMessage() {
        return super.getValue(_fieldNames.LOGMESSAGE);
    } set logMessage(val) {
        super.setValue(_fieldNames.LOGMESSAGE, val);
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
    Table: Persistent_cr_cb_transactionAudit_Collection,
    Record: Persistent_cr_cb_transactionAudit,
}
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
const _tableName = 'cp_recoSessionLog';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RECOSESSIONLOGID: 'recoSessionLogId',
    RECOSESSIONID: 'recoSessionId',
    LOGTYPE: 'logType',
    LOGMESSAGE: 'logMessage',
    LOGINFO: 'logInfo',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    recoSessionLogId: { name: 'recoSessionLogId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    recoSessionId: { name: 'recoSessionId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    logType: { name: 'logType', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: false },
    logMessage: { name: 'logMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: false },
    logInfo: { name: 'logInfo', dataType: 'varchar', pk: false, identity: false, maxLength: 4000, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_recoSessionLog_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_recoSessionLog extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get recoSessionLogId() {
        return super.getValue(_fieldNames.RECOSESSIONLOGID);
    }

    get recoSessionId() {
        return super.getValue(_fieldNames.RECOSESSIONID);
    } set recoSessionId(val) {
        super.setValue(_fieldNames.RECOSESSIONID, val);
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

    get logInfo() {
        return super.getValue(_fieldNames.LOGINFO);
    } set logInfo(val) {
        super.setValue(_fieldNames.LOGINFO, val);
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
    Table: Persistent_cp_recoSessionLog_Collection,
    Record: Persistent_cp_recoSessionLog,
}
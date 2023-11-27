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
const _tableName = 'sys_serverTaskRunLog';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TASKRUNLOGID: 'taskRunLogId',
    TASKRUNID: 'taskRunId',
    TASKID: 'taskId',
    LOGTYPE: 'logType',
    LOGMESSAGE: 'logMessage',
    LOGADDITIONALINFO: 'logAdditionalInfo',
    CREATED: 'created',
    CREATEDBY: 'createdBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    taskRunLogId: { name: 'taskRunLogId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    taskRunId: { name: 'taskRunId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    taskId: { name: 'taskId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    logType: { name: 'logType', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: false },
    logMessage: { name: 'logMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 500, null: true },
    logAdditionalInfo: { name: 'logAdditionalInfo', dataType: 'varchar', pk: false, identity: false, maxLength: 4000, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_sys_serverTaskRunLog_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_sys_serverTaskRunLog extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get taskRunLogId() {
        return super.getValue(_fieldNames.TASKRUNLOGID);
    }

    get taskRunId() {
        return super.getValue(_fieldNames.TASKRUNID);
    } set taskRunId(val) {
        super.setValue(_fieldNames.TASKRUNID, val);
    }

    get taskId() {
        return super.getValue(_fieldNames.TASKID);
    } set taskId(val) {
        super.setValue(_fieldNames.TASKID, val);
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

    get logAdditionalInfo() {
        return super.getValue(_fieldNames.LOGADDITIONALINFO);
    } set logAdditionalInfo(val) {
        super.setValue(_fieldNames.LOGADDITIONALINFO, val);
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
    Table: Persistent_sys_serverTaskRunLog_Collection,
    Record: Persistent_sys_serverTaskRunLog,
}
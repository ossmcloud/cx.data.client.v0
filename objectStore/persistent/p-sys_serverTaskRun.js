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
const _tableName = 'sys_serverTaskRun';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TASKRUNID: 'taskRunId',
    TASKID: 'taskId',
    RUNSTATUSID: 'runStatusId',
    RUNSTATUSMESSAGE: 'runStatusMessage',
    RUNPARAMETERS: 'runParameters',
    TASKSTARTED: 'taskStarted',
    TASKCOMPLETED: 'taskCompleted',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    taskRunId: { name: 'taskRunId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    taskId: { name: 'taskId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    runStatusId: { name: 'runStatusId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    runStatusMessage: { name: 'runStatusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 500, null: true },
    runParameters: { name: 'runParameters', dataType: 'varchar', pk: false, identity: false, maxLength: 4000, null: true },
    taskStarted: { name: 'taskStarted', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    taskCompleted: { name: 'taskCompleted', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_sys_serverTaskRun_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_sys_serverTaskRun extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get taskRunId() {
        return super.getValue(_fieldNames.TASKRUNID);
    }

    get taskId() {
        return super.getValue(_fieldNames.TASKID);
    } set taskId(val) {
        super.setValue(_fieldNames.TASKID, val);
    }

    get runStatusId() {
        return super.getValue(_fieldNames.RUNSTATUSID);
    } set runStatusId(val) {
        super.setValue(_fieldNames.RUNSTATUSID, val);
    }

    get runStatusMessage() {
        return super.getValue(_fieldNames.RUNSTATUSMESSAGE);
    } set runStatusMessage(val) {
        super.setValue(_fieldNames.RUNSTATUSMESSAGE, val);
    }

    get runParameters() {
        return super.getValue(_fieldNames.RUNPARAMETERS);
    } set runParameters(val) {
        super.setValue(_fieldNames.RUNPARAMETERS, val);
    }

    get taskStarted() {
        return super.getValue(_fieldNames.TASKSTARTED);
    } set taskStarted(val) {
        super.setValue(_fieldNames.TASKSTARTED, val);
    }

    get taskCompleted() {
        return super.getValue(_fieldNames.TASKCOMPLETED);
    } set taskCompleted(val) {
        super.setValue(_fieldNames.TASKCOMPLETED, val);
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
    Table: Persistent_sys_serverTaskRun_Collection,
    Record: Persistent_sys_serverTaskRun,
}
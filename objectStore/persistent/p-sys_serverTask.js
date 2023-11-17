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
const _tableName = 'sys_serverTask';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TASKID: 'taskId',
    TASKTYPEID: 'taskTypeId',
    TASKSTATUSID: 'taskStatusId',
    TASKNAME: 'taskName',
    TASKDESCRIPTION: 'taskDescription',
    RUNSTATUSID: 'runStatusId',
    RUNSTATUSMESSAGE: 'runStatusMessage',
    RUNTIME: 'runTime',
    RUNFREQUENCY: 'runFrequency',
    RUNPARAMETERS: 'runParameters',
    RUNSEQUENCE: 'runSequence',
    LASTRUNTIME: 'lastRunTime',
    LASTRUNSTATUSID: 'lastRunStatusId',
    LASTRUNSTATUSMESSAGE: 'lastRunStatusMessage',
    LASTRUNPARAMETERS: 'lastRunParameters',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    taskId: { name: 'taskId', dataType: 'bigint', pk: true, identity: false, maxLength: 8, null: false },
    taskTypeId: { name: 'taskTypeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    taskStatusId: { name: 'taskStatusId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    taskName: { name: 'taskName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    taskDescription: { name: 'taskDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 500, null: true },
    runStatusId: { name: 'runStatusId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    runStatusMessage: { name: 'runStatusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 500, null: true },
    runTime: { name: 'runTime', dataType: 'varchar', pk: false, identity: false, maxLength: 5, null: false },
    runFrequency: { name: 'runFrequency', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    runParameters: { name: 'runParameters', dataType: 'varchar', pk: false, identity: false, maxLength: 4000, null: true },
    runSequence: { name: 'runSequence', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    lastRunTime: { name: 'lastRunTime', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    lastRunStatusId: { name: 'lastRunStatusId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    lastRunStatusMessage: { name: 'lastRunStatusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 500, null: true },
    lastRunParameters: { name: 'lastRunParameters', dataType: 'varchar', pk: false, identity: false, maxLength: 4000, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_sys_serverTask_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_sys_serverTask extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get taskId() {
        return super.getValue(_fieldNames.TASKID);
    } set taskId(val) {
        super.setValue(_fieldNames.TASKID, val);
    }

    get taskTypeId() {
        return super.getValue(_fieldNames.TASKTYPEID);
    } set taskTypeId(val) {
        super.setValue(_fieldNames.TASKTYPEID, val);
    }

    get taskStatusId() {
        return super.getValue(_fieldNames.TASKSTATUSID);
    } set taskStatusId(val) {
        super.setValue(_fieldNames.TASKSTATUSID, val);
    }

    get taskName() {
        return super.getValue(_fieldNames.TASKNAME);
    } set taskName(val) {
        super.setValue(_fieldNames.TASKNAME, val);
    }

    get taskDescription() {
        return super.getValue(_fieldNames.TASKDESCRIPTION);
    } set taskDescription(val) {
        super.setValue(_fieldNames.TASKDESCRIPTION, val);
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

    get runTime() {
        return super.getValue(_fieldNames.RUNTIME);
    } set runTime(val) {
        super.setValue(_fieldNames.RUNTIME, val);
    }

    get runFrequency() {
        return super.getValue(_fieldNames.RUNFREQUENCY);
    } set runFrequency(val) {
        super.setValue(_fieldNames.RUNFREQUENCY, val);
    }

    get runParameters() {
        return super.getValue(_fieldNames.RUNPARAMETERS);
    } set runParameters(val) {
        super.setValue(_fieldNames.RUNPARAMETERS, val);
    }

    get runSequence() {
        return super.getValue(_fieldNames.RUNSEQUENCE);
    } set runSequence(val) {
        super.setValue(_fieldNames.RUNSEQUENCE, val);
    }

    get lastRunTime() {
        return super.getValue(_fieldNames.LASTRUNTIME);
    } set lastRunTime(val) {
        super.setValue(_fieldNames.LASTRUNTIME, val);
    }

    get lastRunStatusId() {
        return super.getValue(_fieldNames.LASTRUNSTATUSID);
    } set lastRunStatusId(val) {
        super.setValue(_fieldNames.LASTRUNSTATUSID, val);
    }

    get lastRunStatusMessage() {
        return super.getValue(_fieldNames.LASTRUNSTATUSMESSAGE);
    } set lastRunStatusMessage(val) {
        super.setValue(_fieldNames.LASTRUNSTATUSMESSAGE, val);
    }

    get lastRunParameters() {
        return super.getValue(_fieldNames.LASTRUNPARAMETERS);
    } set lastRunParameters(val) {
        super.setValue(_fieldNames.LASTRUNPARAMETERS, val);
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
    Table: Persistent_sys_serverTask_Collection,
    Record: Persistent_sys_serverTask,
}
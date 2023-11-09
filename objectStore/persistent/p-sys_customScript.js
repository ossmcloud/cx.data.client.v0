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
const _tableName = 'sys_customScript';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    SCRIPTID: 'scriptId',
    SCRIPTNAME: 'scriptName',
    SCRIPTTEXT: 'scriptText',
    SVCNAME: 'svcName',
    MODULE: 'module',
    PROCESS: 'process',
    STAGE: 'stage',
    EXECSEQUENCE: 'execSequence',
    INACTIVE: 'inactive',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    scriptId: { name: 'scriptId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    scriptName: { name: 'scriptName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    scriptText: { name: 'scriptText', dataType: 'varchar', pk: false, identity: false, maxLength: 4000, null: false },
    svcName: { name: 'svcName', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: false },
    module: { name: 'module', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    process: { name: 'process', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    stage: { name: 'stage', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    execSequence: { name: 'execSequence', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    inactive: { name: 'inactive', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_sys_customScript_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_sys_customScript extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get scriptId() {
        return super.getValue(_fieldNames.SCRIPTID);
    }

    get scriptName() {
        return super.getValue(_fieldNames.SCRIPTNAME);
    } set scriptName(val) {
        super.setValue(_fieldNames.SCRIPTNAME, val);
    }

    get scriptText() {
        return super.getValue(_fieldNames.SCRIPTTEXT);
    } set scriptText(val) {
        super.setValue(_fieldNames.SCRIPTTEXT, val);
    }

    get svcName() {
        return super.getValue(_fieldNames.SVCNAME);
    } set svcName(val) {
        super.setValue(_fieldNames.SVCNAME, val);
    }

    get module() {
        return super.getValue(_fieldNames.MODULE);
    } set module(val) {
        super.setValue(_fieldNames.MODULE, val);
    }

    get process() {
        return super.getValue(_fieldNames.PROCESS);
    } set process(val) {
        super.setValue(_fieldNames.PROCESS, val);
    }

    get stage() {
        return super.getValue(_fieldNames.STAGE);
    } set stage(val) {
        super.setValue(_fieldNames.STAGE, val);
    }

    get execSequence() {
        return super.getValue(_fieldNames.EXECSEQUENCE);
    } set execSequence(val) {
        super.setValue(_fieldNames.EXECSEQUENCE, val);
    }

    get inactive() {
        return super.getValue(_fieldNames.INACTIVE);
    } set inactive(val) {
        super.setValue(_fieldNames.INACTIVE, val);
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
    Table: Persistent_sys_customScript_Collection,
    Record: Persistent_sys_customScript,
}
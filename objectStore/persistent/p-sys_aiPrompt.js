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
const _tableName = 'sys_aiPrompt';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    AIPROMPTID: 'aiPromptId',
    NAME: 'name',
    PROMPT: 'prompt',
    EXECSEQUENCE: 'execSequence',
    INACTIVE: 'inactive',
    DESCRIPTION: 'description',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    aiPromptId: { name: 'aiPromptId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    name: { name: 'name', dataType: 'varchar', pk: false, identity: false, maxLength: 100, null: false },
    prompt: { name: 'prompt', dataType: 'varchar', pk: false, identity: false, maxLength: -1, null: false },
    execSequence: { name: 'execSequence', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    inactive: { name: 'inactive', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    description: { name: 'description', dataType: 'varchar', pk: false, identity: false, maxLength: 1000, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_sys_aiPrompt_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_sys_aiPrompt extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get aiPromptId() {
        return super.getValue(_fieldNames.AIPROMPTID);
    }

    get name() {
        return super.getValue(_fieldNames.NAME);
    } set name(val) {
        super.setValue(_fieldNames.NAME, val);
    }

    get prompt() {
        return super.getValue(_fieldNames.PROMPT);
    } set prompt(val) {
        super.setValue(_fieldNames.PROMPT, val);
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

    get description() {
        return super.getValue(_fieldNames.DESCRIPTION);
    } set description(val) {
        super.setValue(_fieldNames.DESCRIPTION, val);
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
    Table: Persistent_sys_aiPrompt_Collection,
    Record: Persistent_sys_aiPrompt,
}
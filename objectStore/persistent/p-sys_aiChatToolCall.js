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
const _tableName = 'sys_aiChatToolCall';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    AICHATTOOLCALLID: 'aiChatToolCallId',
    AICHATTURNID: 'aiChatTurnId',
    AICHATID: 'aiChatId',
    ROUND: 'round',
    SEQ: 'seq',
    TOOLNAME: 'toolName',
    ARGUMENTS: 'arguments',
    OUTPUTCHARS: 'outputChars',
    ISERROR: 'isError',
    DURATIONMS: 'durationMs',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    aiChatToolCallId: { name: 'aiChatToolCallId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    aiChatTurnId: { name: 'aiChatTurnId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    aiChatId: { name: 'aiChatId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    round: { name: 'round', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    seq: { name: 'seq', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    toolName: { name: 'toolName', dataType: 'varchar', pk: false, identity: false, maxLength: 100, null: false },
    arguments: { name: 'arguments', dataType: 'varchar', pk: false, identity: false, maxLength: 4000, null: true },
    outputChars: { name: 'outputChars', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    isError: { name: 'isError', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    durationMs: { name: 'durationMs', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_sys_aiChatToolCall_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_sys_aiChatToolCall extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get aiChatToolCallId() {
        return super.getValue(_fieldNames.AICHATTOOLCALLID);
    }

    get aiChatTurnId() {
        return super.getValue(_fieldNames.AICHATTURNID);
    } set aiChatTurnId(val) {
        super.setValue(_fieldNames.AICHATTURNID, val);
    }

    get aiChatId() {
        return super.getValue(_fieldNames.AICHATID);
    } set aiChatId(val) {
        super.setValue(_fieldNames.AICHATID, val);
    }

    get round() {
        return super.getValue(_fieldNames.ROUND);
    } set round(val) {
        super.setValue(_fieldNames.ROUND, val);
    }

    get seq() {
        return super.getValue(_fieldNames.SEQ);
    } set seq(val) {
        super.setValue(_fieldNames.SEQ, val);
    }

    get toolName() {
        return super.getValue(_fieldNames.TOOLNAME);
    } set toolName(val) {
        super.setValue(_fieldNames.TOOLNAME, val);
    }

    get arguments() {
        return super.getValue(_fieldNames.ARGUMENTS);
    } set arguments(val) {
        super.setValue(_fieldNames.ARGUMENTS, val);
    }

    get outputChars() {
        return super.getValue(_fieldNames.OUTPUTCHARS);
    } set outputChars(val) {
        super.setValue(_fieldNames.OUTPUTCHARS, val);
    }

    get isError() {
        return super.getValue(_fieldNames.ISERROR);
    } set isError(val) {
        super.setValue(_fieldNames.ISERROR, val);
    }

    get durationMs() {
        return super.getValue(_fieldNames.DURATIONMS);
    } set durationMs(val) {
        super.setValue(_fieldNames.DURATIONMS, val);
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
    Table: Persistent_sys_aiChatToolCall_Collection,
    Record: Persistent_sys_aiChatToolCall,
}
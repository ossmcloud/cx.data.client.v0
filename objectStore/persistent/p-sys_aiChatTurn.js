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
const _tableName = 'sys_aiChatTurn';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    AICHATTURNID: 'aiChatTurnId',
    AICHATID: 'aiChatId',
    TURNNO: 'turnNo',
    MODEL: 'model',
    EFFORT: 'effort',
    PROMPT: 'prompt',
    REPLY: 'reply',
    FINISHREASON: 'finishReason',
    ERRORMESSAGE: 'errorMessage',
    TOOLROUNDS: 'toolRounds',
    TOKENSIN: 'tokensIn',
    TOKENSCACHED: 'tokensCached',
    TOKENSOUT: 'tokensOut',
    COSTIN: 'costIn',
    COSTOUT: 'costOut',
    DURATIONMS: 'durationMs',
    CREATED: 'created',
    CREATEDBY: 'createdBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    aiChatTurnId: { name: 'aiChatTurnId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    aiChatId: { name: 'aiChatId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    turnNo: { name: 'turnNo', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    model: { name: 'model', dataType: 'varchar', pk: false, identity: false, maxLength: 100, null: false },
    effort: { name: 'effort', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    prompt: { name: 'prompt', dataType: 'varchar', pk: false, identity: false, maxLength: -1, null: false },
    reply: { name: 'reply', dataType: 'varchar', pk: false, identity: false, maxLength: -1, null: true },
    finishReason: { name: 'finishReason', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    errorMessage: { name: 'errorMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 1000, null: true },
    toolRounds: { name: 'toolRounds', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    tokensIn: { name: 'tokensIn', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    tokensCached: { name: 'tokensCached', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    tokensOut: { name: 'tokensOut', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    costIn: { name: 'costIn', dataType: 'decimal', pk: false, identity: false, maxLength: 9, precision: 18, scale: 6, null: false, default: '0' },
    costOut: { name: 'costOut', dataType: 'decimal', pk: false, identity: false, maxLength: 9, precision: 18, scale: 6, null: false, default: '0' },
    durationMs: { name: 'durationMs', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_sys_aiChatTurn_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_sys_aiChatTurn extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get aiChatTurnId() {
        return super.getValue(_fieldNames.AICHATTURNID);
    }

    get aiChatId() {
        return super.getValue(_fieldNames.AICHATID);
    } set aiChatId(val) {
        super.setValue(_fieldNames.AICHATID, val);
    }

    get turnNo() {
        return super.getValue(_fieldNames.TURNNO);
    } set turnNo(val) {
        super.setValue(_fieldNames.TURNNO, val);
    }

    get model() {
        return super.getValue(_fieldNames.MODEL);
    } set model(val) {
        super.setValue(_fieldNames.MODEL, val);
    }

    get effort() {
        return super.getValue(_fieldNames.EFFORT);
    } set effort(val) {
        super.setValue(_fieldNames.EFFORT, val);
    }

    get prompt() {
        return super.getValue(_fieldNames.PROMPT);
    } set prompt(val) {
        super.setValue(_fieldNames.PROMPT, val);
    }

    get reply() {
        return super.getValue(_fieldNames.REPLY);
    } set reply(val) {
        super.setValue(_fieldNames.REPLY, val);
    }

    get finishReason() {
        return super.getValue(_fieldNames.FINISHREASON);
    } set finishReason(val) {
        super.setValue(_fieldNames.FINISHREASON, val);
    }

    get errorMessage() {
        return super.getValue(_fieldNames.ERRORMESSAGE);
    } set errorMessage(val) {
        super.setValue(_fieldNames.ERRORMESSAGE, val);
    }

    get toolRounds() {
        return super.getValue(_fieldNames.TOOLROUNDS);
    } set toolRounds(val) {
        super.setValue(_fieldNames.TOOLROUNDS, val);
    }

    get tokensIn() {
        return super.getValue(_fieldNames.TOKENSIN);
    } set tokensIn(val) {
        super.setValue(_fieldNames.TOKENSIN, val);
    }

    get tokensCached() {
        return super.getValue(_fieldNames.TOKENSCACHED);
    } set tokensCached(val) {
        super.setValue(_fieldNames.TOKENSCACHED, val);
    }

    get tokensOut() {
        return super.getValue(_fieldNames.TOKENSOUT);
    } set tokensOut(val) {
        super.setValue(_fieldNames.TOKENSOUT, val);
    }

    get costIn() {
        return super.getValue(_fieldNames.COSTIN);
    } set costIn(val) {
        super.setValue(_fieldNames.COSTIN, val);
    }

    get costOut() {
        return super.getValue(_fieldNames.COSTOUT);
    } set costOut(val) {
        super.setValue(_fieldNames.COSTOUT, val);
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
    Table: Persistent_sys_aiChatTurn_Collection,
    Record: Persistent_sys_aiChatTurn,
}
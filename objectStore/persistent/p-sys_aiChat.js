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
const _tableName = 'sys_aiChat';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    AICHATID: 'aiChatId',
    CHATGUID: 'chatGuid',
    LOGINID: 'loginId',
    PATH: 'path',
    TITLE: 'title',
    TURNCOUNT: 'turnCount',
    TOKENSIN: 'tokensIn',
    TOKENSCACHED: 'tokensCached',
    TOKENSOUT: 'tokensOut',
    COSTIN: 'costIn',
    COSTOUT: 'costOut',
    MESSAGESJSON: 'messagesJson',
    LASTUSED: 'lastUsed',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    aiChatId: { name: 'aiChatId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    chatGuid: { name: 'chatGuid', dataType: 'uniqueidentifier', pk: false, identity: false, maxLength: 16, null: false },
    loginId: { name: 'loginId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    path: { name: 'path', dataType: 'varchar', pk: false, identity: false, maxLength: 500, null: true },
    title: { name: 'title', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    turnCount: { name: 'turnCount', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    tokensIn: { name: 'tokensIn', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false, default: '0' },
    tokensCached: { name: 'tokensCached', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false, default: '0' },
    tokensOut: { name: 'tokensOut', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false, default: '0' },
    costIn: { name: 'costIn', dataType: 'decimal', pk: false, identity: false, maxLength: 9, precision: 18, scale: 6, null: false, default: '0' },
    costOut: { name: 'costOut', dataType: 'decimal', pk: false, identity: false, maxLength: 9, precision: 18, scale: 6, null: false, default: '0' },
    messagesJson: { name: 'messagesJson', dataType: 'varchar', pk: false, identity: false, maxLength: -1, null: true },
    lastUsed: { name: 'lastUsed', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_sys_aiChat_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_sys_aiChat extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get aiChatId() {
        return super.getValue(_fieldNames.AICHATID);
    }

    get chatGuid() {
        return super.getValue(_fieldNames.CHATGUID);
    } set chatGuid(val) {
        super.setValue(_fieldNames.CHATGUID, val);
    }

    get loginId() {
        return super.getValue(_fieldNames.LOGINID);
    } set loginId(val) {
        super.setValue(_fieldNames.LOGINID, val);
    }

    get path() {
        return super.getValue(_fieldNames.PATH);
    } set path(val) {
        super.setValue(_fieldNames.PATH, val);
    }

    get title() {
        return super.getValue(_fieldNames.TITLE);
    } set title(val) {
        super.setValue(_fieldNames.TITLE, val);
    }

    get turnCount() {
        return super.getValue(_fieldNames.TURNCOUNT);
    } set turnCount(val) {
        super.setValue(_fieldNames.TURNCOUNT, val);
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

    get messagesJson() {
        return super.getValue(_fieldNames.MESSAGESJSON);
    } set messagesJson(val) {
        super.setValue(_fieldNames.MESSAGESJSON, val);
    }

    get lastUsed() {
        return super.getValue(_fieldNames.LASTUSED);
    } set lastUsed(val) {
        super.setValue(_fieldNames.LASTUSED, val);
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
    Table: Persistent_sys_aiChat_Collection,
    Record: Persistent_sys_aiChat,
}
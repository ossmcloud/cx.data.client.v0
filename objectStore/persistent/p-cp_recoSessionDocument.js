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
const _tableName = 'cp_recoSessionDocument';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RECOSESSIONDOCID: 'recoSessionDocId',
    RECOSESSIONID: 'recoSessionId',
    RECOSOURCEID: 'recoSourceId',
    RECOSTATUSID: 'recoStatusId',
    RECOSTATUSMESSAGE: 'recoStatusMessage',
    RECOSCORE: 'recoScore',
    RECOMATCHLEVEL: 'recoMatchLevel',
    DOCUMENTTYPE: 'documentType',
    DOCUMENTID: 'documentId',
    DOCUMENTNET: 'documentNet',
    DOCUMENTVAT: 'documentVat',
    DOCUMENTGROSS: 'documentGross',
    ISMAINDOCUMENT: 'isMainDocument',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    DOCUMENTDRS: 'documentDRS',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    recoSessionDocId: { name: 'recoSessionDocId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    recoSessionId: { name: 'recoSessionId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    recoSourceId: { name: 'recoSourceId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    recoStatusId: { name: 'recoStatusId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    recoStatusMessage: { name: 'recoStatusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    recoScore: { name: 'recoScore', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    recoMatchLevel: { name: 'recoMatchLevel', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    documentType: { name: 'documentType', dataType: 'varchar', pk: false, identity: false, maxLength: 30, null: false },
    documentId: { name: 'documentId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    documentNet: { name: 'documentNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    documentVat: { name: 'documentVat', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    documentGross: { name: 'documentGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    isMainDocument: { name: 'isMainDocument', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    documentDRS: { name: 'documentDRS', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_recoSessionDocument_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_recoSessionDocument extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get recoSessionDocId() {
        return super.getValue(_fieldNames.RECOSESSIONDOCID);
    }

    get recoSessionId() {
        return super.getValue(_fieldNames.RECOSESSIONID);
    } set recoSessionId(val) {
        super.setValue(_fieldNames.RECOSESSIONID, val);
    }

    get recoSourceId() {
        return super.getValue(_fieldNames.RECOSOURCEID);
    } set recoSourceId(val) {
        super.setValue(_fieldNames.RECOSOURCEID, val);
    }

    get recoStatusId() {
        return super.getValue(_fieldNames.RECOSTATUSID);
    } set recoStatusId(val) {
        super.setValue(_fieldNames.RECOSTATUSID, val);
    }

    get recoStatusMessage() {
        return super.getValue(_fieldNames.RECOSTATUSMESSAGE);
    } set recoStatusMessage(val) {
        super.setValue(_fieldNames.RECOSTATUSMESSAGE, val);
    }

    get recoScore() {
        return super.getValue(_fieldNames.RECOSCORE);
    } set recoScore(val) {
        super.setValue(_fieldNames.RECOSCORE, val);
    }

    get recoMatchLevel() {
        return super.getValue(_fieldNames.RECOMATCHLEVEL);
    } set recoMatchLevel(val) {
        super.setValue(_fieldNames.RECOMATCHLEVEL, val);
    }

    get documentType() {
        return super.getValue(_fieldNames.DOCUMENTTYPE);
    } set documentType(val) {
        super.setValue(_fieldNames.DOCUMENTTYPE, val);
    }

    get documentId() {
        return super.getValue(_fieldNames.DOCUMENTID);
    } set documentId(val) {
        super.setValue(_fieldNames.DOCUMENTID, val);
    }

    get documentNet() {
        return super.getValue(_fieldNames.DOCUMENTNET);
    } set documentNet(val) {
        super.setValue(_fieldNames.DOCUMENTNET, val);
    }

    get documentVat() {
        return super.getValue(_fieldNames.DOCUMENTVAT);
    } set documentVat(val) {
        super.setValue(_fieldNames.DOCUMENTVAT, val);
    }

    get documentGross() {
        return super.getValue(_fieldNames.DOCUMENTGROSS);
    } set documentGross(val) {
        super.setValue(_fieldNames.DOCUMENTGROSS, val);
    }

    get isMainDocument() {
        return super.getValue(_fieldNames.ISMAINDOCUMENT);
    } set isMainDocument(val) {
        super.setValue(_fieldNames.ISMAINDOCUMENT, val);
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

    get documentDRS() {
        return super.getValue(_fieldNames.DOCUMENTDRS);
    } set documentDRS(val) {
        super.setValue(_fieldNames.DOCUMENTDRS, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cp_recoSessionDocument_Collection,
    Record: Persistent_cp_recoSessionDocument,
}
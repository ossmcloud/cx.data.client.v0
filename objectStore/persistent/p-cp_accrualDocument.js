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
const _tableName = 'cp_accrualDocument';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    ACCRDOCID: 'accrDocId',
    ACCRID: 'accrId',
    DOCUMENTTYPE: 'documentType',
    DELRETID: 'delRetId',
    INVCREID: 'invCreId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    accrDocId: { name: 'accrDocId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    accrId: { name: 'accrId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    documentType: { name: 'documentType', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    delRetId: { name: 'delRetId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    invCreId: { name: 'invCreId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_accrualDocument_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_accrualDocument extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get accrDocId() {
        return super.getValue(_fieldNames.ACCRDOCID);
    }

    get accrId() {
        return super.getValue(_fieldNames.ACCRID);
    } set accrId(val) {
        super.setValue(_fieldNames.ACCRID, val);
    }

    get documentType() {
        return super.getValue(_fieldNames.DOCUMENTTYPE);
    } set documentType(val) {
        super.setValue(_fieldNames.DOCUMENTTYPE, val);
    }

    get delRetId() {
        return super.getValue(_fieldNames.DELRETID);
    } set delRetId(val) {
        super.setValue(_fieldNames.DELRETID, val);
    }

    get invCreId() {
        return super.getValue(_fieldNames.INVCREID);
    } set invCreId(val) {
        super.setValue(_fieldNames.INVCREID, val);
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
    Table: Persistent_cp_accrualDocument_Collection,
    Record: Persistent_cp_accrualDocument,
}
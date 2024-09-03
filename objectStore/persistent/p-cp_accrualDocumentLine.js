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
const _tableName = 'cp_accrualDocumentLine';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    ACCRDOCLINEID: 'accrDocLineId',
    ACCRDOCID: 'accrDocId',
    DOCLINEID: 'docLineId',
    LINENET: 'lineNet',
    LINEVAT: 'lineVat',
    LINEGROSS: 'lineGross',
    LINEDRS: 'lineDRS',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    accrDocLineId: { name: 'accrDocLineId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    accrDocId: { name: 'accrDocId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    docLineId: { name: 'docLineId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    lineNet: { name: 'lineNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    lineVat: { name: 'lineVat', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    lineGross: { name: 'lineGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    lineDRS: { name: 'lineDRS', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_accrualDocumentLine_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_accrualDocumentLine extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get accrDocLineId() {
        return super.getValue(_fieldNames.ACCRDOCLINEID);
    }

    get accrDocId() {
        return super.getValue(_fieldNames.ACCRDOCID);
    } set accrDocId(val) {
        super.setValue(_fieldNames.ACCRDOCID, val);
    }

    get docLineId() {
        return super.getValue(_fieldNames.DOCLINEID);
    } set docLineId(val) {
        super.setValue(_fieldNames.DOCLINEID, val);
    }

    get lineNet() {
        return super.getValue(_fieldNames.LINENET);
    } set lineNet(val) {
        super.setValue(_fieldNames.LINENET, val);
    }

    get lineVat() {
        return super.getValue(_fieldNames.LINEVAT);
    } set lineVat(val) {
        super.setValue(_fieldNames.LINEVAT, val);
    }

    get lineGross() {
        return super.getValue(_fieldNames.LINEGROSS);
    } set lineGross(val) {
        super.setValue(_fieldNames.LINEGROSS, val);
    }

    get lineDRS() {
        return super.getValue(_fieldNames.LINEDRS);
    } set lineDRS(val) {
        super.setValue(_fieldNames.LINEDRS, val);
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
    Table: Persistent_cp_accrualDocumentLine_Collection,
    Record: Persistent_cp_accrualDocumentLine,
}
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
const _tableName = 'cp_recoSessionDocumentLine';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RECOSESSIONDOCLINEID: 'recoSessionDocLineId',
    RECOSESSIONDOCID: 'recoSessionDocId',
    RECOMATCHLEVEL: 'recoMatchLevel',
    RECOSCORE: 'recoScore',
    LINEID: 'lineId',
    BALANCEQTY: 'balanceQty',
    BALANCERATE: 'balanceRate',
    BALANCENET: 'balanceNet',
    BALANCEVAT: 'balanceVat',
    BALANCEGROSS: 'balanceGross',
    VATRATEMISMATCH: 'vatRateMismatch',
    MATCHEDLINEID: 'matchedLineId',
    MATCHEDLINENO: 'matchedLineNo',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    BALANCEDRS: 'balanceDRS',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    recoSessionDocLineId: { name: 'recoSessionDocLineId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    recoSessionDocId: { name: 'recoSessionDocId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    recoMatchLevel: { name: 'recoMatchLevel', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    recoScore: { name: 'recoScore', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    lineId: { name: 'lineId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    balanceQty: { name: 'balanceQty', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    balanceRate: { name: 'balanceRate', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    balanceNet: { name: 'balanceNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    balanceVat: { name: 'balanceVat', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    balanceGross: { name: 'balanceGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    vatRateMismatch: { name: 'vatRateMismatch', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false },
    matchedLineId: { name: 'matchedLineId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    matchedLineNo: { name: 'matchedLineNo', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    balanceDRS: { name: 'balanceDRS', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_recoSessionDocumentLine_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_recoSessionDocumentLine extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get recoSessionDocLineId() {
        return super.getValue(_fieldNames.RECOSESSIONDOCLINEID);
    }

    get recoSessionDocId() {
        return super.getValue(_fieldNames.RECOSESSIONDOCID);
    } set recoSessionDocId(val) {
        super.setValue(_fieldNames.RECOSESSIONDOCID, val);
    }

    get recoMatchLevel() {
        return super.getValue(_fieldNames.RECOMATCHLEVEL);
    } set recoMatchLevel(val) {
        super.setValue(_fieldNames.RECOMATCHLEVEL, val);
    }

    get recoScore() {
        return super.getValue(_fieldNames.RECOSCORE);
    } set recoScore(val) {
        super.setValue(_fieldNames.RECOSCORE, val);
    }

    get lineId() {
        return super.getValue(_fieldNames.LINEID);
    } set lineId(val) {
        super.setValue(_fieldNames.LINEID, val);
    }

    get balanceQty() {
        return super.getValue(_fieldNames.BALANCEQTY);
    } set balanceQty(val) {
        super.setValue(_fieldNames.BALANCEQTY, val);
    }

    get balanceRate() {
        return super.getValue(_fieldNames.BALANCERATE);
    } set balanceRate(val) {
        super.setValue(_fieldNames.BALANCERATE, val);
    }

    get balanceNet() {
        return super.getValue(_fieldNames.BALANCENET);
    } set balanceNet(val) {
        super.setValue(_fieldNames.BALANCENET, val);
    }

    get balanceVat() {
        return super.getValue(_fieldNames.BALANCEVAT);
    } set balanceVat(val) {
        super.setValue(_fieldNames.BALANCEVAT, val);
    }

    get balanceGross() {
        return super.getValue(_fieldNames.BALANCEGROSS);
    } set balanceGross(val) {
        super.setValue(_fieldNames.BALANCEGROSS, val);
    }

    get vatRateMismatch() {
        return super.getValue(_fieldNames.VATRATEMISMATCH);
    } set vatRateMismatch(val) {
        super.setValue(_fieldNames.VATRATEMISMATCH, val);
    }

    get matchedLineId() {
        return super.getValue(_fieldNames.MATCHEDLINEID);
    } set matchedLineId(val) {
        super.setValue(_fieldNames.MATCHEDLINEID, val);
    }

    get matchedLineNo() {
        return super.getValue(_fieldNames.MATCHEDLINENO);
    } set matchedLineNo(val) {
        super.setValue(_fieldNames.MATCHEDLINENO, val);
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

    get balanceDRS() {
        return super.getValue(_fieldNames.BALANCEDRS);
    } set balanceDRS(val) {
        super.setValue(_fieldNames.BALANCEDRS, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cp_recoSessionDocumentLine_Collection,
    Record: Persistent_cp_recoSessionDocumentLine,
}
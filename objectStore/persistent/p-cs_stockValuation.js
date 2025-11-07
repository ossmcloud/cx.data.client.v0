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
const _tableName = 'cs_stockValuation';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    STOCKVALUATIONID: 'stockValuationId',
    SHOPID: 'shopId',
    DATE: 'date',
    REFERENCE: 'reference',
    NOTES: 'notes',
    TYPE: 'type',
    STATUS: 'status',
    STATUSMESSAGE: 'statusMessage',
    TOTALUNITSINSTOCK: 'totalUnitsInStock',
    TOTALCOSTVALUE: 'totalCostValue',
    TOTALRETAILVALUE: 'totalRetailValue',
    ERPTRANSMISSIONID: 'erpTransmissionId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    TRANSMISSIONID: 'transmissionId',
    ISUSEREDITED: 'isUserEdited',
    ISUSEREDITLOCKED: 'isUserEditLocked',
    ISUSEREDITEDGL: 'isUserEditedGL',
    REVERSEDATE: 'reverseDate',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    stockValuationId: { name: 'stockValuationId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    date: { name: 'date', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    reference: { name: 'reference', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    notes: { name: 'notes', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    type: { name: 'type', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    status: { name: 'status', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    statusMessage: { name: 'statusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    totalUnitsInStock: { name: 'totalUnitsInStock', dataType: 'float', pk: false, identity: false, maxLength: 13, null: false, default: '0' },
    totalCostValue: { name: 'totalCostValue', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    totalRetailValue: { name: 'totalRetailValue', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    erpTransmissionId: { name: 'erpTransmissionId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    transmissionId: { name: 'transmissionId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    isUserEdited: { name: 'isUserEdited', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    isUserEditLocked: { name: 'isUserEditLocked', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    isUserEditedGL: { name: 'isUserEditedGL', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    reverseDate: { name: 'reverseDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cs_stockValuation_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cs_stockValuation extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get stockValuationId() {
        return super.getValue(_fieldNames.STOCKVALUATIONID);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get date() {
        return super.getValue(_fieldNames.DATE);
    } set date(val) {
        super.setValue(_fieldNames.DATE, val);
    }

    get reference() {
        return super.getValue(_fieldNames.REFERENCE);
    } set reference(val) {
        super.setValue(_fieldNames.REFERENCE, val);
    }

    get notes() {
        return super.getValue(_fieldNames.NOTES);
    } set notes(val) {
        super.setValue(_fieldNames.NOTES, val);
    }

    get type() {
        return super.getValue(_fieldNames.TYPE);
    } set type(val) {
        super.setValue(_fieldNames.TYPE, val);
    }

    get status() {
        return super.getValue(_fieldNames.STATUS);
    } set status(val) {
        super.setValue(_fieldNames.STATUS, val);
    }

    get statusMessage() {
        return super.getValue(_fieldNames.STATUSMESSAGE);
    } set statusMessage(val) {
        super.setValue(_fieldNames.STATUSMESSAGE, val);
    }

    get totalUnitsInStock() {
        return super.getValue(_fieldNames.TOTALUNITSINSTOCK);
    } set totalUnitsInStock(val) {
        super.setValue(_fieldNames.TOTALUNITSINSTOCK, val);
    }

    get totalCostValue() {
        return super.getValue(_fieldNames.TOTALCOSTVALUE);
    } set totalCostValue(val) {
        super.setValue(_fieldNames.TOTALCOSTVALUE, val);
    }

    get totalRetailValue() {
        return super.getValue(_fieldNames.TOTALRETAILVALUE);
    } set totalRetailValue(val) {
        super.setValue(_fieldNames.TOTALRETAILVALUE, val);
    }

    get erpTransmissionId() {
        return super.getValue(_fieldNames.ERPTRANSMISSIONID);
    } set erpTransmissionId(val) {
        super.setValue(_fieldNames.ERPTRANSMISSIONID, val);
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

    get transmissionId() {
        return super.getValue(_fieldNames.TRANSMISSIONID);
    } set transmissionId(val) {
        super.setValue(_fieldNames.TRANSMISSIONID, val);
    }

    get isUserEdited() {
        return super.getValue(_fieldNames.ISUSEREDITED);
    } set isUserEdited(val) {
        super.setValue(_fieldNames.ISUSEREDITED, val);
    }

    get isUserEditLocked() {
        return super.getValue(_fieldNames.ISUSEREDITLOCKED);
    } set isUserEditLocked(val) {
        super.setValue(_fieldNames.ISUSEREDITLOCKED, val);
    }

    get isUserEditedGL() {
        return super.getValue(_fieldNames.ISUSEREDITEDGL);
    } set isUserEditedGL(val) {
        super.setValue(_fieldNames.ISUSEREDITEDGL, val);
    }

    get reverseDate() {
        return super.getValue(_fieldNames.REVERSEDATE);
    } set reverseDate(val) {
        super.setValue(_fieldNames.REVERSEDATE, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cs_stockValuation_Collection,
    Record: Persistent_cs_stockValuation,
}
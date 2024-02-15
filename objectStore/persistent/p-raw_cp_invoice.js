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
const _tableName = 'raw_cp_invoice';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RAWINVOICEID: 'rawInvoiceId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    SUPPLIERCODE: 'supplierCode',
    DOCUMENTTYPE: 'documentType',
    DOCUMENTID: 'documentId',
    DOCUMENTNUMBER: 'documentNumber',
    DOCUMENTDATE: 'documentDate',
    DOCUMENTREFERENCE: 'documentReference',
    DOCUMENTSECONDREFERENCE: 'documentSecondReference',
    DOCUMENTMEMO: 'documentMemo',
    CURRENCY: 'currency',
    EPOSTOTALDISCOUNT: 'eposTotalDiscount',
    EPOSTOTALNET: 'eposTotalNet',
    EPOSTOTALVAT: 'eposTotalVat',
    EPOSTOTALGROSS: 'eposTotalGross',
    UPLOADDATE: 'uploadDate',
    CREATED: 'created',
    SURCHARGEVALUE: 'surchargeValue',
    SUPPLIERNAME: 'supplierName',
    TOTALDRS: 'totalDRS',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    rawInvoiceId: { name: 'rawInvoiceId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    supplierCode: { name: 'supplierCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    documentType: { name: 'documentType', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    documentId: { name: 'documentId', dataType: 'varchar', pk: false, identity: false, maxLength: 200, null: false },
    documentNumber: { name: 'documentNumber', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    documentDate: { name: 'documentDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    documentReference: { name: 'documentReference', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    documentSecondReference: { name: 'documentSecondReference', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    documentMemo: { name: 'documentMemo', dataType: 'varchar', pk: false, identity: false, maxLength: 500, null: true },
    currency: { name: 'currency', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: true },
    eposTotalDiscount: { name: 'eposTotalDiscount', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    eposTotalNet: { name: 'eposTotalNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    eposTotalVat: { name: 'eposTotalVat', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    eposTotalGross: { name: 'eposTotalGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    uploadDate: { name: 'uploadDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    surchargeValue: { name: 'surchargeValue', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    supplierName: { name: 'supplierName', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    totalDRS: { name: 'totalDRS', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_cp_invoice_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_cp_invoice extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get rawInvoiceId() {
        return super.getValue(_fieldNames.RAWINVOICEID);
    }

    get transmissionID() {
        return super.getValue(_fieldNames.TRANSMISSIONID);
    } set transmissionID(val) {
        super.setValue(_fieldNames.TRANSMISSIONID, val);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get supplierCode() {
        return super.getValue(_fieldNames.SUPPLIERCODE);
    } set supplierCode(val) {
        super.setValue(_fieldNames.SUPPLIERCODE, val);
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

    get documentNumber() {
        return super.getValue(_fieldNames.DOCUMENTNUMBER);
    } set documentNumber(val) {
        super.setValue(_fieldNames.DOCUMENTNUMBER, val);
    }

    get documentDate() {
        return super.getValue(_fieldNames.DOCUMENTDATE);
    } set documentDate(val) {
        super.setValue(_fieldNames.DOCUMENTDATE, val);
    }

    get documentReference() {
        return super.getValue(_fieldNames.DOCUMENTREFERENCE);
    } set documentReference(val) {
        super.setValue(_fieldNames.DOCUMENTREFERENCE, val);
    }

    get documentSecondReference() {
        return super.getValue(_fieldNames.DOCUMENTSECONDREFERENCE);
    } set documentSecondReference(val) {
        super.setValue(_fieldNames.DOCUMENTSECONDREFERENCE, val);
    }

    get documentMemo() {
        return super.getValue(_fieldNames.DOCUMENTMEMO);
    } set documentMemo(val) {
        super.setValue(_fieldNames.DOCUMENTMEMO, val);
    }

    get currency() {
        return super.getValue(_fieldNames.CURRENCY);
    } set currency(val) {
        super.setValue(_fieldNames.CURRENCY, val);
    }

    get eposTotalDiscount() {
        return super.getValue(_fieldNames.EPOSTOTALDISCOUNT);
    } set eposTotalDiscount(val) {
        super.setValue(_fieldNames.EPOSTOTALDISCOUNT, val);
    }

    get eposTotalNet() {
        return super.getValue(_fieldNames.EPOSTOTALNET);
    } set eposTotalNet(val) {
        super.setValue(_fieldNames.EPOSTOTALNET, val);
    }

    get eposTotalVat() {
        return super.getValue(_fieldNames.EPOSTOTALVAT);
    } set eposTotalVat(val) {
        super.setValue(_fieldNames.EPOSTOTALVAT, val);
    }

    get eposTotalGross() {
        return super.getValue(_fieldNames.EPOSTOTALGROSS);
    } set eposTotalGross(val) {
        super.setValue(_fieldNames.EPOSTOTALGROSS, val);
    }

    get uploadDate() {
        return super.getValue(_fieldNames.UPLOADDATE);
    } set uploadDate(val) {
        super.setValue(_fieldNames.UPLOADDATE, val);
    }

    get created() {
        return super.getValue(_fieldNames.CREATED);
    } set created(val) {
        super.setValue(_fieldNames.CREATED, val);
    }

    get surchargeValue() {
        return super.getValue(_fieldNames.SURCHARGEVALUE);
    } set surchargeValue(val) {
        super.setValue(_fieldNames.SURCHARGEVALUE, val);
    }

    get supplierName() {
        return super.getValue(_fieldNames.SUPPLIERNAME);
    } set supplierName(val) {
        super.setValue(_fieldNames.SUPPLIERNAME, val);
    }

    get totalDRS() {
        return super.getValue(_fieldNames.TOTALDRS);
    } set totalDRS(val) {
        super.setValue(_fieldNames.TOTALDRS, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_raw_cp_invoice_Collection,
    Record: Persistent_raw_cp_invoice,
}
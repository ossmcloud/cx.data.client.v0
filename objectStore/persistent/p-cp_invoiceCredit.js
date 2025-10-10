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
const _tableName = 'cp_invoiceCredit';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    INVCREID: 'invCreId',
    INVGRPID: 'invGrpId',
    TRANSMISSIONID: 'transmissionID',
    SOURCEID: 'sourceID',
    SHOPID: 'shopId',
    SUPPLIERCODE: 'supplierCode',
    DOCUMENTTYPE: 'documentType',
    DOCUMENTSTATUS: 'documentStatus',
    DOCUMENTSTATUSMESSAGE: 'documentStatusMessage',
    DOCUMENTID: 'documentId',
    DOCUMENTNUMBER: 'documentNumber',
    DOCUMENTDATE: 'documentDate',
    DOCUMENTREFERENCE: 'documentReference',
    DOCUMENTSECONDREFERENCE: 'documentSecondReference',
    DOCUMENTMEMO: 'documentMemo',
    DOCKETNUMBER: 'docketNumber',
    DOCKETDATE: 'docketDate',
    CURRENCY: 'currency',
    EPOSTOTALDISCOUNT: 'eposTotalDiscount',
    EPOSTOTALNET: 'eposTotalNet',
    EPOSTOTALVAT: 'eposTotalVat',
    EPOSTOTALGROSS: 'eposTotalGross',
    SURCHARGEVALUE: 'surchargeValue',
    TOTALDISCOUNT: 'totalDiscount',
    TOTALNET: 'totalNet',
    TOTALVAT: 'totalVat',
    TOTALGROSS: 'totalGross',
    UPLOADDATE: 'uploadDate',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    ERPTRANSMISSIONID: 'erpTransmissionId',
    TRADERACCOUNTID: 'traderAccountId',
    ISUSEREDITED: 'isUserEdited',
    CREATEDFROM: 'createdFrom',
    CREATEDFROMTYPE: 'createdFromType',
    DOCIMPID: 'docImpId',
    TOTALDRS: 'totalDRS',
    ISUSEREDITLOCKED: 'isUserEditLocked',
    ISUSEREDITEDGL: 'isUserEditedGL',
    ISMANUAL: 'isManual',
    INACTIVE: 'inactive',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    invCreId: { name: 'invCreId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    invGrpId: { name: 'invGrpId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    sourceID: { name: 'sourceID', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    supplierCode: { name: 'supplierCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    documentType: { name: 'documentType', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    documentStatus: { name: 'documentStatus', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '-1' },
    documentStatusMessage: { name: 'documentStatusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    documentId: { name: 'documentId', dataType: 'varchar', pk: false, identity: false, maxLength: 200, null: false },
    documentNumber: { name: 'documentNumber', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    documentDate: { name: 'documentDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    documentReference: { name: 'documentReference', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    documentSecondReference: { name: 'documentSecondReference', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    documentMemo: { name: 'documentMemo', dataType: 'varchar', pk: false, identity: false, maxLength: 500, null: true },
    docketNumber: { name: 'docketNumber', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    docketDate: { name: 'docketDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: true },
    currency: { name: 'currency', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: true },
    eposTotalDiscount: { name: 'eposTotalDiscount', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    eposTotalNet: { name: 'eposTotalNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    eposTotalVat: { name: 'eposTotalVat', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    eposTotalGross: { name: 'eposTotalGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    surchargeValue: { name: 'surchargeValue', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    totalDiscount: { name: 'totalDiscount', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    totalNet: { name: 'totalNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    totalVat: { name: 'totalVat', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    totalGross: { name: 'totalGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    uploadDate: { name: 'uploadDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpTransmissionId: { name: 'erpTransmissionId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    traderAccountId: { name: 'traderAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    isUserEdited: { name: 'isUserEdited', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    createdFrom: { name: 'createdFrom', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    createdFromType: { name: 'createdFromType', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    docImpId: { name: 'docImpId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    totalDRS: { name: 'totalDRS', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    isUserEditLocked: { name: 'isUserEditLocked', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    isUserEditedGL: { name: 'isUserEditedGL', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    isManual: { name: 'isManual', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    inactive: { name: 'inactive', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_invoiceCredit_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_invoiceCredit extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get invCreId() {
        return super.getValue(_fieldNames.INVCREID);
    }

    get invGrpId() {
        return super.getValue(_fieldNames.INVGRPID);
    } set invGrpId(val) {
        super.setValue(_fieldNames.INVGRPID, val);
    }

    get transmissionID() {
        return super.getValue(_fieldNames.TRANSMISSIONID);
    } set transmissionID(val) {
        super.setValue(_fieldNames.TRANSMISSIONID, val);
    }

    get sourceID() {
        return super.getValue(_fieldNames.SOURCEID);
    } set sourceID(val) {
        super.setValue(_fieldNames.SOURCEID, val);
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

    get documentStatus() {
        return super.getValue(_fieldNames.DOCUMENTSTATUS);
    } set documentStatus(val) {
        super.setValue(_fieldNames.DOCUMENTSTATUS, val);
    }

    get documentStatusMessage() {
        return super.getValue(_fieldNames.DOCUMENTSTATUSMESSAGE);
    } set documentStatusMessage(val) {
        super.setValue(_fieldNames.DOCUMENTSTATUSMESSAGE, val);
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

    get docketNumber() {
        return super.getValue(_fieldNames.DOCKETNUMBER);
    } set docketNumber(val) {
        super.setValue(_fieldNames.DOCKETNUMBER, val);
    }

    get docketDate() {
        return super.getValue(_fieldNames.DOCKETDATE);
    } set docketDate(val) {
        super.setValue(_fieldNames.DOCKETDATE, val);
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

    get surchargeValue() {
        return super.getValue(_fieldNames.SURCHARGEVALUE);
    } set surchargeValue(val) {
        super.setValue(_fieldNames.SURCHARGEVALUE, val);
    }

    get totalDiscount() {
        return super.getValue(_fieldNames.TOTALDISCOUNT);
    } set totalDiscount(val) {
        super.setValue(_fieldNames.TOTALDISCOUNT, val);
    }

    get totalNet() {
        return super.getValue(_fieldNames.TOTALNET);
    } set totalNet(val) {
        super.setValue(_fieldNames.TOTALNET, val);
    }

    get totalVat() {
        return super.getValue(_fieldNames.TOTALVAT);
    } set totalVat(val) {
        super.setValue(_fieldNames.TOTALVAT, val);
    }

    get totalGross() {
        return super.getValue(_fieldNames.TOTALGROSS);
    } set totalGross(val) {
        super.setValue(_fieldNames.TOTALGROSS, val);
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

    get erpTransmissionId() {
        return super.getValue(_fieldNames.ERPTRANSMISSIONID);
    } set erpTransmissionId(val) {
        super.setValue(_fieldNames.ERPTRANSMISSIONID, val);
    }

    get traderAccountId() {
        return super.getValue(_fieldNames.TRADERACCOUNTID);
    } set traderAccountId(val) {
        super.setValue(_fieldNames.TRADERACCOUNTID, val);
    }

    get isUserEdited() {
        return super.getValue(_fieldNames.ISUSEREDITED);
    } set isUserEdited(val) {
        super.setValue(_fieldNames.ISUSEREDITED, val);
    }

    get createdFrom() {
        return super.getValue(_fieldNames.CREATEDFROM);
    } set createdFrom(val) {
        super.setValue(_fieldNames.CREATEDFROM, val);
    }

    get createdFromType() {
        return super.getValue(_fieldNames.CREATEDFROMTYPE);
    } set createdFromType(val) {
        super.setValue(_fieldNames.CREATEDFROMTYPE, val);
    }

    get docImpId() {
        return super.getValue(_fieldNames.DOCIMPID);
    } set docImpId(val) {
        super.setValue(_fieldNames.DOCIMPID, val);
    }

    get totalDRS() {
        return super.getValue(_fieldNames.TOTALDRS);
    } set totalDRS(val) {
        super.setValue(_fieldNames.TOTALDRS, val);
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

    get isManual() {
        return super.getValue(_fieldNames.ISMANUAL);
    } set isManual(val) {
        super.setValue(_fieldNames.ISMANUAL, val);
    }

    get inactive() {
        return super.getValue(_fieldNames.INACTIVE);
    } set inactive(val) {
        super.setValue(_fieldNames.INACTIVE, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cp_invoiceCredit_Collection,
    Record: Persistent_cp_invoiceCredit,
}
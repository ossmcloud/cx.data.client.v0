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
const _tableName = 'cp_accrual';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    ACCRID: 'accrId',
    SHOPID: 'shopId',
    DOCUMENTSTATUS: 'documentStatus',
    DOCUMENTSTATUSMESSAGE: 'documentStatusMessage',
    DOCUMENTNUMBER: 'documentNumber',
    DOCUMENTDATE: 'documentDate',
    DOCUMENTREFERENCE: 'documentReference',
    DOCUMENTSECONDREFERENCE: 'documentSecondReference',
    DOCUMENTMEMO: 'documentMemo',
    CURRENCY: 'currency',
    TOTALNET: 'totalNet',
    TOTALVAT: 'totalVat',
    TOTALGROSS: 'totalGross',
    TOTALDRS: 'totalDRS',
    SYSINFO: 'sysInfo',
    ERPTRANSMISSIONID: 'erpTransmissionId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    accrId: { name: 'accrId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    documentStatus: { name: 'documentStatus', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    documentStatusMessage: { name: 'documentStatusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    documentNumber: { name: 'documentNumber', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    documentDate: { name: 'documentDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    documentReference: { name: 'documentReference', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    documentSecondReference: { name: 'documentSecondReference', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    documentMemo: { name: 'documentMemo', dataType: 'varchar', pk: false, identity: false, maxLength: 500, null: true },
    currency: { name: 'currency', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: true },
    totalNet: { name: 'totalNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    totalVat: { name: 'totalVat', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    totalGross: { name: 'totalGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    totalDRS: { name: 'totalDRS', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    sysInfo: { name: 'sysInfo', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    erpTransmissionId: { name: 'erpTransmissionId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_accrual_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_accrual extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get accrId() {
        return super.getValue(_fieldNames.ACCRID);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
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

    get totalDRS() {
        return super.getValue(_fieldNames.TOTALDRS);
    } set totalDRS(val) {
        super.setValue(_fieldNames.TOTALDRS, val);
    }

    get sysInfo() {
        return super.getValue(_fieldNames.SYSINFO);
    } set sysInfo(val) {
        super.setValue(_fieldNames.SYSINFO, val);
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


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cp_accrual_Collection,
    Record: Persistent_cp_accrual,
}
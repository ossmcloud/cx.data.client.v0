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
const _tableName = 'cr_erp_transaction';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TRANID: 'tranId',
    CBTRANID: 'cbTranId',
    SHOPID: 'shopId',
    ERPTRANTYPEID: 'erpTranTypeId',
    EPOSACCOUNTREFERENCE: 'eposAccountReference',
    TRANSACTIONDATE: 'transactionDate',
    TRANSACTIONREFERENCE: 'transactionReference',
    TRANSACTIONSECONDREFERENCE: 'transactionSecondReference',
    ACCOUNTREFERENCE: 'accountReference',
    ACCOUNTNAME: 'accountName',
    BANKREFERENCE: 'bankReference',
    BANKNAME: 'bankName',
    VALUENET: 'valueNet',
    VALUETAX: 'valueTax',
    VALUEGROSS: 'valueGross',
    POSTINGREFERENCE: 'postingReference',
    POSTINGURN: 'postingURN',
    STATUS: 'status',
    STATUSMESSAGE: 'statusMessage',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    TRANTYPECONFIGID: 'tranTypeConfigId',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    tranId: { name: 'tranId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    cbTranId: { name: 'cbTranId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    erpTranTypeId: { name: 'erpTranTypeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    eposAccountReference: { name: 'eposAccountReference', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    transactionDate: { name: 'transactionDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    transactionReference: { name: 'transactionReference', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    transactionSecondReference: { name: 'transactionSecondReference', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    accountReference: { name: 'accountReference', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    accountName: { name: 'accountName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    bankReference: { name: 'bankReference', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    bankName: { name: 'bankName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    valueNet: { name: 'valueNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    valueTax: { name: 'valueTax', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    valueGross: { name: 'valueGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    postingReference: { name: 'postingReference', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    postingURN: { name: 'postingURN', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    status: { name: 'status', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    statusMessage: { name: 'statusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    tranTypeConfigId: { name: 'tranTypeConfigId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cr_erp_transaction_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cr_erp_transaction extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get tranId() {
        return super.getValue(_fieldNames.TRANID);
    }

    get cbTranId() {
        return super.getValue(_fieldNames.CBTRANID);
    } set cbTranId(val) {
        super.setValue(_fieldNames.CBTRANID, val);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get erpTranTypeId() {
        return super.getValue(_fieldNames.ERPTRANTYPEID);
    } set erpTranTypeId(val) {
        super.setValue(_fieldNames.ERPTRANTYPEID, val);
    }

    get eposAccountReference() {
        return super.getValue(_fieldNames.EPOSACCOUNTREFERENCE);
    } set eposAccountReference(val) {
        super.setValue(_fieldNames.EPOSACCOUNTREFERENCE, val);
    }

    get transactionDate() {
        return super.getValue(_fieldNames.TRANSACTIONDATE);
    } set transactionDate(val) {
        super.setValue(_fieldNames.TRANSACTIONDATE, val);
    }

    get transactionReference() {
        return super.getValue(_fieldNames.TRANSACTIONREFERENCE);
    } set transactionReference(val) {
        super.setValue(_fieldNames.TRANSACTIONREFERENCE, val);
    }

    get transactionSecondReference() {
        return super.getValue(_fieldNames.TRANSACTIONSECONDREFERENCE);
    } set transactionSecondReference(val) {
        super.setValue(_fieldNames.TRANSACTIONSECONDREFERENCE, val);
    }

    get accountReference() {
        return super.getValue(_fieldNames.ACCOUNTREFERENCE);
    } set accountReference(val) {
        super.setValue(_fieldNames.ACCOUNTREFERENCE, val);
    }

    get accountName() {
        return super.getValue(_fieldNames.ACCOUNTNAME);
    } set accountName(val) {
        super.setValue(_fieldNames.ACCOUNTNAME, val);
    }

    get bankReference() {
        return super.getValue(_fieldNames.BANKREFERENCE);
    } set bankReference(val) {
        super.setValue(_fieldNames.BANKREFERENCE, val);
    }

    get bankName() {
        return super.getValue(_fieldNames.BANKNAME);
    } set bankName(val) {
        super.setValue(_fieldNames.BANKNAME, val);
    }

    get valueNet() {
        return super.getValue(_fieldNames.VALUENET);
    } set valueNet(val) {
        super.setValue(_fieldNames.VALUENET, val);
    }

    get valueTax() {
        return super.getValue(_fieldNames.VALUETAX);
    } set valueTax(val) {
        super.setValue(_fieldNames.VALUETAX, val);
    }

    get valueGross() {
        return super.getValue(_fieldNames.VALUEGROSS);
    } set valueGross(val) {
        super.setValue(_fieldNames.VALUEGROSS, val);
    }

    get postingReference() {
        return super.getValue(_fieldNames.POSTINGREFERENCE);
    } set postingReference(val) {
        super.setValue(_fieldNames.POSTINGREFERENCE, val);
    }

    get postingURN() {
        return super.getValue(_fieldNames.POSTINGURN);
    } set postingURN(val) {
        super.setValue(_fieldNames.POSTINGURN, val);
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

    get tranTypeConfigId() {
        return super.getValue(_fieldNames.TRANTYPECONFIGID);
    } set tranTypeConfigId(val) {
        super.setValue(_fieldNames.TRANTYPECONFIGID, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cr_erp_transaction_Collection,
    Record: Persistent_cr_erp_transaction,
}
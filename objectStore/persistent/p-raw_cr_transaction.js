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
const _tableName = 'raw_cr_transaction';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RAWTRANSACTIONID: 'rawTransactionId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    EPOSTRANSACTIONID: 'eposTransactionId',
    EPOSTRANSACTIONNO: 'eposTransactionNo',
    TRANSACTIONDATE: 'transactionDate',
    TRANSACTIONDATETIME: 'transactionDateTime',
    TRANSACTIONTYPE: 'transactionType',
    TRANSACTIONSUBTYPE: 'transactionSubType',
    TILLID: 'tillId',
    CASHIERID: 'cashierId',
    REFERENCE1: 'reference1',
    REFERENCE2: 'reference2',
    LINENUMBER: 'lineNumber',
    PLUCODE: 'pluCode',
    ITEMBARCODE: 'itemBarCode',
    ITEMDESCRIPTION: 'itemDescription',
    DEPARTMENT: 'department',
    SUBDEPARTMENT: 'subDepartment',
    QUANTITY: 'quantity',
    UNITCOST: 'unitCost',
    UNITPRICE: 'unitPrice',
    VALUEGROSS: 'valueGross',
    VALUENET: 'valueNet',
    VALUEDISCOUNT: 'valueDiscount',
    VALUEDISCOUNTPROMO: 'valueDiscountPromo',
    VALUETAX: 'valueTax',
    TAXCODE: 'taxCode',
    TAXRATE: 'taxRate',
    CHANGE: 'change',
    CASHBACK: 'cashBack',
    CUSTOMERACCOUNT: 'customerAccount',
    PUMPNUMBER: 'pumpNumber',
    CARDTYPE: 'cardType',
    CARDNAME: 'cardName',
    PAIDINOUTREASONID: 'paidInOutReasonId',
    PAIDINOUTREASONDESCRIPTION: 'paidInOutReasonDescription',
    VOIDED: 'voided',
    BUNKERED: 'bunkered',
    CREATED: 'created',
    ANALYSIS1: 'analysis1',
    ANALYSIS2: 'analysis2',
    ANALYSIS3: 'analysis3',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    rawTransactionId: { name: 'rawTransactionId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    eposTransactionId: { name: 'eposTransactionId', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    eposTransactionNo: { name: 'eposTransactionNo', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    transactionDate: { name: 'transactionDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    transactionDateTime: { name: 'transactionDateTime', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    transactionType: { name: 'transactionType', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    transactionSubType: { name: 'transactionSubType', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    tillId: { name: 'tillId', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: true },
    cashierId: { name: 'cashierId', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: true },
    reference1: { name: 'reference1', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    reference2: { name: 'reference2', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    lineNumber: { name: 'lineNumber', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    pluCode: { name: 'pluCode', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    itemBarCode: { name: 'itemBarCode', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    itemDescription: { name: 'itemDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    department: { name: 'department', dataType: 'varchar', pk: false, identity: false, maxLength: 32, null: true },
    subDepartment: { name: 'subDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    quantity: { name: 'quantity', dataType: 'money', pk: false, identity: false, maxLength: 9, null: true },
    unitCost: { name: 'unitCost', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    unitPrice: { name: 'unitPrice', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    valueGross: { name: 'valueGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    valueNet: { name: 'valueNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    valueDiscount: { name: 'valueDiscount', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    valueDiscountPromo: { name: 'valueDiscountPromo', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    valueTax: { name: 'valueTax', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    taxCode: { name: 'taxCode', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: true },
    taxRate: { name: 'taxRate', dataType: 'money', pk: false, identity: false, maxLength: 5, null: true },
    change: { name: 'change', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    cashBack: { name: 'cashBack', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    customerAccount: { name: 'customerAccount', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    pumpNumber: { name: 'pumpNumber', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: true },
    cardType: { name: 'cardType', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: true },
    cardName: { name: 'cardName', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    paidInOutReasonId: { name: 'paidInOutReasonId', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: true },
    paidInOutReasonDescription: { name: 'paidInOutReasonDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    voided: { name: 'voided', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    bunkered: { name: 'bunkered', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    analysis1: { name: 'analysis1', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    analysis2: { name: 'analysis2', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    analysis3: { name: 'analysis3', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_cr_transaction_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_cr_transaction extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get rawTransactionId() {
        return super.getValue(_fieldNames.RAWTRANSACTIONID);
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

    get eposTransactionId() {
        return super.getValue(_fieldNames.EPOSTRANSACTIONID);
    } set eposTransactionId(val) {
        super.setValue(_fieldNames.EPOSTRANSACTIONID, val);
    }

    get eposTransactionNo() {
        return super.getValue(_fieldNames.EPOSTRANSACTIONNO);
    } set eposTransactionNo(val) {
        super.setValue(_fieldNames.EPOSTRANSACTIONNO, val);
    }

    get transactionDate() {
        return super.getValue(_fieldNames.TRANSACTIONDATE);
    } set transactionDate(val) {
        super.setValue(_fieldNames.TRANSACTIONDATE, val);
    }

    get transactionDateTime() {
        return super.getValue(_fieldNames.TRANSACTIONDATETIME);
    } set transactionDateTime(val) {
        super.setValue(_fieldNames.TRANSACTIONDATETIME, val);
    }

    get transactionType() {
        return super.getValue(_fieldNames.TRANSACTIONTYPE);
    } set transactionType(val) {
        super.setValue(_fieldNames.TRANSACTIONTYPE, val);
    }

    get transactionSubType() {
        return super.getValue(_fieldNames.TRANSACTIONSUBTYPE);
    } set transactionSubType(val) {
        super.setValue(_fieldNames.TRANSACTIONSUBTYPE, val);
    }

    get tillId() {
        return super.getValue(_fieldNames.TILLID);
    } set tillId(val) {
        super.setValue(_fieldNames.TILLID, val);
    }

    get cashierId() {
        return super.getValue(_fieldNames.CASHIERID);
    } set cashierId(val) {
        super.setValue(_fieldNames.CASHIERID, val);
    }

    get reference1() {
        return super.getValue(_fieldNames.REFERENCE1);
    } set reference1(val) {
        super.setValue(_fieldNames.REFERENCE1, val);
    }

    get reference2() {
        return super.getValue(_fieldNames.REFERENCE2);
    } set reference2(val) {
        super.setValue(_fieldNames.REFERENCE2, val);
    }

    get lineNumber() {
        return super.getValue(_fieldNames.LINENUMBER);
    } set lineNumber(val) {
        super.setValue(_fieldNames.LINENUMBER, val);
    }

    get pluCode() {
        return super.getValue(_fieldNames.PLUCODE);
    } set pluCode(val) {
        super.setValue(_fieldNames.PLUCODE, val);
    }

    get itemBarCode() {
        return super.getValue(_fieldNames.ITEMBARCODE);
    } set itemBarCode(val) {
        super.setValue(_fieldNames.ITEMBARCODE, val);
    }

    get itemDescription() {
        return super.getValue(_fieldNames.ITEMDESCRIPTION);
    } set itemDescription(val) {
        super.setValue(_fieldNames.ITEMDESCRIPTION, val);
    }

    get department() {
        return super.getValue(_fieldNames.DEPARTMENT);
    } set department(val) {
        super.setValue(_fieldNames.DEPARTMENT, val);
    }

    get subDepartment() {
        return super.getValue(_fieldNames.SUBDEPARTMENT);
    } set subDepartment(val) {
        super.setValue(_fieldNames.SUBDEPARTMENT, val);
    }

    get quantity() {
        return super.getValue(_fieldNames.QUANTITY);
    } set quantity(val) {
        super.setValue(_fieldNames.QUANTITY, val);
    }

    get unitCost() {
        return super.getValue(_fieldNames.UNITCOST);
    } set unitCost(val) {
        super.setValue(_fieldNames.UNITCOST, val);
    }

    get unitPrice() {
        return super.getValue(_fieldNames.UNITPRICE);
    } set unitPrice(val) {
        super.setValue(_fieldNames.UNITPRICE, val);
    }

    get valueGross() {
        return super.getValue(_fieldNames.VALUEGROSS);
    } set valueGross(val) {
        super.setValue(_fieldNames.VALUEGROSS, val);
    }

    get valueNet() {
        return super.getValue(_fieldNames.VALUENET);
    } set valueNet(val) {
        super.setValue(_fieldNames.VALUENET, val);
    }

    get valueDiscount() {
        return super.getValue(_fieldNames.VALUEDISCOUNT);
    } set valueDiscount(val) {
        super.setValue(_fieldNames.VALUEDISCOUNT, val);
    }

    get valueDiscountPromo() {
        return super.getValue(_fieldNames.VALUEDISCOUNTPROMO);
    } set valueDiscountPromo(val) {
        super.setValue(_fieldNames.VALUEDISCOUNTPROMO, val);
    }

    get valueTax() {
        return super.getValue(_fieldNames.VALUETAX);
    } set valueTax(val) {
        super.setValue(_fieldNames.VALUETAX, val);
    }

    get taxCode() {
        return super.getValue(_fieldNames.TAXCODE);
    } set taxCode(val) {
        super.setValue(_fieldNames.TAXCODE, val);
    }

    get taxRate() {
        return super.getValue(_fieldNames.TAXRATE);
    } set taxRate(val) {
        super.setValue(_fieldNames.TAXRATE, val);
    }

    get change() {
        return super.getValue(_fieldNames.CHANGE);
    } set change(val) {
        super.setValue(_fieldNames.CHANGE, val);
    }

    get cashBack() {
        return super.getValue(_fieldNames.CASHBACK);
    } set cashBack(val) {
        super.setValue(_fieldNames.CASHBACK, val);
    }

    get customerAccount() {
        return super.getValue(_fieldNames.CUSTOMERACCOUNT);
    } set customerAccount(val) {
        super.setValue(_fieldNames.CUSTOMERACCOUNT, val);
    }

    get pumpNumber() {
        return super.getValue(_fieldNames.PUMPNUMBER);
    } set pumpNumber(val) {
        super.setValue(_fieldNames.PUMPNUMBER, val);
    }

    get cardType() {
        return super.getValue(_fieldNames.CARDTYPE);
    } set cardType(val) {
        super.setValue(_fieldNames.CARDTYPE, val);
    }

    get cardName() {
        return super.getValue(_fieldNames.CARDNAME);
    } set cardName(val) {
        super.setValue(_fieldNames.CARDNAME, val);
    }

    get paidInOutReasonId() {
        return super.getValue(_fieldNames.PAIDINOUTREASONID);
    } set paidInOutReasonId(val) {
        super.setValue(_fieldNames.PAIDINOUTREASONID, val);
    }

    get paidInOutReasonDescription() {
        return super.getValue(_fieldNames.PAIDINOUTREASONDESCRIPTION);
    } set paidInOutReasonDescription(val) {
        super.setValue(_fieldNames.PAIDINOUTREASONDESCRIPTION, val);
    }

    get voided() {
        return super.getValue(_fieldNames.VOIDED);
    } set voided(val) {
        super.setValue(_fieldNames.VOIDED, val);
    }

    get bunkered() {
        return super.getValue(_fieldNames.BUNKERED);
    } set bunkered(val) {
        super.setValue(_fieldNames.BUNKERED, val);
    }

    get created() {
        return super.getValue(_fieldNames.CREATED);
    } set created(val) {
        super.setValue(_fieldNames.CREATED, val);
    }

    get analysis1() {
        return super.getValue(_fieldNames.ANALYSIS1);
    } set analysis1(val) {
        super.setValue(_fieldNames.ANALYSIS1, val);
    }

    get analysis2() {
        return super.getValue(_fieldNames.ANALYSIS2);
    } set analysis2(val) {
        super.setValue(_fieldNames.ANALYSIS2, val);
    }

    get analysis3() {
        return super.getValue(_fieldNames.ANALYSIS3);
    } set analysis3(val) {
        super.setValue(_fieldNames.ANALYSIS3, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_raw_cr_transaction_Collection,
    Record: Persistent_raw_cr_transaction,
}
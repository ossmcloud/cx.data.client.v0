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
const _tableName = 'cx_traderAccount';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TRADERACCOUNTID: 'traderAccountId',
    SHOPID: 'shopId',
    TRADERTYPE: 'traderType',
    TRADERCODE: 'traderCode',
    TRADERNAME: 'traderName',
    COUNTRYCODE: 'countryCode',
    ADDRESS1: 'address1',
    ADDRESS2: 'address2',
    ADDRESS3: 'address3',
    ADDRESS4: 'address4',
    POSTCODE: 'postCode',
    CONTACT: 'contact',
    PHONE: 'phone',
    ISWHOLESALER: 'isWholesaler',
    WHOLESALERCODE: 'wholesalerCode',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    ERPTRADERACCOUNTID: 'erpTraderAccountId',
    ANALYSIS1: 'analysis1',
    ANALYSIS2: 'analysis2',
    ANALYSIS3: 'analysis3',
    ISMANUAL: 'isManual',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    traderAccountId: { name: 'traderAccountId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    traderType: { name: 'traderType', dataType: 'varchar', pk: false, identity: false, maxLength: 1, null: false },
    traderCode: { name: 'traderCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    traderName: { name: 'traderName', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    countryCode: { name: 'countryCode', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: true },
    address1: { name: 'address1', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    address2: { name: 'address2', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    address3: { name: 'address3', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    address4: { name: 'address4', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    postCode: { name: 'postCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    contact: { name: 'contact', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    phone: { name: 'phone', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    isWholesaler: { name: 'isWholesaler', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    wholesalerCode: { name: 'wholesalerCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpTraderAccountId: { name: 'erpTraderAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    analysis1: { name: 'analysis1', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    analysis2: { name: 'analysis2', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    analysis3: { name: 'analysis3', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    isManual: { name: 'isManual', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_traderAccount_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_traderAccount extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get traderAccountId() {
        return super.getValue(_fieldNames.TRADERACCOUNTID);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get traderType() {
        return super.getValue(_fieldNames.TRADERTYPE);
    } set traderType(val) {
        super.setValue(_fieldNames.TRADERTYPE, val);
    }

    get traderCode() {
        return super.getValue(_fieldNames.TRADERCODE);
    } set traderCode(val) {
        super.setValue(_fieldNames.TRADERCODE, val);
    }

    get traderName() {
        return super.getValue(_fieldNames.TRADERNAME);
    } set traderName(val) {
        super.setValue(_fieldNames.TRADERNAME, val);
    }

    get countryCode() {
        return super.getValue(_fieldNames.COUNTRYCODE);
    } set countryCode(val) {
        super.setValue(_fieldNames.COUNTRYCODE, val);
    }

    get address1() {
        return super.getValue(_fieldNames.ADDRESS1);
    } set address1(val) {
        super.setValue(_fieldNames.ADDRESS1, val);
    }

    get address2() {
        return super.getValue(_fieldNames.ADDRESS2);
    } set address2(val) {
        super.setValue(_fieldNames.ADDRESS2, val);
    }

    get address3() {
        return super.getValue(_fieldNames.ADDRESS3);
    } set address3(val) {
        super.setValue(_fieldNames.ADDRESS3, val);
    }

    get address4() {
        return super.getValue(_fieldNames.ADDRESS4);
    } set address4(val) {
        super.setValue(_fieldNames.ADDRESS4, val);
    }

    get postCode() {
        return super.getValue(_fieldNames.POSTCODE);
    } set postCode(val) {
        super.setValue(_fieldNames.POSTCODE, val);
    }

    get contact() {
        return super.getValue(_fieldNames.CONTACT);
    } set contact(val) {
        super.setValue(_fieldNames.CONTACT, val);
    }

    get phone() {
        return super.getValue(_fieldNames.PHONE);
    } set phone(val) {
        super.setValue(_fieldNames.PHONE, val);
    }

    get isWholesaler() {
        return super.getValue(_fieldNames.ISWHOLESALER);
    } set isWholesaler(val) {
        super.setValue(_fieldNames.ISWHOLESALER, val);
    }

    get wholesalerCode() {
        return super.getValue(_fieldNames.WHOLESALERCODE);
    } set wholesalerCode(val) {
        super.setValue(_fieldNames.WHOLESALERCODE, val);
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

    get erpTraderAccountId() {
        return super.getValue(_fieldNames.ERPTRADERACCOUNTID);
    } set erpTraderAccountId(val) {
        super.setValue(_fieldNames.ERPTRADERACCOUNTID, val);
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

    get isManual() {
        return super.getValue(_fieldNames.ISMANUAL);
    } set isManual(val) {
        super.setValue(_fieldNames.ISMANUAL, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cx_traderAccount_Collection,
    Record: Persistent_cx_traderAccount,
}
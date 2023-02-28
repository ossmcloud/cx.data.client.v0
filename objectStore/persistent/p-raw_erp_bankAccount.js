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
const _tableName = 'raw_erp_bankAccount';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RAWERPBANKACCOUNTID: 'rawErpBankAccountId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    COUNTRYCODE: 'countryCode',
    CURRENCYCODE: 'currencyCode',
    CODE: 'code',
    DESCRIPTION: 'description',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    rawErpBankAccountId: { name: 'rawErpBankAccountId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    countryCode: { name: 'countryCode', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: false },
    currencyCode: { name: 'currencyCode', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: false },
    code: { name: 'code', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    description: { name: 'description', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_erp_bankAccount_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_erp_bankAccount extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get rawErpBankAccountId() {
        return super.getValue(_fieldNames.RAWERPBANKACCOUNTID);
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

    get countryCode() {
        return super.getValue(_fieldNames.COUNTRYCODE);
    } set countryCode(val) {
        super.setValue(_fieldNames.COUNTRYCODE, val);
    }

    get currencyCode() {
        return super.getValue(_fieldNames.CURRENCYCODE);
    } set currencyCode(val) {
        super.setValue(_fieldNames.CURRENCYCODE, val);
    }

    get code() {
        return super.getValue(_fieldNames.CODE);
    } set code(val) {
        super.setValue(_fieldNames.CODE, val);
    }

    get description() {
        return super.getValue(_fieldNames.DESCRIPTION);
    } set description(val) {
        super.setValue(_fieldNames.DESCRIPTION, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_raw_erp_bankAccount_Collection,
    Record: Persistent_raw_erp_bankAccount,
}
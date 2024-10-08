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
const _tableName = 'erp_bank_account';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    ERPBANKACCOUNTID: 'erpBankAccountId',
    SHOPID: 'shopId',
    CURRENCYCODE: 'currencyCode',
    CODE: 'code',
    DESCRIPTION: 'description',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    COUNTRYCODE: 'countryCode',
    ISMANUAL: 'isManual',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    erpBankAccountId: { name: 'erpBankAccountId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    currencyCode: { name: 'currencyCode', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: false },
    code: { name: 'code', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    description: { name: 'description', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    countryCode: { name: 'countryCode', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: true },
    isManual: { name: 'isManual', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_erp_bank_account_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_erp_bank_account extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get erpBankAccountId() {
        return super.getValue(_fieldNames.ERPBANKACCOUNTID);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
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

    get countryCode() {
        return super.getValue(_fieldNames.COUNTRYCODE);
    } set countryCode(val) {
        super.setValue(_fieldNames.COUNTRYCODE, val);
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
    Table: Persistent_erp_bank_account_Collection,
    Record: Persistent_erp_bank_account,
}
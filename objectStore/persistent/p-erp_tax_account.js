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
const _tableName = 'erp_tax_account';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    ERPTAXACCOUNTID: 'erpTaxAccountId',
    SHOPID: 'shopId',
    CURRENCYCODE: 'currencyCode',
    CODE: 'code',
    RATE: 'rate',
    DESCRIPTION: 'description',
    ECTERMID: 'ecTermId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    COUNTRYCODE: 'countryCode',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    erpTaxAccountId: { name: 'erpTaxAccountId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    currencyCode: { name: 'currencyCode', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: false },
    code: { name: 'code', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    rate: { name: 'rate', dataType: 'decimal', pk: false, identity: false, maxLength: 5, null: true },
    description: { name: 'description', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    ecTermId: { name: 'ecTermId', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    countryCode: { name: 'countryCode', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_erp_tax_account_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_erp_tax_account extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get erpTaxAccountId() {
        return super.getValue(_fieldNames.ERPTAXACCOUNTID);
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

    get rate() {
        return super.getValue(_fieldNames.RATE);
    } set rate(val) {
        super.setValue(_fieldNames.RATE, val);
    }

    get description() {
        return super.getValue(_fieldNames.DESCRIPTION);
    } set description(val) {
        super.setValue(_fieldNames.DESCRIPTION, val);
    }

    get ecTermId() {
        return super.getValue(_fieldNames.ECTERMID);
    } set ecTermId(val) {
        super.setValue(_fieldNames.ECTERMID, val);
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


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_erp_tax_account_Collection,
    Record: Persistent_erp_tax_account,
}
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
const _tableName = 'raw_erp_taxRate';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TAXRATEID: 'taxRateId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    COUNTRYCODE: 'countryCode',
    CURRENCYCODE: 'currencyCode',
    TAXCODE: 'taxCode',
    TAXRATE: 'taxRate',
    TAXNAME: 'taxName',
    TAXTYPE: 'taxType',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    taxRateId: { name: 'taxRateId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    countryCode: { name: 'countryCode', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: false },
    currencyCode: { name: 'currencyCode', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: true },
    taxCode: { name: 'taxCode', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    taxRate: { name: 'taxRate', dataType: 'money', pk: false, identity: false, maxLength: 5, null: true },
    taxName: { name: 'taxName', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    taxType: { name: 'taxType', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_erp_taxRate_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_erp_taxRate extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get taxRateId() {
        return super.getValue(_fieldNames.TAXRATEID);
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

    get taxName() {
        return super.getValue(_fieldNames.TAXNAME);
    } set taxName(val) {
        super.setValue(_fieldNames.TAXNAME, val);
    }

    get taxType() {
        return super.getValue(_fieldNames.TAXTYPE);
    } set taxType(val) {
        super.setValue(_fieldNames.TAXTYPE, val);
    }

    get created() {
        return super.getValue(_fieldNames.CREATED);
    } set created(val) {
        super.setValue(_fieldNames.CREATED, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_raw_erp_taxRate_Collection,
    Record: Persistent_raw_erp_taxRate,
}
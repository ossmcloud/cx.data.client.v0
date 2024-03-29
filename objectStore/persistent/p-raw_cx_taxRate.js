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
const _tableName = 'raw_cx_taxRate';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TAXRATEID: 'taxRateId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    COUNTRYCODE: 'countryCode',
    TAXCODE: 'taxCode',
    TAXRATE: 'taxRate',
    TAXNAME: 'taxName',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    taxRateId: { name: 'taxRateId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    countryCode: { name: 'countryCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    taxCode: { name: 'taxCode', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: true },
    taxRate: { name: 'taxRate', dataType: 'money', pk: false, identity: false, maxLength: 5, null: true },
    taxName: { name: 'taxName', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_cx_taxRate_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_cx_taxRate extends _cx_data.DBRecord {
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


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_raw_cx_taxRate_Collection,
    Record: Persistent_raw_cx_taxRate,
}
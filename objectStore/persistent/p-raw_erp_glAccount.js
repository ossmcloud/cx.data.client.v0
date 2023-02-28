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
const _tableName = 'raw_erp_glAccount';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RAWERPGLACCOUNTID: 'rawErpGLAccountId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    CODE: 'code',
    SUBCODE1: 'subCode1',
    SUBCODE2: 'subCode2',
    DESCRIPTION: 'description',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    rawErpGLAccountId: { name: 'rawErpGLAccountId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    code: { name: 'code', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    subCode1: { name: 'subCode1', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    subCode2: { name: 'subCode2', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    description: { name: 'description', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_erp_glAccount_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_erp_glAccount extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get rawErpGLAccountId() {
        return super.getValue(_fieldNames.RAWERPGLACCOUNTID);
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

    get code() {
        return super.getValue(_fieldNames.CODE);
    } set code(val) {
        super.setValue(_fieldNames.CODE, val);
    }

    get subCode1() {
        return super.getValue(_fieldNames.SUBCODE1);
    } set subCode1(val) {
        super.setValue(_fieldNames.SUBCODE1, val);
    }

    get subCode2() {
        return super.getValue(_fieldNames.SUBCODE2);
    } set subCode2(val) {
        super.setValue(_fieldNames.SUBCODE2, val);
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
    Table: Persistent_raw_erp_glAccount_Collection,
    Record: Persistent_raw_erp_glAccount,
}
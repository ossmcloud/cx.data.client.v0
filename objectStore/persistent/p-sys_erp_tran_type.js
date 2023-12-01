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
const _tableName = 'sys_erp_tran_type';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TRANTYPEID: 'tranTypeId',
    ERPPROVIDER: 'erpProvider',
    TRANCODE: 'tranCode',
    TRANNAME: 'tranName',
    TRANLEDGER: 'tranLedger',
    OPPOSITETRANID: 'oppositeTranId',
    CSSSTYLE: 'cssStyle',
    TRANSIGN: 'tranSign',
    ISTAXABLE: 'isTaxable',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    tranTypeId: { name: 'tranTypeId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    erpProvider: { name: 'erpProvider', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    tranCode: { name: 'tranCode', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    tranName: { name: 'tranName', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    tranLedger: { name: 'tranLedger', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    oppositeTranId: { name: 'oppositeTranId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    cssStyle: { name: 'cssStyle', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    tranSign: { name: 'tranSign', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    isTaxable: { name: 'isTaxable', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_sys_erp_tran_type_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_sys_erp_tran_type extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get tranTypeId() {
        return super.getValue(_fieldNames.TRANTYPEID);
    }

    get erpProvider() {
        return super.getValue(_fieldNames.ERPPROVIDER);
    } set erpProvider(val) {
        super.setValue(_fieldNames.ERPPROVIDER, val);
    }

    get tranCode() {
        return super.getValue(_fieldNames.TRANCODE);
    } set tranCode(val) {
        super.setValue(_fieldNames.TRANCODE, val);
    }

    get tranName() {
        return super.getValue(_fieldNames.TRANNAME);
    } set tranName(val) {
        super.setValue(_fieldNames.TRANNAME, val);
    }

    get tranLedger() {
        return super.getValue(_fieldNames.TRANLEDGER);
    } set tranLedger(val) {
        super.setValue(_fieldNames.TRANLEDGER, val);
    }

    get oppositeTranId() {
        return super.getValue(_fieldNames.OPPOSITETRANID);
    } set oppositeTranId(val) {
        super.setValue(_fieldNames.OPPOSITETRANID, val);
    }

    get cssStyle() {
        return super.getValue(_fieldNames.CSSSTYLE);
    } set cssStyle(val) {
        super.setValue(_fieldNames.CSSSTYLE, val);
    }

    get tranSign() {
        return super.getValue(_fieldNames.TRANSIGN);
    } set tranSign(val) {
        super.setValue(_fieldNames.TRANSIGN, val);
    }

    get isTaxable() {
        return super.getValue(_fieldNames.ISTAXABLE);
    } set isTaxable(val) {
        super.setValue(_fieldNames.ISTAXABLE, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_sys_erp_tran_type_Collection,
    Record: Persistent_sys_erp_tran_type,
}
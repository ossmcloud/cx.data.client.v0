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
const _tableName = 'raw_cx_pluCost';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RAWPLUCOSTID: 'rawPLUCostId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    TRANSACTIONDATE: 'transactionDate',
    PLUCODE: 'pluCode',
    UNITCOST: 'unitCost',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    rawPLUCostId: { name: 'rawPLUCostId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    transactionDate: { name: 'transactionDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    pluCode: { name: 'pluCode', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    unitCost: { name: 'unitCost', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_cx_pluCost_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_cx_pluCost extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get rawPLUCostId() {
        return super.getValue(_fieldNames.RAWPLUCOSTID);
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

    get transactionDate() {
        return super.getValue(_fieldNames.TRANSACTIONDATE);
    } set transactionDate(val) {
        super.setValue(_fieldNames.TRANSACTIONDATE, val);
    }

    get pluCode() {
        return super.getValue(_fieldNames.PLUCODE);
    } set pluCode(val) {
        super.setValue(_fieldNames.PLUCODE, val);
    }

    get unitCost() {
        return super.getValue(_fieldNames.UNITCOST);
    } set unitCost(val) {
        super.setValue(_fieldNames.UNITCOST, val);
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
    Table: Persistent_raw_cx_pluCost_Collection,
    Record: Persistent_raw_cx_pluCost,
}
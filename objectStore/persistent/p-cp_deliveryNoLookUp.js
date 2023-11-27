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
const _tableName = 'cp_deliveryNoLookUp';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    DELIVERYNOLOOKUPID: 'deliveryNoLookUpId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    DOCUMENTNUMBER: 'documentNumber',
    DOCKETNUMBER: 'docketNumber',
    DOCKETDATE: 'docketDate',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    deliveryNoLookUpId: { name: 'deliveryNoLookUpId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    documentNumber: { name: 'documentNumber', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    docketNumber: { name: 'docketNumber', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    docketDate: { name: 'docketDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_deliveryNoLookUp_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_deliveryNoLookUp extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get deliveryNoLookUpId() {
        return super.getValue(_fieldNames.DELIVERYNOLOOKUPID);
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

    get documentNumber() {
        return super.getValue(_fieldNames.DOCUMENTNUMBER);
    } set documentNumber(val) {
        super.setValue(_fieldNames.DOCUMENTNUMBER, val);
    }

    get docketNumber() {
        return super.getValue(_fieldNames.DOCKETNUMBER);
    } set docketNumber(val) {
        super.setValue(_fieldNames.DOCKETNUMBER, val);
    }

    get docketDate() {
        return super.getValue(_fieldNames.DOCKETDATE);
    } set docketDate(val) {
        super.setValue(_fieldNames.DOCKETDATE, val);
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
    Table: Persistent_cp_deliveryNoLookUp_Collection,
    Record: Persistent_cp_deliveryNoLookUp,
}
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
const _tableName = 'cx_traderNameLookUp';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TRADERNAMELOOKUPID: 'traderNameLookUpId',
    SHOPID: 'shopId',
    TRADERTYPE: 'traderType',
    TRADERCODE: 'traderCode',
    TRADERNAME: 'traderName',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    traderNameLookUpId: { name: 'traderNameLookUpId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    traderType: { name: 'traderType', dataType: 'varchar', pk: false, identity: false, maxLength: 1, null: false },
    traderCode: { name: 'traderCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    traderName: { name: 'traderName', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_traderNameLookUp_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_traderNameLookUp extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get traderNameLookUpId() {
        return super.getValue(_fieldNames.TRADERNAMELOOKUPID);
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


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cx_traderNameLookUp_Collection,
    Record: Persistent_cx_traderNameLookUp,
}
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
const _tableName = 'cp_recoSetting';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RECOSETTINGID: 'recoSettingId',
    WHOLESALERID: 'wholesalerId',
    SHOPID: 'shopId',
    HTOLERANCE: 'hTolerance',
    LTOLERANCE: 'lTolerance',
    FORCENOTES: 'forceNotes',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    recoSettingId: { name: 'recoSettingId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    wholesalerId: { name: 'wholesalerId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    hTolerance: { name: 'hTolerance', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    lTolerance: { name: 'lTolerance', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    forceNotes: { name: 'forceNotes', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_recoSetting_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_recoSetting extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get recoSettingId() {
        return super.getValue(_fieldNames.RECOSETTINGID);
    }

    get wholesalerId() {
        return super.getValue(_fieldNames.WHOLESALERID);
    } set wholesalerId(val) {
        super.setValue(_fieldNames.WHOLESALERID, val);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get hTolerance() {
        return super.getValue(_fieldNames.HTOLERANCE);
    } set hTolerance(val) {
        super.setValue(_fieldNames.HTOLERANCE, val);
    }

    get lTolerance() {
        return super.getValue(_fieldNames.LTOLERANCE);
    } set lTolerance(val) {
        super.setValue(_fieldNames.LTOLERANCE, val);
    }

    get forceNotes() {
        return super.getValue(_fieldNames.FORCENOTES);
    } set forceNotes(val) {
        super.setValue(_fieldNames.FORCENOTES, val);
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
    Table: Persistent_cp_recoSetting_Collection,
    Record: Persistent_cp_recoSetting,
}
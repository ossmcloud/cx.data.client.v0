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
const _tableName = 'cp_recoSettingSupplier';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RECOSETTINGSUPPID: 'recoSettingSuppId',
    RECOSETTINGID: 'recoSettingId',
    SUPPLIERCODE: 'supplierCode',
    MATCHINGSUPPLIERCODES: 'matchingSupplierCodes',
    IGNOREVATMISMATCH: 'ignoreVatMismatch',
    NODELIVERY: 'noDelivery',
    NODELIVERYCOMMENT: 'noDeliveryComment',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    IGNORELINETOLERANCE: 'ignoreLineTolerance',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    recoSettingSuppId: { name: 'recoSettingSuppId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    recoSettingId: { name: 'recoSettingId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    supplierCode: { name: 'supplierCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    matchingSupplierCodes: { name: 'matchingSupplierCodes', dataType: 'varchar', pk: false, identity: false, maxLength: 1000, null: true },
    ignoreVatMismatch: { name: 'ignoreVatMismatch', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    noDelivery: { name: 'noDelivery', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    noDeliveryComment: { name: 'noDeliveryComment', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    ignoreLineTolerance: { name: 'ignoreLineTolerance', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_recoSettingSupplier_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_recoSettingSupplier extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get recoSettingSuppId() {
        return super.getValue(_fieldNames.RECOSETTINGSUPPID);
    }

    get recoSettingId() {
        return super.getValue(_fieldNames.RECOSETTINGID);
    } set recoSettingId(val) {
        super.setValue(_fieldNames.RECOSETTINGID, val);
    }

    get supplierCode() {
        return super.getValue(_fieldNames.SUPPLIERCODE);
    } set supplierCode(val) {
        super.setValue(_fieldNames.SUPPLIERCODE, val);
    }

    get matchingSupplierCodes() {
        return super.getValue(_fieldNames.MATCHINGSUPPLIERCODES);
    } set matchingSupplierCodes(val) {
        super.setValue(_fieldNames.MATCHINGSUPPLIERCODES, val);
    }

    get ignoreVatMismatch() {
        return super.getValue(_fieldNames.IGNOREVATMISMATCH);
    } set ignoreVatMismatch(val) {
        super.setValue(_fieldNames.IGNOREVATMISMATCH, val);
    }

    get noDelivery() {
        return super.getValue(_fieldNames.NODELIVERY);
    } set noDelivery(val) {
        super.setValue(_fieldNames.NODELIVERY, val);
    }

    get noDeliveryComment() {
        return super.getValue(_fieldNames.NODELIVERYCOMMENT);
    } set noDeliveryComment(val) {
        super.setValue(_fieldNames.NODELIVERYCOMMENT, val);
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

    get ignoreLineTolerance() {
        return super.getValue(_fieldNames.IGNORELINETOLERANCE);
    } set ignoreLineTolerance(val) {
        super.setValue(_fieldNames.IGNORELINETOLERANCE, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cp_recoSettingSupplier_Collection,
    Record: Persistent_cp_recoSettingSupplier,
}
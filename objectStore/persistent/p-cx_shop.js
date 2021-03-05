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
const _tableName = 'cx_shop';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    SHOPID: 'shopId',
    SHOPGROUPID: 'shopGroupId',
    SHOPCODE: 'shopCode',
    SHOPNAME: 'shopName',
    SHOPADDRESS: 'shopAddress',
    STATUS: 'status',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    SHOPPOSTCODE: 'shopPostCode',
    SHOPLATITUDE: 'shopLatitude',
    SHOPLONGITUDE: 'shopLongitude',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    shopId: { name: 'shopId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopGroupId: { name: 'shopGroupId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    shopCode: { name: 'shopCode', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    shopName: { name: 'shopName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    shopAddress: { name: 'shopAddress', dataType: 'varchar', pk: false, identity: false, maxLength: 1000, null: true },
    status: { name: 'status', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    shopPostCode: { name: 'shopPostCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    shopLatitude: { name: 'shopLatitude', dataType: 'decimal', pk: false, identity: false, maxLength: 9, null: true },
    shopLongitude: { name: 'shopLongitude', dataType: 'decimal', pk: false, identity: false, maxLength: 9, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_shop_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_shop extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    }

    get shopGroupId() {
        return super.getValue(_fieldNames.SHOPGROUPID);
    } set shopGroupId(val) {
        super.setValue(_fieldNames.SHOPGROUPID, val);
    }

    get shopCode() {
        return super.getValue(_fieldNames.SHOPCODE);
    } set shopCode(val) {
        super.setValue(_fieldNames.SHOPCODE, val);
    }

    get shopName() {
        return super.getValue(_fieldNames.SHOPNAME);
    } set shopName(val) {
        super.setValue(_fieldNames.SHOPNAME, val);
    }

    get shopAddress() {
        return super.getValue(_fieldNames.SHOPADDRESS);
    } set shopAddress(val) {
        super.setValue(_fieldNames.SHOPADDRESS, val);
    }

    get status() {
        return super.getValue(_fieldNames.STATUS);
    } set status(val) {
        super.setValue(_fieldNames.STATUS, val);
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

    get shopPostCode() {
        return super.getValue(_fieldNames.SHOPPOSTCODE);
    } set shopPostCode(val) {
        super.setValue(_fieldNames.SHOPPOSTCODE, val);
    }

    get shopLatitude() {
        return super.getValue(_fieldNames.SHOPLATITUDE);
    } set shopLatitude(val) {
        super.setValue(_fieldNames.SHOPLATITUDE, val);
    }

    get shopLongitude() {
        return super.getValue(_fieldNames.SHOPLONGITUDE);
    } set shopLongitude(val) {
        super.setValue(_fieldNames.SHOPLONGITUDE, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cx_shop_Collection,
    Record: Persistent_cx_shop,
}
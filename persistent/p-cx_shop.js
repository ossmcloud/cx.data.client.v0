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
    SHOPCODE: 'shopCode',
    SHOPNAME: 'shopName',
    SHOPADDRESS: 'shopAddress',
    STATUS: 'status',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    shopId: { name: 'shopId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopCode: { name: 'shopCode', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    shopName: { name: 'shopName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    shopAddress: { name: 'shopAddress', dataType: 'varchar', pk: false, identity: false, maxLength: 1000, null: true },
    status: { name: 'status', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },

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


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cx_shop_Collection,
    Record: Persistent_cx_shop,
}
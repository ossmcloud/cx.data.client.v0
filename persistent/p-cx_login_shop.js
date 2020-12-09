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
const _tableName = 'cx_login_shop';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    LOGINSHOPID: 'loginShopId',
    LOGINID: 'loginId',
    SHOPID: 'shopId',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    loginShopId: { name: 'loginShopId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    loginId: { name: 'loginId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_login_shop_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_login_shop extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get loginShopId() {
        return super.getValue(_fieldNames.LOGINSHOPID);
    }

    get loginId() {
        return super.getValue(_fieldNames.LOGINID);
    } set loginId(val) {
        super.setValue(_fieldNames.LOGINID, val);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cx_login_shop_Collection,
    Record: Persistent_cx_login_shop,
}
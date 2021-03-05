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
const _tableName = 'epos_shop_ping';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    PINGID: 'pingId',
    SHOPID: 'shopId',
    PINGIP: 'pingIP',
    RESPONSE: 'response',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    pingId: { name: 'pingId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    pingIP: { name: 'pingIP', dataType: 'varchar', pk: false, identity: false, maxLength: 15, null: false },
    response: { name: 'response', dataType: 'varchar', pk: false, identity: false, maxLength: 1000, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_epos_shop_ping_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_epos_shop_ping extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get pingId() {
        return super.getValue(_fieldNames.PINGID);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get pingIP() {
        return super.getValue(_fieldNames.PINGIP);
    } set pingIP(val) {
        super.setValue(_fieldNames.PINGIP, val);
    }

    get response() {
        return super.getValue(_fieldNames.RESPONSE);
    } set response(val) {
        super.setValue(_fieldNames.RESPONSE, val);
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
    Table: Persistent_epos_shop_ping_Collection,
    Record: Persistent_epos_shop_ping,
}
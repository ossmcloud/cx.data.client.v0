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
const _tableName = 'cx_login_cache';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    CACHEID: 'cacheId',
    LOGINID: 'loginId',
    CACHETYPE: 'cacheType',
    CACHEKEY: 'cacheKey',
    CACHEVALUE: 'cacheValue',
    JSONOPTIONS: 'jsonOptions',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    cacheId: { name: 'cacheId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    loginId: { name: 'loginId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    cacheType: { name: 'cacheType', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    cacheKey: { name: 'cacheKey', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: false },
    cacheValue: { name: 'cacheValue', dataType: 'varchar', pk: false, identity: false, maxLength: 4000, null: true },
    jsonOptions: { name: 'jsonOptions', dataType: 'varchar', pk: false, identity: false, maxLength: 1000, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_login_cache_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_login_cache extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get cacheId() {
        return super.getValue(_fieldNames.CACHEID);
    }

    get loginId() {
        return super.getValue(_fieldNames.LOGINID);
    } set loginId(val) {
        super.setValue(_fieldNames.LOGINID, val);
    }

    get cacheType() {
        return super.getValue(_fieldNames.CACHETYPE);
    } set cacheType(val) {
        super.setValue(_fieldNames.CACHETYPE, val);
    }

    get cacheKey() {
        return super.getValue(_fieldNames.CACHEKEY);
    } set cacheKey(val) {
        super.setValue(_fieldNames.CACHEKEY, val);
    }

    get cacheValue() {
        return super.getValue(_fieldNames.CACHEVALUE);
    } set cacheValue(val) {
        super.setValue(_fieldNames.CACHEVALUE, val);
    }

    get jsonOptions() {
        return super.getValue(_fieldNames.JSONOPTIONS);
    } set jsonOptions(val) {
        super.setValue(_fieldNames.JSONOPTIONS, val);
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
    Table: Persistent_cx_login_cache_Collection,
    Record: Persistent_cx_login_cache,
}
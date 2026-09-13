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
const _tableName = 'ca_oneTimeAccess';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    ONETIMEACCESSID: 'oneTimeAccessId',
    LOGINID: 'loginId',
    KEY: 'key',
    EXPIRESIN: 'expiresIn',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    oneTimeAccessId: { name: 'oneTimeAccessId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    loginId: { name: 'loginId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    key: { name: 'key', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    expiresIn: { name: 'expiresIn', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_ca_oneTimeAccess_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_ca_oneTimeAccess extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get oneTimeAccessId() {
        return super.getValue(_fieldNames.ONETIMEACCESSID);
    }

    get loginId() {
        return super.getValue(_fieldNames.LOGINID);
    } set loginId(val) {
        super.setValue(_fieldNames.LOGINID, val);
    }

    get key() {
        return super.getValue(_fieldNames.KEY);
    } set key(val) {
        super.setValue(_fieldNames.KEY, val);
    }

    get expiresIn() {
        return super.getValue(_fieldNames.EXPIRESIN);
    } set expiresIn(val) {
        super.setValue(_fieldNames.EXPIRESIN, val);
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
    Table: Persistent_ca_oneTimeAccess_Collection,
    Record: Persistent_ca_oneTimeAccess,
}
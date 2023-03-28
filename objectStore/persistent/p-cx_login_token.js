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
const _tableName = 'cx_login_token';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TYPE: 'type',
    LOGINID: 'loginId',
    DTFSSETTINGID: 'dtfsSettingId',
    STATEKEY: 'stateKey',
    STATUS: 'status',
    TOKEN: 'token',
    EXPIRYDATE: 'expiryDate',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    CREATED: 'created',
    CREATEDBY: 'createdBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    type: { name: 'type', dataType: 'varchar', pk: true, identity: false, maxLength: 5, null: false },
    loginId: { name: 'loginId', dataType: 'bigint', pk: true, identity: false, maxLength: 8, null: false },
    dtfsSettingId: { name: 'dtfsSettingId', dataType: 'bigint', pk: true, identity: false, maxLength: 8, null: false },
    stateKey: { name: 'stateKey', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: false },
    status: { name: 'status', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    token: { name: 'token', dataType: 'varchar', pk: false, identity: false, maxLength: 8000, null: true },
    expiryDate: { name: 'expiryDate', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_login_token_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_login_token extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get type() {
        return super.getValue(_fieldNames.TYPE);
    } set type(val) {
        super.setValue(_fieldNames.TYPE, val);
    }

    get loginId() {
        return super.getValue(_fieldNames.LOGINID);
    } set loginId(val) {
        super.setValue(_fieldNames.LOGINID, val);
    }

    get dtfsSettingId() {
        return super.getValue(_fieldNames.DTFSSETTINGID);
    } set dtfsSettingId(val) {
        super.setValue(_fieldNames.DTFSSETTINGID, val);
    }

    get stateKey() {
        return super.getValue(_fieldNames.STATEKEY);
    } set stateKey(val) {
        super.setValue(_fieldNames.STATEKEY, val);
    }

    get status() {
        return super.getValue(_fieldNames.STATUS);
    } set status(val) {
        super.setValue(_fieldNames.STATUS, val);
    }

    get token() {
        return super.getValue(_fieldNames.TOKEN);
    } set token(val) {
        super.setValue(_fieldNames.TOKEN, val);
    }

    get expiryDate() {
        return super.getValue(_fieldNames.EXPIRYDATE);
    } set expiryDate(val) {
        super.setValue(_fieldNames.EXPIRYDATE, val);
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


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cx_login_token_Collection,
    Record: Persistent_cx_login_token,
}
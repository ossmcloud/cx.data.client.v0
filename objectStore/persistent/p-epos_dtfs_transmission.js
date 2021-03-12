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
const _tableName = 'epos_dtfs_transmission';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TRANSMISSIONID: 'transmissionId',
    SHOPID: 'shopId',
    STATUS: 'status',
    ACTION: 'action',
    MESSAGE: 'message',
    CREATED: 'created',
    DTFSSETTINGID: 'dtfsSettingId',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    transmissionId: { name: 'transmissionId', dataType: 'bigint', pk: true, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    status: { name: 'status', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    action: { name: 'action', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    message: { name: 'message', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true, default: 'now' },
    dtfsSettingId: { name: 'dtfsSettingId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_epos_dtfs_transmission_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_epos_dtfs_transmission extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get transmissionId() {
        return super.getValue(_fieldNames.TRANSMISSIONID);
    } set transmissionId(val) {
        super.setValue(_fieldNames.TRANSMISSIONID, val);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get status() {
        return super.getValue(_fieldNames.STATUS);
    } set status(val) {
        super.setValue(_fieldNames.STATUS, val);
    }

    get action() {
        return super.getValue(_fieldNames.ACTION);
    } set action(val) {
        super.setValue(_fieldNames.ACTION, val);
    }

    get message() {
        return super.getValue(_fieldNames.MESSAGE);
    } set message(val) {
        super.setValue(_fieldNames.MESSAGE, val);
    }

    get created() {
        return super.getValue(_fieldNames.CREATED);
    } set created(val) {
        super.setValue(_fieldNames.CREATED, val);
    }

    get dtfsSettingId() {
        return super.getValue(_fieldNames.DTFSSETTINGID);
    } set dtfsSettingId(val) {
        super.setValue(_fieldNames.DTFSSETTINGID, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_epos_dtfs_transmission_Collection,
    Record: Persistent_epos_dtfs_transmission,
}
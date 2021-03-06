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
const _tableName = 'epos_dtfs_upgradeAudit';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    UPGRADEAUDITID: 'upgradeAuditId',
    DTFSSETTINGID: 'dtfsSettingId',
    STATUS: 'status',
    STATUSMESSAGE: 'statusMessage',
    UPGRADECONFIG: 'upgradeConfig',
    TRANSMISSIONID: 'transmissionId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    upgradeAuditId: { name: 'upgradeAuditId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    dtfsSettingId: { name: 'dtfsSettingId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    status: { name: 'status', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    statusMessage: { name: 'statusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 4000, null: true },
    upgradeConfig: { name: 'upgradeConfig', dataType: 'varchar', pk: false, identity: false, maxLength: 4000, null: false },
    transmissionId: { name: 'transmissionId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_epos_dtfs_upgradeAudit_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_epos_dtfs_upgradeAudit extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get upgradeAuditId() {
        return super.getValue(_fieldNames.UPGRADEAUDITID);
    }

    get dtfsSettingId() {
        return super.getValue(_fieldNames.DTFSSETTINGID);
    } set dtfsSettingId(val) {
        super.setValue(_fieldNames.DTFSSETTINGID, val);
    }

    get status() {
        return super.getValue(_fieldNames.STATUS);
    } set status(val) {
        super.setValue(_fieldNames.STATUS, val);
    }

    get statusMessage() {
        return super.getValue(_fieldNames.STATUSMESSAGE);
    } set statusMessage(val) {
        super.setValue(_fieldNames.STATUSMESSAGE, val);
    }

    get upgradeConfig() {
        return super.getValue(_fieldNames.UPGRADECONFIG);
    } set upgradeConfig(val) {
        super.setValue(_fieldNames.UPGRADECONFIG, val);
    }

    get transmissionId() {
        return super.getValue(_fieldNames.TRANSMISSIONID);
    } set transmissionId(val) {
        super.setValue(_fieldNames.TRANSMISSIONID, val);
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
    Table: Persistent_epos_dtfs_upgradeAudit_Collection,
    Record: Persistent_epos_dtfs_upgradeAudit,
}
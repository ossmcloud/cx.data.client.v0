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
const _tableName = 'epos_dtfs_setting';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    DTFSSETTINGID: 'dtfsSettingId',
    DTFSSETTINGNAME: 'dtfsSettingName',
    DTFSPAIRINGSTATUS: 'dtfsPairingStatus',
    DTFSPAIRINGCODE: 'dtfsPairingCode',
    DTFSPAIREDMACHINENAME: 'dtfsPairedMachineName',
    DTFSPAIREDMACHINEOS: 'dtfsPairedMachineOS',
    DTFSPAIREDMACHINEIP: 'dtfsPairedMachineIP',
    DTFSPAIREDVERSION: 'dtfsPairedVersion',
    DTFSINFOLASTREFRESH: 'dtfsInfoLastRefresh',
    EPOSPROVIDER: 'eposProvider',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    CREATED: 'created',
    CREATEDBY: 'createdBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    dtfsSettingId: { name: 'dtfsSettingId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    dtfsSettingName: { name: 'dtfsSettingName', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: false },
    dtfsPairingStatus: { name: 'dtfsPairingStatus', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '((0))' },
    dtfsPairingCode: { name: 'dtfsPairingCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    dtfsPairedMachineName: { name: 'dtfsPairedMachineName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    dtfsPairedMachineOS: { name: 'dtfsPairedMachineOS', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    dtfsPairedMachineIP: { name: 'dtfsPairedMachineIP', dataType: 'varchar', pk: false, identity: false, maxLength: 15, null: true },
    dtfsPairedVersion: { name: 'dtfsPairedVersion', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    dtfsInfoLastRefresh: { name: 'dtfsInfoLastRefresh', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    eposProvider: { name: 'eposProvider', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_epos_dtfs_setting_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_epos_dtfs_setting extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get dtfsSettingId() {
        return super.getValue(_fieldNames.DTFSSETTINGID);
    }

    get dtfsSettingName() {
        return super.getValue(_fieldNames.DTFSSETTINGNAME);
    } set dtfsSettingName(val) {
        super.setValue(_fieldNames.DTFSSETTINGNAME, val);
    }

    get dtfsPairingStatus() {
        return super.getValue(_fieldNames.DTFSPAIRINGSTATUS);
    } set dtfsPairingStatus(val) {
        super.setValue(_fieldNames.DTFSPAIRINGSTATUS, val);
    }

    get dtfsPairingCode() {
        return super.getValue(_fieldNames.DTFSPAIRINGCODE);
    } set dtfsPairingCode(val) {
        super.setValue(_fieldNames.DTFSPAIRINGCODE, val);
    }

    get dtfsPairedMachineName() {
        return super.getValue(_fieldNames.DTFSPAIREDMACHINENAME);
    } set dtfsPairedMachineName(val) {
        super.setValue(_fieldNames.DTFSPAIREDMACHINENAME, val);
    }

    get dtfsPairedMachineOS() {
        return super.getValue(_fieldNames.DTFSPAIREDMACHINEOS);
    } set dtfsPairedMachineOS(val) {
        super.setValue(_fieldNames.DTFSPAIREDMACHINEOS, val);
    }

    get dtfsPairedMachineIP() {
        return super.getValue(_fieldNames.DTFSPAIREDMACHINEIP);
    } set dtfsPairedMachineIP(val) {
        super.setValue(_fieldNames.DTFSPAIREDMACHINEIP, val);
    }

    get dtfsPairedVersion() {
        return super.getValue(_fieldNames.DTFSPAIREDVERSION);
    } set dtfsPairedVersion(val) {
        super.setValue(_fieldNames.DTFSPAIREDVERSION, val);
    }

    get dtfsInfoLastRefresh() {
        return super.getValue(_fieldNames.DTFSINFOLASTREFRESH);
    } set dtfsInfoLastRefresh(val) {
        super.setValue(_fieldNames.DTFSINFOLASTREFRESH, val);
    }

    get eposProvider() {
        return super.getValue(_fieldNames.EPOSPROVIDER);
    } set eposProvider(val) {
        super.setValue(_fieldNames.EPOSPROVIDER, val);
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
    Table: Persistent_epos_dtfs_setting_Collection,
    Record: Persistent_epos_dtfs_setting,
}
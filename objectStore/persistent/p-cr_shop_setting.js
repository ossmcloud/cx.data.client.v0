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
const _tableName = 'cr_shop_setting';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    SHOPID: 'shopId',
    EPOSPROVIDER: 'eposProvider',
    EPOSSHOPCODE: 'eposShopCode',
    EPOSSHOPNAME: 'eposShopName',
    STARTDATE: 'startDate',
    DTFSPAIRINGCODE: 'dtfsPairingCode',
    DTFSPAIRINGSTATUS: 'dtfsPairingStatus',
    DTFSPAIREDMACHINENAME: 'dtfsPairedMachineName',
    DTFSPAIREDMACHINEOS: 'dtfsPairedMachineOS',
    DTFSPAIREDMACHINEIP: 'dtfsPairedMachineIP',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    shopId: { name: 'shopId', dataType: 'bigint', pk: true, identity: false, maxLength: 8, null: false },
    eposProvider: { name: 'eposProvider', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    eposShopCode: { name: 'eposShopCode', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    eposShopName: { name: 'eposShopName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    startDate: { name: 'startDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: true },
    dtfsPairingCode: { name: 'dtfsPairingCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: true },
    dtfsPairingStatus: { name: 'dtfsPairingStatus', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '((0))' },
    dtfsPairedMachineName: { name: 'dtfsPairedMachineName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    dtfsPairedMachineOS: { name: 'dtfsPairedMachineOS', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    dtfsPairedMachineIP: { name: 'dtfsPairedMachineIP', dataType: 'varchar', pk: false, identity: false, maxLength: 15, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cr_shop_setting_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cr_shop_setting extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get eposProvider() {
        return super.getValue(_fieldNames.EPOSPROVIDER);
    } set eposProvider(val) {
        super.setValue(_fieldNames.EPOSPROVIDER, val);
    }

    get eposShopCode() {
        return super.getValue(_fieldNames.EPOSSHOPCODE);
    } set eposShopCode(val) {
        super.setValue(_fieldNames.EPOSSHOPCODE, val);
    }

    get eposShopName() {
        return super.getValue(_fieldNames.EPOSSHOPNAME);
    } set eposShopName(val) {
        super.setValue(_fieldNames.EPOSSHOPNAME, val);
    }

    get startDate() {
        return super.getValue(_fieldNames.STARTDATE);
    } set startDate(val) {
        super.setValue(_fieldNames.STARTDATE, val);
    }

    get dtfsPairingCode() {
        return super.getValue(_fieldNames.DTFSPAIRINGCODE);
    } set dtfsPairingCode(val) {
        super.setValue(_fieldNames.DTFSPAIRINGCODE, val);
    }

    get dtfsPairingStatus() {
        return super.getValue(_fieldNames.DTFSPAIRINGSTATUS);
    } set dtfsPairingStatus(val) {
        super.setValue(_fieldNames.DTFSPAIRINGSTATUS, val);
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
    Table: Persistent_cr_shop_setting_Collection,
    Record: Persistent_cr_shop_setting,
}
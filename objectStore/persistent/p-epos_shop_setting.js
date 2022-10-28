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
const _tableName = 'epos_shop_setting';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    SHOPID: 'shopId',
    EPOSPROVIDER: 'eposProvider',
    EPOSSHOPCODE: 'eposShopCode',
    EPOSSHOPNAME: 'eposShopName',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    DTFSSETTINGID: 'dtfsSettingId',
    STARTDATE: 'startDate',
    GETDELAYCR: 'getDelayCR',
    GETDELAYCP: 'getDelayCP',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    shopId: { name: 'shopId', dataType: 'bigint', pk: true, identity: false, maxLength: 8, null: false },
    eposProvider: { name: 'eposProvider', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    eposShopCode: { name: 'eposShopCode', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    eposShopName: { name: 'eposShopName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    dtfsSettingId: { name: 'dtfsSettingId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    startDate: { name: 'startDate', dataType: 'date', pk: false, identity: false, maxLength: 3, null: true },
    getDelayCR: { name: 'getDelayCR', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    getDelayCP: { name: 'getDelayCP', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_epos_shop_setting_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_epos_shop_setting extends _cx_data.DBRecord {
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

    get dtfsSettingId() {
        return super.getValue(_fieldNames.DTFSSETTINGID);
    } set dtfsSettingId(val) {
        super.setValue(_fieldNames.DTFSSETTINGID, val);
    }

    get startDate() {
        return super.getValue(_fieldNames.STARTDATE);
    } set startDate(val) {
        super.setValue(_fieldNames.STARTDATE, val);
    }

    get getDelayCR() {
        return super.getValue(_fieldNames.GETDELAYCR);
    } set getDelayCR(val) {
        super.setValue(_fieldNames.GETDELAYCR, val);
    }

    get getDelayCP() {
        return super.getValue(_fieldNames.GETDELAYCP);
    } set getDelayCP(val) {
        super.setValue(_fieldNames.GETDELAYCP, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_epos_shop_setting_Collection,
    Record: Persistent_epos_shop_setting,
}
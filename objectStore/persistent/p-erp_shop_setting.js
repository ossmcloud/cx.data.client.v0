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
const _tableName = 'erp_shop_setting';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    SHOPID: 'shopId',
    ERPPROVIDER: 'erpProvider',
    ERPCOMPANYNAME: 'erpCompanyName',
    ERPCUSTOMERACCOUNT: 'erpCustomerAccount',
    ERPCUSTOMERACCOUNTNAME: 'erpCustomerAccountName',
    ERPCOSTCENTRE: 'erpCostCentre',
    ERPDEPARTMENT: 'erpDepartment',
    DTFSSETTINGID: 'dtfsSettingId',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    CREATED: 'created',
    CREATEDBY: 'createdBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    shopId: { name: 'shopId', dataType: 'bigint', pk: true, identity: false, maxLength: 8, null: false },
    erpProvider: { name: 'erpProvider', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    erpCompanyName: { name: 'erpCompanyName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    erpCustomerAccount: { name: 'erpCustomerAccount', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    erpCustomerAccountName: { name: 'erpCustomerAccountName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    erpCostCentre: { name: 'erpCostCentre', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    erpDepartment: { name: 'erpDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    dtfsSettingId: { name: 'dtfsSettingId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_erp_shop_setting_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_erp_shop_setting extends _cx_data.DBRecord {
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

    get erpProvider() {
        return super.getValue(_fieldNames.ERPPROVIDER);
    } set erpProvider(val) {
        super.setValue(_fieldNames.ERPPROVIDER, val);
    }

    get erpCompanyName() {
        return super.getValue(_fieldNames.ERPCOMPANYNAME);
    } set erpCompanyName(val) {
        super.setValue(_fieldNames.ERPCOMPANYNAME, val);
    }

    get erpCustomerAccount() {
        return super.getValue(_fieldNames.ERPCUSTOMERACCOUNT);
    } set erpCustomerAccount(val) {
        super.setValue(_fieldNames.ERPCUSTOMERACCOUNT, val);
    }

    get erpCustomerAccountName() {
        return super.getValue(_fieldNames.ERPCUSTOMERACCOUNTNAME);
    } set erpCustomerAccountName(val) {
        super.setValue(_fieldNames.ERPCUSTOMERACCOUNTNAME, val);
    }

    get erpCostCentre() {
        return super.getValue(_fieldNames.ERPCOSTCENTRE);
    } set erpCostCentre(val) {
        super.setValue(_fieldNames.ERPCOSTCENTRE, val);
    }

    get erpDepartment() {
        return super.getValue(_fieldNames.ERPDEPARTMENT);
    } set erpDepartment(val) {
        super.setValue(_fieldNames.ERPDEPARTMENT, val);
    }

    get dtfsSettingId() {
        return super.getValue(_fieldNames.DTFSSETTINGID);
    } set dtfsSettingId(val) {
        super.setValue(_fieldNames.DTFSSETTINGID, val);
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
    Table: Persistent_erp_shop_setting_Collection,
    Record: Persistent_erp_shop_setting,
}
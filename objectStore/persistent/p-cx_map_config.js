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
const _tableName = 'cx_map_config';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    MAPCONFIGID: 'mapConfigId',
    MAPTYPEID: 'mapTypeId',
    EPOSPROVIDER: 'eposProvider',
    ERPPROVIDER: 'erpProvider',
    NAME: 'name',
    MAPMASTERSHOP: 'mapMasterShop',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    mapConfigId: { name: 'mapConfigId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    mapTypeId: { name: 'mapTypeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    eposProvider: { name: 'eposProvider', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    erpProvider: { name: 'erpProvider', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    name: { name: 'name', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    mapMasterShop: { name: 'mapMasterShop', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_map_config_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_map_config extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get mapConfigId() {
        return super.getValue(_fieldNames.MAPCONFIGID);
    }

    get mapTypeId() {
        return super.getValue(_fieldNames.MAPTYPEID);
    } set mapTypeId(val) {
        super.setValue(_fieldNames.MAPTYPEID, val);
    }

    get eposProvider() {
        return super.getValue(_fieldNames.EPOSPROVIDER);
    } set eposProvider(val) {
        super.setValue(_fieldNames.EPOSPROVIDER, val);
    }

    get erpProvider() {
        return super.getValue(_fieldNames.ERPPROVIDER);
    } set erpProvider(val) {
        super.setValue(_fieldNames.ERPPROVIDER, val);
    }

    get name() {
        return super.getValue(_fieldNames.NAME);
    } set name(val) {
        super.setValue(_fieldNames.NAME, val);
    }

    get mapMasterShop() {
        return super.getValue(_fieldNames.MAPMASTERSHOP);
    } set mapMasterShop(val) {
        super.setValue(_fieldNames.MAPMASTERSHOP, val);
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
    Table: Persistent_cx_map_config_Collection,
    Record: Persistent_cx_map_config,
}
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
const _tableName = 'cx_map_config_dep';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    DEPMAPCONFIGID: 'depMapConfigId',
    MAPCONFIGID: 'mapConfigId',
    EPOSDEPARTMENT: 'eposDepartment',
    EPOSSUBDEPARTMENT: 'eposSubDepartment',
    EPOSDESCRIPTION: 'eposDescription',
    SALEACCOUNTID: 'saleAccountId',
    PURCHASEACCOUNTID: 'purchaseAccountId',
    ACCRUALACCOUNTID: 'accrualAccountId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    depMapConfigId: { name: 'depMapConfigId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    mapConfigId: { name: 'mapConfigId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    eposDepartment: { name: 'eposDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    eposSubDepartment: { name: 'eposSubDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    eposDescription: { name: 'eposDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    saleAccountId: { name: 'saleAccountId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    purchaseAccountId: { name: 'purchaseAccountId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    accrualAccountId: { name: 'accrualAccountId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_map_config_dep_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_map_config_dep extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get depMapConfigId() {
        return super.getValue(_fieldNames.DEPMAPCONFIGID);
    }

    get mapConfigId() {
        return super.getValue(_fieldNames.MAPCONFIGID);
    } set mapConfigId(val) {
        super.setValue(_fieldNames.MAPCONFIGID, val);
    }

    get eposDepartment() {
        return super.getValue(_fieldNames.EPOSDEPARTMENT);
    } set eposDepartment(val) {
        super.setValue(_fieldNames.EPOSDEPARTMENT, val);
    }

    get eposSubDepartment() {
        return super.getValue(_fieldNames.EPOSSUBDEPARTMENT);
    } set eposSubDepartment(val) {
        super.setValue(_fieldNames.EPOSSUBDEPARTMENT, val);
    }

    get eposDescription() {
        return super.getValue(_fieldNames.EPOSDESCRIPTION);
    } set eposDescription(val) {
        super.setValue(_fieldNames.EPOSDESCRIPTION, val);
    }

    get saleAccountId() {
        return super.getValue(_fieldNames.SALEACCOUNTID);
    } set saleAccountId(val) {
        super.setValue(_fieldNames.SALEACCOUNTID, val);
    }

    get purchaseAccountId() {
        return super.getValue(_fieldNames.PURCHASEACCOUNTID);
    } set purchaseAccountId(val) {
        super.setValue(_fieldNames.PURCHASEACCOUNTID, val);
    }

    get accrualAccountId() {
        return super.getValue(_fieldNames.ACCRUALACCOUNTID);
    } set accrualAccountId(val) {
        super.setValue(_fieldNames.ACCRUALACCOUNTID, val);
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
    Table: Persistent_cx_map_config_dep_Collection,
    Record: Persistent_cx_map_config_dep,
}
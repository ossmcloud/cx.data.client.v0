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
const _tableName = 'cx_shop_group';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    SHOPGROUPID: 'shopGroupId',
    GROUPCODE: 'groupCode',
    GROUPNAME: 'groupName',
    GROUPCOLOR: 'groupColor',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    shopGroupId: { name: 'shopGroupId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    groupCode: { name: 'groupCode', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    groupName: { name: 'groupName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    groupColor: { name: 'groupColor', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_shop_group_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_shop_group extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get shopGroupId() {
        return super.getValue(_fieldNames.SHOPGROUPID);
    }

    get groupCode() {
        return super.getValue(_fieldNames.GROUPCODE);
    } set groupCode(val) {
        super.setValue(_fieldNames.GROUPCODE, val);
    }

    get groupName() {
        return super.getValue(_fieldNames.GROUPNAME);
    } set groupName(val) {
        super.setValue(_fieldNames.GROUPNAME, val);
    }

    get groupColor() {
        return super.getValue(_fieldNames.GROUPCOLOR);
    } set groupColor(val) {
        super.setValue(_fieldNames.GROUPCOLOR, val);
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
    Table: Persistent_cx_shop_group_Collection,
    Record: Persistent_cx_shop_group,
}
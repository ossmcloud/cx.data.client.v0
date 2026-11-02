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
const _tableName = 'ca_setting';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    SETTINGID: 'settingId',
    WHOLESALERID: 'wholesalerId',
    SUPPLIERS: 'suppliers',
    LEVEL0MIN: 'level0Min',
    LEVEL0MAX: 'level0Max',
    LEVEL1MIN: 'level1Min',
    LEVEL1MAX: 'level1Max',
    LEVEL2MIN: 'level2Min',
    LEVEL2MAX: 'level2Max',
    LEVEL3MIN: 'level3Min',
    LEVEL3MAX: 'level3Max',
    LEVEL4MIN: 'level4Min',
    LEVEL4MAX: 'level4Max',
    LEVEL5MIN: 'level5Min',
    LEVEL5MAX: 'level5Max',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    settingId: { name: 'settingId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    wholesalerId: { name: 'wholesalerId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    suppliers: { name: 'suppliers', dataType: 'varchar', pk: false, identity: false, maxLength: 1000, null: true },
    level0Min: { name: 'level0Min', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    level0Max: { name: 'level0Max', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    level1Min: { name: 'level1Min', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    level1Max: { name: 'level1Max', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    level2Min: { name: 'level2Min', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    level2Max: { name: 'level2Max', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    level3Min: { name: 'level3Min', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    level3Max: { name: 'level3Max', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    level4Min: { name: 'level4Min', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    level4Max: { name: 'level4Max', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    level5Min: { name: 'level5Min', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    level5Max: { name: 'level5Max', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_ca_setting_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_ca_setting extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get settingId() {
        return super.getValue(_fieldNames.SETTINGID);
    }

    get wholesalerId() {
        return super.getValue(_fieldNames.WHOLESALERID);
    } set wholesalerId(val) {
        super.setValue(_fieldNames.WHOLESALERID, val);
    }

    get suppliers() {
        return super.getValue(_fieldNames.SUPPLIERS);
    } set suppliers(val) {
        super.setValue(_fieldNames.SUPPLIERS, val);
    }

    get level0Min() {
        return super.getValue(_fieldNames.LEVEL0MIN);
    } set level0Min(val) {
        super.setValue(_fieldNames.LEVEL0MIN, val);
    }

    get level0Max() {
        return super.getValue(_fieldNames.LEVEL0MAX);
    } set level0Max(val) {
        super.setValue(_fieldNames.LEVEL0MAX, val);
    }

    get level1Min() {
        return super.getValue(_fieldNames.LEVEL1MIN);
    } set level1Min(val) {
        super.setValue(_fieldNames.LEVEL1MIN, val);
    }

    get level1Max() {
        return super.getValue(_fieldNames.LEVEL1MAX);
    } set level1Max(val) {
        super.setValue(_fieldNames.LEVEL1MAX, val);
    }

    get level2Min() {
        return super.getValue(_fieldNames.LEVEL2MIN);
    } set level2Min(val) {
        super.setValue(_fieldNames.LEVEL2MIN, val);
    }

    get level2Max() {
        return super.getValue(_fieldNames.LEVEL2MAX);
    } set level2Max(val) {
        super.setValue(_fieldNames.LEVEL2MAX, val);
    }

    get level3Min() {
        return super.getValue(_fieldNames.LEVEL3MIN);
    } set level3Min(val) {
        super.setValue(_fieldNames.LEVEL3MIN, val);
    }

    get level3Max() {
        return super.getValue(_fieldNames.LEVEL3MAX);
    } set level3Max(val) {
        super.setValue(_fieldNames.LEVEL3MAX, val);
    }

    get level4Min() {
        return super.getValue(_fieldNames.LEVEL4MIN);
    } set level4Min(val) {
        super.setValue(_fieldNames.LEVEL4MIN, val);
    }

    get level4Max() {
        return super.getValue(_fieldNames.LEVEL4MAX);
    } set level4Max(val) {
        super.setValue(_fieldNames.LEVEL4MAX, val);
    }

    get level5Min() {
        return super.getValue(_fieldNames.LEVEL5MIN);
    } set level5Min(val) {
        super.setValue(_fieldNames.LEVEL5MIN, val);
    }

    get level5Max() {
        return super.getValue(_fieldNames.LEVEL5MAX);
    } set level5Max(val) {
        super.setValue(_fieldNames.LEVEL5MAX, val);
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
    Table: Persistent_ca_setting_Collection,
    Record: Persistent_ca_setting,
}
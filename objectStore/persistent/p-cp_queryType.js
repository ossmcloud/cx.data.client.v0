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
const _tableName = 'cp_queryType';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    QUERYTYPEID: 'queryTypeId',
    WHOLESALERID: 'wholesalerId',
    NAME: 'name',
    CODE: 'code',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    MANDATORYFIELDS: 'mandatoryFields',
    MESSAGETEMPLATE: 'messageTemplate',
    REQUIRESDISPUTEDAMOUNT: 'requiresDisputedAmount',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    queryTypeId: { name: 'queryTypeId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    wholesalerId: { name: 'wholesalerId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    name: { name: 'name', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    code: { name: 'code', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    mandatoryFields: { name: 'mandatoryFields', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    messageTemplate: { name: 'messageTemplate', dataType: 'varchar', pk: false, identity: false, maxLength: 2000, null: true },
    requiresDisputedAmount: { name: 'requiresDisputedAmount', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_queryType_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_queryType extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get queryTypeId() {
        return super.getValue(_fieldNames.QUERYTYPEID);
    }

    get wholesalerId() {
        return super.getValue(_fieldNames.WHOLESALERID);
    } set wholesalerId(val) {
        super.setValue(_fieldNames.WHOLESALERID, val);
    }

    get name() {
        return super.getValue(_fieldNames.NAME);
    } set name(val) {
        super.setValue(_fieldNames.NAME, val);
    }

    get code() {
        return super.getValue(_fieldNames.CODE);
    } set code(val) {
        super.setValue(_fieldNames.CODE, val);
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

    get mandatoryFields() {
        return super.getValue(_fieldNames.MANDATORYFIELDS);
    } set mandatoryFields(val) {
        super.setValue(_fieldNames.MANDATORYFIELDS, val);
    }

    get messageTemplate() {
        return super.getValue(_fieldNames.MESSAGETEMPLATE);
    } set messageTemplate(val) {
        super.setValue(_fieldNames.MESSAGETEMPLATE, val);
    }

    get requiresDisputedAmount() {
        return super.getValue(_fieldNames.REQUIRESDISPUTEDAMOUNT);
    } set requiresDisputedAmount(val) {
        super.setValue(_fieldNames.REQUIRESDISPUTEDAMOUNT, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cp_queryType_Collection,
    Record: Persistent_cp_queryType,
}
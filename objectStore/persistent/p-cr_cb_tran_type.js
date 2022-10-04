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
const _tableName = 'cr_cb_tran_type';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    CBTRANTYPEID: 'cbTranTypeId',
    CODE: 'code',
    TILLDIFFIMPACT: 'tillDiffImpact',
    CBSECTION: 'cbSection',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    MANDATORYFIELDS: 'mandatoryFields',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    cbTranTypeId: { name: 'cbTranTypeId', dataType: 'int', pk: true, identity: false, maxLength: 4, null: false },
    code: { name: 'code', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    tillDiffImpact: { name: 'tillDiffImpact', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    cbSection: { name: 'cbSection', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    mandatoryFields: { name: 'mandatoryFields', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cr_cb_tran_type_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cr_cb_tran_type extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get cbTranTypeId() {
        return super.getValue(_fieldNames.CBTRANTYPEID);
    } set cbTranTypeId(val) {
        super.setValue(_fieldNames.CBTRANTYPEID, val);
    }

    get code() {
        return super.getValue(_fieldNames.CODE);
    } set code(val) {
        super.setValue(_fieldNames.CODE, val);
    }

    get tillDiffImpact() {
        return super.getValue(_fieldNames.TILLDIFFIMPACT);
    } set tillDiffImpact(val) {
        super.setValue(_fieldNames.TILLDIFFIMPACT, val);
    }

    get cbSection() {
        return super.getValue(_fieldNames.CBSECTION);
    } set cbSection(val) {
        super.setValue(_fieldNames.CBSECTION, val);
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


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cr_cb_tran_type_Collection,
    Record: Persistent_cr_cb_tran_type,
}
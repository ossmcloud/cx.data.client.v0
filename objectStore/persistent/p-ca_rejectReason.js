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
const _tableName = 'ca_rejectReason';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    REJECTREASONID: 'rejectReasonId',
    REASON: 'reason',
    NOTES: 'notes',
    FORCECOMMENT: 'forceComment',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    SORTINDEX: 'sortIndex',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    rejectReasonId: { name: 'rejectReasonId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    reason: { name: 'reason', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    notes: { name: 'notes', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    forceComment: { name: 'forceComment', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true, default: '0' },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    sortIndex: { name: 'sortIndex', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_ca_rejectReason_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_ca_rejectReason extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get rejectReasonId() {
        return super.getValue(_fieldNames.REJECTREASONID);
    }

    get reason() {
        return super.getValue(_fieldNames.REASON);
    } set reason(val) {
        super.setValue(_fieldNames.REASON, val);
    }

    get notes() {
        return super.getValue(_fieldNames.NOTES);
    } set notes(val) {
        super.setValue(_fieldNames.NOTES, val);
    }

    get forceComment() {
        return super.getValue(_fieldNames.FORCECOMMENT);
    } set forceComment(val) {
        super.setValue(_fieldNames.FORCECOMMENT, val);
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

    get sortIndex() {
        return super.getValue(_fieldNames.SORTINDEX);
    } set sortIndex(val) {
        super.setValue(_fieldNames.SORTINDEX, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_ca_rejectReason_Collection,
    Record: Persistent_ca_rejectReason,
}
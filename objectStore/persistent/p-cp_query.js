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
const _tableName = 'cp_query';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    QUERYID: 'queryId',
    SHOPID: 'shopId',
    INVCREID: 'invCreId',
    STATUSID: 'statusId',
    STATUSMESSAGE: 'statusMessage',
    QUERYTYPEID: 'queryTypeId',
    QUERYREFERENCE: 'queryReference',
    QUERYMESSAGE: 'queryMessage',
    NOTES: 'notes',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    QUERYEXREFERENCE: 'queryExReference',
    DISPUTEDAMOUNT: 'disputedAmount',
    RESOLUTIONTYPEID: 'resolutionTypeId',
    SUBMITDATE: 'submitDate',
    RESOLUTIONMESSAGE: 'resolutionMessage',
    RESOLUTIONDATE: 'resolutionDate',
    DELRETID: 'delRetId',
    CREDITAPPLIED: 'creditApplied',
    CREDITNOTENUMBER: 'creditNoteNumber',
    CREDITTOTAL: 'creditTotal',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    queryId: { name: 'queryId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    invCreId: { name: 'invCreId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    statusId: { name: 'statusId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    statusMessage: { name: 'statusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    queryTypeId: { name: 'queryTypeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    queryReference: { name: 'queryReference', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    queryMessage: { name: 'queryMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 2000, null: false },
    notes: { name: 'notes', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    queryExReference: { name: 'queryExReference', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    disputedAmount: { name: 'disputedAmount', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    resolutionTypeId: { name: 'resolutionTypeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    submitDate: { name: 'submitDate', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    resolutionMessage: { name: 'resolutionMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 2000, null: true },
    resolutionDate: { name: 'resolutionDate', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    delRetId: { name: 'delRetId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    creditApplied: { name: 'creditApplied', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    creditNoteNumber: { name: 'creditNoteNumber', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    creditTotal: { name: 'creditTotal', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_query_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_query extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get queryId() {
        return super.getValue(_fieldNames.QUERYID);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get invCreId() {
        return super.getValue(_fieldNames.INVCREID);
    } set invCreId(val) {
        super.setValue(_fieldNames.INVCREID, val);
    }

    get statusId() {
        return super.getValue(_fieldNames.STATUSID);
    } set statusId(val) {
        super.setValue(_fieldNames.STATUSID, val);
    }

    get statusMessage() {
        return super.getValue(_fieldNames.STATUSMESSAGE);
    } set statusMessage(val) {
        super.setValue(_fieldNames.STATUSMESSAGE, val);
    }

    get queryTypeId() {
        return super.getValue(_fieldNames.QUERYTYPEID);
    } set queryTypeId(val) {
        super.setValue(_fieldNames.QUERYTYPEID, val);
    }

    get queryReference() {
        return super.getValue(_fieldNames.QUERYREFERENCE);
    } set queryReference(val) {
        super.setValue(_fieldNames.QUERYREFERENCE, val);
    }

    get queryMessage() {
        return super.getValue(_fieldNames.QUERYMESSAGE);
    } set queryMessage(val) {
        super.setValue(_fieldNames.QUERYMESSAGE, val);
    }

    get notes() {
        return super.getValue(_fieldNames.NOTES);
    } set notes(val) {
        super.setValue(_fieldNames.NOTES, val);
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

    get queryExReference() {
        return super.getValue(_fieldNames.QUERYEXREFERENCE);
    } set queryExReference(val) {
        super.setValue(_fieldNames.QUERYEXREFERENCE, val);
    }

    get disputedAmount() {
        return super.getValue(_fieldNames.DISPUTEDAMOUNT);
    } set disputedAmount(val) {
        super.setValue(_fieldNames.DISPUTEDAMOUNT, val);
    }

    get resolutionTypeId() {
        return super.getValue(_fieldNames.RESOLUTIONTYPEID);
    } set resolutionTypeId(val) {
        super.setValue(_fieldNames.RESOLUTIONTYPEID, val);
    }

    get submitDate() {
        return super.getValue(_fieldNames.SUBMITDATE);
    } set submitDate(val) {
        super.setValue(_fieldNames.SUBMITDATE, val);
    }

    get resolutionMessage() {
        return super.getValue(_fieldNames.RESOLUTIONMESSAGE);
    } set resolutionMessage(val) {
        super.setValue(_fieldNames.RESOLUTIONMESSAGE, val);
    }

    get resolutionDate() {
        return super.getValue(_fieldNames.RESOLUTIONDATE);
    } set resolutionDate(val) {
        super.setValue(_fieldNames.RESOLUTIONDATE, val);
    }

    get delRetId() {
        return super.getValue(_fieldNames.DELRETID);
    } set delRetId(val) {
        super.setValue(_fieldNames.DELRETID, val);
    }

    get creditApplied() {
        return super.getValue(_fieldNames.CREDITAPPLIED);
    } set creditApplied(val) {
        super.setValue(_fieldNames.CREDITAPPLIED, val);
    }

    get creditNoteNumber() {
        return super.getValue(_fieldNames.CREDITNOTENUMBER);
    } set creditNoteNumber(val) {
        super.setValue(_fieldNames.CREDITNOTENUMBER, val);
    }

    get creditTotal() {
        return super.getValue(_fieldNames.CREDITTOTAL);
    } set creditTotal(val) {
        super.setValue(_fieldNames.CREDITTOTAL, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cp_query_Collection,
    Record: Persistent_cp_query,
}
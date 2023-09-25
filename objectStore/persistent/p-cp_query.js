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
    INVGRPID: 'invGrpId',
    INVCREID: 'invCreId',
    WHOLESALERID: 'wholesalerId',
    STATUSID: 'statusId',
    STATUSMESSAGE: 'statusMessage',
    QUERYTYPEID: 'queryTypeId',
    QUERYNET: 'queryNet',
    QUERYVAT: 'queryVat',
    QUERYGROSS: 'queryGross',
    QUERYMESSAGE: 'queryMessage',
    NOTES: 'notes',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    queryId: { name: 'queryId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    invGrpId: { name: 'invGrpId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    invCreId: { name: 'invCreId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    wholesalerId: { name: 'wholesalerId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    statusId: { name: 'statusId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    statusMessage: { name: 'statusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    queryTypeId: { name: 'queryTypeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    queryNet: { name: 'queryNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    queryVat: { name: 'queryVat', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    queryGross: { name: 'queryGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    queryMessage: { name: 'queryMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 2000, null: false },
    notes: { name: 'notes', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

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

    get invGrpId() {
        return super.getValue(_fieldNames.INVGRPID);
    } set invGrpId(val) {
        super.setValue(_fieldNames.INVGRPID, val);
    }

    get invCreId() {
        return super.getValue(_fieldNames.INVCREID);
    } set invCreId(val) {
        super.setValue(_fieldNames.INVCREID, val);
    }

    get wholesalerId() {
        return super.getValue(_fieldNames.WHOLESALERID);
    } set wholesalerId(val) {
        super.setValue(_fieldNames.WHOLESALERID, val);
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

    get queryNet() {
        return super.getValue(_fieldNames.QUERYNET);
    } set queryNet(val) {
        super.setValue(_fieldNames.QUERYNET, val);
    }

    get queryVat() {
        return super.getValue(_fieldNames.QUERYVAT);
    } set queryVat(val) {
        super.setValue(_fieldNames.QUERYVAT, val);
    }

    get queryGross() {
        return super.getValue(_fieldNames.QUERYGROSS);
    } set queryGross(val) {
        super.setValue(_fieldNames.QUERYGROSS, val);
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


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cp_query_Collection,
    Record: Persistent_cp_query,
}
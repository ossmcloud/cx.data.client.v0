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
const _tableName = 'raw_cp_attachment';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    ATTACHMENTID: 'attachmentId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    NAME: 'name',
    EXTERNALREFERENCE: 'externalReference',
    EXTERNALLINK: 'externalLink',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    attachmentId: { name: 'attachmentId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    name: { name: 'name', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    externalReference: { name: 'externalReference', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    externalLink: { name: 'externalLink', dataType: 'varchar', pk: false, identity: false, maxLength: 1000, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_cp_attachment_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_cp_attachment extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get attachmentId() {
        return super.getValue(_fieldNames.ATTACHMENTID);
    }

    get transmissionID() {
        return super.getValue(_fieldNames.TRANSMISSIONID);
    } set transmissionID(val) {
        super.setValue(_fieldNames.TRANSMISSIONID, val);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get name() {
        return super.getValue(_fieldNames.NAME);
    } set name(val) {
        super.setValue(_fieldNames.NAME, val);
    }

    get externalReference() {
        return super.getValue(_fieldNames.EXTERNALREFERENCE);
    } set externalReference(val) {
        super.setValue(_fieldNames.EXTERNALREFERENCE, val);
    }

    get externalLink() {
        return super.getValue(_fieldNames.EXTERNALLINK);
    } set externalLink(val) {
        super.setValue(_fieldNames.EXTERNALLINK, val);
    }

    get created() {
        return super.getValue(_fieldNames.CREATED);
    } set created(val) {
        super.setValue(_fieldNames.CREATED, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_raw_cp_attachment_Collection,
    Record: Persistent_raw_cp_attachment,
}
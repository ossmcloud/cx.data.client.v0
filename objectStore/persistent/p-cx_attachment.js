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
const _tableName = 'cx_attachment';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    ATTACHMENTID: 'attachmentId',
    RECORDTYPE: 'recordType',
    RECORDID: 'recordId',
    SHOPID: 'shopId',
    TYPEID: 'typeId',
    SOURCE: 'source',
    NAME: 'name',
    DESCRIPTION: 'description',
    EXTERNALREFERENCE: 'externalReference',
    EXTERNALLINK: 'externalLink',
    JSONOPTIONS: 'jsonOptions',
    ERROR: 'error',
    ERRORMESSAGE: 'errorMessage',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    attachmentId: { name: 'attachmentId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    recordType: { name: 'recordType', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    recordId: { name: 'recordId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    typeId: { name: 'typeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    source: { name: 'source', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    name: { name: 'name', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: false },
    description: { name: 'description', dataType: 'varchar', pk: false, identity: false, maxLength: 500, null: true },
    externalReference: { name: 'externalReference', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    externalLink: { name: 'externalLink', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    jsonOptions: { name: 'jsonOptions', dataType: 'varchar', pk: false, identity: false, maxLength: 1000, null: true },
    error: { name: 'error', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    errorMessage: { name: 'errorMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_attachment_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_attachment extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get attachmentId() {
        return super.getValue(_fieldNames.ATTACHMENTID);
    }

    get recordType() {
        return super.getValue(_fieldNames.RECORDTYPE);
    } set recordType(val) {
        super.setValue(_fieldNames.RECORDTYPE, val);
    }

    get recordId() {
        return super.getValue(_fieldNames.RECORDID);
    } set recordId(val) {
        super.setValue(_fieldNames.RECORDID, val);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get typeId() {
        return super.getValue(_fieldNames.TYPEID);
    } set typeId(val) {
        super.setValue(_fieldNames.TYPEID, val);
    }

    get source() {
        return super.getValue(_fieldNames.SOURCE);
    } set source(val) {
        super.setValue(_fieldNames.SOURCE, val);
    }

    get name() {
        return super.getValue(_fieldNames.NAME);
    } set name(val) {
        super.setValue(_fieldNames.NAME, val);
    }

    get description() {
        return super.getValue(_fieldNames.DESCRIPTION);
    } set description(val) {
        super.setValue(_fieldNames.DESCRIPTION, val);
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

    get jsonOptions() {
        return super.getValue(_fieldNames.JSONOPTIONS);
    } set jsonOptions(val) {
        super.setValue(_fieldNames.JSONOPTIONS, val);
    }

    get error() {
        return super.getValue(_fieldNames.ERROR);
    } set error(val) {
        super.setValue(_fieldNames.ERROR, val);
    }

    get errorMessage() {
        return super.getValue(_fieldNames.ERRORMESSAGE);
    } set errorMessage(val) {
        super.setValue(_fieldNames.ERRORMESSAGE, val);
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
    Table: Persistent_cx_attachment_Collection,
    Record: Persistent_cx_attachment,
}
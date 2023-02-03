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
const _tableName = 'cp_documentImport';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    DOCUMENTIMPORTID: 'documentImportId',
    SHOPID: 'shopId',
    PROVIDERID: 'providerId',
    PROVIDERNAME: 'providerName',
    IMPORTSTATUS: 'importStatus',
    IMPORTSTATUSMESSAGE: 'importStatusMessage',
    FILETYPE: 'fileType',
    FILENAME: 'fileName',
    OPTIONS: 'options',
    RECORDTYPE: 'recordType',
    RECORDID: 'recordId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    documentImportId: { name: 'documentImportId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    providerId: { name: 'providerId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    providerName: { name: 'providerName', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: false },
    importStatus: { name: 'importStatus', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    importStatusMessage: { name: 'importStatusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    fileType: { name: 'fileType', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    fileName: { name: 'fileName', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: false },
    options: { name: 'options', dataType: 'varchar', pk: false, identity: false, maxLength: 4000, null: true },
    recordType: { name: 'recordType', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    recordId: { name: 'recordId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_documentImport_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_documentImport extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get documentImportId() {
        return super.getValue(_fieldNames.DOCUMENTIMPORTID);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get providerId() {
        return super.getValue(_fieldNames.PROVIDERID);
    } set providerId(val) {
        super.setValue(_fieldNames.PROVIDERID, val);
    }

    get providerName() {
        return super.getValue(_fieldNames.PROVIDERNAME);
    } set providerName(val) {
        super.setValue(_fieldNames.PROVIDERNAME, val);
    }

    get importStatus() {
        return super.getValue(_fieldNames.IMPORTSTATUS);
    } set importStatus(val) {
        super.setValue(_fieldNames.IMPORTSTATUS, val);
    }

    get importStatusMessage() {
        return super.getValue(_fieldNames.IMPORTSTATUSMESSAGE);
    } set importStatusMessage(val) {
        super.setValue(_fieldNames.IMPORTSTATUSMESSAGE, val);
    }

    get fileType() {
        return super.getValue(_fieldNames.FILETYPE);
    } set fileType(val) {
        super.setValue(_fieldNames.FILETYPE, val);
    }

    get fileName() {
        return super.getValue(_fieldNames.FILENAME);
    } set fileName(val) {
        super.setValue(_fieldNames.FILENAME, val);
    }

    get options() {
        return super.getValue(_fieldNames.OPTIONS);
    } set options(val) {
        super.setValue(_fieldNames.OPTIONS, val);
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
    Table: Persistent_cp_documentImport_Collection,
    Record: Persistent_cp_documentImport,
}
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
const _tableName = 'cx_login';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    LOGINID: 'loginId',
    MASTERLOGINID: 'masterLoginId',
    EMAIL: 'email',
    FIRSTNAME: 'firstName',
    LASTNAME: 'lastName',
    JOBTITLE: 'jobTitle',
    THEME: 'theme',
    ROLEID: 'roleId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    loginId: { name: 'loginId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    masterLoginId: { name: 'masterLoginId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    email: { name: 'email', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: false },
    firstName: { name: 'firstName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    lastName: { name: 'lastName', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    jobTitle: { name: 'jobTitle', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    theme: { name: 'theme', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: true },
    roleId: { name: 'roleId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_login_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_login extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get loginId() {
        return super.getValue(_fieldNames.LOGINID);
    }

    get masterLoginId() {
        return super.getValue(_fieldNames.MASTERLOGINID);
    } set masterLoginId(val) {
        super.setValue(_fieldNames.MASTERLOGINID, val);
    }

    get email() {
        return super.getValue(_fieldNames.EMAIL);
    } set email(val) {
        super.setValue(_fieldNames.EMAIL, val);
    }

    get firstName() {
        return super.getValue(_fieldNames.FIRSTNAME);
    } set firstName(val) {
        super.setValue(_fieldNames.FIRSTNAME, val);
    }

    get lastName() {
        return super.getValue(_fieldNames.LASTNAME);
    } set lastName(val) {
        super.setValue(_fieldNames.LASTNAME, val);
    }

    get jobTitle() {
        return super.getValue(_fieldNames.JOBTITLE);
    } set jobTitle(val) {
        super.setValue(_fieldNames.JOBTITLE, val);
    }

    get theme() {
        return super.getValue(_fieldNames.THEME);
    } set theme(val) {
        super.setValue(_fieldNames.THEME, val);
    }

    get roleId() {
        return super.getValue(_fieldNames.ROLEID);
    } set roleId(val) {
        super.setValue(_fieldNames.ROLEID, val);
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
    Table: Persistent_cx_login_Collection,
    Record: Persistent_cx_login,
}
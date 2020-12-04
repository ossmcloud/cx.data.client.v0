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
    CREATED: 'created',

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
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },

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
    Table: Persistent_cx_login_Collection,
    Record: Persistent_cx_login,
}
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
const _tableName = 'cx_login_roles';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    LOGINROLEID: 'loginRoleId',
    LOGINID: 'loginId',
    ROLEID: 'roleId',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    loginRoleId: { name: 'loginRoleId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    loginId: { name: 'loginId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    roleId: { name: 'roleId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_login_roles_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_login_roles extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get loginRoleId() {
        return super.getValue(_fieldNames.LOGINROLEID);
    }

    get loginId() {
        return super.getValue(_fieldNames.LOGINID);
    } set loginId(val) {
        super.setValue(_fieldNames.LOGINID, val);
    }

    get roleId() {
        return super.getValue(_fieldNames.ROLEID);
    } set roleId(val) {
        super.setValue(_fieldNames.ROLEID, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cx_login_roles_Collection,
    Record: Persistent_cx_login_roles,
}
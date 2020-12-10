'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _cxConst = require('../cx-client-declarations');
const _persistentTable = require('../persistent/p-cx_login_roles');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class cx_login_roles_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_login_roles(this, defaults);
    }

    async selectByUser(userId) {
        var query = {
            sql: `select * from cx_login_roles where loginId = @loginId order by roleId`,
            params: [{ name: 'loginId', value: userId }]
        }
        return await super.select(query);
    }



    
}
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class cx_login_roles extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    get roleName() {
        return _cxConst.CX_ROLE.getName(this.roleId);
    }
   
}
//
// EXPORTS ONLY TABLE AND RECORD
//
module.exports = {
    Table: cx_login_roles_Collection,
    Record: cx_login_roles,
}


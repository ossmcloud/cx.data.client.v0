'use strict'
//
const _cxConst = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cx_login_roles');
//
// 
//
class cx_login_roles_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_login_roles(this, defaults);
    }

    async selectByUser(loginId) {
        var query = {
            sql: `select * from cx_login_roles where loginId = @loginId order by roleId`,
            params: [{ name: 'loginId', value: loginId }]
        }
        return await super.select(query);
    }

    async deleteByUser(loginId, roleId) {
        var query = {
            sql: 'delete from cx_login_roles where loginId = @loginId and roleId = @roleId',
            params: [
                { name: 'loginId', value: loginId },
                { name: 'roleId', value: roleId },
            ]
        }
        return await this.cx.exec(query);
    }

    async updateByUser(loginId, roles) {
        var errors = '';
        for (var sx = 0; sx < roles.length; sx++) {
            try {
                var loginRole = this.createNew();
                loginRole.loginId = loginId;
                loginRole.roleId = roles[sx];
                await loginRole.save();
            } catch (error) {
                if (error.message.indexOf('IX_cx_login_roles') < 0) {
                    errors += `role id: ${roles[sx]} - error: ${error.message}\n`;
                } else {
                    errors += `role id: ${roles[sx]} - error: role already assigned\n`;
                }
            }
        }
        if (errors) {
            throw new Error('one or more roles could not be added:\n\n' + errors);
        }
    }


}
//
//
//
class cx_login_roles extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    get roleName() { return _cxConst.CX_ROLE.getName(this.roleId); }
}
//
//
//
module.exports = {
    Table: cx_login_roles_Collection,
    Record: cx_login_roles,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cx_login');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
//
class cx_login_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_login(this, defaults);
    }

    async select(params) {
        if (!params) { params = {}; }

        var query = {
            sql: 'select l.*, (select count(*) from cx_login_roles r where r.roleId >= 8 and r.loginId = l.loginId) as cx_roles from cx_login l order by l.loginId'
        }

        return await super.select(query)
    }

    async selectList(addSysUser) {
        await this.select();
        var list = [];
        if (addSysUser) {
            list.push({ value: _declarations.CX_SYS_USERS.ERPS, text: '<span style="font-style: italic; color: var(--element-color-disabled)">[erp service]</span>' });
            list.push({ value: _declarations.CX_SYS_USERS.DTFS, text: '<span style="font-style: italic; color: var(--element-color-disabled)">[epos service]</span>' });
            list.push({ value: _declarations.CX_SYS_USERS.SYSTEM, text: '<span style="font-style: italic; color: var(--element-color-disabled)">[system]</span>' });
        }
        this.each(function (login) {
            list.push({
                value: login.loginId,
                text: login.displayName,
            });
        });
        return list;
    }
}
//
//
//
class cx_login extends _persistentTable.Record {
    #cx_role = false;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }

        this.#cx_role = parseInt(defaults['cx_roles'] || 0) > 0;
    };

    get displayName() {
        if (this.firstName && this.lastName) {
            return `${this.firstName} ${this.lastName}`;
        } else if (this.firstName) {
            return this.firstName;
        } else {
            return this.email;
        }
    }

    get cx_role() {
        return this.#cx_role;
    }

    async hasCxRole() {
        if (this.roleId >= _declarations.CX_ROLE.CX_SUPPORT) { return true; }
        var roles = this.cx.table(_schema.cx_login_roles);
        await roles.selectByUser(this.loginId);
        roles.each(r => {
            if (r.roleId >= _declarations.CX_ROLE.CX_SUPPORT) {
                return true;
            }
        });
        return false;
    }


}
//
// 
//
module.exports = {
    Table: cx_login_Collection,
    Record: cx_login,
}


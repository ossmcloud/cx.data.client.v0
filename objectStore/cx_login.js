'use strict'
//
const _persistentTable = require('./persistent/p-cx_login');
const _declarations = require('../cx-client-declarations');
//
class cx_login_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_login(this, defaults);
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
    constructor(table, defaults) {
        super(table, defaults);
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
}
//
// 
//
module.exports = {
    Table: cx_login_Collection,
    Record: cx_login,
}


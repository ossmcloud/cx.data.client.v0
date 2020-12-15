'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _persistentTable = require('./persistent/p-cx_login');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class cx_login_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_login(this, defaults);
    }

    async selectList() {
        await this.select();
        var list = [];
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
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
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
// EXPORTS ONLY TABLE AND RECORD
//
module.exports = {
    Table: cx_login_Collection,
    Record: cx_login,
}


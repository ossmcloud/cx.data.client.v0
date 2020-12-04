'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _persistentTable = require('../persistent/p-cx_login');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class cx_login_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_login(this, defaults);
    }
}
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class cx_login extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// EXPORTS ONLY TABLE AND RECORD
//
module.exports = {
    Table: cx_login_Collection,
    Record: cx_login,
}


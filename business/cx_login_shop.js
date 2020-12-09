'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _persistentTable = require('../persistent/p-cx_login_shop');
const _cxSchema = require('../cx-client-schema');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class cx_login_shop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_login_shop(this, defaults);
    }

    async select() {
        var query = {
            sql: `
                    select  s.*
                    from    cx_login_shop s
                    left outer join cx_login l on l.loginId = s.loginId
                    where   l.masterLoginId = @masterLoginId
                `,
            params: [
                {name: _cxSchema.cx_login.MASTERLOGINID, value: this.cx.userId}
            ]
        }
        return await super.select(query);
    }
}
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class cx_login_shop extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    
}
//
// EXPORTS ONLY TABLE AND RECORD
//
module.exports = {
    Table: cx_login_shop_Collection,
    Record: cx_login_shop,
}


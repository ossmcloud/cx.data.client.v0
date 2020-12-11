'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _persistentTable = require('./persistent/p-cx_login_shop');
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

    async deleteByUser(loginId, shopId) {
        var query = {
            sql: 'delete from cx_login_shop where loginId = @loginId and shopId = @shopId',
            params: [
                { name: 'loginId', value: loginId },
                { name: 'shopId', value: shopId },
            ]
        }
        return await this.cx.exec(query);
    }

    async updateByUser(loginId, shops) {
        var errors = '';
        for (var sx = 0; sx < shops.length; sx++) {
            try {
                var loginShop = this.createNew();
                loginShop.loginId = loginId;
                loginShop.shopId = shops[sx];
                await loginShop.save();
            } catch (error) {
                errors += `shop id: ${roles[sx]} - error: ${error.message}\n`;
            }
        }
        if (errors) {
            throw new Error('one or more shops could not be added:\n\n' + errors);
        }
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


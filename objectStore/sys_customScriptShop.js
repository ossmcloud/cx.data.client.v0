'use strict'
//
const _persistentTable = require('./persistent/p-sys_customScriptShop');
//
class sys_customScriptShop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_customScriptShop(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select  scriptShop.*, script.scriptName, s.shopCode, s.shopName
                from    sys_customScriptShop scriptShop
                left outer join sys_customScript script ON script.scriptId = scriptShop.scriptId
                left outer join cx_shop s ON s.shopId = scriptShop.shopId
                where 1 = 1`
        };
        this.queryFromParams(query, params, 'scriptShop');
        query.sql += ' order by s.shopCode';

        return await super.select(query);
    }

    

    async updateByShop(scriptId, shops) {
        var errors = '';
        for (var sx = 0; sx < shops.length; sx++) {
            try {
                var shopScript = this.createNew();
                shopScript.scriptId = scriptId;
                shopScript.shopId = shops[sx];
                await shopScript.save();
            } catch (error) {
                if (error.message.indexOf('IX_sys_customScriptShop') < 0) {
                    errors += `shop id: ${shops[sx]} - error: ${error.message}\n`;
                } else {
                    errors += `shop id: ${shops[sx]} - error: shop already assigned\n`;
                }
            }
        }
        if (errors) {
            throw new Error('one or more shops could not be added:\n\n' + errors);
        }
    }


}
//
// ----------------------------------------------------------------------------------------
//
class sys_customScriptShop extends _persistentTable.Record {
    #shopCode = '';
    #shopName = '';
    #scriptName = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopCode = defaults['shopCode'] || '';
        this.#shopName = defaults['shopName'] || '';
        this.#scriptName = defaults['scriptName'] || '';
    };

    get shopCode() { return this.#shopCode; }
    get shopName() { return this.#shopName; }
    get scriptName() { return this.#scriptName; }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: sys_customScriptShop_Collection,
    Record: sys_customScriptShop,
}



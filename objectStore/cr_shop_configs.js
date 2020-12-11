'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _cx_schema = require('../cx-client-schema');
const _persistentTable = require('./persistent/p-cr_shop_configs');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class cr_shop_configs_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_shop_configs(this, defaults);
    }

    async getConfigValue(shopId, configName, parseJason) {
        this.query.clear();
        this.query.addFilter({ name: _cx_schema.cr_shop_configs.SHOPID, value: shopId });
        this.query.addFilter({ name: _cx_schema.cr_shop_configs.CONFIGNAME, value: configName });
        var value = null;
        if (await this.select()) {
            value = this.first().configValue;
            if (parseJason) {
                if (!value) { return null; }
                return JSON.parse(value);
            }
            return value;
        }
        return null;
    }
}
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class cr_shop_configs extends _persistentTable.Record {
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
    Table: cr_shop_configs_Collection,
    Record: cr_shop_configs,
}


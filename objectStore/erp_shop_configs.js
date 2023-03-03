'use strict'
//
const _cx_schema = require('../cx-client-schema');
const _persistentTable = require('./persistent/p-erp_shop_configs');
//
class erp_shop_configs_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new erp_shop_configs(this, defaults);
    }

    async select(shopId) {
        if (this.cx.cxSvc == true) { return await super.select(); }

        this.query.clear();
        this.query.addFilter({ name: _cx_schema.erp_shop_configs.SHOPID, value: shopId });
        return await super.select();
    }

    async getConfigValue(shopId, configName, parseJason) {
        this.query.clear();
        this.query.addFilter({ name: _cx_schema.erp_shop_configs.SHOPID, value: shopId });
        this.query.addFilter({ name: _cx_schema.erp_shop_configs.CONFIGNAME, value: configName });
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
// ----------------------------------------------------------------------------------------
//
class erp_shop_configs extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        try {
            await super.save()
        } catch (error) {
            if (error.message.indexOf('IX_erp_shop_configs') > 0) {
                throw new Error('the configurations already exists on this store!');
            } else {
                throw error;
            }
        }
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: erp_shop_configs_Collection,
    Record: erp_shop_configs,
}


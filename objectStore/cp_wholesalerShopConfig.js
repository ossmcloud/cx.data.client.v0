'use strict'
//
const _cx_crypto = require('cx-core/core/cx-crypto');
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cp_wholesalerShopConfig');
//
class cp_wholesalerShopConfig_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_wholesalerShopConfig(this, defaults);
    }

    async select(wholesalerId, shopId) {
        if (this.cx.cxSvc == true) { return await super.select(); }

        this.query.clear();
        this.query.addFilter({ name: _cxSchema.cp_wholesalerShopConfig.WHOLESALERID, value: wholesalerId });
        this.query.addFilter({ name: _cxSchema.cp_wholesalerShopConfig.SHOPID, value: shopId });
        return await super.select();
    }

    async getConfigValue(wholesalerId, shopId, configName, parseJason) {
        this.query.clear();
        this.query.addFilter({ name: _cxSchema.cp_wholesalerShopConfig.WHOLESALERID, value: wholesalerId });
        this.query.addFilter({ name: _cxSchema.cp_wholesalerShopConfig.SHOPID, value: shopId });
        this.query.addFilter({ name: _cxSchema.cp_wholesalerShopConfig.CONFIGNAME, value: configName });
        var value = null;
        if (await super.select()) {
            var config = this.first();
            value = config.configValue;
            if (config.valueEncrypted == true) { value = _cx_crypto.Aes.decrypt(value, config.configName + '_' + config.id); }
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
class cp_wholesalerShopConfig extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    get configValueDisplay() {
        if (this.valueEncrypted) { return "[value is encrypted]"; }
        return this.configValue;
    }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_wholesalerShopConfig_Collection,
    Record: cp_wholesalerShopConfig,
}



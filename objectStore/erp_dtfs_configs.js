'use strict'
//
const _cx_crypto = require('cx-core/core/cx-crypto');   
const _cxSchema = require('../cx-client-schema');
const _persistentTable = require('./persistent/p-erp_dtfs_configs');
//
class erp_dtfs_configs_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new erp_dtfs_configs(this, defaults);
    }

    async select(settingId) {
        if (this.cx.cxSvc == true) { return await super.select(); }

        this.query.clear();
        this.query.addFilter({ name: _cxSchema.erp_dtfs_configs.SETTINGID, value: settingId });
        return await super.select();
    }

    async getConfigValue(settingId, configName, parseJason) {
        this.query.clear();
        this.query.addFilter({ name: _cxSchema.erp_dtfs_configs.SETTINGID, value: settingId });
        this.query.addFilter({ name: _cxSchema.erp_dtfs_configs.CONFIGNAME, value: configName });
        var value = null;
        if (await super.select()) {
            var config = this.first();
            value = config.configValue;
            if (config.valueEncrypted == true) {
                value = _cx_crypto.Aes.decrypt(value, config.configName + '_' + config.id);
            }
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
class erp_dtfs_configs extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: erp_dtfs_configs_Collection,
    Record: erp_dtfs_configs,
}


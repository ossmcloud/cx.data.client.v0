'use strict'
//
const _persistentTable = require('./persistent/p-erp_shop_configs');
//
class erp_shop_configs_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new erp_shop_configs(this, defaults);
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
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: erp_shop_configs_Collection,
    Record: erp_shop_configs,
}


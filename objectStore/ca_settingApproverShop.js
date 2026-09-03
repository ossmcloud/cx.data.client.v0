'use strict'
//
const _persistentTable = require('./persistent/p-ca_settingApproverShop');
//
class ca_settingApproverShop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new ca_settingApproverShop(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class ca_settingApproverShop extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: ca_settingApproverShop_Collection,
    Record: ca_settingApproverShop,
}


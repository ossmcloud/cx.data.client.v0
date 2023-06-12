'use strict'
//
const _persistentTable = require('./persistent/p-cp_productAliasShop');
//
class cp_productAliasShop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_productAliasShop(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_productAliasShop extends _persistentTable.Record {
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
    Table: cp_productAliasShop_Collection,
    Record: cp_productAliasShop,
}


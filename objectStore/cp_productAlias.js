'use strict'
//
const _persistentTable = require('./persistent/p-cp_productAlias');
//
class cp_productAlias_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_productAlias(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_productAlias extends _persistentTable.Record {
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
    Table: cp_productAlias_Collection,
    Record: cp_productAlias,
}


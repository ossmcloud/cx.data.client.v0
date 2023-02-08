'use strict'
//
const _persistentTable = require('./persistent/p-cp_wholesalerProvider');
//
class cp_wholesalerProvider_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_wholesalerProvider(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_wholesalerProvider extends _persistentTable.Record {
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
    Table: cp_wholesalerProvider_Collection,
    Record: cp_wholesalerProvider,
}


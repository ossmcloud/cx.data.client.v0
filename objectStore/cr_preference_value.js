'use strict'
//
const _persistentTable = require('./persistent/p-cr_preference_value');
//
class cr_preference_value_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_preference_value(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cr_preference_value extends _persistentTable.Record {
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
    Table: cr_preference_value_Collection,
    Record: cr_preference_value,
}


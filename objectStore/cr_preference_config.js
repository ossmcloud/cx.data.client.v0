'use strict'
//
const _persistentTable = require('./persistent/p-cr_preference_config');
//
class cr_preference_config_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_preference_config(this, defaults);
    }


    

}
//
// ----------------------------------------------------------------------------------------
//
class cr_preference_config extends _persistentTable.Record {
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
    Table: cr_preference_config_Collection,
    Record: cr_preference_config,
}


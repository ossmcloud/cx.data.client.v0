'use strict'
//
const _persistentTable = require('./persistent/p-raw_cx_subDepartment');
//
class raw_cx_subDepartment_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_cx_subDepartment(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class raw_cx_subDepartment extends _persistentTable.Record {
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
    Table: raw_cx_subDepartment_Collection,
    Record: raw_cx_subDepartment,
}


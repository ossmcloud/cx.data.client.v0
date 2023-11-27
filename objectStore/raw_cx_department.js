'use strict'
//
const _persistentTable = require('./persistent/p-raw_cx_department');
//
class raw_cx_department_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_cx_department(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class raw_cx_department extends _persistentTable.Record {
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
    Table: raw_cx_department_Collection,
    Record: raw_cx_department,
}


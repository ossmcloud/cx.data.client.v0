'use strict'
//
const _persistentTable = require('./persistent/p-raw_cp_attachment');
//
class raw_cp_attachment_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_cp_attachment(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class raw_cp_attachment extends _persistentTable.Record {
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
    Table: raw_cp_attachment_Collection,
    Record: raw_cp_attachment,
}


'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _persistentTable = require('../persistent/p-cx_shop_group');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class cx_shop_group_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_shop_group(this, defaults);
    }

    
}
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class cx_shop_group extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    get displayName() {
        if (this.groupName) {
            return `${this.groupName} [${this.groupCode}]`;
        } else {
            return this.groupCode;
        }
    }

    async delete() {
        // TODO: CX-DATA-CLIENT: check if shop can be deleted
        await super.delete()
    }
}
//
// EXPORTS ONLY TABLE AND RECORD
//
module.exports = {
    Table: cx_shop_group_Collection,
    Record: cx_shop_group,
}


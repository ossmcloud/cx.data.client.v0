'use strict'
//
const _persistentTable = require('./persistent/p-cx_shop_group');
//
class cx_shop_group_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_shop_group(this, defaults);
    }

    async select(params) {
        await super.select();
    }

}
//
//
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
        await super.delete()
    }
}
//
//
//
module.exports = {
    Table: cx_shop_group_Collection,
    Record: cx_shop_group,
}


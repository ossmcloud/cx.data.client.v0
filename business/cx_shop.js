'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _ex = require('cx-core/errors/cx-errors');
const _cx_render = require('../cx-client-render');
const { cx_tradingAccount } = require('../cx-client-schema');
const _persistentTable = require('../persistent/p-cx_shop');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class cx_shop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_shop(this, defaults);
    }

    async renderOptions(options) {
        // TODO: PERMISSIONS:
        options.allowNew = true;
        options.allowEdit = true;
        return _cx_render.getListOptions(this, options);
    }

    async renderDropDownOptions(options) {
        // TODO: PERMISSIONS:
        return _cx_render.getDropDownOptions(this, options);
    }

    async fetchOrNew(id) {
        if (id) {
            return await super.fetch(id);
        } else {
            return this.createNew();
        }
    }
    
}

//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class cx_shop extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async renderOptions(options) {
        // TODO: PERMISSIONS:
        options.allowNew = true;
        options.allowEdit = true;
        return _cx_render.getRecordOptions(this, options);
    }

   
    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        if (!this.status) { this.status = 0; }
        await super.save()
    }
}
//
// EXPORTS ONLY TABLE AND RECORD
//
module.exports = {
    Table: cx_shop_Collection,
    Record: cx_shop,
}


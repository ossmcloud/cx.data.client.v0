'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _ui = require('cx-core-ui');
const _persistentTable = require('../persistent/p-cx_shop');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class cx_shop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_shop(this, defaults);
    }

    async renderDropDown(options) {
        var dropDownOptions = {
            id: options.id || 'shop_dropdown',
            placeHolder: options.placeHolder || 'select a shop',
            value: options.value,
            width: options.width,
            items: [],
        };

        if (this.count() == 0 && !options.noLoad) {
            await this.select();
        }

        this.each(function (record) {
            dropDownOptions.items.push({
                value: record.shopId,
                text: record.shopName + ' [' + record.shopCode + ']',
            });
        });

        return _ui.controls.dropDown(dropDownOptions);
    }

    async render(options) {
        if (!options) { options = {}; }
        return _ui.controls.table(this.records, {
            primaryKey: 'shopId',
            path: options.path || 'shop',
            tableId: options.tableId || 'cx_shop',
            allowNew: options.allowEdit || null,
            allowEdit: options.allowEdit || false,
            columns: options.columns || [
                { name: 'shopId', title: 'shop id' },
                { name: 'shopCode', title: 'code' },
                { name: 'shopName', title: 'name' },
                { name: 'shopAddress', title: 'address' },
                { name: 'status', title: 'status' },
            ]
        });
    }
}
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class cx_shop extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async render(options) {
        if (!options) { options = {}; }
        return _ui.controls.form(this, {
            primaryKey: 'shopId',
            path: options.path || 'shop',            
            accountId: options.accountId,
            edit: options.edit || false,
            columns: options.columns || []
        });
    }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
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


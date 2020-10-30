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
            inputType: _ui.controls.Type.SELECT,
            id: options.id || 'shop_dropdown',
            placeHolder: options.placeHolder || 'select a shop',
            value: options.value,
            width: options.width,
            inline: options.inline,
            fieldName: options.fieldName || 'shopId',
            label: (options.label == undefined) ? 'shop' : options.label,
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

        if (options.doNotRender) { return dropDownOptions; }

        return _ui.controls.dropDown(dropDownOptions);
    }

    // async render(options) {
    //     if (!options) { options = {}; }
    //     return _ui.controls.table(this.records, {
    //         primaryKey: 'shopId',
    //         path: options.path || '../cx/shop',
    //         name: options.name || 'shop',
    //         tableId: options.tableId || 'cx_shop',
    //         allowNew: options.allowEdit || null,
    //         allowEdit: options.allowEdit || false,
    //         quickSearch: true,
    //         columns: options.columns || [
    //             { name: 'shopId', title: 'shop id' },
    //             { name: 'shopCode', title: 'code' },
    //             { name: 'shopName', title: 'name' },
    //             { name: 'shopAddress', title: 'address' },
    //             { name: 'status', title: 'status' },
    //         ]
    //     });
    // }

    async render(options) {
        if (!options) { options = {}; }
        return _ui.controls.table(this.records, {
            primaryKey: 'shopId',
            path:  options.path || '../cx/shop',
            title: options.title || 'shops',
            tableId: options.tableId || 'cx_shop',
            allowNew: options.allowEdit || null,
            allowEdit: options.allowEdit || false,
            quickSearch: true,
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
        return _ui.controls.formEx(this, {
            primaryKey: 'shopId',
            path: options.path || '../cx/shop',        
            listPath: options.listPath || '../cx/shops',
            accountId: options.accountId,
            formTitle: options.formTitle || 'shop form',
            edit: options.edit || false,
            allowEdit: true,

            groups: options.groups || [
                { name: 'main', title: 'main info' },
                { name: 'audit', title: 'audit info' },
            ],
            fields: options.fields || [
                { group: 'main', name: 'shopCode', label: 'code', column: 1 },
                //{ group: 'main', name: 'shopId', label: 'id', readOnly: true, column: 1, inline: true },
                { group: 'main', name: 'shopName', label: 'name', column: 1 },
                { group: 'main', name: 'shopAddress', label: 'address', column: 1, width: '300px' },
                { group: 'audit', name: 'created', label: 'created', readOnly: true },
            ]
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


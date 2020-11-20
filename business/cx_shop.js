'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _ex = require('cx-core/errors/cx-errors');
const _ui = require('cx-core-ui');
const _persistentTable = require('../persistent/p-cx_shop');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class cx_shop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_shop(this, defaults);
    }

    async fetchOrNew(id) {
        if (id) {
            return await super.fetch(id);
        } else {
            return this.createNew();
        }
    }

    async renderDropDownOptions(options) {
        if (!options) { options = {}; }
        var dropDownOptions = {
            id: options.id || 'shop_dropdown',
            placeHolder: options.placeHolder || 'select a shop',
            value: options.value,
            width: options.width,
            inline: options.inline,
            fieldName: options.fieldName || 'shopId',
            label: (options.label == undefined) ? 'shop' : options.label,
            items: [],
        };
        // load collection if required
        if (this.count() == 0 && !options.noLoad) { await this.select(); }
        // populate drop down items
        this.each(function (record) {
            dropDownOptions.items.push({
                value: record.shopId,
                text: record.shopName + ' [' + record.shopCode + ']',
            });
        });
        //
        return dropDownOptions;
    }

    async renderOptions(options) {
        if (!options) { options = {}; }
        // TODO: CX: this should come (or partially come) from the BD
        //           so we could have sort of customizable forms
        return {
            primaryKey: 'shopId',
            path: options.path || '../cx/shop',
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
        if (!options) { options = {}; }
        // TODO: CX: this should come (or partially come) from the BD
        //           so we could have sort of customizable forms
        return {
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
                { group: 'main', name: 'shopCode', label: 'code', column: 1, validation: '{ "mandatory": true, "max": 6  }', readOnly: (this.id) },
                //{ group: 'main', name: 'shopId', label: 'id', readOnly: true, column: 1, inline: true },
                { group: 'main', name: 'shopName', label: 'name', column: 1, validation: '{ "mandatory": true, "max": 60  }' },
                { group: 'main', name: 'shopAddress', label: 'address', column: 1, width: '300px', validation: '{ "max": 255 }' },
                { group: 'audit', name: 'created', label: 'created', readOnly: true },
            ]
        }
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


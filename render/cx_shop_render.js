'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxShopRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        this.options.fields = [
            {
                group: 'main', title: 'main info', columnCount: 3, inline: true, fields: [
                    { name: 'shopName', label: 'name', column: 1, validation: '{ "mandatory": true, "max": 60  }' },
                    { name: 'shopAddress', label: 'address', column: 1, validation: '{ "max": 255 }' },
                    await this.fieldDropDownOptions(_cxSchema.cx_shop_group, {
                        id: 'shopGroupId', name: 'shopGroupId', column: 2, validation: '{ "mandatory": true }',
                    }),
                    { name: 'shopCode', label: 'code', column: 3, validation: '{ "mandatory": true, "max": 6  }', readOnly: (this.dataSource.id > 0) },
                    { name: 'status', label: 'status', column: 3, readOnly: true, lookUps: _cxConst.CX_SHOP.STATUS.toList() },
                ],
            },
            {
                group: 'audit', title: 'audit info', columnCount: 3, fields: [
                    {
                        group: 'audit1', title: '', column: 1, columnCount: 2, inline: true, fields: [
                            { name: 'created', label: 'created', column: 1, readOnly: true },
                            { name: 'createdBy', label: 'created by', column: 2, readOnly: true },
                        ]
                    },
                    {
                        group: 'audit2', title: '', column: 2, columnCount: 2, inline: true, fields: [
                            { name: 'modified', label: 'modified', column: 1, readOnly: true },
                            { name: 'modifiedBy', label: 'modified by', column: 2, readOnly: true },
                        ]
                    }
                ]
            }
        ]
    }

    async _list() {
        
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop_group, { fieldName: 'sg' }),
            { label: 'code', fieldName: 'sc', name: _cxSchema.cx_shop.SHOPCODE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'name', fieldName: 'sn', name: _cxSchema.cx_shop.SHOPNAME, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'address', fieldName: 'sa', name: _cxSchema.cx_shop.SHOPADDRESS, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            {
                label: 'status', fieldName: 'ss', name: _cxSchema.cx_shop.STATUS, type: _cxConst.RENDER.CTRL_TYPE.SELECT,
                items: _cxConst.CX_SHOP.STATUS.toList('- all -'), width: '100px'
            },
        ];
        this.options.columns = [
            { title: '', name: _cxSchema.cx_shop.SHOPID },
            { title: 'code', name: _cxSchema.cx_shop.SHOPCODE },
            { title: 'name', name: _cxSchema.cx_shop.SHOPNAME },
            { title: 'group', name: 'groupInfo' },
            { title: 'status', name: _cxSchema.cx_shop.STATUS, lookUps: _cxConst.CX_SHOP.STATUS.toList() },
            { title: 'created', name: _cxSchema.cx_shop.CREATED },
            { title: 'by', name: _cxSchema.cx_shop.CREATEDBY },
            { title: 'modified', name: _cxSchema.cx_shop.MODIFIED },
            { title: 'by', name: _cxSchema.cx_shop.MODIFIEDBY },
        ];
        this.options.highlights = [
            { column: _cxSchema.cx_shop.STATUS, op: '=', value: _cxConst.CX_SHOP.STATUS.INACTIVE, style: 'color: orange;' },
        ];
    }

    async dropDown() {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a shop'; }
        if (this.options.label == undefined) { this.options.label = 'shop'; }

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.shopId,
                text: record.shopName + ' [' + record.shopCode + ']',
            });
        });
        this.options.items = dropDownItems;
    }

}

module.exports = CxShopRender;










// async function list(table, options) {
//     if (!options) { options = {}; }
//     return {
//         accountId: options.accountId,
//         id: options.id || table.type,
//         path: options.path,
//         recordName: table.type,
//         recordTitle: 'shop',
//         title: options.title || 'shops',
//         primaryKey: table.primaryKeys[0].name,
//         fixHeader: options.fixHeader || false,
//         allowNew: options.allowNew || false,
//         allowEdit: options.allowEdit || false,
//         quickSearch: options.quickSearch || true,
//         query: options.query || {},
//         buttons: options.buttons || [],
//         filters: options.filters || [
//             { label: 'code', fieldName: 'sc', name: _cxSchema.cx_shop.SHOPCODE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
//             { label: 'name', fieldName: 'sn', name: _cxSchema.cx_shop.SHOPNAME, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
//             { label: 'address', fieldName: 'sa', name: _cxSchema.cx_shop.SHOPADDRESS, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
//             {
//                 label: 'status', fieldName: 'ss', name: _cxSchema.cx_shop.STATUS, type: _cxConst.RENDER.CTRL_TYPE.SELECT,
//                 items: _cxConst.CX_SHOP.STATUS.toList('- all -'), width: '100px'
//             },
//         ],
//         columns: options.columns || [
//             { title: '', name: _cxSchema.cx_shop.SHOPID },
//             { title: 'code', name: _cxSchema.cx_shop.SHOPCODE},
//             { title: 'name', name: _cxSchema.cx_shop.SHOPNAME},
//             { title: 'address', name: _cxSchema.cx_shop.SHOPADDRESS},
//             { title: 'status', name: _cxSchema.cx_shop.STATUS, lookUps: _cxConst.CX_SHOP.STATUS.toList() },
//         ],
//         highlights: [
//             { column: _cxSchema.cx_shop.STATUS, op: '=', value: _cxConst.CX_SHOP.STATUS.INACTIVE, style: 'color: orange;' },
//         ],
//     }
// }


// async function dropDown(table, options) {
//     if (!options) { options = {}; }
//     var dropDownOptions = {
//         id: options.id || (table.type + '_dropDown'),
//         recordName: table.type,
//         recordTitle: 'shop',
//         placeHolder: options.placeHolder || 'select a shop',
//         value: options.value,
//         width: options.width,
//         inline: options.inline,
//         fieldName: options.fieldName || table.primaryKeys[0].name,
//         label: (options.label == undefined) ? 'shop' : options.label,
//         items: [],
//     };
//     // load collection if required
//     if (table.count() == 0 && !options.noLoad) { await table.select(); }
//     // populate drop down items
//     table.each(function (record) {
//         dropDownOptions.items.push({
//             value: record.shopId,
//             text: record.shopName + ' [' + record.shopCode + ']',
//         });
//     });
//     //
//     return dropDownOptions;
// }



// async function record(record, options) {
//     if (!options) { options = {}; }
   
//     var renderOptions = {
//         accountId: options.accountId,
//         id: options.id || record.type,
//         path: options.path,
//         listPath: options.listPath,
//         recordName: record.type,
//         recordTitle: 'shop',
//         title: options.title || 'shop form',
//         primaryKey: record.table.primaryKeys[0].name,
//         editMode: options.editMode || false,
//         allowEdit: options.allowEdit || false,
//         buttons: options.buttons || [],
//         groups: options.groups || [
//             { name: 'main', title: 'main info' },
//             { name: 'audit', title: 'audit info' },
//         ],
//         fields: options.fields || [
//             { group: 'main', name: 'shopCode', label: 'code', column: 1, validation: '{ "mandatory": true, "max": 6  }', readOnly: (record.id) },
//             { group: 'main', name: 'shopName', label: 'name', column: 1, width: '300px', validation: '{ "mandatory": true, "max": 60  }' },
//             { group: 'main', name: 'shopAddress', label: 'address', column: 1, width: '300px', validation: '{ "max": 255 }' },
//             { group: 'audit', name: 'status', label: 'status', column: 1, readOnly: true, lookUps: _cxConst.CX_SHOP.STATUS.toList() },
//             { group: 'audit', name: 'created', label: 'created', column: 1, readOnly: true },
//             { group: 'audit', name: 'createdBy', label: 'created by', column: 1, readOnly: true },
//             { group: 'audit', name: 'modified', label: 'modified', column: 1, readOnly: true },
//             { group: 'audit', name: 'modifiedBy', label: 'modified by', column: 1, readOnly: true },
//         ]
//     }
//     return renderOptions;
// }

// module.exports = {
//     list: list,
//     record: record,
//     dropDown: dropDown,
//     options: async function (type, object, options) {
//         if (type == _cxConst.RENDER.TYPE.LIST) { return await list(object, options); }
//         if (type == _cxConst.RENDER.TYPE.RECORD) { return await record(object, options); }
//         if (type == _cxConst.RENDER.TYPE.DROP_DOWN) { return await dropDown(object, options); }
//         return null;
//     }
// }
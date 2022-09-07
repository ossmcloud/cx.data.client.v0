'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');
const cxSqlPoolManager = require('cx-data/core/cx-sql-pool-manager');

class CxShopRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {

        var configLookUp_tranType = await this.dataSource.cx.table(_cxSchema.cx_map_config).toLookUpList(_cxConst.CX_MAP_CONFIG_TYPE.TRAN_TYPE, true);
        var configLookUp_depMap = await this.dataSource.cx.table(_cxSchema.cx_map_config).toLookUpList(_cxConst.CX_MAP_CONFIG_TYPE.GL_MAP, true);
        var configLookUp_taxMap = await this.dataSource.cx.table(_cxSchema.cx_map_config).toLookUpList(_cxConst.CX_MAP_CONFIG_TYPE.TAX_MAP, true);

        this.options.fields = [
            {
                group: 'main', title: 'main info', columnCount: 3, fields: [
                    {
                        group: 'main1', title: '', column: 1, columnCount: 3, inline: true, fields: [
                            { name: 'shopCode', label: 'code', column: 1, validation: '{ "mandatory": true, "max": 6  }', readOnly: (this.dataSource.id > 0) },
                            { name: 'currencyCode', label: 'currency', column: 2, validation: '{ "mandatory": true, "max": 3  }', readOnly: (this.dataSource.id > 0) },
                            await this.fieldDropDownOptions(_cxSchema.cx_shop_group, { id: 'shopGroupId', name: 'shopGroupId', column: 3, }),
                        ]
                    },

                    {
                        group: 'main1', title: '', column: 1, columnCount: 2, inline: true, fields: [
                            { name: 'shopName', label: 'name', column: 1, validation: '{ "mandatory": true, "max": 60  }' },
                            { name: 'shopColor', label: 'color', column: 2 },
                        ]
                    },

                    { name: 'shopAddress', label: 'address', column: 2, validation: '{ "max": 255 }' },
                    { name: 'shopPostCode', label: 'post code', column: 2, validation: '{ "max": 50 }' },

                    { name: 'shopLatitude', label: 'latitude', column: 3, type: _cxConst.RENDER.CTRL_TYPE.NUMERIC },
                    { name: 'shopLongitude', label: 'longitude', column: 3, type: _cxConst.RENDER.CTRL_TYPE.NUMERIC },
                    
                    
                ],
            },
            {
                group: 'config', title: 'map configurations', columnCount: 3, fields: [
                    { name: 'tranTypeConfigId', label: 'Transaction Types', column: 1, lookUps: configLookUp_tranType },
                    { name: 'depMapConfigId', label: 'Department Mappings', column: 2, lookUps: configLookUp_depMap },
                    { name: 'taxMapConfigId', label: 'Tax Mappings', column: 3, lookUps: configLookUp_taxMap },
                ]
            },
            {
                group: 'audit', title: 'audit info', columnCount: 3, fields: [
                    { name: 'status', label: 'status', column: 1, readOnly: true, lookUps: _cxConst.CX_SHOP.STATUS.toList() },
                    {
                        group: 'audit1', title: '', column: 2, columnCount: 2, inline: true, fields: [
                            { name: 'created', label: 'created', column: 1, readOnly: true },
                            { name: 'createdBy', label: 'created by', column: 2, readOnly: true },
                        ]
                    },
                    {
                        group: 'audit2', title: '', column: 3, columnCount: 2, inline: true, fields: [
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
            { title: ' ', name: _cxSchema.cx_shop.SHOPID },
            { title: 'code', name: _cxSchema.cx_shop.SHOPCODE },
            { title: 'name', name: _cxSchema.cx_shop.SHOPNAME },
            { title: 'group', name: 'groupInfo' },
            { title: 'post code', name: 'shopPostCode' },
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
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a store'; }
        if (this.options.label == undefined) { this.options.label = 'store'; }

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
//         recordTitle: 'store',
//         title: options.title || 'stores',
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
//         recordTitle: 'store',
//         placeHolder: options.placeHolder || 'select a store',
//         value: options.value,
//         width: options.width,
//         inline: options.inline,
//         fieldName: options.fieldName || table.primaryKeys[0].name,
//         label: (options.label == undefined) ? 'store' : options.label,
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
//         recordTitle: 'store',
//         title: options.title || 'store form',
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
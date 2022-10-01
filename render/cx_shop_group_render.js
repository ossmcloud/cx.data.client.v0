'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxShopGroupRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async getShopListOptions() {
        var shops = this.dataSource.cx.table(_cxSchema.cx_shop);
        await shops.select({ sg: this.options.query.id });
        if (shops.count() > 0) { this.options.allowDelete = false; }

        var shopListOptions = await this.listOptions(shops, { listView: true });
        shopListOptions.columns.shift();
        if (this.options.mode == 'view') {
            if (this.options.allowEdit) {
                shopListOptions.actions = [{ label: 'remove', funcName: 'removeShop' }];
                shopListOptions.showButtons = [{ id: 'cr_shop_add', text: 'Add Store', function: 'addShop' }];
            }
        }
        shopListOptions.quickSearch = true;
        return shopListOptions;
    }

    async _record() {
        var shopListOptions = null;
        if (this.options.mode == 'new') {
            this.options.allowDelete = false;
        } else {
            shopListOptions = await this.getShopListOptions()
        }

        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, inline: true, fields: [
                            { name: _cxSchema.cx_shop_group.GROUPCODE, label: 'code', column: 1, width: '200px', validation: '{ "mandatory": true, "max": 20  }' },
                            { name: _cxSchema.cx_shop_group.GROUPNAME, label: 'name', column: 1, width: '300px', validation: '{ "mandatory": true, "max": 60  }' },
                            { name: _cxSchema.cx_shop_group.GROUPCOLOR, label: 'color', column: 2, width: '100px' }
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 2, columnCount: 2, inline: true, fields: [
                            { name: 'created', label: 'created on', column: 1, readOnly: true },
                            { name: 'createdBy', label: 'by', column: 1, readOnly: true },
                            { name: 'modified', label: 'modified on', column: 2, readOnly: true },
                            { name: 'modifiedBy', label: 'by', column: 2, readOnly: true },
                        ]
                    }
                ],
            }
        ]

        if (shopListOptions) {
            var prefListOptions = await this.getPreferenceListOptions();
            var subLists = {
                group: 'sublists', columnCount: 2, fields: [
                    { group: 'shops', title: 'stores assigned to this group', column: 1, fields: [shopListOptions] },
                    { group: 'preferences', title: 'preferences', width: '500px', column: 2, fields: [prefListOptions] }
                    
                ]
            }
            this.options.fields.push(subLists);

            // this.options.fields.push(
            //     { group: 'shops', title: 'stores assigned to this group', fields: [shopListOptions] }
            // )
        }
    }

    async _list() {
        this.options.columns = [
            { title: ' ', name: _cxSchema.cx_shop_group.SHOPGROUPID },
            { title: 'code', name: _cxSchema.cx_shop_group.GROUPCODE },
            { title: 'name', name: _cxSchema.cx_shop_group.GROUPNAME },
            { title: 'color', name: _cxSchema.cx_shop_group.GROUPCOLOR },
            { title: 'created', name: _cxSchema.cx_shop_group.CREATED },
            { title: 'by', name: _cxSchema.cx_shop_group.CREATEDBY },
            { title: 'modified', name: _cxSchema.cx_shop_group.MODIFIED },
            { title: 'by', name: _cxSchema.cx_shop_group.MODIFIEDBY },
        ];
    }

    async dropDown() {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a group'; }
        if (this.options.label == undefined) { this.options.label = 'store group'; }

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.shopGroupId,
                text: record.displayName,
            });
        });
        this.options.items = dropDownItems;
    }

}

module.exports = CxShopGroupRender;

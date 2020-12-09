'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class RawGetLog extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async getShopListOptions() {
        var shops = this.dataSource.cx.table(_cxSchema.cx_shop);
        await shops.selectByUser(this.options.query.id);
        if (shops.count() > 0) { this.options.allowDelete = false; }

        var shopListOptions = await this.listOptions(shops);
        shopListOptions.filters = [];
        shopListOptions.title = '';
        shopListOptions.allowNew = false;
        shopListOptions.allowEdit = false;
        shopListOptions.quickSearch = false;
        // remove shop id column
        shopListOptions.columns.shift();

        if (this.options.mode == 'view') {
            // TODO: PERMISSIONS:
            shopListOptions.actions = [{ label: 'remove', funcName: 'removeShop' }];
            shopListOptions.showButtons = [{ id: 'cr_shop_add', text: 'Add Shops', function: 'addShop' }];
        }
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
                group: 'main', title: 'main info', columnCount: 3, inline: true, fields: [
                    { name: _cxSchema.cx_login.EMAIL, label: 'email', column: 1, readOnly: true },
                    { name: _cxSchema.cx_login.FIRSTNAME, label: 'first name', width: '150px', column: 2 },
                    { name: _cxSchema.cx_login.LASTNAME, label: 'last name', width: '150px', column: 2 },
                    { name: _cxSchema.cx_login.JOBTITLE, label: 'job title', width: '150px', column: 3 },

                ]
            },
            {
                group: 'audit', title: 'audit info', columnCount: 3, fields: [
                    {
                        group: 'audit0', title: '', column: 1, columnCount: 2, inline: true, fields: [
                            { name: _cxSchema.cx_login.MASTERLOGINID, label: 'id (master)', column: 1, readOnly: true },
                            { name: _cxSchema.cx_login.LOGINID, label: 'id (tenant)', column: 2, readOnly: true },
                        ]
                    },
                    {
                        group: 'audit1', title: '', column: 2, columnCount: 2, inline: true, fields: [
                            { name: 'created', label: 'created', column: 1, readOnly: true },
                            //{ name: 'createdBy', label: 'created by', column: 2, readOnly: true },
                        ]
                    },
                    // {
                    //     group: 'audit2', title: '', column: 3, columnCount: 2, inline: true, fields: [
                    //         { name: 'modified', label: 'modified', column: 1, readOnly: true },
                    //         { name: 'modifiedBy', label: 'modified by', column: 2, readOnly: true },
                    //     ]
                    // }
                ]
            }
        ];

        if (shopListOptions) {
            this.options.fields.push({
                group: 'shops', title: 'shops assigned to this user', fields: [
                    shopListOptions
                ]
            })
        }
    }

    async _list() {
        this.options.columns = [
            { name: _cxSchema.cx_login.LOGINID, title: '', align: 'center' },
            { name: _cxSchema.cx_login.MASTERLOGINID, title: 'id', align: 'center' },
            { name: _cxSchema.cx_login.EMAIL, title: 'email' },
            { name: _cxSchema.cx_login.FIRSTNAME, title: 'first name', width: '200px' },
            { name: _cxSchema.cx_login.LASTNAME, title: 'last name', width: '200px' },
            { name: _cxSchema.cx_login.JOBTITLE, title: 'job title', width: '200px' },
            { name: _cxSchema.cx_login.CREATED, title: 'created', width: '200px' },

        ];
    }
}

module.exports = RawGetLog;




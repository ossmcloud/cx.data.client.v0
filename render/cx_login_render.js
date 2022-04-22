'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CXLogin extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async getShopListOptions() {
        var shops = this.dataSource.cx.table(_cxSchema.cx_shop);
        await shops.selectByUser(this.options.query.id);
        if (shops.count() > 0) { this.options.allowDelete = false; }

        var shopListOptions = await this.listOptions(shops, { listView: true });
        // remove store id and other columns
        shopListOptions.columns.shift();
        shopListOptions.columns.splice(4);

        if (this.options.mode == 'view') {
            // NOTE: if user has no allow view we should not get here anyway
            if (this.options.allowView) {
                shopListOptions.actions = [{ label: 'remove', funcName: 'removeShop' }];
                shopListOptions.showButtons = [{ id: 'cr_shop_add', text: 'Add Stores', function: 'addShop' }];
            }
        }
        return shopListOptions;
    }

    async getRoleListOptions() {
        var roles = this.dataSource.cx.table(_cxSchema.cx_login_roles);
        await roles.selectByUser(this.options.query.id);
        if (roles.count() > 0) { this.options.allowDelete = false; }

        var roleListOptions = await this.listOptions(roles, { listView: true });
        roleListOptions.columns.shift();
        roleListOptions.primaryKey = 'roleId';

        if (this.options.mode == 'view') {
            if (this.options.allowEdit) {
                roleListOptions.actions = [{ label: 'remove', funcName: 'removeRole' }];
                roleListOptions.showButtons = [{ id: 'cr_role_add', text: 'Add Role', function: 'addRole' }];
            }
        }
        return roleListOptions;
    }

    async _record() {
        var shopListOptions = null; var roleListOptions = null;
        if (this.options.mode == 'new') {
            this.options.allowDelete = false;
        } else {
            shopListOptions = await this.getShopListOptions();
            roleListOptions = await this.getRoleListOptions();
        }

        this.options.fields = [
            {
                group: 'main', title: 'main info', columnCount: 3, inline: true, fields: [
                    { name: _cxSchema.cx_login.EMAIL, label: 'email', column: 1, readOnly: !this.dataSource.isNew(), validation: '{ "mandatory": true, "max": 255  }' },
                    {
                        name: _cxSchema.cx_login.ROLEID, label: 'current role', column: 1,
                        lookUps: _cxConst.CX_ROLE.toList(),
                        readOnly: (this.options.editMode) ? (this.dataSource.cx.roleId < _cxConst.CX_ROLE.ADMIN) : true
                    },
                    { name: _cxSchema.cx_login.FIRSTNAME, label: 'first name', validation: '{ "mandatory": true, "max": 60  }', column: 2 },
                    { name: _cxSchema.cx_login.LASTNAME, label: 'last name', column: 2 },
                    { name: _cxSchema.cx_login.JOBTITLE, label: 'job title', column: 3 },

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
        ];

        if (shopListOptions) {
            this.options.fields.push({
                group: 'sublists', columnCount: 2, fields: [
                    { group: 'shops', title: 'stores assigned to this user', column: 1, fields: [shopListOptions] },
                    { group: 'roles', title: 'roles assigned to this user', column: 2, width: '300px', fields: [roleListOptions] }
                ]
            });
        }
    }

    async _list() {
        this.options.columns = [
            { name: _cxSchema.cx_login.LOGINID, title: '', align: 'center' },
            { name: _cxSchema.cx_login.MASTERLOGINID, title: 'id', align: 'center' },
            { name: _cxSchema.cx_login.EMAIL, title: 'email' },
            { name: _cxSchema.cx_login.ROLEID, title: 'role', lookUps: _cxConst.CX_ROLE.toList() },
            { name: _cxSchema.cx_login.FIRSTNAME, title: 'first name', width: '200px' },
            { name: _cxSchema.cx_login.LASTNAME, title: 'last name', width: '200px' },
            { name: _cxSchema.cx_login.JOBTITLE, title: 'job title', width: '200px' },
            { name: _cxSchema.cx_login.CREATED, title: 'created', width: '200px' },

        ];
    }
}

module.exports = CXLogin;




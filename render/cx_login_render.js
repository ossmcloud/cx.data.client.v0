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

        shopListOptions.quickSearch = true;
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

            if (this.dataSource.cx.roleId < _cxConst.CX_ROLE.CX_ADMIN) {
                if (await this.dataSource.hasCxRole()) {
                    this.options.allowEdit = false;
                }
            }
        }

        var lookUps = _cxConst.CX_ROLE.toList();
        if (this.options.mode != 'view') { 
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.CX_SUPPORT) {
                lookUps.push({ value: 8, text: 'cx support' });
                lookUps.push({ value: 9, text: 'cx admin' });
            }
        }
        
        

        this.options.fields = [
            { name: 'tfaQr', hidden: true },
            { name: 'tfaKey', hidden: true },
            {
                group: 'main', title: 'main info', columnCount: 3, inline: true, fields: [
                    {
                        group: 'main', columnCount: 2, inline: true, fields: [
                            { name: _cxSchema.cx_login.EMAIL, label: 'email', column: 1, readOnly: !this.dataSource.isNew(), validation: '{ "mandatory": true, "max": 255  }' },
                            { name: 'status', label: 'status', column: 2, readOnly: true, lookUps: _cxConst.CX_LOGIN_STATUS.toList() },
                        ]
                    },
                    {
                        name: _cxSchema.cx_login.ROLEID, label: 'current role', column: 1,
                        lookUps: lookUps,
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
            var prefListOptions = await this.getPreferenceListOptions();
            var prefCpListOptions = await this.getPreferenceListOptions('cp_preference');
            this.options.fields.push({
                group: 'sublists', columnCount: 2, fields: [
                    {
                        group: 'preferences', title: '', columnCount: 2, fields: [
                            { group: 'shops', title: 'stores assigned to this user', column: 1, fields: [shopListOptions] },
                            { group: 'roles', title: 'roles assigned to this user', column: 2, width: '500px', fields: [roleListOptions] },
                        ]
                    },
                    {
                        group: 'preferences', title: '', columnCount: 2, fields: [
                            { group: 'cr_preferences', title: 'retail preferences', column: 1, fields: [prefListOptions] },
                            { group: 'cp_preferences', title: 'purchase preferences', column: 2, fields: [prefCpListOptions] },    
                        ]
                    },
                    
                    

                ]
            });

           
        }


        if (this.options.mode == 'view') {
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.ADMIN) {
                if (this.dataSource.status < 0) { this.options.buttons.push({ id: 'cx_login', text: 'Verify Login', function: 'verifyLogin' }); }
                if (this.dataSource.status >= 0) { this.options.buttons.push({ id: 'cx_login', text: 'Reset Login', function: 'resetLogin' }); }
                if (this.dataSource.status <= 0) { this.options.buttons.push({ id: 'cx_login', text: '2fa Barcode', function: 'show2faQCode' }); }
            }
            // this.options.buttons.push({ id: 'epos_dtfs_view_getLogs', text: 'Get Logs', link: '../raw/getlogs?s=' + this.dataSource.id });
            // this.options.buttons.push({ id: 'epos_dtfs_view_transmission', text: 'Transmissions', link: '../epos/transmissions?s=' + this.dataSource.id });
            // this.options.buttons.push({ id: 'epos_dtfs_view_upgrades', text: 'Upgrades Audit', link: '../epos/upgradeAudits?s=' + this.dataSource.id });

        }
    }

    async _list() {
        if (this.dataSource.cx.roleId < _cxConst.CX_ROLE.CX_ADMIN) {
            this.options.allowEditCondition = function (object) {
                return !object.cx_role;
            }
        }


        var lookUps = _cxConst.CX_ROLE.toList();
        lookUps.push({ value: 8, text: 'cx support' });
        lookUps.push({ value: 9, text: 'cx admin' });
        
        this.options.columns = [
            { name: _cxSchema.cx_login.LOGINID, title: ' ', align: 'center' },
            { name: _cxSchema.cx_login.MASTERLOGINID, title: 'id', align: 'center', width: '50px' },
            { name: _cxSchema.cx_login.EMAIL, title: 'email' },
            { name: _cxSchema.cx_login.ROLEID, title: 'role', width: '100px', lookUps: lookUps },
            { name: _cxSchema.cx_login.FIRSTNAME, title: 'first name', width: '200px' },
            { name: _cxSchema.cx_login.LASTNAME, title: 'last name', width: '200px' },
            { name: _cxSchema.cx_login.JOBTITLE, title: 'job title', width: '200px' },
            { name: _cxSchema.cx_login.CREATED, title: 'created', width: '200px' },
        ];

        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: left;';
        this.options.cellHighlights = [];
        this.options.cellHighlights.push({
            column: _cxSchema.cx_login.ROLEID, op: '=', value: 9,
            style: 'background-color: rgb(246,71,146); color: white; ' + applyStyle,
            columns: [_cxSchema.cx_login.ROLEID]
        });
        this.options.cellHighlights.push({
            column: _cxSchema.cx_login.ROLEID, op: '=', value: 8,
            style: 'background-color: orange; color: white; ' + applyStyle,
            columns: [_cxSchema.cx_login.ROLEID]
        });
        this.options.cellHighlights.push({
            column: _cxSchema.cx_login.ROLEID, op: '=', value: 7,
            style: 'background-color: rgb(25,130,196); color: white; ' + applyStyle,
            columns: [_cxSchema.cx_login.ROLEID]
        });
    }
}

module.exports = CXLogin;




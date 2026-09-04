'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPRecoSettingRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'approvers settings';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.ca_settingApprover.SETTINGAPPROVERID] = null;
        this.autoLoadFields[_cxSchema.ca_settingApprover.LEVEL] = null;
        this.autoLoadFields[_cxSchema.ca_settingApprover.LOGINID] = null;
        this.autoLoadFields['shopCount'] = null;
        this.autoLoadFields[_cxSchema.ca_settingApprover.WHOLESALERID] = null;
        this.autoLoadFields[_cxSchema.ca_settingApprover.SUPPLIERS] = null;
        this.autoLoadFields[_cxSchema.ca_settingApprover.CREATED] = null;
        this.autoLoadFields[_cxSchema.ca_settingApprover.MODIFIED] = null;
    }



    async initColumn(field, column) {
        if (field.name == _cxSchema.ca_settingApprover.WHOLESALERID) {
            column.name = 'wholesalerInfo';
            column.title = 'wholesaler';
            column.addTotals = false;
            column.align = 'left';
            column.nullText = 'none';
            column.width = '150px';
        } else if (field.name == _cxSchema.ca_settingApprover.LOGINID) {
            column.name = 'loginInfo';
            column.title = 'login';
            column.addTotals = false;
            column.align = 'left';
            column.width = '150px';
        } else if (field.name == 'level') {
            column.addTotals = false;
            column.nullText = '';
            column.width = '75px';
        } else if (field.name == 'shopCount') {
            column.align = 'center';
            column.width = '50px';
            column.nullText = '';
            column.title = 'shops';
        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.ca_settingApprover.SUPPLIERS) {
            filter.width = '300px';
        } else if (field.name == _cxSchema.ca_settingApprover.LOGINID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cx_login, { fieldName: 'loginId' });
            filter.hide = false;
        } else {
            filter.hide = true;
        }
    }

    async _list() {

    }




    async getShopSettingsListOptions() {
        var configs = this.dataSource.cx.table(_cxSchema.ca_settingApproverShop);
        await configs.select({ settingApproverId: this.dataSource.id });
        if (configs.count() > 0) { this.options.allowDelete = false; }

        var configListOptions = await this.listOptions(configs, { listView: true });
        configListOptions.quickSearch = true;
        configListOptions.columns.shift();

        if (this.options.mode == 'view') {
            configListOptions.actionsShowFirst = true;
            if (this.options.allowEdit) {
                configListOptions.actions = [{
                    label: 'remove', funcExec: (obj) => {
                        return {
                            funcName: 'removeShop',
                            funcArgument: obj.shopId
                        }
                    }
                }];
                configListOptions.showButtons = [{ id: 'ca_settingApproverShop_add', text: 'Add Shop', function: 'addShop' }];
            }
        }
        return configListOptions;
    }

    async _record() {
        var form = { group: 'all', title: '', columnCount: 2, styles: ['min-width: 500px;', 'min-width: 400px; max-width: 400px'], fields: [] }

        form.fields.push({
            group: 'main', title: 'main info', column: 1, columnCount: 4, styles: ['width: 250px', 'width: 75px', 'width: 250px', 'min-width: 500px;'], fields: [
                await this.fieldDropDownOptions(_cxSchema.cx_login, { id: 'loginId', name: 'loginId', column: 1, width: '250px', validation: '{ "mandatory": true }' }),
                { name: _cxSchema.ca_settingApprover.LEVEL, label: 'level', width: '75px', column: 2, validation: '{ "mandatory": true, "max": ' + _cxConst.CP_DOCUMENT.APPROVAL_LEVELS + '  }' },
                await this.fieldDropDownOptions(_cxSchema.cp_wholesaler, { id: 'wholesalerId', name: 'wholesalerId', column: 3, width: '250px' }),
                { name: _cxSchema.ca_settingApprover.SUPPLIERS, label: 'Suppliers (csv)', width: '100%', column: 4 }
            ]
        });
        form.fields.push({
            group: 'audit', title: 'audit info', column: 2, columnCount: 1, fields: [
                {
                    group: 'audit1', title: '', column: 1, columnCount: 2, inline: true, fields: [
                        { name: 'created', label: 'created', column: 1, readOnly: true },
                        { name: 'createdBy', label: 'created by', column: 2, readOnly: true },
                    ]
                },
                {
                    group: 'audit2', title: '', column: 1, columnCount: 2, inline: true, fields: [
                        { name: 'modified', label: 'modified', column: 1, readOnly: true },
                        { name: 'modifiedBy', label: 'modified by', column: 2, readOnly: true },
                    ]
                }
            ]
        });
        this.options.fields = [form];

        if (!this.dataSource.isNew()) {
            var supplierConfigs = await this.getShopSettingsListOptions();
            var listsShops = {
                group: 'listsOuter', title: '', columnCount: 1, fields: [
                    { group: 'config', title: 'shop specific configurations', column: 1, fields: [supplierConfigs] }
                ]
            }
            this.options.fields.push(listsShops);
        }

    }


}


module.exports = CPRecoSettingRender;





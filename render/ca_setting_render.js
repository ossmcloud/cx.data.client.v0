'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPRecoSettingRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'approval settings';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.ca_setting.SETTINGID] = null;
        this.autoLoadFields[_cxSchema.ca_setting.WHOLESALERID] = null;
        this.autoLoadFields[_cxSchema.ca_setting.SUPPLIERS] = null;
        this.autoLoadFields['shopCount'] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL0MIN] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL0MAX] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL1MIN] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL1MAX] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL2MIN] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL2MAX] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL3MIN] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL3MAX] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL4MIN] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL4MAX] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL5MIN] = null;
        this.autoLoadFields[_cxSchema.ca_setting.LEVEL5MAX] = null;
        this.autoLoadFields[_cxSchema.ca_setting.CREATED] = null;
        this.autoLoadFields[_cxSchema.ca_setting.MODIFIED] = null;
    }



    async initColumn(field, column) {
        if (field.name == _cxSchema.ca_setting.WHOLESALERID) {
            column.name = 'wholesalerInfo';
            column.title = 'wholesaler';
            column.addTotals = false;
            column.align = 'left';
            column.nullText = 'none';
            column.width = '150px';
        } else if (field.name.startsWith('level')) {
            column.addTotals = false;
            column.nullText = '';
            var lvl = column.name.replace('level', '').replace('Min', '').replace('Max', '')
            var minMax = column.name.endsWith('Min') ? 'Min' : 'Max';
            if (lvl == '0') {
                if (minMax == 'Min') { column.hide = true; }
                column.title = `no approval<br />up to`;
            } else {
                column.title = `level ${lvl}<br />(${minMax})`
            }
            column.width = '75px';
        } else if (field.name=='shopCount') {
            column.align = 'center';
            column.width = '50px';
            column.nullText = '';
            column.title = 'shops';
        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.ca_setting.SUPPLIERS) {
            //filter.replace = await this.filterDropDownOptions(_cxSchema.cp_wholesaler, { fieldName: 'wholesalerId' });
            //filter.hide = true;
            filter.width = '300px';
        } else {
            filter.hide = true;
        }
    }

    async _list() {

    }




    async getShopSettingsListOptions() {
        var configs = this.dataSource.cx.table(_cxSchema.ca_settingShop);
        await configs.select({ settingId: this.dataSource.id });
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
                configListOptions.showButtons = [{ id: 'ca_settingShop_add', text: 'Add Shop', function: 'addShop' }];
            }
        }
        return configListOptions;
    }

    async _record() {
        var form = { group: 'all', title: '', columnCount: 2, styles: ['min-width: 500px;', 'min-width: 400px; max-width: 400px'], fields: [] }

        form.fields.push({
            group: 'main', title: 'main info', column: 1, columnCount: 2, styles: ['width: 250px', 'min-width: 500px;'], fields: [
                await this.fieldDropDownOptions(_cxSchema.cp_wholesaler, { id: 'wholesalerId', name: 'wholesalerId', column: 1, width: '250px' }),
                { name: _cxSchema.ca_setting.SUPPLIERS, label: 'Suppliers (csv)', width: '100%', column: 2 }
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

        var levelsGroup = { group: 'levels', title: 'levels info', column: 1, columnCount: 6, fields: [] };
        form.fields.push(levelsGroup);
        for (var l = 0; l <= _cxConst.CP_DOCUMENT.APPROVAL_LEVELS; l++) {
            levelsGroup.fields.push({
                group: `level-${l}`, title: `lavel ${l}`, column: (l + 1), columnCount: 2, fields: [
                    // NOTE: apart from level 0, min is the max of the previous level (set by jca_setting.js and on save)
                    { name: `level${l}Min`, label: 'Min', width: '130px', column: 1, readOnly: (l > 0) },
                    { name: `level${l}Max`, label: 'Max', width: '130px', column: 1 },
                ]
            })
        }


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





'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class ErpTraderAccount extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'erp store setting';
    }

    async getConfigListOptions() {
        var configs = this.dataSource.cx.table(_cxSchema.erp_shop_configs);
        await configs.select(this.dataSource.id);
        if (configs.count() > 0) { this.options.allowDelete = false; }

        var configListOptions = await this.listOptions(configs, { listView: true });
        configListOptions.quickSearch = true;
        configListOptions.columns.shift();

        if (this.options.mode == 'view') {
            if (this.options.allowEdit) {
                configListOptions.actions = [];
                configListOptions.actions.push({ label: 'edit', funcName: 'editShopConfig' });
                configListOptions.actions.push({ label: 'delete', funcName: 'deleteShopConfig' });
                configListOptions.showButtons = [{ id: 'erp_shop_configs_add', text: 'Add Configuration', function: 'addShopConfig' }];
            } else {
                configListOptions.actions = [{ label: 'view', funcName: 'viewShopConfig' }];
            }
        }
        return configListOptions;
    }


    async _record() {
        var newRecord = (this.options.mode == 'new');
        var dtfsSettingsLookUps = await this.dataSource.cx.table(_cxSchema.erp_dtfs_setting).toLookUpList(true);

        this.options.fields = [
            //{ name: 'shopId', hidden: true },
            {
                group: 'settingOuter', title: '', columnCount: 3, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                            { name: 'shopInfo', label: 'store', column: 1, readOnly: true },
                            { name: 'dtfsSettingId', label: 'ERPS Settings', column: 1, lookUps: dtfsSettingsLookUps, validation: '{ "mandatory": true }' },
                            { name: 'erpProvider', label: 'erp provider', column: 1, lookUps: _cxConst.CX_ERP_PROVIDER.toList(true), validation: '{ "mandatory": true }' },
                            { name: 'erpCompanyName', label: 'erp company name', column: 1, validation: '{ "mandatory": true }' },
                            { name: 'erpCustomerAccount', label: 'erp EPoS account code', column: 2, validation: '{ "mandatory": true }' },
                            { name: 'erpCustomerAccountName', label: 'erp EPoS Account name', column: 2, validation: '{ "mandatory": true }' },
                            
                            { name: 'erpCostCentre', label: 'force gl segment 2', column: 2 },
                            { name: 'erpDepartment', label: 'force gl segment 3', column: 2 },
                            
                            
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 2, columnCount: 2, fields: [
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
            },
            { name: 'shopId', hidden: true },
        ];

        if (!newRecord) {
            var sublists = { group: 'sublists', columnCount: 1, column: 3, fields: [] };
            this.options.fields[0].fields.push(sublists);
            
            var configListOptions = await this.getConfigListOptions();
            sublists.fields.push({ group: 'config', title: 'configurations', column: 1, fields: [configListOptions] });

            var prefListOptions = await this.getPreferenceListOptions();
            sublists.fields.push({ group: 'preferences', title: 'preferences', column: 1, fields: [prefListOptions] });

            // if (this.dataSource.status == _cxConst.RAW_GET_REQUEST.STATUS.PENDING && this.options.allowNew && !this.dataSource.isNew()) {
            //     this.options.buttons.push({ id: 'cr_rawGetRequest_delete', text: 'Delete', function: 'deleteRecord' });
            // }
        }
    }

    async _list() {
        var dtfsSettingsLookUps = await this.dataSource.cx.table(_cxSchema.erp_dtfs_setting).toLookUpList(true);
        
        this.options.recordTitle = 'erp store settings';
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
        ];
        this.options.columns = [
            { name: 'shopId', title: ' ', align: 'center' },
            { name: 'shopInfo', title: 'store', width: '200px' },
            { name: 'erpProvider', title: 'erp provider' },
            { name: 'erpCompanyName', title: 'erp company name' },
            { name: 'erpCustomerAccount', title: 'erp EPoS account code' },
            { name: 'erpCustomerAccountName', title: 'erp EPoS account name' },
            { name: 'erpCostCentre', title: 'gl segment 2' },
            { name: 'erpDepartment', title: 'gl segment 3' },
            { name: 'dtfsSettingId', title: 'ERPS Settings', lookUps: dtfsSettingsLookUps },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
            { name: 'modified', title: 'modified', align: 'center', width: '130px' },
            { name: 'modifiedBy', title: 'by', align: 'left', width: '130px' },
        ];
        this.options.highlights = [
            { column: _cxSchema.erp_shop_setting.DTFSSETTINGID, op: '=', value: null, style: 'color: red;' },
        ];
    }

    
}

module.exports = ErpTraderAccount;



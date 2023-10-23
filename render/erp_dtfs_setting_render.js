'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class ErpTraderAccount extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'erp dtfs setting';
    }

    async getConfigListOptions() {
        var configs = this.dataSource.cx.table(_cxSchema.erp_dtfs_configs);
        await configs.select(this.dataSource.id);
        if (configs.count() > 0) { this.options.allowDelete = false; }

        var configListOptions = await this.listOptions(configs, { listView: true });
        configListOptions.quickSearch = true;
        configListOptions.columns.shift();

        if (this.options.mode == 'view') {
            if (this.options.allowEdit) {
                configListOptions.actions = [];
                configListOptions.actions.push({ label: 'edit', funcName: 'editDtfsConfig' });
                configListOptions.actions.push({ label: 'delete', funcName: 'deleteDtfsConfig' });
                configListOptions.showButtons = [{ id: 'erp_dtfs_configs_add', text: 'Add Configuration', function: 'addDtfsConfig' }];
            } else {
                configListOptions.actions = [{ label: 'view', funcName: 'viewDtfsConfig' }];
            }
        }
        return configListOptions;
    }
    
    async _record() {
        var newRecord = (this.options.mode == 'new');

        this.options.fields = [
            {
                group: 'settingOuter', title: '', columnCount: 3, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                            { name: 'erpProvider', label: 'erp provider', column: 2, lookUps: _cxConst.CX_ERP_PROVIDER.toList(true), validation: '{ "mandatory": true }', readOnly: !newRecord },
                            { name: 'dtfsSettingName', label: 'settings name', column: 1 },
                            { name: 'dtfsPairingStatus', label: 'pairing status', column: 1, readOnly: true, lookUps: _cxConst.EPOS_DTFS_SETTING.PAIRING_STATUS.toList() },
                            { name: 'dtfsPairingCode', label: 'pairing code', column: 2 },
                            { name: 'dtfsPairedMachineName', label: 'paired machine name', column: 1, readOnly: true },
                            { name: 'dtfsPairedMachineOS', label: 'paired machine os', column: 2, readOnly: true },
                            { name: 'dtfsPairedMachineIP', label: 'paired machine ip', column: 1, readOnly: true },
                            { name: 'dtfsPairedVersion', label: 'paired erps version', column: 2, readOnly: true },
                            { name: 'dtfsInfoLastRefresh', label: 'info last refreshed', column: 2, readOnly: true },

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
            }
        ];


        // var prefListOptions = await this.getPreferenceListOptions();
        // this.options.fields[0].fields.push({
        //     group: 'sublists', columnCount: 1, column: 3, fields: [
        //         { group: 'preferences', title: 'preferences', column: 1, fields: [prefListOptions] }
        //     ]
        // });
      
        if (!newRecord) {
            var sublists = { group: 'sublists', columnCount: 1, column: 3, fields: [] };
            this.options.fields[0].fields.push(sublists);

            var configListOptions = await this.getConfigListOptions();
            sublists.fields.push({ group: 'config', title: 'configurations', column: 1, fields: [configListOptions] });

            var prefListOptions = await this.getPreferenceListOptions();
            sublists.fields.push({ group: 'preferences', title: 'preferences', column: 1, fields: [prefListOptions] });

        }
    }

    async _list() {
        this.options.recordTitle = 'erp dtfs settings';
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
        ];
        this.options.columns = [
            { name: 'dtfsSettingId', title: ' ', align: 'center' },
            { name: 'dtfsSettingName', title: 'settings name' },
            { name: 'erpProvider', title: 'erp provider', lookUps: _cxConst.CX_ERP_PROVIDER.toList() },
            { name: 'dtfsPairingCode', title: 'pairing code' },
            { name: 'dtfsPairingStatus', title: 'pairing status', lookUps: _cxConst.EPOS_DTFS_SETTING.PAIRING_STATUS.toList() },
            { name: 'dtfsPairedMachineName', title: 'paired machine name' },
            { name: 'dtfsPairedMachineOS', title: 'paired machine OS' },
            { name: 'dtfsPairedMachineIP', title: 'paired machine IP' },
            { name: 'dtfsPairedVersion', title: 'paired erps version' },
            { name: 'dtfsInfoLastRefresh', title: 'paired info last refreshed' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
            { name: 'modified', title: 'modified', align: 'center', width: '130px' },
            { name: 'modifiedBy', title: 'by', align: 'left', width: '130px' },
        ];

        this.options.highlights = [];
        this.options.highlights.push({
            column: 'dtfsPairingStatus',
            op: '!=',
            value: _cxConst.EPOS_DTFS_SETTING.PAIRING_STATUS.PAIRED,
            style: 'color: indianred;'
        })


    }


    async dropDown() {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a dtfs setting'; }
        if (this.options.label == undefined) { this.options.label = 'dtfs setting'; }

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.dtfsSettingId,
                text: record.dtfsSettingName,
            });
        });
        this.options.items = dropDownItems;
    }


}

module.exports = ErpTraderAccount;



'use script';

const _core_l = require('cx-core/core/cx-core-lists');
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class EposDtfsSettingRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async getConfigListOptions() {
        var configs = this.dataSource.cx.table(_cxSchema.epos_dtfs_configs);
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
                configListOptions.showButtons = [{ id: 'epos_dtfs_configs_add', text: 'Add Configuration', function: 'addDtfsConfig' }];
            } else {
                configListOptions.actions = [{ label: 'view', funcName: 'viewDtfsConfig' }];
            }
        }
        return configListOptions;
    }

    async getEposShopListOptions() {
        var shops = this.dataSource.cx.table(_cxSchema.epos_shop_setting);
        await shops.select({ dtfs: this.dataSource.id });
        if (shops.count() > 0) { this.options.allowDelete = false; }

        var listOptions = await this.listOptions(shops, { listView: true });
        listOptions.quickSearch = true;
        listOptions.actions = [];
        _core_l.removeFromArray(listOptions.columns, 'name', _cxSchema.epos_shop_setting.DTFSSETTINGID);
        _core_l.removeFromArray(listOptions.columns, 'name', _cxSchema.epos_shop_setting.EPOSPROVIDER);
        _core_l.removeFromArray(listOptions.columns, 'name', 'groupInfo');
        _core_l.removeFromArray(listOptions.columns, 'name', 'dtfsInfo');
        
        

        if (this.options.mode == 'view') {
            // if (this.options.allowEdit) {
            //     listOptions.actions = [];
            //     listOptions.actions.push({ label: 'edit', funcName: 'editDtfsConfig' });
            //     listOptions.actions.push({ label: 'delete', funcName: 'deleteDtfsConfig' });
            //     listOptions.showButtons = [{ id: 'epos_dtfs_configs_add', text: 'Add Configuration', function: 'addDtfsConfig' }];
            // } else {
            //     listOptions.actions = [{ label: 'view', funcName: 'viewDtfsConfig' }];
            // }
        }
        return listOptions;
    }


    async _record() {
        var configListOptions = null; var shopListOptions = null;
        var newRecord = (this.options.mode == 'new');

        if (this.options.mode == 'new') {
            this.options.allowDelete = false;
        } else {
            configListOptions = await this.getConfigListOptions();
            shopListOptions = await this.getEposShopListOptions();
        }

        this.options.fields = [];
        var mainGroup = {
            group: 'eposOuter', title: '', columnCount: 3, fields: [
                {
                    group: 'epos', title: 'epos info', column: 1, columnCount: 2, fields: [
                        { name: 'dtfsSettingName', label: 'name', column: 1 },
                        { name: 'eposProvider', label: 'epos provider', column: 1, readOnly: !newRecord, lookUps: _cxConst.CX_EPOS_PROVIDER.toList() },
                        { name: 'startDate', label: 'start date', column: 1, readOnly: !newRecord, validation: '{ "mandatory": true }' },
                    ],
                },
                {
                    group: 'pair', title: 'pairing info', column: 2, columnCount: 2, fields: [
                        { name: 'dtfsPairingCode', label: 'pairing code', column: 1, readOnly: !newRecord, validation: '{ "mandatory": true }' },
                        { name: 'dtfsPairingStatus', label: 'pairing status', column: 1, readOnly: true, lookUps: _cxConst.EPOS_DTFS_SETTING.PAIRING_STATUS.toList() },
                        { name: 'dtfsPairedVersion', label: 'dtfs version', column: 1, readOnly: true },
                        { name: 'dtfsPairedMachineName', label: 'paired machine name', column: 2, readOnly: true },
                        { name: 'dtfsPairedMachineOS', label: 'paired machine OS', column: 2, readOnly: true },
                        { name: 'dtfsPairedMachineIP', label: 'paired machine IP', column: 2, readOnly: true },
                        { name: 'dtfsInfoLastRefresh', label: 'paired info last refresh', column: 2, readOnly: true },
                    ],
                },
            ]
        }
        this.options.fields.push(mainGroup);

        var listsGroup = {
            group: 'listsOuter', title: '', columnCount: 2, fields: [
                { group: 'config', title: 'configurations', column: 1, fields: [configListOptions]}
            ]
        }
        this.options.fields.push(listsGroup);

        if (!newRecord) {
            mainGroup.fields.push({
                group: 'audit', title: 'audit info', column: 3, columnCount: 2, fields: [
                    {
                        group: 'audit1', title: '', column: 1, columnCount: 1, inline: true, fields: [
                            { name: 'created', label: 'created', column: 1, readOnly: true },
                            { name: 'createdBy', label: 'by', column: 1, readOnly: true },
                        ]
                    },
                    {
                        group: 'audit2', title: '', column: 2, columnCount: 1, inline: true, fields: [
                            { name: 'modified', label: 'modified', column: 1, readOnly: true },
                            { name: 'modifiedBy', label: 'by', column: 1, readOnly: true },
                        ]
                    }
                ]
            });
            listsGroup.fields.push({
                group: 'shops', title: 'epos shops', column: 2, fields: [shopListOptions]
            })
        }


        if (this.options.mode == 'view') {
            this.options.buttons.push({ id: 'epos_dtfs_view_ping', text: 'Pings Audit', link: '../epos/pings?s=' + this.dataSource.id });
            this.options.buttons.push({ id: 'epos_dtfs_view_getLogs', text: 'Get Logs', link: '../raw/getlogs?s=' + this.dataSource.id });
            this.options.buttons.push({ id: 'epos_dtfs_view_transmission', text: 'Transmissions', link: '../epos/transmissions?s=' + this.dataSource.id });
            this.options.buttons.push({ id: 'epos_dtfs_view_upgrades', text: 'Upgrades Audit', link: '../epos/upgradeAudits?s=' + this.dataSource.id });

        }
    }

    async _list() {
       
        // NOTE: we overwrite permissions because we only want to create this record from a shop and only if not there already
        this.options.allowNew = false;

        // this.options.filters = [
        //     await this.filterDropDownOptions(_cxSchema.cx_shop_group, { fieldName: 'sg' }),
        //     { label: 'shop code', fieldName: 'sc', name: 'shopCode', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
        //     { label: 'epos code', fieldName: 'sec', name: _cxSchema.epos_dtfs_setting.EPOSSHOPCODE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
        //     { label: 'epos name', fieldName: 'sen', name: _cxSchema.epos_dtfs_setting.EPOSSHOPNAME, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
        // ];
        this.options.columns = [
            { title: '', name: _cxSchema.epos_dtfs_setting.DTFSSETTINGID },
            { title: 'name', name: _cxSchema.epos_dtfs_setting.DTFSSETTINGNAME },
            { title: 'epos provider', name: _cxSchema.epos_dtfs_setting.EPOSPROVIDER },
            
            { title: 'pairing status', name: _cxSchema.epos_dtfs_setting.DTFSPAIRINGSTATUS, lookUps: _cxConst.EPOS_DTFS_SETTING.PAIRING_STATUS.toList() },
            
            { title: 'dtfs version', name: _cxSchema.epos_dtfs_setting.DTFSPAIREDVERSION },
            { title: 'paired PC name', name: _cxSchema.epos_dtfs_setting.DTFSPAIREDMACHINENAME },
            { title: 'paired PC OS', name: _cxSchema.epos_dtfs_setting.DTFSPAIREDMACHINEOS },
            { title: 'paired PC IP', name: _cxSchema.epos_dtfs_setting.DTFSPAIREDMACHINEIP },
            { title: 'info last refreshed', name: _cxSchema.epos_dtfs_setting.DTFSINFOLASTREFRESH },
            { title: 'start date', name: _cxSchema.epos_dtfs_setting.STARTDATE },

            
        ];
        this.options.highlights = [
            { column: _cxSchema.epos_dtfs_setting.DTFSPAIRINGSTATUS, op: '=', value: _cxConst.EPOS_DTFS_SETTING.PAIRING_STATUS.NOT_PAIRED, style: 'color: red;' },
        ];

        this.options.actionsTitle = '';
        this.options.actions = [
            { label: 'pings', link: '/epos/pings?s=', target: '_blank' },
            //{ label: 'epos', link: '/epos/transmissions?s=', target: '_blank' },
        ]

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

module.exports = EposDtfsSettingRender;








'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CrShopSettingRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async getConfigListOptions() {
        var configs = this.dataSource.cx.table(_cxSchema.cr_shop_configs);
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
                configListOptions.showButtons = [{ id: 'cr_shop_configs_add', text: 'Add Configuration', function: 'addShopConfig' }];
            } else {
                configListOptions.actions = [{ label: 'view', funcName: 'viewShopConfig' }];
            }
        }
        return configListOptions;
    }


    async _record() {
        var configListOptions = null
        if (this.options.mode == 'new') {
            this.options.allowDelete = false;
        } else {
            configListOptions = await this.getConfigListOptions();
        }

        this.options.fields = [
            {
                group: 'shop', title: 'shop info', columnCount: 3, fields: [
                    { name: 'shopInfo', label: 'shop', column: 1, readOnly: true },
                    { name: 'groupInfo', label: 'group', column: 2, readOnly: true },
                ],
            },
            {
                group: 'eposOuter', title: '', columnCount: 2, fields: [
                    {
                        group: 'epos', title: 'epos info', column: 1, columnCount: 2, fields: [
                            { name: 'eposProvider', label: 'epos provider', column: 1, readOnly: !this.dataSource.isNew() },
                            { name: 'startDate', label: 'start date', column: 1 },
                            { name: 'eposShopCode', label: 'epos code', column: 2 },
                            { name: 'eposShopName', label: 'epos name', column: 2 },
                        ],
                    },
                    {
                        group: 'pair', title: 'pairing info', column: 2, columnCount: 2, fields: [
                            { name: 'dtfsPairingCode', label: 'pairing code', column: 1, readOnly: true },
                            { name: 'dtfsPairingStatus', label: 'pairing status', column: 1, readOnly: true, lookUps: _cxConst.CR_SHOP_SETTING.PAIRING_STATUS.toList() },
                            { name: 'dtfsPairedMachineName', label: 'paired machine name', column: 2, readOnly: true },
                            { name: 'dtfsPairedMachineOS', label: 'paired machine OS', column: 2, readOnly: true },
                            { name: 'dtfsPairedMachineIP', label: 'paired machine IP', column: 2, readOnly: true },
                        ],
                    },
                ]
            },
            {
                group: 'auditOuter', title: '', columnCount: 2, fields: [
                    {
                        group: 'config', title: 'configurations', column: 1, fields: [configListOptions]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 2, columnCount: 2, fields: [
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
                    }
                ]
            },
        ]

        if (this.options.mode == 'view') {
            this.options.buttons.push({ id: 'cr_shop_view_ping', text: 'Ping Audit', link: '../dtfs/pings?s=' + this.dataSource.id });
            this.options.buttons.push({ id: 'cr_shop_view_transmission', text: 'Get Logs', link: '../dtfs/getlogs?s=' + this.dataSource.id });
            this.options.buttons.push({ id: 'cr_shop_view_transmission', text: 'Transmissions', link: '../dtfs/transmissions?s=' + this.dataSource.id });
        }
    }

    async _list() {

        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop_group, { fieldName: 'sg' }),
            { label: 'shop code', fieldName: 'sc', name: 'shopCode', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'epos code', fieldName: 'sec', name: _cxSchema.cr_shop_setting.EPOSSHOPCODE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'epos name', fieldName: 'sen', name: _cxSchema.cr_shop_setting.EPOSSHOPNAME, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
        ];
        this.options.columns = [
            { title: '', name: _cxSchema.cr_shop_setting.SHOPID },
            { title: 'shop', name: 'shopInfo' },
            { title: 'group', name: 'groupInfo' },
            { title: 'epos provider', name: _cxSchema.cr_shop_setting.EPOSPROVIDER },
            { title: 'epos code', name: _cxSchema.cr_shop_setting.EPOSSHOPCODE },
            { title: 'epos name', name: _cxSchema.cr_shop_setting.EPOSSHOPNAME },
            { title: 'start date', name: _cxSchema.cr_shop_setting.STARTDATE },
            { title: 'pairing status', name: _cxSchema.cr_shop_setting.DTFSPAIRINGSTATUS, lookUps: _cxConst.CR_SHOP_SETTING.PAIRING_STATUS.toList() },
            
            { title: 'paired PC IP', name: _cxSchema.cr_shop_setting.DTFSPAIREDMACHINEIP },
            { title: 'paired PC name', name: _cxSchema.cr_shop_setting.DTFSPAIREDMACHINENAME },
            //{ title: 'paired PC OS', name: _cxSchema.cr_shop_setting.DTFSPAIREDMACHINEOS },

            //{ title: 'created', name: _cxSchema.cr_shop_setting.CREATED },
            //{ title: 'by', name: _cxSchema.cr_shop_setting.CREATEDBY },
            // { title: 'modified', name: _cxSchema.cr_shop_setting.MODIFIED },
            // { title: 'by', name: _cxSchema.cr_shop_setting.MODIFIEDBY },
        ];
        this.options.highlights = [
            { column: _cxSchema.cr_shop_setting.DTFSPAIRINGSTATUS, op: '=', value: _cxConst.CR_SHOP_SETTING.PAIRING_STATUS.NOT_PAIRED, style: 'color: red;' },
        ];

        this.options.actionsTitle = '';
        this.options.actions = [
            { label: 'pings', link: '/dtfs/pings?s=', target: '_blank' },
            { label: 'dtfs', link: '/dtfs/transmissions?s=', target: '_blank' },
        ]

    }

  

}

module.exports = CrShopSettingRender;








'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class EposShopSettingRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async getConfigListOptions() {
        var configs = this.dataSource.cx.table(_cxSchema.epos_shop_configs);
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
                configListOptions.showButtons = [{ id: 'epos_shop_configs_add', text: 'Add Configuration', function: 'addShopConfig' }];
            } else {
                configListOptions.actions = [{ label: 'view', funcName: 'viewShopConfig' }];
            }
        }
        return configListOptions;
    }


    async _record() {
        var configListOptions = null
        var newRecord = (this.options.mode == 'new');

        if (this.options.mode == 'new') {
            this.options.allowDelete = false;
        } else {
            configListOptions = await this.getConfigListOptions();
        }


        var dtfsSettingDropDown = await this.fieldDropDownOptions(_cxSchema.epos_dtfs_setting, {
            name: _cxSchema.epos_dtfs_setting.DTFSSETTINGID,
            validation: '{ "mandatory": true }',
            readOnly: !newRecord,
            column: 2,
        });

        this.options.fields = [
            {
                group: 'eposOuter', title: '', columnCount: 2, fields: [
                    {
                        group: 'store', title: 'store info', columnCount: 2, fields: [
                            { name: 'shopInfo', label: 'store', column: 1, readOnly: true },
                            { name: 'groupInfo', label: 'group', column: 2, readOnly: true },
                        ]
                    },
                    {
                        group: 'epos', title: 'epos info', column: 1, columnCount: 2, fields: [
                            { name: 'eposProvider', label: 'epos provider', column: 1, readOnly: !newRecord, lookUps: _cxConst.CX_EPOS_PROVIDER.toList() },
                            { name: 'eposShopCode', label: 'epos code', column: 1, readOnly: !newRecord, validation: '{ "mandatory": true }' },
                            { name: 'eposShopName', label: 'epos name', column: 1, validation: '{ "mandatory": true }' },
                            
                            dtfsSettingDropDown,
                            
                        ],
                    },
                   
                ]
            },
        ]

        if (!newRecord) {
            this.options.fields[0].fields.push({
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
            });

            this.options.fields[0].fields.push({
                group: 'config', title: 'configurations', column: 2, fields: [configListOptions]
            });

          
        }

        if (this.options.mode == 'view') {
            this.options.buttons.push({ id: 'epos_shop_dtfs_sett', text: 'Dtfs Settings', link: '../epos/dtfsSetting?id=' + this.dataSource.dtfsSettingId });
            //this.options.buttons.push({ id: 'epos_shop_view_ping', text: 'Pings Audit', link: '../epos/pings?s=' + this.dataSource.id });
            this.options.buttons.push({ id: 'epos_shop_view_getLogs', text: 'Get Logs', link: '../raw/getlogs?s=' + this.dataSource.id });
            this.options.buttons.push({ id: 'epos_shop_view_transmission', text: 'Transmissions', link: '../epos/transmissions?s=' + this.dataSource.id });
            //this.options.buttons.push({ id: 'epos_shop_view_upgrades', text: 'Upgrades Audit', link: '../epos/upgradeAudits?s=' + this.dataSource.id });

        }
    }

    async _list() {
        if (!this.options.path) {
            this.options.path = '../epos/shopSetting';
        }

        // NOTE: we overwrite permissions because we only want to create this record from a store and only if not there already
        this.options.allowNew = false;

        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop_group, { fieldName: 'sg' }),
            { label: 'store code', fieldName: 'sc', name: 'shopCode', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'epos code', fieldName: 'sec', name: _cxSchema.epos_shop_setting.EPOSSHOPCODE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'epos name', fieldName: 'sen', name: _cxSchema.epos_shop_setting.EPOSSHOPNAME, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
        ];
        this.options.columns = [
            { title: '', name: _cxSchema.epos_shop_setting.SHOPID },
            { title: 'store', name: 'shopInfo' },
            { title: 'group', name: 'groupInfo' },
            { title: 'epos provider', name: _cxSchema.epos_shop_setting.EPOSPROVIDER },
            { title: 'epos code', name: _cxSchema.epos_shop_setting.EPOSSHOPCODE },
            { title: 'epos name', name: _cxSchema.epos_shop_setting.EPOSSHOPNAME },
            { title: 'dtfs settings', name: 'dtfsInfo' },

        ];
        this.options.highlights = [
            { column: _cxSchema.epos_shop_setting.DTFSSETTINGID, op: '=', value: '[NULL]', style: 'color: red;' },
        ];

        this.options.actionsTitle = '';
        this.options.actions = [
            { label: 'epos', link: '/epos/dtfsSetting?id=', linkParamField: _cxSchema.epos_shop_setting.DTFSSETTINGID , target: '_blank' },
            { label: 'pings', link: '/epos/pings?s=', target: '_blank' },
            { label: 'transmission', link: '/epos/transmissions?s=', target: '_blank' },
        ]

    }

  

}

module.exports = EposShopSettingRender;








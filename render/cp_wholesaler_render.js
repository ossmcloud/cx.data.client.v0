'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class Wholesaler extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options, true);
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.cp_wholesaler.WHOLESALERID] = null;
        this.autoLoadFields[_cxSchema.cp_wholesaler.CODE] = null;
        this.autoLoadFields[_cxSchema.cp_wholesaler.NAME] = null;
        this.autoLoadFields[_cxSchema.cp_wholesaler.CURRENCY] = null;
        this.autoLoadFields[_cxSchema.cp_wholesaler.WHSPROVIDER] = null;
        this.autoLoadFields[_cxSchema.cp_wholesaler.CREATED] = null;
        this.autoLoadFields[_cxSchema.cp_wholesaler.MODIFIED] = null;
    }

    async initColumn(field, column) { }
    
    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_wholesaler.MODIFIED || field.name == _cxSchema.cp_wholesaler.CREATED) {
            return false;
        }
    }

    async _list() { }


    async getShopsListOptions() {
        var wholesalerShops = this.dataSource.cx.table(_cxSchema.cp_wholesalerShop);
        await wholesalerShops.select({ wholesalerId: this.options.query.id });

        var wholesalerShopsOptions = await this.listOptions(wholesalerShops, { listView: true });
        wholesalerShopsOptions.quickSearch = true;
        wholesalerShopsOptions.title = ' ';    //'<span style="padding-right: 17px;">the products below are associated with this alias</span>';
        return wholesalerShopsOptions;
    }

    async getConfigListOptions() {
        var configs = this.dataSource.cx.table(_cxSchema.cp_wholesalerConfig);
        await configs.select(this.dataSource.id);
        if (configs.count() > 0) { this.options.allowDelete = false; }

        var showBwgGetStore = false;
        configs.each((rec, idx) => { if (rec.configName == _cxConst.CP_WHS_CONFIG.BWG_CRM_CONFIG) { showBwgGetStore = true; return false; } });

        var configListOptions = await this.listOptions(configs, { listView: true });
        configListOptions.quickSearch = true;
        configListOptions.columns.shift();

        if (this.options.mode == 'view') {
            if (this.options.allowEdit) {
                configListOptions.actions = [];
                configListOptions.actions.push({ label: 'edit', funcName: 'editConfig' });
                configListOptions.actions.push({ label: 'delete', funcName: 'deleteConfig' });
                configListOptions.showButtons = [{ id: 'whs_configs_add', text: 'Add Configuration', function: 'addConfig' }];
                if (showBwgGetStore) {
                    configListOptions.showButtons.push({ id: 'whs_bwg_storeList', text: 'BWG Store List', function: 'bwgShowStores' });
                }
            } else {
                configListOptions.actions = [{ label: 'view', funcName: 'viewConfig' }];

            }
        }
        return configListOptions;
    }




    async _record() {

        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                            { name: 'code', label: 'code', column: 1 },
                            { name: 'whsProvider', label: 'provider', column: 2, readOnly: true },
                            { name: 'name', label: 'name', column: 1 },
                            { name: 'currency', label: 'currency', column: 1 },
                        ]
                    },
                    {
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
                    }
                ]
            }
        ];

        if (!this.dataSource.isNew()) {
            var subLists = { group: 'sublists', title: '', column: 1, columnCount: 2, styles: ['width: 100%;', 'min-width: 700px;'], fields: [] };

            var storeConfigs = await this.getShopsListOptions();

            subLists.fields.push({ group: 'stores', title: 'stores configurations', column: 1, fields: [storeConfigs] });


            var configListOptions = await this.getConfigListOptions();
            subLists.fields.push({ group: 'query', title: 'query configurations', column: 2, fields: [configListOptions] });

            this.options.fields.push(subLists);
        }
    }


    async dropDown(options) {
        if (!options) { options = {}; }
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a wholesaler'; }
        if (this.options.label == undefined) { this.options.label = 'wholesaler'; }
        options.noPaging = true;

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(options); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.wholesalerId,
                text: '[' + record.code + '] ' + record.name,
            });
        });
        this.options.items = dropDownItems;
    }



}

module.exports = Wholesaler;





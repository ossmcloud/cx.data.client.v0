'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class WholesalerShop extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options, true);
        this.autoLoad = true;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.cp_wholesalerShop.WHOLESALERID) {
            // column.name = 'whsShopId';
            // column.dataHidden = 'whs-shop-id';
            column.name = 'whsInfo';
            column.width = '75px';
        } else if (field.name == _cxSchema.cp_wholesalerShop.SHOPID) {
            column.name = 'shopInfo';
            column.title = 'shop info';
            column.addTotals = false;
            column.align = 'left';
            column.width = '125px';
        } else if (field.name == _cxSchema.cp_wholesalerShop.ERPTRADERACCOUNTID) {
            column.name = 'traderInfo';
            column.title = 'erp trader';
            column.addTotals = false;
            column.align = 'left';
            column.width = '125px';
        }
        //
        // else if (field.name == _cxSchema.erp_dtfs_setting.PINGIP) {
        //     column.width = '125px';
        // }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_wholesalerShop.SHOPID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 'shopId' });
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_wholesalerShop.ERPTRADERACCOUNTID || field.name == _cxSchema.cp_wholesalerShop.MODIFIED || field.name == _cxSchema.cp_wholesalerShop.CREATED) {
            return false;
        }
        // else if (field.name == _cxSchema.erp_dtfs_setting.RESPONSE) {
        //     filter.width = '250px';
        // }
    }

    async _list() {
        this.options.actionsShowFirst = true;
        this.options.actionsTitle = '';
        this.options.actions = [
            { link: '/cp/config/wholesaler-store?whsShopId=', linkParamField: 'whsShopId', label: '&#128269;', style: 'text-decoration: none;'}
        ]
        if (this.options.allowEdit) {
            this.options.actions.push({ link: '/cp/config/wholesaler-store?e=T&whsShopId=', linkParamField: 'whsShopId', label: '&#x270E;', style: 'text-decoration: none;' });
        }
        this.options.cellHighlights.push({
            column: _cxSchema.cp_wholesalerShop.ERPTRADERACCOUNTID,
            columns: ['traderInfo'],
            customStyle: function (obj, val, h) {
                if (val == null) {
                    return 'background-color: rgba(230,0,0,0.25); color: white; padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden;';
                }
            }
        })

        var applyStoreColorStyle = 'padding: 3px 7px 3px 7px; border-radius: 5px; width: auto; display: block; overflow: hidden; text-align: left;';
        var shopColors = await this.dataSource.cx.table(_cxSchema.cx_shop).selectColors();
        for (var cx = 0; cx < shopColors.length; cx++) {
            if (!shopColors[cx].shopColor) { continue; }
            this.options.cellHighlights.push({ column: 'shopId', op: '=', value: shopColors[cx].shopId, style: 'background-color: rgba(' + shopColors[cx].shopColor + ', 0.5); ' + applyStoreColorStyle, columns: ['shopInfo'] })
        }

    }

    async getConfigListOptions() {
        var configs = this.dataSource.cx.table(_cxSchema.cp_wholesalerShopConfig);
        
        await configs.select(this.dataSource.wholesalerId, this.dataSource.shopId);
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
                configListOptions.showButtons = [{ id: 'whs_shop_configs_add', text: 'Add Configuration', function: 'addConfig' }];
                if (showBwgGetStore && this.dataSource.cx.roleId >= _cxConst.CX_ROLE.CX_SUPPORT) {
                    configListOptions.showButtons.push({ id: 'whs_bwg_storeList', text: 'BWG Store List', function: 'bwgShowStores' });
                }
            } else {
                configListOptions.actions = [{ label: 'view', funcName: 'viewConfig' }];
            }
        }
        return configListOptions;
    }



    async _record() {
        var _this = this;
        var mainGroupFields = [];  

        var traderLookUp = { name: 'traderInfo', label: 'erp trader', column: 1, readOnly: true };
        if (this.options.mode != 'view') {
            traderLookUp = await this.fieldDropDownOptions(_cxSchema.erp_traderAccount, {
                id: _cxSchema.cp_wholesalerShop.ERPTRADERACCOUNTID, name: _cxSchema.cp_wholesalerShop.ERPTRADERACCOUNTID, column: 1, dropDownSelectOptions: { s: _this.dataSource.shopId, tt: 'S' }
            });
        }

        var wholesalerLookUp = { name: 'whsInfo', label: 'wholesaler', column: 1, readOnly: true };
        var shopLookUp = { name: 'shopInfo', label: 'shop', column: 1, readOnly: true };
        if (this.dataSource.isNew()) {
            shopLookUp = await this.fieldDropDownOptions(_cxSchema.cx_shop, {
                id: _cxSchema.cp_wholesalerShop.SHOPID, name: _cxSchema.cp_wholesalerShop.SHOPID, column: 1
            });
            var wholeSalerLookUpList = await _this.dataSource.cx.table(_cxSchema.cp_wholesaler).toLookUpList()
            wholesalerLookUp.name = 'wholesalerId';
            wholesalerLookUp.id = 'wholesalerId';
            wholesalerLookUp.readOnly = false;
            wholesalerLookUp.items = wholeSalerLookUpList;
        } else {
            mainGroupFields.push({ name: _cxSchema.cp_wholesalerShop.WHOLESALERID, hidden: true });
            mainGroupFields.push({ name: _cxSchema.cp_wholesalerShop.SHOPID, hidden: true });
        }

        mainGroupFields.push(wholesalerLookUp);
        mainGroupFields.push(shopLookUp);
        mainGroupFields.push(traderLookUp);
        mainGroupFields.push({ name: _cxSchema.cp_wholesalerShop.DEFAULTOPTIONS, label: 'default options', validation: '{ "mandatory": true, "max": 4000  }' })
        

        this.options.fields = [
            
            {
                group: 'all', title: '', columnCount: 3, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 1, fields: mainGroupFields
                        // [
                        //     { name: _cxSchema.cp_wholesalerShop.WHOLESALERID, hidden: true },
                        //     { name: _cxSchema.cp_wholesalerShop.SHOPID, hidden: true },
                        //     //{ name: 'whsInfo', label: 'wholesaler', column: 1, readOnly: true },
                        //     wholesalerLookUp,
                        //     shopLookUp,
                        //     traderLookUp
                        // ]
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
            var configListOptions = await this.getConfigListOptions();
            this.options.fields[0].fields.push({ group: 'query', title: 'query configurations', column: 3, fields: [configListOptions] });
        }

        if (this.options.mode == 'view') {
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.SUPERVISOR) {
                this.options.buttons.push({ id: 'cp_wholesalerShop_edit', text: 'Edit', self: true, link: 'wholesaler-store?e=T&whsShopId=' + this.dataSource.wholesalerId + '-' + this.dataSource.shopId });
            }
        }
    }


}

module.exports = WholesalerShop;





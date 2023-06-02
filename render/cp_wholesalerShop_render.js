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
            column.name = 'whsShopId';
            column.dataHidden = 'whs-shop-id';
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
                    return 'background-color: rgba(230,0,0,0.25); color: white; padding: 3px 7px 3px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden;';
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



    async _record() {
        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 1, fields: [
                            { name: 'whsInfo', label: 'wholesaler', column: 1, readOnly: true },
                            { name: 'shopInfo', label: 'shop', column: 1, readOnly: true },
                            { name: 'traderInfo', label: 'erp trader', column: 1, readOnly: true },
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
    }


}

module.exports = WholesalerShop;





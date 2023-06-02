'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class Wholesaler extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options, true);
        this.autoLoad = true;
    }

    async initColumn(field, column) {
        // if (field.name == _cxSchema.erp_dtfs_setting.DTFSSETTINGID) {
        //     column.name = 'dtfsInfo';
        //     column.title = 'dtfs info';
        //     column.addTotals = false;
        //     column.align = 'left';
        //     column.width = '125px';
        // } else if (field.name == _cxSchema.erp_dtfs_setting.PINGIP) {
        //     column.width = '125px';
        // }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_wholesaler.MODIFIED || field.name == _cxSchema.cp_wholesaler.CREATED) {
            return false;
        }
    }

    async _list() {
        // this.options.cellHighlights.push({
        //     column: _cxSchema.epos_dtfs_ping.RESPONSE,
        //     customStyle: function (obj, val, h) {
        //         if (val.indexOf('ERROR') >= 0) {
        //             return 'background-color: rgba(230,0,0,0.25); color: white; padding: 3px 7px 3px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden;';
        //         } else if (val.indexOf('action: get, status: ok') >= 0) {
        //             return 'background-color: rgba(0,150,0,0.25); color: white; padding: 3px 7px 3px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden;';
        //         }
        //     }
        // })
    }


    async getShopsListOptions() {
        var wholesalerShops = this.dataSource.cx.table(_cxSchema.cp_wholesalerShop);
        await wholesalerShops.select({ wholesalerId: this.options.query.id });

        var wholesalerShopsOptions = await this.listOptions(wholesalerShops, { listView: true });
        wholesalerShopsOptions.quickSearch = true;
        //wholesalerShopsOptions.path = '/cp/config/product';
        wholesalerShopsOptions.title = ' ';    //'<span style="padding-right: 17px;">the products below are associated with this alias</span>';
        //wholesalerShopsOptions.actions = [{ label: 'remove', funcName: 'detachProduct' }];
        //wholesalerShopsOptions.showButtons = [{ id: 'cr_products_add', text: 'Attach Products', function: 'attachProducts' }];
        return wholesalerShopsOptions;
    }



    async _record() {
        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 1, fields: [
                            { name: 'code', label: 'code', column: 1 },
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
            var storeConfgs = await this.getShopsListOptions();
            this.options.fields.push({ group: 'stores', title: 'stores configurations', column: 1, fields: [storeConfgs] });
        }
    }


}

module.exports = Wholesaler;





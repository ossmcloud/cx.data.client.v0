'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxMapConfigRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        
        var mapConfig = this.dataSource.cx.table(_cxSchema.cx_map_config);
        mapConfig = await mapConfig.fetch(this.dataSource.mapConfigId)
        var shopId = mapConfig.mapMasterShop;

        
        this.options.fields = [
            {
                group: 'mainOuter', title: '', columnCount: 4, fields: [
                    {
                        group: 'main', title: 'main info', columnCount: 1, column: 1, inLine: true, fields: [
                            { name: _cxSchema.cx_map_config_dep.EPOSDEPARTMENT, label: 'epos department', column: 1, readOnly: true },
                            { name: _cxSchema.cx_map_config_dep.EPOSSUBDEPARTMENT, label: 'epos sub department', column: 1, readOnly: true },
                            { name: _cxSchema.cx_map_config_dep.EPOSDESCRIPTION, label: 'epos description', column: 1, readOnly: true },
                        ]
                    },
                    {
                        group: 'erp', title: 'erp mapping info', columnCount: 1, column: 2, inLine: true, fields: [
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                label: 'GL Account (sales)',
                                id: _cxSchema.cx_map_config_dep.SALEACCOUNTID, name: _cxSchema.cx_map_config_dep.SALEACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                label: 'GL Account (cogs)',
                                id: _cxSchema.cx_map_config_dep.COGSACCOUNTID, name: _cxSchema.cx_map_config_dep.COGSACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                label: 'GL Account (waste)',
                                id: _cxSchema.cx_map_config_dep.WASTEACCOUNTID, name: _cxSchema.cx_map_config_dep.WASTEACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                label: 'GL Account (purchase)',
                                id: _cxSchema.cx_map_config_dep.PURCHASEACCOUNTID, name: _cxSchema.cx_map_config_dep.PURCHASEACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                label: 'GL Account (accruals)',
                                id: _cxSchema.cx_map_config_dep.ACCRUALACCOUNTID, name: _cxSchema.cx_map_config_dep.ACCRUALACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 3, columnCount: 1, inLine: true, fields: [
                            { name: _cxSchema.cx_map_config_dep.CREATEDBY, label: 'created by', column: 1, readOnly: true },
                            { name: _cxSchema.cx_map_config_dep.CREATED, label: 'created on', column: 1, readOnly: true },
                            { name: _cxSchema.cx_map_config_dep.MODIFIEDBY, label: 'modified by', column: 1, readOnly: true },
                            { name: _cxSchema.cx_map_config_dep.MODIFIED, label: 'modified on', column: 1, readOnly: true },
                        ]
                    }
                ]
            }
        ];

    }



    async _list() {
        this.options.paging = true;
        this.options.pageNo = (this.options.query) ? (this.options.query.page || 1) : 1;


        this.options.filters = [
            //await this.filterDropDownOptions(_cxSchema.cx_map_config, { fieldName: 'map' }),
            { label: 'mid', fieldName: 'mid', hidden: true },
            { label: 'type', fieldName: 'type', hidden: true },
            { label: 'department', fieldName: 'dep', name: _cxSchema.cx_map_config_dep.EPOSDEPARTMENT, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'sub-department', fieldName: 'sub', name: _cxSchema.cx_map_config_dep.EPOSSUBDEPARTMENT, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'description', fieldName: 'desc', name: _cxSchema.cx_map_config_dep.EPOSDESCRIPTION, type: _cxConst.RENDER.CTRL_TYPE.TEXT },

        ];
        this.options.columns = [
            { title: ' ', name: _cxSchema.cx_map_config_dep.DEPMAPCONFIGID },
            //{ title: 'map id', name: _cxSchema.cx_map_config_dep.MAPCONFIGID },
            { title: 'r', name: 'status_r', unbound: true, align: 'center', width: '15px' },
            { title: 'p', name: 'status_p', unbound: true, align: 'center', width: '15px' },
            { title: 'department', name: _cxSchema.cx_map_config_dep.EPOSDEPARTMENT },
            { title: 'sub-department', name: _cxSchema.cx_map_config_dep.EPOSSUBDEPARTMENT },
            { title: 'description', name: _cxSchema.cx_map_config_dep.EPOSDESCRIPTION },
            
            { title: 'created', name: _cxSchema.cx_map_config_dep.CREATED },
            { title: 'by', name: _cxSchema.cx_map_config_dep.CREATEDBY },
            { title: 'modified', name: _cxSchema.cx_map_config_dep.MODIFIED },
            { title: 'by', name: _cxSchema.cx_map_config_dep.MODIFIEDBY },
        ];

        var appendStyle = 'padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;';
        this.options.cellHighlights = [];
        this.options.cellHighlights.push({
            column: 'status_r',
            columns: ['status_r'],
            customStyle: function (object, value, highlight) {
                if (object[_cxSchema.cx_map_config_dep.SALEACCOUNTID] == null) {
                    return 'background-color: red; ' + appendStyle;
                } else if (object[_cxSchema.cx_map_config_dep.COGSACCOUNTID] == null || object[_cxSchema.cx_map_config_dep.WASTEACCOUNTID] == null) {
                    return 'background-color: orange; ' + appendStyle;
                } else {
                    return 'background-color: green; ' + appendStyle;
                }
            }
        })
        this.options.cellHighlights.push({
            column: 'status_p',
            columns: ['status_p'],
            customStyle: function (object, value, highlight) {
                if (object[_cxSchema.cx_map_config_dep.PURCHASEACCOUNTID] == null) {
                    return 'background-color: red; ' + appendStyle;
                } else if (object[_cxSchema.cx_map_config_dep.ACCRUALACCOUNTID] == null) {
                    return 'background-color: orange; ' + appendStyle;
                } else {
                    return 'background-color: green; ' + appendStyle;
                }
            }
        })
        
    }

    // async dropDown() {
    //     if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a dep/sub-dep'; }
    //     if (this.options.label == undefined) { this.options.label = 'epos dep/sub-dep'; }

    //     // load collection if required
    //     if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(); }
    //     // populate drop down items
    //     var dropDownItems = [];
    //     this.dataSource.each(function (record) {
    //         dropDownItems.push({
    //             value: record.shopId,
    //             text: record.shopName + ' [' + record.shopCode + ']',
    //         });
    //     });
    //     this.options.items = dropDownItems;
    // }

}

module.exports = CxMapConfigRender;
'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxMapConfigRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        this.options.allowDelete = this.dataSource.isManual && (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.CX_SUPPORT);

        var mapConfig = this.dataSource.cx.table(_cxSchema.cx_map_config);
        mapConfig = await mapConfig.fetch(this.dataSource.mapConfigId)
        var shopId = mapConfig.mapMasterShop;

        var readOnly = (this.dataSource.isManual)?false: !this.dataSource.isNew();
        if (this.options.mode == 'view') { readOnly = true; }
        if (this.dataSource.isManual) {
            //this.options.tabTitle = this.op.title;
            this.options.title = '<span style="color: var(--main-color-3);" title="record was added manually">&#x2699;</span> ' + this.options.title;

        }

        this.options.fields = [
            {
                group: 'mainOuter', title: '', columnCount: 4, fields: [
                    {
                        group: 'main', title: 'main info', columnCount: 1, column: 1, inLine: true, fields: [
                            { name: _cxSchema.cx_map_config_dep.MAPCONFIGID, hidden: true },
                            { name: _cxSchema.cx_map_config_dep.EPOSDEPARTMENT, label: 'epos department', column: 1, readOnly: readOnly },
                            { name: _cxSchema.cx_map_config_dep.EPOSSUBDEPARTMENT, label: 'epos sub department', column: 1, readOnly: readOnly },
                            { name: _cxSchema.cx_map_config_dep.EPOSDESCRIPTION, label: 'epos description', column: 1, readOnly: readOnly },
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

        var mapConfig = this.dataSource.cx.table(_cxSchema.cx_map_config);
        mapConfig = await mapConfig.fetch(this.options.query.mid)
        this.options.title = `${this.options.title} :: <b><i>${mapConfig.name}</i></b>`;

        var mismapLookUps = [
            { value: '', text: '- all -' },

            { value: 'not_mapped_sales', text: 'Sales NOT mapped' },
            { value: 'not_mapped_purchase', text: 'Purchase NOT mapped' },
            { value: 'not_mapped_waste', text: 'Waste NOT mapped' },
            { value: 'not_mapped_accrual', text: 'Accruals NOT mapped' },
            { value: 'not_mapped_cogs', text: 'COGS NOT mapped' },

            { value: 'mapped_sales', text: 'Sales mapped' },
            { value: 'mapped_purchase', text: 'Purchase mapped' },
            { value: 'mapped_waste', text: 'Waste mapped' },
            { value: 'mapped_accrual', text: 'Accruals mapped' },
            { value: 'mapped_cogs', text: 'COGS mapped' },

        ]

        this.options.filters = [
            //await this.filterDropDownOptions(_cxSchema.cx_map_config, { fieldName: 'map' }),
            //await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { label: 'mid', fieldName: 'mid', hidden: true },
            { label: 'type', fieldName: 'type', hidden: true },
            { label: 'department', fieldName: 'dep', name: _cxSchema.cx_map_config_dep.EPOSDEPARTMENT, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'sub-department', fieldName: 'sub', name: _cxSchema.cx_map_config_dep.EPOSSUBDEPARTMENT, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'description', fieldName: 'desc', name: _cxSchema.cx_map_config_dep.EPOSDESCRIPTION, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'mapping status', fieldName: 'mapped', name: 'mapped', lookUps: mismapLookUps },
            { label: 'manual', fieldName: 'manual', type: _cxConst.RENDER.CTRL_TYPE.SELECT, width: '75px', items: [{ value: '', text: 'either' }, { value: 'true', text: 'yes' }, { value: 'false', text: 'no' }] },

        ];
        this.options.columns = [
            { title: ' ', name: _cxSchema.cx_map_config_dep.DEPMAPCONFIGID },
            //{ name: 'shopInfo', title: 'store', width: '200px' },
            //{ title: 'map id', name: _cxSchema.cx_map_config_dep.MAPCONFIGID },
            { title: 'r', name: 'status_r', unbound: true, align: 'center', width: '15px' },
            { title: 'p', name: 'status_p', unbound: true, align: 'center', width: '15px' },
            { title: 'department', name: _cxSchema.cx_map_config_dep.EPOSDEPARTMENT, width: '75px' },
            { title: 'sub-department', name: _cxSchema.cx_map_config_dep.EPOSSUBDEPARTMENT, width: '75px' },
            { title: 'description', name: _cxSchema.cx_map_config_dep.EPOSDESCRIPTION },

            { title: 'sales account', name: 'salesSpec', addValues: [{ name: 'salesDesc', style: 'border-top: 1px dotted rgb(97,97,97);' }] },
            { title: 'purchase account', name: 'purchSpec', addValues: [{ name: 'purchDesc', style: 'border-top: 1px dotted rgb(97,97,97);' }] },
            { title: 'waste account', name: 'wasteSpec', addValues: [{ name: 'wasteDesc', style: 'border-top: 1px dotted rgb(97,97,97);' }] },
            { title: 'accrual account', name: 'accrualSpec', addValues: [{ name: 'accrualDesc', style: 'border-top: 1px dotted rgb(97,97,97);' }] },
            { title: 'cogs account', name: 'cogsSpec', addValues: [{ name: 'cogsDesc', style: 'border-top: 1px dotted rgb(97,97,97);' }] },

            // { title: 'created', name: _cxSchema.cx_map_config_dep.CREATED },
            // { title: 'by', name: _cxSchema.cx_map_config_dep.CREATEDBY },
            // { title: 'modified', name: _cxSchema.cx_map_config_dep.MODIFIED },
            // { title: 'by', name: _cxSchema.cx_map_config_dep.MODIFIEDBY },
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

        var applyStoreColorStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: auto; display: block; overflow: hidden; text-align: left;';
        var shopColors = await this.dataSource.cx.table(_cxSchema.cx_shop).selectColors();
        for (var cx = 0; cx < shopColors.length; cx++) {
            if (!shopColors[cx].shopColor) { continue; }
            this.options.cellHighlights.push({
                column: 'shopId', op: '=', value: shopColors[cx].shopId, style: 'background-color: rgba(' + shopColors[cx].shopColor + ', 0.5); ' + applyStoreColorStyle, columns: ['shopInfo']
            })
        }

        this.options.highlights = [
            { column: 'isManual', op: '=', value: true, style: 'color: var(--main-color-3);' }
        ];

    }

    async dropDown(dropDownSelectionOptions) {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a dep/sub-dep'; }
        if (this.options.label == undefined) { this.options.label = 'epos dep/sub-dep'; }

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(dropDownSelectionOptions); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.depMapConfigId,
                text: record.eposDepartment + '/' + record.eposSubDepartment + ' - ' + record.eposDescription,
            });
        });
        this.options.items = dropDownItems;
    }

}

module.exports = CxMapConfigRender;
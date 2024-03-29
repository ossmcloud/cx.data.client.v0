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
        
        var readOnly = (this.dataSource.isManual) ? false : !this.dataSource.isNew();
        if (this.options.mode == 'view') { readOnly = true; }
        if (this.dataSource.isManual) {
            this.options.title = '<span style="color: var(--main-color-3);" title="record was added manually">&#x2699;</span> ' + this.options.title;
        }

        this.options.fields = [
            {
                group: 'mainOuter', title: '', columnCount: 4, fields: [
                    {
                        group: 'main', title: 'main info', columnCount: 1, column: 1, inLine: true, fields: [
                            { name: _cxSchema.cx_map_config_tax.MAPCONFIGID, hidden: true },
                            { name: _cxSchema.cx_map_config_tax.EPOSTAXCODE, label: 'epos tax code', column: 1, readOnly: readOnly, validation: '{ "mandatory": true }' },
                            { name: _cxSchema.cx_map_config_tax.EPOSTAXRATE, label: 'epos tax rate', column: 1, readOnly: readOnly, validation: '{ "mandatory": true }' },
                            { name: _cxSchema.cx_map_config_tax.EPOSDESCRIPTION, label: 'epos description', column: 1, readOnly: readOnly },
                            { name: _cxSchema.cx_map_config_tax.EPOSCURRENCYCODE, label: 'epos currency', column: 1, lookUps: _cxConst.CX_CURRENCY.toList(true), readOnly: readOnly, validation: '{ "mandatory": true }' },
                        ]
                    },
                    {
                        group: 'erp', title: 'erp mapping info', columnCount: 1, column: 2, inLine: true, fields: [
                            await this.fieldDropDownOptions(_cxSchema.erp_tax_account, {
                                label: 'Tax Account (sales)',
                                id: _cxSchema.cx_map_config_tax.TAXACCOUNTID, name: _cxSchema.cx_map_config_tax.TAXACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_tax_account, {
                                label: 'Tax Account (purchase)',
                                id: _cxSchema.cx_map_config_tax.PURCHASETAXACCOUNTID, name: _cxSchema.cx_map_config_tax.PURCHASETAXACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 3, columnCount: 1, inLine: true, fields: [
                            { name: _cxSchema.cx_map_config_tax.CREATEDBY, label: 'created by', column: 1, readOnly: true },
                            { name: _cxSchema.cx_map_config_tax.CREATED, label: 'created on', column: 1, readOnly: true },
                            { name: _cxSchema.cx_map_config_tax.MODIFIEDBY, label: 'modified by', column: 1, readOnly: true },
                            { name: _cxSchema.cx_map_config_tax.MODIFIED, label: 'modified on', column: 1, readOnly: true },
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

        this.options.filters = [
            { label: 'mid', fieldName: 'mid', hidden: true },
            { label: 'type', fieldName: 'type', hidden: true },
            { label: 'tax code', fieldName: 'tt', name: _cxSchema.cx_map_config_tax.EPOSTAXCODE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'description', fieldName: 'ts', name: _cxSchema.cx_map_config_tax.EPOSDESCRIPTION, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'manual', fieldName: 'manual', type: _cxConst.RENDER.CTRL_TYPE.SELECT, width: '75px', items: [{ value: '', text: 'either' }, { value: 'true', text: 'yes' }, { value: 'false', text: 'no' }] },
            
        ];
        this.options.columns = [
            { title: ' ', name: _cxSchema.cx_map_config_tax.TAXMAPCONFIGID },
            //{ title: 'map id', name: _cxSchema.cx_map_config_tax.MAPCONFIGID },
            { title: 'r', name: 'status_r', unbound: true, align: 'center', width: '15px' },
            { title: 'p', name: 'status_p', unbound: true, align: 'center', width: '15px' },

            { title: 'tax code', name: _cxSchema.cx_map_config_tax.EPOSTAXCODE },
            { title: 'tax name', name: _cxSchema.cx_map_config_tax.EPOSDESCRIPTION },
            { title: 'tax rate', name: _cxSchema.cx_map_config_tax.EPOSTAXRATE },
            { title: 'currency', name: _cxSchema.cx_map_config_tax.EPOSCURRENCYCODE },

            { title: 'erp tax code', name: 'taxAccount' },
            { title: 'erp tax code (purchase)', name: 'taxAccountPurchase' },
            
            { title: 'created', name: _cxSchema.cr_tran_type_config.CREATED },
            { title: 'by', name: _cxSchema.cr_tran_type_config.CREATEDBY },
            { title: 'modified', name: _cxSchema.cr_tran_type_config.MODIFIED },
            { title: 'by', name: _cxSchema.cr_tran_type_config.MODIFIEDBY },
        ];

        var appendStyle = 'padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;';
        this.options.cellHighlights = [];
        this.options.cellHighlights.push({
            column: 'status_r',
            columns: ['status_r'],
            customStyle: function (object, value, highlight) {
                if (object[_cxSchema.cx_map_config_tax.TAXACCOUNTID] == null) {
                    return 'background-color: red; ' + appendStyle;
                } else {
                    return 'background-color: green; ' + appendStyle;
                }
            }
        })
        this.options.cellHighlights.push({
            column: 'status_p',
            columns: ['status_p'],
            customStyle: function (object, value, highlight) {
                if (object[_cxSchema.cx_map_config_tax.PURCHASETAXACCOUNTID] == null) {
                    return 'background-color: red; ' + appendStyle;
                } else {
                    return 'background-color: green; ' + appendStyle;
                }
            }
        })

        this.options.highlights = [
            { column: 'isManual', op: '=', value: true, style: 'color: var(--main-color-3);' }
        ];

    }


    async dropDown(dropDownSelectionOptions) {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a tax'; }
        if (this.options.label == undefined) { this.options.label = 'epos tax'; }

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(dropDownSelectionOptions); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.taxMapConfigId,
                text: record.eposTaxCode + ' [' + record.eposTaxRate + '%] ' + record.eposDescription,
            });
        });
        this.options.items = dropDownItems;
    }



}

module.exports = CxMapConfigRender;
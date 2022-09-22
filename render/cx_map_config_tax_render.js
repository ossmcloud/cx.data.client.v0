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
                            { name: _cxSchema.cx_map_config_tax.EPOSTAXCODE, label: 'epos tax code', column: 1, readOnly: true },
                            { name: _cxSchema.cx_map_config_tax.EPOSTAXRATE, label: 'epos tax rate', column: 1, readOnly: true },
                            { name: _cxSchema.cx_map_config_tax.EPOSDESCRIPTION, label: 'epos description', column: 1, readOnly: true },
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

        this.options.filters = [
            { label: 'tax code', fieldName: 'tt', name: _cxSchema.cx_map_config_tax.EPOSTAXCODE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'description', fieldName: 'ts', name: _cxSchema.cx_map_config_tax.EPOSDESCRIPTION, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            
        ];
        this.options.columns = [
            { title: ' ', name: _cxSchema.cx_map_config_tax.TAXMAPCONFIGID },
            { title: 'map id', name: _cxSchema.cx_map_config_tax.MAPCONFIGID },
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

    }


}

module.exports = CxMapConfigRender;
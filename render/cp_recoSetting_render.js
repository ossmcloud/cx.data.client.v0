'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPRecoSettingRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'matching settings';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.cp_recoSetting.RECOSETTINGID] = null;
        this.autoLoadFields[_cxSchema.cp_recoSetting.WHOLESALERID] = null;
        this.autoLoadFields[_cxSchema.cp_recoSetting.SHOPID] = null;
        this.autoLoadFields[_cxSchema.cp_recoSetting.HTOLERANCE] = null;
        this.autoLoadFields[_cxSchema.cp_recoSetting.HTOLERANCEPC] = null;
        this.autoLoadFields[_cxSchema.cp_recoSetting.LTOLERANCE] = null;
        this.autoLoadFields[_cxSchema.cp_recoSetting.LTOLERANCEPC] = null;
        this.autoLoadFields[_cxSchema.cp_recoSetting.FORCENOTES] = null;
        this.autoLoadFields[_cxSchema.cp_recoSetting.CREATED] = null;
        this.autoLoadFields[_cxSchema.cp_recoSetting.MODIFIED] = null;

    }



    async initColumn(field, column) {
        if (field.name == _cxSchema.cp_recoSetting.WHOLESALERID) {
            column.name = 'wholesalerInfo';
            column.title = 'wholesaler';
            column.addTotals = false;
            column.align = 'left';
        } else if (field.name == _cxSchema.cp_recoSetting.SHOPID) {
            column.name = 'shopInfo';
            column.title = 'store';
            column.addTotals = false;
            column.align = 'left';
        } else if (field.name == _cxSchema.cp_recoSetting.HTOLERANCE || field.name == _cxSchema.cp_recoSetting.LTOLERANCE) {
            column.addTotals = false;
        } else if (field.name == _cxSchema.cp_recoSetting.HTOLERANCEPC || field.name == _cxSchema.cp_recoSetting.LTOLERANCEPC) {
            column.addTotals = false;
        } else if (field.name == _cxSchema.cp_recoSetting.FORCENOTES) {
            column.align = 'center';

        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_recoSetting.SHOPID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 'shopId' });
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_recoSetting.WHOLESALERID) {
            //filter.replace = await this.filterDropDownOptions(_cxSchema.cp_wholesaler, { fieldName: 'wholesalerId' });
            filter.hide = true;
        } else if (field.name == _cxSchema.cp_recoSetting.HTOLERANCE || field.name == _cxSchema.cp_recoSetting.LTOLERANCE || field.name == _cxSchema.cp_recoSetting.FORCENOTES) {
            filter.hide = true;
        } else if (field.name == _cxSchema.cp_recoSetting.HTOLERANCEPC || field.name == _cxSchema.cp_recoSetting.LTOLERANCEPC) {
            filter.hide = true;
        }
    }

    async _list() { 
        
    }




    async getSupplierSettingsListOptions() {
        var configs = this.dataSource.cx.table(_cxSchema.cp_recoSettingSupplier);
        await configs.select({ recoSettingId: this.dataSource.id });
        if (configs.count() > 0) { this.options.allowDelete = false; }

        var configListOptions = await this.listOptions(configs, { listView: true });
        configListOptions.quickSearch = true;
        configListOptions.columns.shift();
        configListOptions.columns.shift();

        if (this.options.mode == 'view') {
            configListOptions.actionsShowFirst = true;
            if (this.options.allowEdit) {

                configListOptions.actions = [];
                configListOptions.actions.push({ label: '&#x270E;', toolTip: 'edit...', funcName: 'editSupplierConfig' });
                configListOptions.actions.push({ label: '&#128465;', toolTip: 'delete', funcName: 'deleteSupplierConfig' });
                configListOptions.showButtons = [{ id: 'cr_tran_type_config_shop_add', text: 'Add Configuration', function: 'addSupplierConfig' }];
            } else {
                configListOptions.actions = [{ label: 'view', funcName: 'viewSupplierConfig' }];
            }
        }
        return configListOptions;
    }

    async _record() {


        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 3, fields: [
                            //{ name: 'wholesalerId', label: 'wholesaler', column: 1 },
                            await this.fieldDropDownOptions(_cxSchema.cp_wholesaler, { id: 'wholesalerId', name: 'wholesalerId', column: 1 }),
                            //{ name: 'shopId', label: 'store', column: 1 },
                            await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId', column: 1 }),
                            {
                                group: 'hTolerance', title: '', column: 2, columnCount: 2, fields: [
                                    { name: 'hTolerance', label: 'tolerance (header)', width: '130px', column: 1 },
                                    { name: 'hTolerancePc', label: 'tolerance %', width: '130px', column: 2 },    
                                ]
                            },
                            {
                                group: 'lTolerance', title: '', column: 2, columnCount: 2, fields: [
                                    { name: 'lTolerance', label: 'tolerance (line)', width: '130px', column: 1 },
                                    { name: 'lTolerancePc', label: 'tolerance %', width: '130px', column: 2 },
                                ]
                            },
                                                      
                            { name: 'ignoreVatMismatch', label: 'ignore vat differences (only match net)', column: 3 },
                            { name: 'ignoreLineTolerance', label: 'ignore lines out of tolerance if header is within tolerance', column: 3 },
                            { name: 'forceNotes', label: 'force entering notes when marking as matched', column: 3 },
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

        var supplierConfigs = await this.getSupplierSettingsListOptions();
        var listsSuppliers = {
            group: 'listsOuter', title: '', columnCount: 1, fields: [
                { group: 'config', title: 'supplier specific configurations', column: 1, fields: [supplierConfigs] }
            ]
        }
        this.options.fields.push(listsSuppliers);


    }


}


module.exports = CPRecoSettingRender;



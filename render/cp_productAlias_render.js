'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPProductAliasRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'retail product';
    }

    async getProductListOptions() {
        var transactionLines = this.dataSource.cx.table(_cxSchema.cp_product);
        await transactionLines.select({ aid: this.options.query.id });

        var transactionLinesOptions = await this.listOptions(transactionLines, { listView: true });
        transactionLinesOptions.quickSearch = true;
        transactionLinesOptions.path = '/cp/config/product';
        transactionLinesOptions.title = ' ';    //'<span style="padding-right: 17px;">the products below are associated with this alias</span>';
        transactionLinesOptions.actions = [{ label: 'remove', funcName: 'detachProduct' }];

        // transactionLinesOptions.showButtons = [{ id: 'cr_products_add', text: 'Attach Products', function: 'attachProducts' }];
        
        return transactionLinesOptions;
    }

    async _record() {
        var mainInfoGroup = { group: 'main', title: '', columnCount: 3, styles: ['min-width: 500px; max-width: 750px', 'min-width: 250px', 'min-width: 250px'], fields: [] };
        this.options.fields = [mainInfoGroup];

        var mandatory = (this.options.mode == 'view') ? '' : '{ "mandatory": true }';

        if (this.dataSource.isNew()) {
            this.options.title = `[NEW] product alias`;
            if (!this.options.query.depConfigId && !this.options.query.taxConfigId && !this.options.query.prod) {
                var configLookUp_depMap = await this.dataSource.cx.table(_cxSchema.cx_map_config).toLookUpList(_cxConst.CX_MAP_CONFIG_TYPE.GL_MAP, true);
                var configLookUp_taxMap = await this.dataSource.cx.table(_cxSchema.cx_map_config).toLookUpList(_cxConst.CX_MAP_CONFIG_TYPE.TAX_MAP, true);
                mainInfoGroup.fields.push({
                    group: 'config', title: 'map configurations', columnCount: 1, fields: [
                        { name: 'depConfigId', label: 'Department Mappings', column: 1, lookUps: configLookUp_depMap, validation: mandatory },
                        { name: 'taxConfigId', label: 'Tax Mappings', column: 1, lookUps: configLookUp_taxMap, validation: mandatory },
                    ]
                });
                return;
            }
        } else {
            this.options.title = `[${this.dataSource.itemCode}] ${this.dataSource.itemDescription}`;
        }

        var depMapConfigField = { name: 'depMapInfo', label: 'dep. config', readOnly: true };
        var taxMapConfigField = { name: 'taxMapInfo', label: 'tax config', readOnly: true };
        if (this.options.mode != 'view') {
            depMapConfigField = await this.fieldDropDownOptions(_cxSchema.cx_map_config_dep, {
                id: _cxSchema.cp_productAlias.DEPMAPCONFIGID, name: _cxSchema.cp_productAlias.DEPMAPCONFIGID, column: 1, width: '100%', dropDownSelectOptions: { mid: this.dataSource.depConfigId }
            });

            taxMapConfigField = await this.fieldDropDownOptions(_cxSchema.cx_map_config_tax, {
                id: _cxSchema.cp_productAlias.TAXMAPCONFIGID, name: _cxSchema.cp_productAlias.TAXMAPCONFIGID, column: 1, width: '100%', dropDownSelectOptions: { mid: this.dataSource.taxConfigId }
            });
        }


        
        //mainInfoGroup.fields.push({ name: 'fromProductId', hidden: true });
        mainInfoGroup.fields.push({
            group: 'main1', title: 'alias info', column: 1, columnCount: 1, fields: [
                {
                    group: 'main1.col1', column: 1, columnCount: 1, style: 'width: 100%; display: block;', fields: [
                        { name: 'fromProductId', hidden: true },
                        { name: _cxSchema.cp_productAlias.DEPCONFIGID, hidden: true },
                        { name: _cxSchema.cp_productAlias.TAXCONFIGID, hidden: true },
                        { name: _cxSchema.cp_productAlias.ITEMCODE, label: 'code', validation: mandatory },
                        { name: _cxSchema.cp_productAlias.ITEMDESCRIPTION, label: 'description', validation: mandatory },
                        { name: _cxSchema.cp_productAlias.ITEMBARCODE, label: 'barcode' },
                        { name: _cxSchema.cp_productAlias.ITEMCOSTPRICE, label: 'cost price' },
                        { name: _cxSchema.cp_productAlias.ITEMSIZE, label: 'size' },
                    ]
                }
            ]
        });
        //
        //
        mainInfoGroup.fields.push({
            group: 'main2', title: 'mapping info', column: 2, columnCount: 1, fields: [
                {
                    group: 'main2.col1', column: 1, columnCount: 1, fields: [
                        depMapConfigField,
                        taxMapConfigField,
                    ]
                }
            ]
        });
        //
        //
        mainInfoGroup.fields.push({
            group: 'audit', title: 'audit info', column: 3, columnCount: 1, fields: [
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
        });

        //
        //
        if (!this.dataSource.isNew()) {
            var associatedProducts = await this.getProductListOptions();
            this.options.fields.push({ group: 'products', title: 'associated products', column: 1, fields: [associatedProducts] });
        }
    }

    async _list() {
        this.options.paging = true;
        this.options.pageNo = (this.options.query) ? (this.options.query.page || 1) : 1;

        this.options.recordTitle = 'product alias';
        this.options.filters = [
            { id: 'cx_item_code', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'ic', label: 'item code' },
            { id: 'cx_item_descr', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'idesc', label: 'item description' },
            { id: 'cx_item_barcode', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'ibc', label: 'item barcode' },
            { id: 'cx_item_dep_cfg', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'dep', label: 'dep. config' },
        ];
        this.options.columns = [
            { name: 'aliasId', title: ' ', align: 'center' },
            { name: 'itemCode', title: 'item code' },
            { name: 'itemBarcode', title: 'item bar code' },
            { name: 'itemDescription', title: 'description' },
            { title: ' ', name: 'depMappedIcon', width: '10px', unbound: true },
            { name: 'depMapInfo', title: 'dep. config' },
            { title: ' ', name: 'taxMappedIcon', width: '10px', unbound: true },
            { name: 'taxMapInfo', title: 'tax config' },
            { name: 'itemCostPrice', title: 'cost price', align: 'right', width: '90px', formatMoney: 'N2', nullText: 'not set' },
            { name: 'modified', title: 'modified', align: 'center', width: '130px', nullText: 'never' },
            { name: 'modifiedBy', title: 'by', align: 'left', width: '130px', nullText: '' },
        ];

        this.options.cellHighlights = [];
        this.options.cellHighlights.push({
            column: _cxSchema.cp_productAlias.DEPMAPCONFIGID,
            columns: ['depMappedIcon'],
            customStyle: function (object, value, highlight) {
                if (value == null || value == '') {
                    return 'background-color: rgb(175,0,0); color: white; padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;';
                } else {
                    return 'background-color: rgb(0,125,0); color: white; padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;';
                }
            }
        });
        this.options.cellHighlights.push({
            column: _cxSchema.cp_productAlias.TAXMAPCONFIGID,
            columns: ['taxMappedIcon'],
            customStyle: function (object, value, highlight) {
                if (value == null || value == '') {
                    return 'background-color: rgb(175,0,0); color: white; padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;';
                } else {
                    return 'background-color: rgb(0,125,0); color: white; padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;';
                }
            }
        });
    }

    async dropDown(dropDownSelectionOptions) {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select an alias'; }
        if (this.options.label == undefined) { this.options.label = 'product alias'; }

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(dropDownSelectionOptions); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.aliasId,
                text: record.itemCode + ' - ' + record.itemDescription,
            });
        });
        this.options.items = dropDownItems;
    }


}


module.exports = CPProductAliasRender;

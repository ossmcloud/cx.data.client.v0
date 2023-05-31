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
        transactionLinesOptions.title = '<span>the products below are associated with this alias</span>';
        return transactionLinesOptions;
    }

    async _record() {
        if (this.dataSource.isNew()) {
            this.options.title = `[NEW] product alias`;
        } else {
            this.options.title = `[${this.dataSource.itemCode}] ${this.dataSource.itemDescription}`;
        }

        var mainInfoGroup = { group: 'main', title: '', columnCount: 3, styles: ['min-width: 500px; max-width: 750px', 'min-width: 250px', 'min-width: 250px'], fields: [] };        
        this.options.fields = [mainInfoGroup];

        mainInfoGroup.fields.push({
            group: 'main1', title: 'alias info', column: 1, columnCount: 1, fields: [
                {
                    group: 'main1.col1', column: 1, columnCount: 1, style:'width: 100%; display: block;', fields: [
                        { name: _cxSchema.cp_productAlias.ITEMCODE, label: 'code' },
                        { name: _cxSchema.cp_productAlias.ITEMDESCRIPTION, label: 'description' },
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
                        { name: 'depMapInfo', label: 'dep. config', readOnly: true },
                        { name: 'taxMapInfo', label: 'tax config', readOnly: true },
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
            { id: 'cx_item_descr', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'id', label: 'item description' },
            { id: 'cx_item_barcode', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'ibc', label: 'item barcode' },
            { id: 'cx_item_dep_cfg', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'dep', label: 'dep. config' },
        ];
        this.options.columns = [
            { name: 'aliasId', title: ' ', align: 'center' },
            { title: ' ', name: 'depMappedIcon', width: '10px', unbound: true },
            { name: 'itemCode', title: 'item code' },
            { name: 'itemBarcode', title: 'item bar code' },
            { name: 'itemDescription', title: 'description' },
            { name: 'depMapInfo', title: 'dep. config' },
            { name: 'itemCostPrice', title: 'cost price', align: 'right', width: '90px', formatMoney: 'N2', nullText: 'not set' },
            { name: 'modified', title: 'modified', align: 'center', width: '130px', nullText: 'never' },
            { name: 'modifiedBy', title: 'by', align: 'left', width: '130px', nullText: '' },
        ];
    }

}


module.exports = CPProductAliasRender;

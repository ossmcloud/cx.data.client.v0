'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPProductRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'retail product';
    }

    async _record() {

        this.options.title = `[${this.dataSource.itemCode}] ${this.dataSource.itemDescription}`;

        var aliasField = { name: 'aliasInfo', label: 'alias', readOnly: true };
        var depMapConfigField = { name: 'depMapInfo', label: 'dep. config', readOnly: true };
        var depMapGLinfoField = { name: 'glInfo', label: 'gl information', readOnly: true };
        var taxMapConfigField = { name: 'taxMapInfo', label: 'tax config', readOnly: true };
        var traderAccountField = { name: 'traderInfo', label: 'trader account', readOnly: true };

        if (this.options.mode != 'view') {
            depMapConfigField = await this.fieldDropDownOptions(_cxSchema.cx_map_config_dep, {
                id: _cxSchema.cp_product.DEPMAPCONFIGID, name: _cxSchema.cp_product.DEPMAPCONFIGID, column: 1, width: '100%', dropDownSelectOptions: { s: this.dataSource.shopId }
            });

            taxMapConfigField = await this.fieldDropDownOptions(_cxSchema.cx_map_config_tax, {
                id: _cxSchema.cp_product.TAXMAPCONFIGID, name: _cxSchema.cp_product.TAXMAPCONFIGID, column: 1, width: '100%', dropDownSelectOptions: { s: this.dataSource.shopId }
            });

            traderAccountField = await this.fieldDropDownOptions(_cxSchema.cx_traderAccount, {
                id: _cxSchema.cp_product.TRADERACCOUNTID, name: _cxSchema.cp_product.TRADERACCOUNTID, column: 1, width: '100%', dropDownSelectOptions: { s: this.dataSource.shopId }
            });

            aliasField = await this.fieldDropDownOptions(_cxSchema.cp_productAlias, {
                id: _cxSchema.cp_product.ALIASID, name: _cxSchema.cp_product.ALIASID, column: 1, width: '100%', dropDownSelectOptions: { s: this.dataSource.shopId }
            });
        }

        var mainInfoGroup = { group: 'main', title: '', columnCount: 4, styles: ['min-width: 500px', 'min-width: 250px', 'min-width: 350px', 'min-width: 250px'], fields: [] };
        this.options.fields = [mainInfoGroup];

        //
        //
        mainInfoGroup.fields.push({
            group: 'main1', title: 'product info', column: 1, columnCount: 2, fields: [
                {
                    group: 'main1.col1', column: 1, columnCount: 1, fields: [
                        { name: _cxSchema.cp_product.ITEMCODE, label: 'code' },
                        { name: _cxSchema.cp_product.ITEMDESCRIPTION, label: 'description' },
                        { name: _cxSchema.cp_product.ITEMBARCODE, label: 'barcode' },
                        { name: _cxSchema.cp_product.ITEMCOSTPRICE, label: 'cost price' },
                        { name: _cxSchema.cp_product.ITEMSIZE, label: 'size' },
                    ]
                },
                {
                    group: 'main1.col2', column: 2, columnCount: 1, fields: [
                        { name: _cxSchema.cp_product.SUPPLIERCODE, label: 'supplier' },
                        { name: _cxSchema.cp_product.SUPPLIERITEMCODE, label: 'supplier code' },
                        { name: _cxSchema.cp_product.SUPPLIERITEMDESCRIPTION, label: 'supplier description' },
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
                        aliasField,
                        depMapConfigField,
                        depMapGLinfoField,
                        taxMapConfigField,
                        traderAccountField,
                    ]
                }
            ]
        });
        //
        //
        mainInfoGroup.fields.push({
            group: 'main3', title: 'epos info', column: 3, columnCount: 2, fields: [
                {
                    group: 'main3.col1', column: 1, columnCount: 1, fields: [
                        { name: _cxSchema.cp_product.RAW_EPOSCODE, label: 'code', readOnly: true },
                        { name: _cxSchema.cp_product.RAW_EPOSDESCRIPTION, label: 'description', readOnly: true },
                        { name: _cxSchema.cp_product.RAW_EPOSBARCODE, label: 'barcode', readOnly: true },
                        { name: _cxSchema.cp_product.RAW_COSTPRICE, label: 'cost price', readOnly: true },
                        { name: _cxSchema.cp_product.RAW_ITEMSIZE, label: 'size', readOnly: true },
                    ]
                },
                {
                    group: 'main3.col2', column: 2, columnCount: 1, fields: [
                        { name: _cxSchema.cp_product.RAW_EPOSDEPARTMENT, label: 'department', readOnly: true },
                        { name: _cxSchema.cp_product.RAW_EPOSSUBDEPARTMENT, label: 'sub-department', readOnly: true },

                    ]
                }
            ]
        });
        //
        //
        mainInfoGroup.fields.push({
            group: 'audit', title: 'audit info', column: 4, columnCount: 1, fields: [
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

        if (this.options.mode == 'view') {
            if (this.dataSource.aliasId) {
                this.options.buttons.push({ id: 'cp_view_alias', text: 'View Alias', function: 'viewAlias' });
            }
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.SUPERVISOR) {
                if (this.dataSource.aliasId) {
                    this.options.buttons.push({ id: 'cp_detach_to_alias', text: 'Detach from Alias', function: 'detachFromAlias' });
                } else {
                    this.options.buttons.push({ id: 'cp_create_alias', text: 'Create Alias', function: 'createAlias' });
                    this.options.buttons.push({ id: 'cp_attach_to_alias', text: 'Attach to Alias', function: 'attachToAlias' });
                }
            }
        }

    }

    async _list() {
        this.options.paging = true;
        this.options.pageNo = (this.options.query) ? (this.options.query.page || 1) : 1;

        this.options.recordTitle = 'product';
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { id: 'cx_item_source', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'src', label: 'source', width: '130px' },
            { id: 'cx_item_code', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'ic', label: 'item code' },
            { id: 'cx_item_descr', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'id', label: 'item description' },
            { id: 'cx_item_barcode', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'ibc', label: 'item barcode' },
            { id: 'cx_item_supplier', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'sup', label: 'supplier' },
            { id: 'cx_item_dep_cfg', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'dep', label: 'dep. config' },
            { id: 'cx_item_map_status', inputType: _cxConst.RENDER.CTRL_TYPE.SELECT, fieldName: 'map', label: 'map status', lookUps: _cxConst.CP_PRODUCT.MAP_STATUS.toList() },
        ];

        var map = (this.options.query) ? parseInt(this.options.query.map || 0) : 0;

        if (map > 1) {
            this.options.columns = [
                { name: 'productId', title: ' ', align: 'center' },
                { name: 'shopInfo', title: 'store', width: '200px' },
                { name: 'depMappedIcon', title: ' ', width: '10px', unbound: true },
                { name: 'taxMappedIcon', title: ' ', width: '10px', unbound: true },
                { name: 'itemCode', title: 'item code' },
                { name: 'itemBarcode', title: 'item bar code' },
                { name: 'itemDescription', title: 'description' },
                { name: 'supplierCode', title: 'supplier' },
                { name: 'traderName', title: 'supplier name', nullText: '[supplier does not exist]' },
            ];

            this.options.lookupLists = { aliasInfoNull: await this.dataSource.cx.table(_cxSchema.cp_productAlias).toLookUpList(this.options.query.s) };

            if (map == _cxConst.CP_PRODUCT.MAP_STATUS.NOT_MAPPED_DEP) {
                this.options.columns.push({ name: 'depMapConfigId', title: 'department mapping', width: '500px', sortable: false, input: { type: _cxConst.RENDER.CTRL_TYPE.TEXT } });
                this.options.lookupLists.depMapConfigId = await this.dataSource.cx.table(_cxSchema.cx_map_config_dep).toLookupFullList(this.options.query.s);
            }
            if (map == _cxConst.CP_PRODUCT.MAP_STATUS.NOT_MAPPED_TAX) {
                this.options.columns.push({ name: 'taxMapConfigId', title: 'tax mapping', width: '300px', sortable: false, unbound: true, input: { type: _cxConst.RENDER.CTRL_TYPE.TEXT } });
                this.options.lookupLists.taxMapConfigId = await this.dataSource.cx.table(_cxSchema.cx_map_config_tax).toLookupFullList(this.options.query.s);
            }

            this.options.columns.push({ name: 'aliasId', title: 'alias', width: '350px', sortable: false, unbound: true, input: { type: _cxConst.RENDER.CTRL_TYPE.TEXT } });
            this.options.lookupLists.aliasId = await this.dataSource.cx.table(_cxSchema.cp_productAlias).toLookUpList(this.options.query.s);

        } else {
            this.options.columns = [
                { name: 'productId', title: ' ', align: 'center' },
                { name: 'shopInfo', title: 'store', width: '200px' },
                { name: 'depMappedIcon', title: ' ', width: '10px', unbound: true },
                { name: 'taxMappedIcon', title: ' ', width: '10px', unbound: true },
                { name: 'sourceId', title: 'source' },
                { name: 'itemCode', title: 'item code' },
                { name: 'itemBarcode', title: 'item bar code' },
                { name: 'itemDescription', title: 'description' },
                { name: 'depMapInfo', title: 'dep. config', addValues: [{ name: 'glInfo', style: 'border-top: 1px dotted rgb(97,97,97); color: gray;' }] },
                //{ name: 'supplierCode', title: 'supplier' },
                { name: 'supplierCode', title: 'supplier', nullText: '[supplier does not exist]', addValues: [{ name: 'traderName', style: 'border-top: 1px dotted rgb(97,97,97); color: gray;' }] },
                { name: 'itemCostPrice', title: 'cost price', align: 'right', width: '90px', formatMoney: 'N2' },
                { name: 'aliasInfo', title: 'alias', nullText: '[not set]', link: { url: '/cp/config/product-alias?id={alias}', valueField: 'aliasId', paramName: 'alias' } },
                { name: 'modified', title: 'modified', align: 'center', width: '130px' },
                { name: 'modifiedBy', title: 'by', align: 'left', width: '130px' },
            ];
        }
        this.options.cellHighlights = [];
        this.options.cellHighlights.push({
            column: _cxSchema.cp_product.DEPMAPCONFIGID,
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
            column: _cxSchema.cp_product.TAXMAPCONFIGID,
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

    async dropDown(options) {
        if (!options) { options = {}; }
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a product'; }
        if (this.options.label == undefined) { this.options.label = 'product'; }
        this.options.noPaging = true;

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(options); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record[options.valueField || _cxSchema.cp_product.PRODUCTID],
                text: '[' + record.itemCode + '] ' + record.itemDescription,
            });
        });
        this.options.items = dropDownItems;
    }

}

module.exports = CPProductRender;




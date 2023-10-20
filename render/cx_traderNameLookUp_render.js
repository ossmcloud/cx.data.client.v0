'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class ErpShopConfig extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        options.title = 'trader names lookup';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.cx_traderNameLookUp.TRADERNAMELOOKUPID] = null;
        this.autoLoadFields[_cxSchema.cx_traderNameLookUp.SHOPID] = null;
        this.autoLoadFields[_cxSchema.cx_traderNameLookUp.TRADERTYPE] = null;
        this.autoLoadFields[_cxSchema.cx_traderNameLookUp.TRADERCODE] = null;
        this.autoLoadFields[_cxSchema.cx_traderNameLookUp.TRADERNAME] = null;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.cx_traderNameLookUp.SHOPID) {
            column.name = 'shopInfo';
            column.title = 'store';
            column.addTotals = false;
            column.align = 'left';
            column.width = '100px';
        } else if (field.name == _cxSchema.cx_traderNameLookUp.TRADERTYPE) {
            column.title = 'type';
            column.align = 'centre';
            column.width = '30px';
        } else if (field.name == _cxSchema.cx_traderNameLookUp.TRADERCODE) {
            column.title = 'trader code';
            column.align = 'left';
        }
    }

    async initFilter(field, filter) {
        if (field.name == _cxSchema.cx_traderNameLookUp.SHOPID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 'shopId' });
            filter.hide = false;
        } else if (field.name == _cxSchema.cx_traderNameLookUp.TRADERCODE) {
            filter.hide = false;
        } else if (field.name == _cxSchema.cx_traderNameLookUp.TRADERTYPE) {
            filter.replace = {
                id: _cxSchema.cx_traderNameLookUp.TRADERTYPE, fieldName: _cxSchema.cx_traderNameLookUp.TRADERTYPE,
                inputType: _cxConst.RENDER.CTRL_TYPE.SELECT, label: 'trader type', width: '100px', items: _cxConst.CX_TRADER_TYPE.toList(true)
            }
            filter.hide = false;
        }
    }


    async _record() {
        this.options.fields = [];
        this.options.fields.push({ group: 'main', title: '', width: '300px', fields: [] });
        this.options.fields[0].fields.push(await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId', readOnly: !this.dataSource.isNew() }));
        this.options.fields[0].fields.push({ name: 'traderType', label: 'type', width: '100px', readOnly: !this.dataSource.isNew(), items: [{ value: '', text: '' }, { value: 'C', text: 'Customer' }, { value: 'S', text: 'Supplier' }], validation: '{ "mandatory": true }' });
        this.options.fields[0].fields.push({ name: 'traderCode', label: 'trader code', width: '250px', readOnly: !this.dataSource.isNew(), validation: '{ "mandatory": true }' });
        this.options.fields[0].fields.push({ name: 'traderName', label: 'trader name', validation: '{ "mandatory": true, "max": 2000 }' });
    }

    async _list() {
        var appendStyle = 'padding: 3px 5px 1px 5px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        this.options.cellHighlights = [];
        this.options.cellHighlights.push({
            column: _cxSchema.cx_traderNameLookUp.TRADERTYPE,
            columns: [_cxSchema.cx_traderNameLookUp.TRADERTYPE],
            op: '=',
            value: _cxConst.CX_TRADER_TYPE.CUSTOMER,
            style: 'background-color: green; color: white; ' + appendStyle,
        })
        this.options.cellHighlights.push({
            column: _cxSchema.cx_traderNameLookUp.TRADERTYPE,
            columns: [_cxSchema.cx_traderNameLookUp.TRADERTYPE],
            op: '=',
            value: _cxConst.CX_TRADER_TYPE.SUPPLIER,
            style: 'background-color: #1982c4; color: white; ' + appendStyle,
        })

        var applyStoreColorStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: auto; display: block; overflow: hidden; text-align: left;';
        var shopColors = await this.dataSource.cx.table(_cxSchema.cx_shop).selectColors();
        for (var cx = 0; cx < shopColors.length; cx++) {
            if (!shopColors[cx].shopColor) { continue; }
            this.options.cellHighlights.push({
                column: 'shopId', op: '=', value: shopColors[cx].shopId, style: 'background-color: rgba(' + shopColors[cx].shopColor + ', 0.5); ' + applyStoreColorStyle, columns: ['shopInfo']
            })
        }
    }

}

module.exports = ErpShopConfig;
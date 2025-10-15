'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CSStockValuationItemRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _list() {
        this.options.columns = [
            { title: ' ', name: 'productIcon', width: '10px', unbound: true },
            { name: _cxSchema.cs_stockValuationItem.EPOSCODE, title: 'item code', link: { url: '/cp/config/product?id={prod}', valueField: 'productId', paramName: 'prod' } },
            { name: _cxSchema.cs_stockValuationItem.EPOSBARCODE, title: 'item barcode' },
            { name: _cxSchema.cs_stockValuationItem.EPOSDESCRIPTION, title: 'item description' },
            { name: _cxSchema.cs_stockValuationItem.EPOSDEPARTMENT, title: 'department' },
            { name: _cxSchema.cs_stockValuationItem.EPOSSUBDEPARTMENT, title: 'sub department' },
            { name: _cxSchema.cs_stockValuationItem.COSTVALUE, title: 'cost value', align: 'right', width: '100px', formatMoney: 'N2', addTotals: true },
            { name: _cxSchema.cs_stockValuationItem.RETAILVALUE, title: 'cost value', align: 'right', width: '100px', formatMoney: 'N2', addTotals: true },

            { name: _cxSchema.cs_stockValuationItem.OUTERSINSTOCK, title: 'outer in stock', align: 'right', width: '100px', formatMoney: 'N2', addTotals: true },
            { name: _cxSchema.cs_stockValuationItem.UNITSINOUTER, title: 'units in outer', align: 'right', width: '100px', formatMoney: 'N2' },
            { name: _cxSchema.cs_stockValuationItem.UNITSINSTOCK, title: 'units in stock', align: 'right', width: '100px', formatMoney: 'N2', addTotals: true },
            { name: 'totalInStock', title: 'units in stock', align: 'right', width: '100px', formatMoney: 'N2', addTotals: true },
        ];
        

        this.options.cellHighlights.push({
            column: _cxSchema.cs_stockValuationItem.PRODUCTID,
            columns: ['productIcon'],
            customStyle: function (object, value, highlight) {
                if (value == null || value == '') {
                    return 'background-color: rgb(175,0,0); color: white; padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;';
                } else {
                    return 'background-color: rgb(0,125,0); color: white; padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;';
                }
            }

        });


    }


}

module.exports = CSStockValuationItemRender;
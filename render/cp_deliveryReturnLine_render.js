'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPDeliveryReturnLineRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _list() {
        this.options.columns = [
            { name: _cxSchema.cp_deliveryReturnLine.LINENUMBER, title: 'line', align: 'right', width: '30px', },
            { name: _cxSchema.cp_deliveryReturnLine.LINESTATUS, title: 'status', lookUps: _cxConst.CP_DOCUMENT_LINE.STATUS.toList(), width: '70px' },
            { title: ' ', name: 'productIcon', width: '10px', unbound: true },
            { name: _cxSchema.cp_deliveryReturnLine.EPOSCODE, title: 'item code', link: { url: '/cp/config/product?id={prod}', valueField: 'productId', paramName: 'prod' } },
            { name: _cxSchema.cp_deliveryReturnLine.EPOSBARCODE, title: 'item barcode' },
            { name: _cxSchema.cp_deliveryReturnLine.EPOSDESCRIPTION, title: 'item description' },
            { name: _cxSchema.cp_deliveryReturnLine.PACKSIZE, title: 'pack size', align: 'right', width: '60px' },
            { name: _cxSchema.cp_deliveryReturnLine.LINEQUANTITY, title: 'qty', align: 'right', width: '30px', addTotals: true },
            { name: _cxSchema.cp_deliveryReturnLine.UNITCOST, title: 'unit cost', align: 'right', width: '60px', formatMoney: 'N2' },
            { name: _cxSchema.cp_deliveryReturnLine.EPOSLINEDISCOUNT, title: 'discount', align: 'right', width: '90px', formatMoney: 'N2' },
            { name: _cxSchema.cp_deliveryReturnLine.LINENET, title: 'net', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true },
            { name: _cxSchema.cp_deliveryReturnLine.VATRATE, title: 'tax rate', align: 'left', width: '50px', formatPercent: true },
            { name: _cxSchema.cp_deliveryReturnLine.LINEVAT, title: 'tax', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true },
        ];

        if (this.cx.accountCountry == 'IE') {
            // DRS Scheme - only in Ireland
            var addValuesStyle = 'border-top: 1px dotted rgb(97,97,97); color: gray; font-size: 10px;';
            var addValuesStyleTitle = `<br /><span style="${addValuesStyle}">`;
            this.options.columns.push({
                name: 'lineDRSAmountDisplay',
                title: `drs amount${addValuesStyleTitle}qty * drs unit</span>`,
                align: 'right', width: '90px',
                formatMoney: 'N2', addTotals: true, nullText: '',
                addValues: [{ name: "lineDRSAmountInfo", style: addValuesStyle }]
            });
        }

        this.options.columns.push({ name: _cxSchema.cp_deliveryReturnLine.LINEGROSS, title: 'gross', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
       
        var highlightLineOperator = this.options.documentType == _cxConst.CP_DOCUMENT.TYPE.Return ? '>' : '<';
        this.options.highlights = [
            { column: _cxSchema.cp_deliveryReturnLine.LINEGROSS, op: '=', value: 0, style: 'color: green; font-style: italic;' },
            { column: _cxSchema.cp_deliveryReturnLine.LINEQUANTITY, op: '=', value: 0, style: 'color: rgb(75,75,75); font-style: italic;' },
            { column: _cxSchema.cp_deliveryReturnLine.LINEGROSS, op: highlightLineOperator, value: 0, style: 'color: red; font-style: italic;' },
        ];
        this.options.cellHighlights = [];
        this.options.cellHighlights.push({ column: _cxSchema.cp_deliveryReturnLine.VATRATE, op: '!=', value: '-', style: 'color: gray;', columns: [_cxSchema.cp_deliveryReturnLine.VATRATE] });
        this.options.cellHighlights.push({ column: _cxSchema.cp_deliveryReturnLine.EPOSLINEDISCOUNT, op: '=', value: 0, style: 'color: gray;', columns: [_cxSchema.cp_deliveryReturnLine.EPOSLINEDISCOUNT] });

        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        var statuses = _cxConst.CP_DOCUMENT_LINE.STATUS.toList();
        for (let sx = 0; sx < statuses.length; sx++) {
            const s = statuses[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.cp_deliveryReturnLine.LINESTATUS,
                op: '=',
                value: s.value,
                style: _cxConst.CP_DOCUMENT_LINE.STATUS.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.cp_deliveryReturnLine.LINESTATUS]
            })
        }

        this.options.cellHighlights.push({
            column: _cxSchema.cp_deliveryReturnLine.PRODUCTID,
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

module.exports = CPDeliveryReturnLineRender;
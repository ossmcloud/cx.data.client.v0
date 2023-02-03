'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPInvoiceReturnLineRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _list() {
        // if (this.options.query) {
        //     this.options.paging = true;
        //     this.options.pageNo = (this.options.query.page || 1);
        // }

        // this.options.filters = [
        //     { label: 'supplier', fieldName: 'su', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
        // ];
        
        this.options.columns = [
            //{ name: _cxSchema.cp_invoiceCreditLine.DELRETID, title: ' ', align: 'center', hidden: true },

            { name: _cxSchema.cp_invoiceCreditLine.LINENUMBER, title: 'line', align: 'right', width: '30px', },
            { name: _cxSchema.cp_invoiceCreditLine.LINESTATUS, title: 'status', lookUps: _cxConst.CP_DOCUMENT_LINE.STATUS.toList(), width: '70px' },
            { name: _cxSchema.cp_invoiceCreditLine.ITEMCODE, title: 'item code' },
            { name: _cxSchema.cp_invoiceCreditLine.ITEMBARCODE, title: 'item barcode' },
            { name: _cxSchema.cp_invoiceCreditLine.ITEMDESCRIPTION, title: 'item description' },
            { name: _cxSchema.cp_invoiceCreditLine.PACKSIZE, title: 'pack size', align: 'right', width: '60px' },
            { name: _cxSchema.cp_invoiceCreditLine.LINEQUANTITY, title: 'qty', align: 'right', width: '30px' },
            { name: _cxSchema.cp_invoiceCreditLine.UNITPRICE, title: 'unit cost', align: 'right', width: '60px', formatMoney: 'N2' },
            { name: _cxSchema.cp_invoiceCreditLine.LINEDISCOUNT, title: 'discount', align: 'right', width: '90px', formatMoney: 'N2' },
            { name: _cxSchema.cp_invoiceCreditLine.LINENET, title: 'net', align: 'right', width: '90px', formatMoney: 'N2' },
            { name: _cxSchema.cp_invoiceCreditLine.VATRATE, title: 'tax rate', align: 'left', width: '50px', formatPercent: true },
            { name: _cxSchema.cp_invoiceCreditLine.LINEVAT, title: 'tax', align: 'right', width: '90px', formatMoney: 'N2' },
            { name: _cxSchema.cp_invoiceCreditLine.LINEGROSS, title: 'gross', align: 'right', width: '90px', formatMoney: 'N2' },

            //{ name: 'created', title: 'created', align: 'center', width: '130px' },
        ];

        this.options.highlights = [
            { column: _cxSchema.cp_invoiceCreditLine.LINEGROSS, op: '=', value: 0, style: 'color: green; font-style: italic;' },
            { column: _cxSchema.cp_invoiceCreditLine.LINEQUANTITY, op: '=', value: 0, style: 'color: rgb(75,75,75); font-style: italic;' },
        ];


        this.options.cellHighlights = [];
        this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceCreditLine.VATRATE, op: '!=', value: '-', style: 'color: gray;', columns: [_cxSchema.cp_invoiceCreditLine.VATRATE] });
        this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceCreditLine.EPOSLINEDISCOUNT, op: '=', value: 0, style: 'color: gray;', columns: [_cxSchema.cp_invoiceCreditLine.EPOSLINEDISCOUNT] });

        var applyStyle = 'padding: 3px 7px 3px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        var statuses = _cxConst.CP_DOCUMENT_LINE.STATUS.toList();
        for (let sx = 0; sx < statuses.length; sx++) {
            const s = statuses[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.cp_invoiceCreditLine.LINESTATUS,
                op: '=',
                value: s.value,
                style: _cxConst.CP_DOCUMENT_LINE.STATUS.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.cp_invoiceCreditLine.LINESTATUS]
            })
        }

    }


}

module.exports = CPInvoiceReturnLineRender;
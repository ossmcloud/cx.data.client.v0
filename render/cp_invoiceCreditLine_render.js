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
        var textInput = null; var vatRetInputReadOnly = null; var numberInput = null; var moneyInput = null; var selectTaxInput = null; var selectDepInput = null; var moneyInputReadOnly = null; var prodInput = null;
        if (this.options.mode == 'edit' && !this.dataSource.forceReadOnly) {
            textInput = { type: _cxConst.RENDER.CTRL_TYPE.TEXT, inputStyle: 'min-width: 150px' };
            vatRetInputReadOnly = { type: _cxConst.RENDER.CTRL_TYPE.TEXT, readOnlyEx: true, inputStyle: 'text-align: right' };
            numberInput = { type: _cxConst.RENDER.CTRL_TYPE.NUMERIC, formatMoney: 'N0', inputStyle: 'width: 50px' };
            moneyInput = { type: _cxConst.RENDER.CTRL_TYPE.NUMERIC, formatMoney: 'N2', inputStyle: 'width: 50px' };
            moneyInputReadOnly = { type: _cxConst.RENDER.CTRL_TYPE.NUMERIC, formatMoney: 'N2', readOnlyEx: true, inputStyle: 'width: 50px' };
            selectTaxInput = { type: _cxConst.RENDER.CTRL_TYPE.SELECT, inputStyle: 'min-width: 150px' };
            selectDepInput = { type: _cxConst.RENDER.CTRL_TYPE.SELECT, inputStyle: 'min-width: 150px' };
            prodInput = { type: _cxConst.RENDER.CTRL_TYPE.NUMERIC, fieldName: _cxSchema.cp_invoiceCreditLine.PRODUCTID, hidden: true }

            this.options.listActions = true;
            this.options.rowTemplate = this.dataSource.createNew();

        }

        this.options.columns = [];
        //{ name: _cxSchema.cp_invoiceCreditLine.DELRETID, title: ' ', align: 'center', hidden: true },
        this.options.columns.push({ name: 'editedIcon', title: ' ', align: 'center', width: '10px' });
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.PRODUCTID, dataHidden: 'product-id' });
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.LINENUMBER, title: 'line', align: 'right', width: '30px', nullText: ''});
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.LINESTATUS + 'Msg', title: 'status', lookUps: _cxConst.CP_DOCUMENT_LINE.STATUS.toList(), width: '70px' });
        this.options.columns.push({ title: ' ', name: 'productIcon', width: '10px', unbound: true, input: prodInput });
        if (this.options.mode == 'edit' && !this.dataSource.forceReadOnly) {
            this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.ITEMCODE, title: 'item code', link: { onclick: 'changeLineItem', valueField: 'invCreLineId', paramName: 'line' } });
        } else {
            this.options.columns.push({ name: 'itemCodeDisplay', title: 'item code', link: { url: '/cp/config/product?id={prod}', valueField: 'productId', paramName: 'prod' } });
        }
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.ITEMBARCODE, title: 'item barcode' });
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.ITEMBARCODEOUTER, title: 'item barcode (outer)', nullText: '' });
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.ITEMDESCRIPTION, title: 'item description' });
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.PACKSIZE, title: 'pack size', align: 'right', width: '60px' });
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.LINEQUANTITY, title: 'qty', align: 'right', width: '30px', input: numberInput, addTotals: true });
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.UNITPRICE, title: 'unit cost', align: 'right', width: '60px', formatMoney: 'N2', input: moneyInput });
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.LINEDISCOUNT, title: 'discount', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true, input: moneyInput, nullText: '' });
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.LINENET, title: 'net', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
        
        if (this.options.mode == 'edit' && !this.dataSource.forceReadOnly) {
            this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.TAXMAPCONFIGID, title: 'tax', width: '50px', input: selectTaxInput });
        }

        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.VATRATE, title: 'tax rate', align: 'right', width: '50px', formatPercent: true, input: vatRetInputReadOnly });
        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.LINEVAT, title: 'tax', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });



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

        this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.LINEGROSS, title: 'gross', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });

        if (this.options.mode == 'edit' && !this.dataSource.forceReadOnly) {
            this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.DEPMAPCONFIGID, title: 'dep', width: '150px', input: selectDepInput });
        }
        if (this.options.mode == 'view' && this.dataSource.allowEditHeader) {
            this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.GLSEGMENT1, dataHidden: 'gl-code' });
            this.options.columns.push({ name: 'glSegment1Edit', title: 'GL Code' });
        } else {
            if (this.options.mode == 'view') {
                this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.GLSEGMENT1, title: 'GL Code', data: 'gl-code' });
            }
        }
        if (this.options.mode == 'view') {
            this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.GLSEGMENT2, title: 'GL Code 2', data: 'gl-code-2' });
            if (this.options.showGlSegment3) {
                this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.GLSEGMENT3, title: 'GL Code 3', data: 'gl-code-3' });
            }
            this.options.columns.push({ name: _cxSchema.cp_invoiceCreditLine.GLTAXCODE, dataHidden: 'gl-tax' });
        }



        this.options.highlights = [
            { column: _cxSchema.cp_invoiceCreditLine.LINEGROSS, op: '=', value: 0, style: 'color: green; font-style: italic;' },
            { column: _cxSchema.cp_invoiceCreditLine.LINEQUANTITY, op: '=', value: 0, style: 'color: rgb(75,75,75); font-style: italic;' },
        ];


        this.options.cellHighlights = [];
        this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceCreditLine.VATRATE, op: '!=', value: '-', style: 'color: gray;', columns: [_cxSchema.cp_invoiceCreditLine.VATRATE] });
        this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceCreditLine.EPOSLINEDISCOUNT, op: '=', value: 0, style: 'color: gray;', columns: [_cxSchema.cp_invoiceCreditLine.EPOSLINEDISCOUNT] });

        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        var statuses = _cxConst.CP_DOCUMENT_LINE.STATUS.toList();
        for (let sx = 0; sx < statuses.length; sx++) {
            const s = statuses[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.cp_invoiceCreditLine.LINESTATUS,
                op: '=',
                value: s.value,
                style: _cxConst.CP_DOCUMENT_LINE.STATUS.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.cp_invoiceCreditLine.LINESTATUS + 'Msg']
            })
        }

        this.options.cellHighlights.push({
            column: _cxSchema.cp_invoiceCreditLine.DEPMAPCONFIGID,
            op: '=',
            value: null,
            style: 'background-color: rgb(175,0,0); ' + applyStyle,
            columns: [_cxSchema.cp_invoiceCreditLine.LINESTATUS + 'Msg']
        });

        this.options.cellHighlights.push({
            column: _cxSchema.cp_invoiceCreditLine.PRODUCTID,
            // op: '=',
            // value: null,
            // style: 'background-color: rgb(230,0,0); ' + applyStyle,
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

module.exports = CPInvoiceReturnLineRender;
'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPErpTransactionTaxRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _list() {
        var textInput = null;
        var numberInput = null;
        if (this.options.mode == 'edit') {
            textInput = { type: _cxConst.RENDER.CTRL_TYPE.TEXT };
            numberInput = { type: _cxConst.RENDER.CTRL_TYPE.NUMERIC };
            // this.options.actionsTitle = '<span style="display: none; cursor: pointer;" title="show deleted lines" id="' + this.options.id + '_undo_delete_line">&#8634;</span>';
            // this.options.actions = [{ label: '&#128465;', toolTip: 'delete', funcName: 'deleteLine' }];
            this.options.listActions = true;
        }

        this.options.columns = [
            { name: _cxSchema.cp_erp_transaction_tax.STATUSMESSAGE, title: 'status', align: 'center', width: '90px', style: 'white-space: normal;' },
            { name: _cxSchema.cp_erp_transaction_tax.TAXACCOUNT, title: 'Tax', width: '50px', input: textInput },
            { name: _cxSchema.cp_erp_transaction_tax.TAXRATE, title: 'Rate', align: 'right', width: '50px', formatMoney: true },
            { name: _cxSchema.cp_erp_transaction_tax.TAXDESCRIPTION, title: 'Description', },
            { name: _cxSchema.cp_erp_transaction_tax.NARRATIVE, title: 'Narrative', nullText: '', input: textInput },
            { name: _cxSchema.cp_erp_transaction_tax.VALUENET, title: 'Net', align: 'right', width: '90px', formatMoney: true, addTotals: true, input: numberInput },
            { name: _cxSchema.cp_erp_transaction_tax.VALUETAX, title: 'Vat', align: 'right', width: '90px', formatMoney: true, addTotals: true, input: numberInput },
            { name: _cxSchema.cp_erp_transaction_tax.VALUEGROSS, title: 'Gross', align: 'right', width: '90px', formatMoney: true, addTotals: true },
            
        ];

        this.options.cellHighlights = [];
        var applyStyle = 'padding: 3px 7px 3px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        var getCellHighlight = function (status) {
            return {
                column: _cxSchema.cp_erp_transaction_gl.STATUS,
                op: '=',
                value: status,
                style: _cxConst.ERP_TRAN_STATUS.getStyleInverted(status) + applyStyle,
                columns: [_cxSchema.cp_erp_transaction_gl.STATUSMESSAGE]
            }
        }
        this.options.cellHighlights.push(getCellHighlight(_cxConst.ERP_TRAN_STATUS.Ready));
        this.options.cellHighlights.push(getCellHighlight(_cxConst.ERP_TRAN_STATUS.Posted));
        this.options.cellHighlights.push(getCellHighlight(_cxConst.ERP_TRAN_STATUS.Error));
    }


}

module.exports = CPErpTransactionTaxRender;
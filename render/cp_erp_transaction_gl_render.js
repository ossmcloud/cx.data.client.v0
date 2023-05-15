'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPErpTransactionGLRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _list() {

        var textInput = null; var textInputReadOnly = null; var numberInput = null;
        if (this.options.mode == 'edit') {
            textInput = { type: _cxConst.RENDER.CTRL_TYPE.TEXT };
            textInputReadOnly = { type: _cxConst.RENDER.CTRL_TYPE.TEXT, readOnlyEx: true };
            numberInput = { type: _cxConst.RENDER.CTRL_TYPE.NUMERIC, formatMoney: true };

            this.options.listActions = true;
            this.options.rowTemplate = this.dataSource.createNew();

        }

        this.options.columns = [
            { name: 'editedIcon', title: ' ', align: 'center', width: '10px' },
            { name: _cxSchema.cp_erp_transaction_gl.STATUSMESSAGE, title: 'status', align: 'center', width: '90px', style: 'white-space: normal;' },
            { name: _cxSchema.cp_erp_transaction_gl.GLACCOUNTSEG1, title: 'GL Code', width: '70px', input: textInput },
            { name: _cxSchema.cp_erp_transaction_gl.GLACCOUNTSEG2, title: 'GL Seg 2', width: '70px', input: textInputReadOnly },
            //{ name: _cxSchema.cp_erp_transaction_gl.GLACCOUNTSEG3, title: 'GL Seg 3', width: '70px', input: textInput },
            { name: _cxSchema.cp_erp_transaction_gl.GLACCOUNTDESCRIPTION, title: 'GL Description', input: textInputReadOnly },
            { name: _cxSchema.cp_erp_transaction_gl.NARRATIVE, title: 'Narrative', nullText: '', input: textInput },
            { name: _cxSchema.cp_erp_transaction_gl.VALUENET, title: 'Net', align: 'right', width: '90px', formatMoney: true, addTotals: true, input: numberInput },
            { name: _cxSchema.cp_erp_transaction_gl.VALUETAX, title: 'Vat', align: 'right', width: '90px', formatMoney: true, addTotals: true, input: numberInput },
            { name: _cxSchema.cp_erp_transaction_gl.VALUEGROSS, title: 'Gross', align: 'right', width: '90px', formatMoney: true, addTotals: true },

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

module.exports = CPErpTransactionGLRender;
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
        this.options.columns = [
            { name: _cxSchema.cp_erp_transaction_tax.STATUSMESSAGE, title: 'status', align: 'center', width: '90px', style: 'white-space: normal;' },
            { name: _cxSchema.cp_erp_transaction_tax.TAXACCOUNT, title: 'Tax', width: '50px', },
            { name: _cxSchema.cp_erp_transaction_tax.TAXRATE, title: 'Rate', align: 'right', width: '50px', formatMoney: true },
            { name: _cxSchema.cp_erp_transaction_tax.TAXDESCRIPTION, title: 'Description', },
            { name: _cxSchema.cp_erp_transaction_tax.NARRATIVE, title: 'Narrative', nullText: '' },
            { name: _cxSchema.cp_erp_transaction_tax.VALUENET, title: 'Net', align: 'right', width: '90px', formatMoney: true, addTotals: true },
            { name: _cxSchema.cp_erp_transaction_tax.VALUETAX, title: 'Vat', align: 'right', width: '90px', formatMoney: true, addTotals: true },
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
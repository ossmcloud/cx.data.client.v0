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
        // var shopId = await this.dataSource.cx.table(_cxSchema.cp_erp_transaction).lookUp(this.dataSource.erpTranId, _cxSchema.cp_erp_transaction.SHOPID);
        // var erpShopSett = await this.dataSource.cx.table(_cxSchema.erp_shop_setting).fetch(shopId);

        var textInput = null; var textInputReadOnly = null; var numberInput = null;
        if (this.options.mode == 'edit' && !this.dataSource.forceReadOnly) {
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
        ];

        if (this.options.mergeGLAndTax) {
            this.options.columns.push({ name: _cxSchema.cp_erp_transaction_tax.TAXACCOUNT, title: 'Tax', width: '50px', input: textInput });
            this.options.columns.push({ name: _cxSchema.cp_erp_transaction_tax.TAXRATE, title: 'Rate', align: 'right', width: '50px', formatMoney: true, input: textInputReadOnly });
            this.options.columns.push({ name: _cxSchema.cp_erp_transaction_tax.TAXDESCRIPTION, title: 'Description', input: textInputReadOnly });
        }

        
        var signedPostfix = (this.options.editMode) ? '' : 'Signed';

        this.options.columns.push({ name: _cxSchema.cp_erp_transaction_gl.NARRATIVE, title: 'Narrative', nullText: '', input: textInput });
        this.options.columns.push({ name: _cxSchema.cp_erp_transaction_gl.VALUENET + signedPostfix, title: 'Net', align: 'right', width: '90px', formatMoney: true, addTotals: true, input: numberInput });
        this.options.columns.push({ name: _cxSchema.cp_erp_transaction_gl.VALUETAX + signedPostfix, title: 'Vat', align: 'right', width: '90px', formatMoney: true, addTotals: true, input: numberInput });
        this.options.columns.push({ name: _cxSchema.cp_erp_transaction_gl.VALUEGROSS + signedPostfix, title: 'Gross', align: 'right', width: '90px', formatMoney: true, addTotals: true });

        this.options.columns.push({ name: 'filterItemsIcon', title: '<span class="icon_filter_lines_clear" title="clear filtered items">&#x1F5D9;</span>', sortable: false, align: 'center', width: '10px' });


        this.options.cellHighlights = [];
        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
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

        this.options.cellHighlights.push({
            column: _cxSchema.cp_erp_transaction_gl.VALUEGROSS + signedPostfix,
            op: '<',
            value: 0,
            style: 'color: rgb(230,0,0);',
            columns: [
                _cxSchema.cp_erp_transaction_gl.VALUENET + signedPostfix,
                _cxSchema.cp_erp_transaction_gl.VALUETAX + signedPostfix,
                _cxSchema.cp_erp_transaction_gl.VALUEGROSS + signedPostfix
            ]
        });
    }
}

module.exports = CPErpTransactionGLRender;
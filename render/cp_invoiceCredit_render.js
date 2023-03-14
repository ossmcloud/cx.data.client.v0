'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPInvoiceReturnRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        if (!options.path) { options.path = '../cp/invoice'; }
        if (!options.listPath) { options.listPath = '../cp/invoices'; }
    }

    async getDocumentLineListOptions() {
        var transactionLines = this.dataSource.cx.table(_cxSchema.cp_invoiceCreditLine);
        await transactionLines.select({ pid: this.options.query.id });

        var transactionLinesOptions = await this.listOptions(transactionLines, { listView: true });
        transactionLinesOptions.quickSearch = true;
        return transactionLinesOptions;
    }

    async getDocumentLogListOptions() {
        var transactionLogs = this.dataSource.cx.table(_cxSchema.cp_invoiceCreditLog);
        await transactionLogs.select({ pid: this.options.query.id });

        var transactionLogsOptions = await this.listOptions(transactionLogs, { listView: true });
        transactionLogsOptions.quickSearch = true;
        return transactionLogsOptions;
    }


    async _record() {
        this.options.title = `${this.dataSource.documentTypeName.toUpperCase()} [${this.dataSource.documentId}]`;

        this.options.fields = [
            {
                group: 'main', title: '', columnCount: 4, fields: [
                    {
                        group: 'main1', title: 'main info', column: 1, columnCount: 3, fields: [
                            {
                                group: 'main1.col1', column: 1, columnCount: 1, fields: [
                                    await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId' }),
                                    { name: _cxSchema.cp_invoiceCredit.DOCUMENTTYPE + 'Name', label: 'document type' },
                                    { name: _cxSchema.cp_invoiceCredit.DOCUMENTID, label: 'document id' },
                                ]
                            },
                            {
                                group: 'main1.col2', column: 2, columnCount: 1, fields: [
                                    { name: _cxSchema.cp_invoiceCredit.SUPPLIERCODE, label: 'supplier' },
                                    { name: _cxSchema.cp_invoiceCredit.DOCUMENTDATE, label: 'date' },
                                    { name: _cxSchema.cp_invoiceCredit.UPLOADDATE, label: 'upload date' },
                                ]
                            },
                            {
                                group: 'main1.col3', column: 3, columnCount: 1, fields: [
                                    { name: _cxSchema.cp_invoiceCredit.CURRENCY, label: 'currency' },
                                    { name: _cxSchema.cp_invoiceCredit.DOCUMENTNUMBER, label: 'document number' },
                                ]
                            },
                        ]
                    },

                    {
                        group: 'main_ref', title: 'document references', column: 2, columnCount: 1, fields: [
                            { name: _cxSchema.cp_invoiceCredit.DOCUMENTREFERENCE, label: 'reference 1' },
                            { name: _cxSchema.cp_invoiceCredit.DOCUMENTSECONDREFERENCE, label: 'reference 2' },
                            { name: _cxSchema.cp_invoiceCredit.DOCUMENTMEMO, label: 'memo' },

                        ]
                    },

                    {
                        group: 'totals', title: 'totals', column: 3, columnCount: 2, inline: true, width: '300px', fields: [
                            { name: _cxSchema.cp_invoiceCredit.TOTALNET, label: 'total net', formatMoney: 'N2' },
                            { name: _cxSchema.cp_invoiceCredit.TOTALDISCOUNT, label: 'discount', column: 2, formatMoney: 'N2' },
                            { name: _cxSchema.cp_invoiceCredit.TOTALVAT, label: 'total vat', formatMoney: 'N2' },
                            { name: _cxSchema.cp_invoiceCredit.TOTALGROSS, label: 'total gross', formatMoney: 'N2' },
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 4, columnCount: 1, fields: [
                            {
                                group: 'audit0', title: '', column: 1, columnCount: 2, inline: true, fields: [
                                    { name: _cxSchema.cp_invoiceCredit.DOCUMENTSTATUS, label: 'status', column: 1, readOnly: true, lookUps: _cxConst.CP_DOCUMENT.STATUS.toList() },
                                    { name: _cxSchema.cp_invoiceCredit.DOCUMENTSTATUSMESSAGE, label: 'status message', column: 2, readOnly: true },
                                ]
                            },
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
                    }
                ],
            },

        ]

        var subListsGroup = { group: 'sublists', columnCount: 2, fields: [] };
        this.options.fields.push(subListsGroup);

        var transactionLineOptions = await this.getDocumentLineListOptions();
        subListsGroup.fields.push({ group: 'lines', title: 'document lines', column: 1, fields: [transactionLineOptions] })

        if (this.options.query.viewLogs == 'T') {
            var transactionLogOptions = await this.getDocumentLogListOptions();
            subListsGroup.fields.push({ group: 'logs', title: 'document logs', column: 2, width: '600px', fields: [transactionLogOptions], collapsed: true });
        }

        if (this.options.mode == 'view') {
            var buttonLabel = (this.options.query.viewLogs == 'T') ? 'Hide Logs' : 'Show Logs';
            this.options.buttons.push({ id: 'cp_view_logs', text: buttonLabel, function: 'viewLogs' });
        }
    }

    async _list() {
        try {
            if (this.options.query) {
                this.options.paging = true;
                this.options.pageNo = (this.options.query.page || 1);
            }

            

            this.options.filters = [
                await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
                { label: 'type', fieldName: 'tt', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.TYPE_IC.toList('- all -') },
                { label: 'status', fieldName: 'st', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.STATUS.toList('- all -') },
                { label: 'supplier', fieldName: 'su', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
                { label: 'document no.', fieldName: 'tno', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
                { label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE },
                { label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
                { label: 'upload date (from)', fieldName: 'udf', type: _cxConst.RENDER.CTRL_TYPE.DATE },
                { label: 'upload date (to)', fieldName: 'udt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            ];
            var signedCols = {
                Net: _cxSchema.cp_invoiceCredit.TOTALNET + 'Sign',
                Vat: _cxSchema.cp_invoiceCredit.TOTALVAT + 'Sign',
                Gross: _cxSchema.cp_invoiceCredit.TOTALGROSS + 'Sign',
                Discount: _cxSchema.cp_invoiceCredit.TOTALDISCOUNT + 'Sign',
            }
            this.options.columns = [
                { name: _cxSchema.cp_invoiceCredit.INVCREID, title: ' ', align: 'center' },

                { name: 'shopInfo', title: 'store', width: '200px' },
                { name: 'status', title: 'status', align: 'center', width: '70px' },
                { name: _cxSchema.cp_invoiceCredit.DOCUMENTTYPE, title: 'type', align: 'center', width: '70px', lookUps: _cxConst.CP_DOCUMENT.TYPE.toList() },
                { name: _cxSchema.cp_invoiceCredit.DOCUMENTDATE, title: 'date', align: 'center', width: '100px' },
                { name: _cxSchema.cp_invoiceCredit.SUPPLIERCODE, title: 'supplier' },
                { name: _cxSchema.cp_invoiceCredit.DOCUMENTNUMBER, title: 'document number' },
                { name: _cxSchema.cp_invoiceCredit.DOCUMENTREFERENCE, title: 'document reference' },

                { name: signedCols.Discount, title: 'discount', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true },
                { name: signedCols.Net, title: 'net', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true },
                { name: signedCols.Vat, title: 'tax', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true },
                { name: signedCols.Gross, title: 'gross', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true },

                { name: _cxSchema.cp_invoiceCredit.UPLOADDATE, title: 'upload date', align: 'center', width: '100px' },
                { name: _cxSchema.cp_invoiceCredit.CREATED, title: 'created', align: 'center', width: '130px' },
            ];

            this.options.cellHighlights = [];
            this.options.cellHighlights.push({ column: signedCols.Discount, op: '=', value: '0', style: 'color: gray;', columns: [signedCols.Discount] });
            this.options.cellHighlights.push({ column: signedCols.Vat, op: '=', value: '0', style: 'color: gray;', columns: [signedCols.Vat] });
            this.options.cellHighlights.push({ column: signedCols.Net, op: '<', value: '0', style: 'color: red;', columns: [signedCols.Net] });
            this.options.cellHighlights.push({ column: signedCols.Vat, op: '<', value: '0', style: 'color: red;', columns: [signedCols.Vat] });
            this.options.cellHighlights.push({ column: signedCols.Gross, op: '<', value: '0', style: 'color: red;', columns: [signedCols.Gross] });
            this.options.cellHighlights.push({ column: signedCols.Discount, op: '<', value: '0', style: 'color: red;', columns: [signedCols.Discount] });

            var applyStyle = 'padding: 3px 7px 3px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
            var statuses = _cxConst.CP_DOCUMENT.STATUS.toList();
            for (let sx = 0; sx < statuses.length; sx++) {
                const s = statuses[sx];
                this.options.cellHighlights.push({
                    column: _cxSchema.cp_invoiceCredit.DOCUMENTSTATUS,
                    op: '=',
                    value: s.value,
                    style: _cxConst.CP_DOCUMENT.STATUS.getStyleInverted(s.value) + applyStyle,
                    columns: ['status']
                })
            }

            var types = _cxConst.CP_DOCUMENT.TYPE.toList();
            for (let sx = 0; sx < types.length; sx++) {
                const s = types[sx];
                this.options.cellHighlights.push({
                    column: _cxSchema.cp_invoiceCredit.DOCUMENTTYPE,
                    op: '=',
                    value: s.value,
                    style: _cxConst.CP_DOCUMENT.TYPE.getStyleInverted(s.value) + applyStyle,
                    columns: [_cxSchema.cp_invoiceCredit.DOCUMENTTYPE]
                })
            }

            var applyStoreColorStyle = 'padding: 3px 7px 3px 7px; border-radius: 5px; width: auto; display: block; overflow: hidden; text-align: left;';
            var shopColors = await this.dataSource.cx.table(_cxSchema.cx_shop).selectColors();
            for (var cx = 0; cx < shopColors.length; cx++) {
                if (!shopColors[cx].shopColor) { continue; }
                this.options.cellHighlights.push({
                    column: 'shopId', op: '=', value: shopColors[cx].shopId, style: 'background-color: rgba(' + shopColors[cx].shopColor + ', 0.5); ' + applyStoreColorStyle, columns: ['shopInfo']
                })
            }



        } catch (error) {
            throw error;
        }

    }


}

module.exports = CPInvoiceReturnRender;
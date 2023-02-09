'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPInvoiceGroupRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async getDocumentListOptions() {
        var transactions = this.dataSource.cx.table(_cxSchema.cp_invoiceCredit);
        await transactions.select({ gid: this.options.query.id });

        var transactionsOptions = await this.listOptions(transactions, { listView: true });
        transactionsOptions.quickSearch = true;
        return transactionsOptions;
    }

    async getDocumentLogListOptions() {
        var transactionLogs = this.dataSource.cx.table(_cxSchema.cp_invoiceGroupLog);
        await transactionLogs.select({ pid: this.options.query.id });

        var transactionLogsOptions = await this.listOptions(transactionLogs, { listView: true });
        transactionLogsOptions.quickSearch = true;
        return transactionLogsOptions;
    }


    async _record() {
        this.options.title = `${this.dataSource.documentTypeName.toUpperCase()} GROUP [${this.dataSource.documentNumber}]`;

        this.options.fields = [
            {
                group: 'main', title: '', columnCount: 4, fields: [
                    {
                        group: 'main1', title: 'main info', column: 1, columnCount: 3, fields: [
                            {
                                group: 'main1.col1', column: 1, columnCount: 1, fields: [
                                    await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId' }),
                                    { name: _cxSchema.cp_invoiceGroup.DOCUMENTTYPE + 'Name', label: 'document type' },
                                ]
                            },
                            {
                                group: 'main1.col2', column: 2, columnCount: 1, fields: [
                                    { name: _cxSchema.cp_invoiceGroup.SUPPLIERCODE, label: 'supplier' },
                                    { name: _cxSchema.cp_invoiceGroup.DOCUMENTDATE, label: 'date' },
                                ]
                            },
                            {
                                group: 'main1.col3', column: 3, columnCount: 1, fields: [
                                    { name: _cxSchema.cp_invoiceGroup.CURRENCY, label: 'currency' },
                                    { name: _cxSchema.cp_invoiceGroup.DOCUMENTNUMBER, label: 'document number' },
                                ]
                            },
                        ]
                    },

                    {
                        group: 'main_ref', title: 'document references', column: 2, columnCount: 1, fields: [
                            { name: _cxSchema.cp_invoiceGroup.DOCUMENTREFERENCE, label: 'reference 1' },
                            { name: _cxSchema.cp_invoiceGroup.DOCUMENTSECONDREFERENCE, label: 'reference 2' },
                            { name: _cxSchema.cp_invoiceGroup.DOCUMENTMEMO, label: 'memo' },

                        ]
                    },

                    {
                        group: 'totals', title: 'totals', column: 3, columnCount: 2, inline: true, width: '300px', fields: [
                            { name: _cxSchema.cp_invoiceGroup.TOTALNET, label: 'total net', formatMoney: 'N2' },
                            { name: _cxSchema.cp_invoiceGroup.TOTALDISCOUNT, label: 'discount', column: 2, formatMoney: 'N2' },
                            { name: _cxSchema.cp_invoiceGroup.TOTALVAT, label: 'total vat', formatMoney: 'N2' },
                            { name: _cxSchema.cp_invoiceGroup.TOTALGROSS, label: 'total gross', formatMoney: 'N2' },
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 4, columnCount: 1, fields: [
                            {
                                group: 'audit0', title: '', column: 1, columnCount: 2, inline: true, fields: [
                                    { name: _cxSchema.cp_invoiceGroup.DOCUMENTSTATUS, label: 'status', column: 1, readOnly: true, lookUps: _cxConst.CP_DOCUMENT.STATUS.toList() },
                                    { name: _cxSchema.cp_invoiceGroup.DOCUMENTSTATUSMESSAGE, label: 'status message', column: 2, readOnly: true },
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

        var transactionOptions = await this.getDocumentListOptions();
        subListsGroup.fields.push({ group: 'lines', title: 'documents', column: 1, fields: [transactionOptions] })

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
                //{ label: 'supplier', fieldName: 'su', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
                { label: 'document no.', fieldName: 'tno', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
                { label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE },
                { label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            ];
            if (this.options.query.imp == 'true') {
                this.options.title = 'epos imported group invoices';
                this.options.filters.push({ label: 'created date (from)', fieldName: 'udf', type: _cxConst.RENDER.CTRL_TYPE.DATE });
                this.options.filters.push({ label: 'created date (to)', fieldName: 'udt', type: _cxConst.RENDER.CTRL_TYPE.DATE });
            }
            this.options.filters.push({ label: 'imported only', fieldName: 'imp', type: _cxConst.RENDER.CTRL_TYPE.CHECK, hidden: true });

            this.options.columns = [
                { name: _cxSchema.cp_invoiceGroup.INVGRPID, title: ' ', align: 'center' },

                { name: 'shopInfo', title: 'store', width: '200px' },
                { name: _cxSchema.cp_invoiceGroup.DOCUMENTSTATUS, title: 'status', align: 'center', width: '70px', lookUps: _cxConst.CP_DOCUMENT.STATUS.toList() },
                { name: _cxSchema.cp_invoiceGroup.DOCUMENTTYPE, title: 'type', align: 'center', width: '70px', lookUps: _cxConst.CP_DOCUMENT.TYPE.toList() },
                { name: _cxSchema.cp_invoiceGroup.DOCUMENTDATE, title: 'date', align: 'center', width: '100px' },
                { name: 'wholesalerInfo', title: 'wholesaler' },
                { name: _cxSchema.cp_invoiceGroup.DOCUMENTNUMBER, title: 'document number' },
                { name: _cxSchema.cp_invoiceGroup.DOCUMENTREFERENCE, title: 'document reference' },

                { name: _cxSchema.cp_invoiceGroup.TOTALDISCOUNT, title: 'discount', align: 'right', width: '90px', formatMoney: 'N2' },
                { name: _cxSchema.cp_invoiceGroup.TOTALNET, title: 'net', align: 'right', width: '90px', formatMoney: 'N2' },
                { name: _cxSchema.cp_invoiceGroup.TOTALVAT, title: 'tax', align: 'right', width: '90px', formatMoney: 'N2' },
                { name: _cxSchema.cp_invoiceGroup.TOTALGROSS, title: 'gross', align: 'right', width: '90px', formatMoney: 'N2' },

                { name: _cxSchema.cp_invoiceGroup.CREATED, title: 'created', align: 'center', width: '130px' },
                { name: 'importedFile', title: 'from file' },
                
            ];

            this.options.cellHighlights = [];
            this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceGroup.TOTALDISCOUNT, op: '=', value: '0', style: 'color: gray;', columns: [_cxSchema.cp_invoiceGroup.TOTALDISCOUNT] });
            this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceGroup.TOTALSURCHARGE, op: '=', value: '0', style: 'color: gray;', columns: [_cxSchema.cp_invoiceGroup.TOTALSURCHARGE] });
            this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceGroup.TOTALVAT, op: '=', value: '0', style: 'color: gray;', columns: [_cxSchema.cp_invoiceGroup.TOTALVAT] });
            this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceGroup.TOTALVAT, op: '<', value: '0', style: 'color: red;', columns: [_cxSchema.cp_invoiceGroup.TOTALVAT] });
            this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceGroup.TOTALNET, op: '<', value: '0', style: 'color: red;', columns: [_cxSchema.cp_invoiceGroup.TOTALNET] });
            this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceGroup.TOTALGROSS, op: '<', value: '0', style: 'color: red;', columns: [_cxSchema.cp_invoiceGroup.TOTALGROSS] });

            var applyStyle = 'padding: 3px 7px 3px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
            var statuses = _cxConst.CP_DOCUMENT.STATUS.toList();
            for (let sx = 0; sx < statuses.length; sx++) {
                const s = statuses[sx];
                this.options.cellHighlights.push({
                    column: _cxSchema.cp_invoiceGroup.DOCUMENTSTATUS,
                    op: '=',
                    value: s.value,
                    style: _cxConst.CP_DOCUMENT.STATUS.getStyleInverted(s.value) + applyStyle,
                    columns: [_cxSchema.cp_invoiceGroup.DOCUMENTSTATUS]
                })
            }

            var types = _cxConst.CP_DOCUMENT.TYPE.toList();
            for (let sx = 0; sx < types.length; sx++) {
                const s = types[sx];
                this.options.cellHighlights.push({
                    column: _cxSchema.cp_invoiceGroup.DOCUMENTTYPE,
                    op: '=',
                    value: s.value,
                    style: _cxConst.CP_DOCUMENT.TYPE.getStyleInverted(s.value) + applyStyle,
                    columns: [_cxSchema.cp_invoiceGroup.DOCUMENTTYPE]
                })
            }




        } catch (error) {
            throw error;
        }

    }


}

module.exports = CPInvoiceGroupRender;
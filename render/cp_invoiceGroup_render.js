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

        var transactionsOptions = await this.listOptions(transactions, { listView: true, linkTarget: '_blank' });
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

    async getErpGLListOptions(erpSett) {
        var transactionLines = this.dataSource.cx.table(_cxSchema.cp_erp_transaction_gl);
        await transactionLines.select({ invGrpId: this.options.query.id });

        transactionLines.forceReadOnly = true;

        var transactionLinesOptions = await this.listOptions(transactionLines, { listView: true, mode: 'view', id: 'glItems', query: this.options.query, mergeGLAndTax: erpSett.mergeGLAndTax });
        transactionLinesOptions.quickSearch = true;
        transactionLinesOptions.title = '<span>erp gl transactions</span>';

        // if (this.options.allowEdit && this.options.mode == 'edit') {
        //     transactionLinesOptions.hideTitlePanel = true;
        //     transactionLinesOptions.lookupLists = {};

        //     var glAccounts = await this.dataSource.cx.table(_cxSchema.erp_gl_account).toErpLookUpList(this.dataSource.shopId, erpSett.erpCostCentre);
        //     transactionLinesOptions.lookupLists[_cxSchema.cp_erp_transaction_gl.GLACCOUNTSEG1] = glAccounts;

        // }
        return transactionLinesOptions;
    }

    async getErpTaxListOptions() {
        var transactionLines = this.dataSource.cx.table(_cxSchema.cp_erp_transaction_tax);
        await transactionLines.select({ invGrpId: this.options.query.id });

        transactionLines.forceReadOnly = true;

        var transactionLinesOptions = await this.listOptions(transactionLines, { listView: true, id: 'taxItems', query: this.options.query });
        transactionLinesOptions.quickSearch = true;
        transactionLinesOptions.title = '<span>erp tax transactions</span>';

        // if (this.options.allowEdit && this.options.mode == 'edit') {
        //     transactionLinesOptions.hideTitlePanel = true;
        //     transactionLinesOptions.lookupLists = {};

        //     var taxAccounts = await this.dataSource.cx.table(_cxSchema.erp_tax_account).toErpLookUpList(this.dataSource.shopId);
        //     transactionLinesOptions.lookupLists[_cxSchema.cp_erp_transaction_tax.TAXACCOUNT] = taxAccounts;

        // }
        return transactionLinesOptions;
    }

    async setRecordTitle() {
        // SET TAB TITLE
        this.options.tabTitle = `${this.dataSource.documentTypeName.toUpperCase()} GROUP [${this.dataSource.documentNumber}]`;
        // SET DOCUMENT TILE WITH DOC TYPE, STATUS AND EDITED BUBBLES
        var applyStoreColorStyle = 'border: 5px solid var(--main-bg-color); display: table-cell; padding: 3px 17px 5px 17px; border-radius: 15px; font-size: 24px; overflow: hidden; text-align: center; vertical-align: middle;';
        this.options.title = `<div style="display: table;">`;
        this.options.title += `<div style="display: table-cell; padding: 5px 17px 3px 17px;">${this.dataSource.documentNumber}</div>`;
        this.options.title += `
            <div style="${applyStoreColorStyle} ${_cxConst.CP_DOCUMENT.TYPE.getStyleInverted(this.dataSource.documentType)}">
                ${_cxConst.CP_DOCUMENT.TYPE.getName(this.dataSource.documentType).toLowerCase()} group
            </div>
        `;
        this.options.title += `
            <div style="${applyStoreColorStyle} ${_cxConst.CP_DOCUMENT.STATUS.getStyleInverted(this.dataSource.documentStatus)}">
                ${_cxConst.CP_DOCUMENT.STATUS.getName(this.dataSource.documentStatus)}
            </div>
        `;
        if (this.dataSource.isUserEdited) {
            this.options.title += `
                <div style="${applyStoreColorStyle}; background-color: #a85c32;" title="this document was manually edited">
                    &#x270E;
                </div>
            `;
            this.options.tabTitle = '\u270E ' + this.options.tabTitle;
        }

        this.options.title += '</div>';
        // SET ERP TOKEN BANNER IF REQUIRED
        this.options.formBanner = await this.validateErpToken();
    }


    async buildFormLists() {
        var erpSett = await this.dataSource.cx.table(_cxSchema.erp_shop_setting).fetch(this.dataSource.shopId);
        var erpSubListsGroupStyles = (erpSett.mergeGLAndTax) ? ['width: 100%; min-width: 500px;'] : ['width: 60%; min-width: 500px;', 'min-width: 400px;'];

        var erpSubListsGroup = { group: 'erp_sublists', columnCount: 2, styles: erpSubListsGroupStyles, fields: [] };
        this.options.fields.push(erpSubListsGroup);

        var erpGlLineOptions = await this.getErpGLListOptions(erpSett);
        erpSubListsGroup.fields.push({ group: 'erp_gl_lines', title: 'erp gl lines', column: 1, fields: [erpGlLineOptions] })
        if (!erpSett.mergeGLAndTax) {
            var erpTaxLineOptions = await this.getErpTaxListOptions(erpSett);
            erpSubListsGroup.fields.push({ group: 'erp_tax_lines', title: 'erp tax lines', column: 2, fields: [erpTaxLineOptions] })
        }

        var subListsGroup = { group: 'sublists', columnCount: 2, fields: [] };
        this.options.fields.push(subListsGroup);

        var transactionOptions = await this.getDocumentListOptions();
        subListsGroup.fields.push({ group: 'lines', title: 'documents', column: 1, fields: [transactionOptions] })

        if (this.options.query.viewLogs == 'T') {
            var transactionLogOptions = await this.getDocumentLogListOptions();
            subListsGroup.fields.push({ group: 'logs', title: 'document logs', column: 2, width: '600px', fields: [transactionLogOptions], collapsed: true });
        }


    }

    buildFormActions() {
        if (this.options.mode == 'view') {
            var s = this.dataSource.documentStatus;
            // allow to refresh only under certain statuses
            if (s == _cxConst.CP_DOCUMENT.STATUS.New || s == _cxConst.CP_DOCUMENT.STATUS.Ready || s == _cxConst.CP_DOCUMENT.STATUS.PostingReady || s == _cxConst.CP_DOCUMENT.STATUS.ERROR) {
                this.options.buttons.push({ id: 'cp_refresh_data', text: 'Refresh Data', function: 'refreshData' });
            }
            // allow to post based on role only under certain statuses
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.USER) {
                if (s == _cxConst.CP_DOCUMENT.STATUS.PostingReady && !this.options.formBanner) {
                    var erpName = 'ERP';
                    var btnPostToErp = { id: 'cp_post_data', text: 'Post to ' + erpName, function: 'postData', style: 'color: var(--action-btn-color); background-color: var(--action-btn-bg-color);', };
                    this.options.buttons.push(btnPostToErp);
                }
            }
            // allow to un-post based on role only under certain statuses
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.ADMIN) {
                if (s == _cxConst.CP_DOCUMENT.STATUS.Posted || s == _cxConst.CP_DOCUMENT.STATUS.PostingError) {
                    this.options.buttons.push({ id: 'cp_reset_data', text: 'Reset To Ready', function: 'resetPostedStatus' });
                }
            }

            // allow to delete if not posted
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.USER) {
                if (s != _cxConst.CP_DOCUMENT.STATUS.Posting && s != _cxConst.CP_DOCUMENT.STATUS.PostingRunning && s != _cxConst.CP_DOCUMENT.STATUS.PostingError && s != _cxConst.CP_DOCUMENT.STATUS.Posted
                    && s != _cxConst.CP_DOCUMENT.STATUS.REFRESH) {
                    this.options.buttons.push({ id: 'cp_delete_document', text: 'Delete', function: 'deleteDocument', style: 'color: white; background-color: rgba(230,0,0,1);' });
                }
            }

            var buttonLabel = (this.options.query.viewLogs == 'T') ? 'Hide Logs' : 'Show Logs';
            this.options.buttons.push({ id: 'cp_view_logs', text: buttonLabel, function: 'viewLogs' });
        }
    }


    async _record() {
        if (this.options.allowEdit) {
            this.options.allowEdit = (this.dataSource.documentStatus == _cxConst.CP_DOCUMENT.STATUS.Ready || this.dataSource.documentStatus == _cxConst.CP_DOCUMENT.STATUS.PostingReady || this.dataSource.documentStatus == _cxConst.CP_DOCUMENT.STATUS.ERROR);
        }

        await this.setRecordTitle();
        //this.options.title = `${this.dataSource.documentTypeName.toUpperCase()} GROUP [${this.dataSource.documentNumber}]`;

        this.options.fields = [
            {
                group: 'main', title: '', columnCount: 4, styles: ['min-width: 500px', 'min-width: 250px', 'min-width: 250px', 'min-width: 350px'], fields: [
                    {
                        group: 'main1', title: 'main info', column: 1, columnCount: 2, fields: [
                            {
                                group: 'main1.col1', column: 1, columnCount: 1, fields: [
                                    await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId', readOnly: true }),
                                    { name: _cxSchema.cp_invoiceGroup.SUPPLIERCODE, label: 'supplier', readOnly: true },
                                    { name: _cxSchema.cp_invoiceGroup.DOCUMENTTYPE + 'Name', label: 'document type', readOnly: true },
                                ]
                            },
                            {
                                group: 'main1.col2', column: 2, columnCount: 1, fields: [
                                    { name: _cxSchema.cp_invoiceGroup.DOCUMENTDATE, label: 'date', width: '100%' },
                                    { name: _cxSchema.cp_invoiceGroup.DOCUMENTNUMBER, label: 'document number', width: '100%', validation: '{ "mandatory": true, "max": 20  }' },
                                    { name: _cxSchema.cp_invoiceGroup.CURRENCY, label: 'currency', readOnly: true },
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
                        group: 'totals', title: 'totals', column: 3, columnCount: 2, inline: true, fields: [
                            { name: _cxSchema.cp_invoiceGroup.TOTALNET, label: 'total net', formatMoney: 'N2', readOnly: true },
                            { name: _cxSchema.cp_invoiceGroup.TOTALDISCOUNT, label: 'discount', column: 2, formatMoney: 'N2', readOnly: true },
                            { name: _cxSchema.cp_invoiceGroup.TOTALVAT, label: 'total vat', formatMoney: 'N2', readOnly: true },
                            { name: _cxSchema.cp_invoiceGroup.TOTALGROSS, label: 'total gross', formatMoney: 'N2', readOnly: true },
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

        await this.buildFormLists();

        this.buildFormActions();
        // if (this.options.mode == 'view') {
        //     var buttonLabel = (this.options.query.viewLogs == 'T') ? 'Hide Logs' : 'Show Logs';
        //     this.options.buttons.push({ id: 'cp_view_logs', text: buttonLabel, function: 'viewLogs' });

        //     var s = this.dataSource.documentStatus;
        //     // allow to refresh only under certain statuses
        //     if (s == _cxConst.CP_DOCUMENT.STATUS.New || s == _cxConst.CP_DOCUMENT.STATUS.Ready || s == _cxConst.CP_DOCUMENT.STATUS.PostingReady || s == _cxConst.CP_DOCUMENT.STATUS.ERROR) {
        //         this.options.buttons.push({ id: 'cp_refresh_data', text: 'Refresh Data', function: 'refreshData' });
        //     }

        // }
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

                { name: _cxSchema.cp_invoiceGroup.TOTALDISCOUNT, title: 'discount', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true },
                { name: _cxSchema.cp_invoiceGroup.TOTALNET, title: 'net', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true },
                { name: _cxSchema.cp_invoiceGroup.TOTALVAT, title: 'tax', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true },
                { name: _cxSchema.cp_invoiceGroup.TOTALGROSS, title: 'gross', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true },

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

module.exports = CPInvoiceGroupRender;
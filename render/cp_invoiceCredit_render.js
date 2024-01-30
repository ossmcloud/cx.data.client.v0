'use script';
//
const _core = require('cx-core');
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPInvoiceReturnRender extends RenderBase {
    matchingEnabled = false;
    constructor(dataSource, options) {
        super(dataSource, options);
        if (!options.path) { options.path = '../cp/invoice'; }
        if (!options.listPath) { options.listPath = '../cp/invoices'; }
        this.matchingEnabled = this.hasModule('cm');
    }



    async getDocumentLineListOptions() {
        var transactionLines = this.dataSource.cx.table(_cxSchema.cp_invoiceCreditLine);
        await transactionLines.select({ pid: this.options.query.id });

        if (this.options.allowEdit && this.options.mode == 'edit') {
            transactionLines.forceReadOnly = this.options.query.line != 'T';
        }

        var transactionLinesOptions = await this.listOptions(transactionLines, { listView: true, id: 'lineItems', query: this.options.query });
        transactionLinesOptions.quickSearch = true;
        transactionLinesOptions.title = '<span>document lines</span>';
        if (transactionLines.forceReadOnly) {
            transactionLinesOptions.showButtons = [{ id: 'cx_edit_tran_line', text: 'edit lines', function: 'editTransactionLines' }];
        } else {
            transactionLinesOptions.hideTitlePanel = true;
            transactionLinesOptions.lookupLists = {};

            var taxAccounts = await this.dataSource.cx.table(_cxSchema.cx_map_config_tax).toLookUpList(this.dataSource.shopId, true);
            taxAccounts.shift();
            // transactionLinesOptions.lookupLists[_cxSchema.cp_invoiceCreditLine.TAXMAPCONFIGID] = taxAccounts;
            var col = _core.list.findInArray(transactionLinesOptions.columns, 'name', _cxSchema.cp_invoiceCreditLine.TAXMAPCONFIGID);
            if (col) { col.input.options = taxAccounts; }
        }

        return transactionLinesOptions;
    }

    async getDocumentLogListOptions() {
        var transactionLogs = this.dataSource.cx.table(_cxSchema.cp_invoiceCreditLog);
        await transactionLogs.select({ pid: this.options.query.id });

        var transactionLogsOptions = await this.listOptions(transactionLogs, { listView: true });
        transactionLogsOptions.quickSearch = true;
        transactionLogsOptions.title = '<span>system logs</span>';
        return transactionLogsOptions;
    }

    async getErpGLListOptions(erpSett) {
        var transactionLines = this.dataSource.cx.table(_cxSchema.cp_erp_transaction_gl);
        await transactionLines.select({ id: this.options.query.id });

        if (this.options.allowEdit && this.options.mode == 'edit') {
            transactionLines.forceReadOnly = this.options.query.line == 'T';
        }

        var transactionLinesOptions = await this.listOptions(transactionLines, { listView: true, id: 'glItems', query: this.options.query, mergeGLAndTax: erpSett.mergeGLAndTax });
        transactionLinesOptions.quickSearch = true;
        transactionLinesOptions.title = '<span>erp gl transactions</span>';

        if (this.options.allowEdit && this.options.mode == 'edit') {
            transactionLinesOptions.hideTitlePanel = true;
            transactionLinesOptions.lookupLists = {};

            var glAccounts = await this.dataSource.cx.table(_cxSchema.erp_gl_account).toErpLookUpList(this.dataSource.shopId, erpSett.erpCostCentre, erpSett.mergeGLAndTax);
            transactionLinesOptions.lookupLists[_cxSchema.cp_erp_transaction_gl.GLACCOUNTSEG1] = glAccounts;

            if (erpSett.mergeGLAndTax) {
                var taxAccounts = await this.dataSource.cx.table(_cxSchema.erp_tax_account).toErpLookUpList(this.dataSource.shopId);
                transactionLinesOptions.lookupLists[_cxSchema.cp_erp_transaction_tax.TAXACCOUNT] = taxAccounts;
            }

        }
        return transactionLinesOptions;
    }

    async getErpTaxListOptions() {
        var transactionLines = this.dataSource.cx.table(_cxSchema.cp_erp_transaction_tax);
        await transactionLines.select({ id: this.options.query.id });

        if (this.options.allowEdit && this.options.mode == 'edit') {
            transactionLines.forceReadOnly = this.options.query.line == 'T';
        }

        var transactionLinesOptions = await this.listOptions(transactionLines, { listView: true, id: 'taxItems', query: this.options.query });
        transactionLinesOptions.quickSearch = true;
        transactionLinesOptions.title = '<span>erp tax transactions</span>';

        if (this.options.allowEdit && this.options.mode == 'edit') {
            transactionLinesOptions.hideTitlePanel = true;
            transactionLinesOptions.lookupLists = {};

            var taxAccounts = await this.dataSource.cx.table(_cxSchema.erp_tax_account).toErpLookUpList(this.dataSource.shopId);
            transactionLinesOptions.lookupLists[_cxSchema.cp_erp_transaction_tax.TAXACCOUNT] = taxAccounts;

        }
        return transactionLinesOptions;
    }

    async setRecordTitle(query) {


        // SET TAB TITLE
        var docNumber = this.dataSource.documentNumber || this.dataSource.documentId;
        this.options.tabTitle = `${this.dataSource.documentTypeName.toUpperCase()} [${docNumber}]`;
        // SET DOCUMENT TILE WITH DOC TYPE, STATUS AND EDITED BUBBLES
        var applyStoreColorStyle = 'border: 5px solid var(--main-bg-color); display: table-cell; padding: 3px 17px 5px 17px; border-radius: 15px; font-size: 24px; overflow: hidden; text-align: center; vertical-align: middle;';
        this.options.title = `<div style="display: table;">`;
        this.options.title += `<div style="display: table-cell; padding: 5px 17px 3px 17px;">${docNumber}</div>`;
        if (query) {
            var viewQueryButton = `cursor: pointer;" onclick="window.open('&#47;cp&#47;query?id=${query.queryId}');`;
            this.options.title += `
                <div style="${applyStoreColorStyle} background-color: yellow; color: maroon; ${viewQueryButton}">
                    &#x26A0;
                </div>
            `;
        }
        this.options.title += `
            <div style="${applyStoreColorStyle} ${_cxConst.CP_DOCUMENT.TYPE.getStyleInverted(this.dataSource.documentType)}">
                ${_cxConst.CP_DOCUMENT.TYPE.getName(this.dataSource.documentType).toLowerCase()}
            </div>
        `;
        this.options.title += `
            <div style="${applyStoreColorStyle} ${_cxConst.CP_DOCUMENT.STATUS.getStyleInverted(this.dataSource.documentStatus)}">
                ${_cxConst.CP_DOCUMENT.STATUS.getName(this.dataSource.documentStatus)}
            </div>
        `;

        if (this.matchingEnabled) {
            var recoSessionLink = (this.dataSource.recoSessionId) ? `; cursor: pointer;" onclick="window.open('&#47;cp&#47;match-session?id=${this.dataSource.recoSessionId}');` : '';
            this.options.title += `
                <div style="${applyStoreColorStyle} ${_cxConst.CP_DOCUMENT.RECO_STATUS.getStyleInverted(this.dataSource.recoStatus)}${recoSessionLink}">
                    <img src="/public/images/puzzle_${this.dataSource.cx.theme}.png" style="width: 24px; float: left; margin-left: -7px; margin-right: 7px;" />
                    <span>${_cxConst.CP_DOCUMENT.RECO_STATUS.getName(this.dataSource.recoStatus)}</span>
                </div>
            `;
        }

        if (this.dataSource.isUserEdited) {
            this.options.title += `
                <div style="${applyStoreColorStyle}; background-color: #a85c32;" title="this document was manually edited">
                    &#x270E;
                </div>
            `;
            this.options.tabTitle = '\u270E ' + this.options.tabTitle;
        }
        if (this.dataSource.invGrpId) {
            this.options.title += `
            <div style="${applyStoreColorStyle} background-color: var(--element-bg-color); cursor: pointer;" onclick="window.open('&#47;cp&#47;invoice-group?id=${this.dataSource.invGrpId}');">
                grouped
            </div>
        `;
        }

        if (this.dataSource.createdFrom) {
            var createdFromText = await this.dataSource.cx.table(_cxSchema.cp_deliveryReturn).lookUp(this.dataSource.createdFrom, _cxSchema.cp_deliveryReturn.DOCUMENTNUMBER);
            this.options.title += `
                <div style="${applyStoreColorStyle} ${_cxConst.CP_DOCUMENT.TYPE.getStyleInverted(this.dataSource.createdFromType)}; cursor: pointer;" onclick="window.open('&#47;cp&#47;delivery?id=${this.dataSource.createdFrom}');">
                    from ${_cxConst.CP_DOCUMENT.TYPE.getName(this.dataSource.createdFromType).toLowerCase()} ${createdFromText}
                </div>
            `;
        }

        this.options.title += '</div>';
        // SET ERP TOKEN BANNER IF REQUIRED
        this.options.formBanner = await this.validateErpToken();

        var icon = '';
        var transaction = this.dataSource;
        if (transaction.documentStatus == _cxConst.CP_DOCUMENT.STATUS.Posted) {
            icon = '\u2705';    // green check
        } else if (transaction.documentStatus == _cxConst.CP_DOCUMENT.STATUS.NEED_ATTENTION || transaction.documentStatus == _cxConst.CP_DOCUMENT.STATUS.ERROR || transaction.documentStatus == _cxConst.CP_DOCUMENT.STATUS.PostingError) {
            icon = '\u26A0';    // warning triangle
            //icon = '\u274C';    // red x
        } else if (transaction.documentStatus == _cxConst.CP_DOCUMENT.STATUS.New || transaction.documentStatus == _cxConst.CP_DOCUMENT.STATUS.Ready || transaction.documentStatus == _cxConst.CP_DOCUMENT.STATUS.PostingReady) {
            icon = '\u2713';    // check mark
        } else if (transaction.documentStatus == _cxConst.CP_DOCUMENT.STATUS.Generating || transaction.documentStatus == _cxConst.CP_DOCUMENT.STATUS.REFRESH || transaction.documentStatus == _cxConst.CP_DOCUMENT.STATUS.Posting || transaction.documentStatus == _cxConst.CP_DOCUMENT.STATUS.PostingRunning) {
            //icon = '\uF5D8';    //
            icon = '\u21BB';
        }
        this.options.tabTitle = `${icon} ${this.options.tabTitle}`
    }

    async buildFormBody() {
        var fieldGroupIdx = 1; var fieldGroupStyles = [];

        fieldGroupStyles.push('min-width: 500px;');
        var fieldGroup_main = {
            group: 'main1', title: 'main info', column: fieldGroupIdx++, columnCount: 4, fields: [
                {
                    group: 'main1.col1', column: 1, columnCount: 1, fields: [
                        await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId', readOnly: true }),
                        { name: _cxSchema.cp_invoiceCredit.DOCUMENTTYPE + 'Name', label: 'document type', readOnly: true },
                        { name: _cxSchema.cp_invoiceCredit.DOCUMENTID, label: 'document id', readOnly: true },
                    ]
                },
                {
                    group: 'main1.col2', column: 2, columnCount: 1, fields: [
                        await this.fieldDropDownOptions(_cxSchema.cx_traderAccount, {
                            id: _cxSchema.cp_invoiceCredit.TRADERACCOUNTID, name: _cxSchema.cp_invoiceCredit.TRADERACCOUNTID,
                            dropDownSelectOptions: { tt: 'S', s: this.dataSource.shopId },
                            width: '100%', disabled: (this.dataSource.invGrpId)
                        }),
                        { name: _cxSchema.cp_invoiceCredit.SUPPLIERCODE, label: 'supplier (epos)', readOnly: true },
                        { name: _cxSchema.cp_invoiceCredit.CURRENCY, label: 'currency', readOnly: true },
                    ]
                },
                {
                    group: 'main1.col3', column: 3, columnCount: 1, fields: [
                        { name: _cxSchema.cp_invoiceCredit.DOCUMENTNUMBER, label: 'document number', validation: '{ "mandatory": true, "max": 20  }' },
                        { name: _cxSchema.cp_invoiceCredit.DOCUMENTDATE, column: 1, label: 'date' },
                        { name: _cxSchema.cp_invoiceCredit.UPLOADDATE, label: 'upload date', readOnly: true },
                    ]
                },
                {
                    group: 'main1.col4', column: 4, columnCount: 1, fields: [
                        { name: _cxSchema.cp_invoiceCredit.DOCKETNUMBER, label: 'docket number' },
                        { name: _cxSchema.cp_invoiceCredit.DOCKETDATE, column: 1, label: 'docket date' },

                    ]
                },
            ]
        };

        fieldGroupStyles.push('width: 200px; min-width: 150px;');
        var fieldGroup_docReferences = {
            group: 'main_ref', title: 'references', column: fieldGroupIdx++, columnCount: 1, fields: [
                { name: _cxSchema.cp_invoiceCredit.DOCUMENTREFERENCE, label: 'reference (erp)' },
                { name: _cxSchema.cp_invoiceCredit.DOCUMENTSECONDREFERENCE, label: 'reference (cx)' },
                { name: _cxSchema.cp_invoiceCredit.DOCUMENTMEMO, label: 'memo' },

            ]
        }

        fieldGroupStyles.push('width: 300px; min-width: 200px;');
        var fieldGroup_totals = {
            group: 'totals', title: 'totals', column: fieldGroupIdx++, columnCount: 2, inline: true, fields: [
                { name: _cxSchema.cp_invoiceCredit.TOTALNET, label: 'total net', formatMoney: 'N2', readOnly: true },
                { name: _cxSchema.cp_invoiceCredit.TOTALDISCOUNT, label: 'discount', column: 2, formatMoney: 'N2', readOnly: true },
                { name: _cxSchema.cp_invoiceCredit.TOTALVAT, label: 'total vat', formatMoney: 'N2', readOnly: true },
                { name: _cxSchema.cp_invoiceCredit.TOTALGROSS, label: 'total gross', formatMoney: 'N2', readOnly: true },
            ]
        }

        fieldGroupStyles.push('width: 350px; min-width: 200px;');
        var fieldGroup_audit = {
            group: 'audit', title: 'audit info', column: fieldGroupIdx++, columnCount: 1, fields: [
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

        var fieldGroup_erp = null;
        var s = this.dataSource.documentStatus;
        if (s == _cxConst.CP_DOCUMENT.STATUS.PostingReady || s == _cxConst.CP_DOCUMENT.STATUS.Posted || s == _cxConst.CP_DOCUMENT.STATUS.PostingError) {
            fieldGroupStyles.push('width: 350px; min-width: 200px;');
            fieldGroup_erp = {
                group: 'erp', title: 'erp info', column: fieldGroupIdx++, columnCount: 1, fields: [
                    {
                        group: 'erp0', title: '', column: 1, columnCount: 2, inline: true, fields: [
                            { name: 'accountErpInfo', label: 'erp supplier', column: 1, readOnly: true },
                            { name: 'transactionErpInfo', label: 'erp reference', column: 2, readOnly: true },
                            { name: 'postedOn', label: 'posted on', column: 1, readOnly: true },
                            { name: 'postingURN', label: 'posted URN', column: 2, readOnly: true },
                        ]
                    },
                    {
                        group: 'erp1', title: '', column: 1, columnCount: 1, inline: true, fields: [
                            { name: 'postingStatusMessage', label: 'posting message', column: 1, readOnly: true },

                        ]
                    },
                ]
            }
        }

        var fieldGroup = { group: 'main', title: '', columnCount: (fieldGroupIdx - 1), styles: fieldGroupStyles, fields: [] }
        fieldGroup.fields.push(fieldGroup_main);
        fieldGroup.fields.push(fieldGroup_docReferences);
        fieldGroup.fields.push(fieldGroup_totals);
        fieldGroup.fields.push(fieldGroup_audit);
        if (fieldGroup_erp != null) { fieldGroup.fields.push(fieldGroup_erp); }

        this.options.fields = [];
        this.options.fields.push(fieldGroup);
    }

    async buildFormLists() {

        var erpSett = await this.dataSource.cx.table(_cxSchema.erp_shop_setting).fetchOrNew(this.dataSource.shopId);
        var erpSubListsGroupStyles = (erpSett.mergeGLAndTax) ? ['width: 100%; min-width: 500px;'] : ['width: 60%; min-width: 500px;', 'min-width: 400px;'];

        if (this.options.query.line != 'T') {
            var erpSubListsGroup = { group: 'erp_sublists', columnCount: 2, styles: erpSubListsGroupStyles, fields: [] };
            this.options.fields.push(erpSubListsGroup);

            var erpGlLineOptions = await this.getErpGLListOptions(erpSett);
            erpSubListsGroup.fields.push({ group: 'erp_gl_lines', title: 'erp gl lines', column: 1, fields: [erpGlLineOptions] });
            if (!erpSett.mergeGLAndTax) {
                var erpTaxLineOptions = await this.getErpTaxListOptions(erpSett);
                erpSubListsGroup.fields.push({ group: 'erp_tax_lines', title: 'erp tax lines', column: 2, fields: [erpTaxLineOptions] });
            }
        }

        var subListsGroup = { group: 'sublists', columnCount: 2, fields: [] };
        this.options.fields.push(subListsGroup);

        var transactionLineOptions = await this.getDocumentLineListOptions();
        subListsGroup.fields.push({ group: 'lines', title: 'document lines', column: 1, fields: [transactionLineOptions] })
        if (this.options.query.viewLogs == 'T') {
            var transactionLogOptions = await this.getDocumentLogListOptions();
            subListsGroup.fields.push({ group: 'logs', title: 'document logs', column: 1, fields: [transactionLogOptions], collapsed: true });
        }

    }

    async buildFormActions(query) {
        // test button
        if (process.env.APP_CONTEXT == 'LOCAL') { this.options.buttons.push({ id: 'cp_test_function', text: 'Test', function: 'testFunction' }); }

        if (this.options.mode == 'view') {
            var s = this.dataSource.documentStatus;
            // allow to refresh only under certain statuses
            if (s == _cxConst.CP_DOCUMENT.STATUS.New || s == _cxConst.CP_DOCUMENT.STATUS.Ready || s == _cxConst.CP_DOCUMENT.STATUS.PostingReady || s == _cxConst.CP_DOCUMENT.STATUS.NEED_ATTENTION || s == _cxConst.CP_DOCUMENT.STATUS.ERROR) {
                this.options.buttons.push({ id: 'cp_refresh_data', text: 'Refresh Data', function: 'refreshData' });
            }
            // allow to post based on role only under certain statuses
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.USER) {
                if (s == _cxConst.CP_DOCUMENT.STATUS.PostingReady && !this.options.formBanner) {
                    if (!this.dataSource.invGrpId) {
                        var erpShopSetting = this.dataSource.cx.table(_cxSchema.erp_shop_setting);
                        var erpName = await erpShopSetting.getErpName(this.dataSource.shopId);
                        var btnPostToErp = { id: 'cp_post_data', text: 'Post to ' + erpName, function: 'postData', style: 'color: var(--action-btn-color); background-color: var(--action-btn-bg-color);', };
                        this.options.buttons.push(btnPostToErp);
                    }
                } else if (s == _cxConst.CP_DOCUMENT.STATUS.PendingReview) {
                    var btnPostToErp = { id: 'cp_flag_reviewed', text: 'Flag as Reviewed', function: 'flagAsReviewed', style: 'color: var(--action-btn-color); background-color: var(--action-btn-bg-color);', };
                    this.options.buttons.push(btnPostToErp);
                }

            }
            // allow to un-post based on role only under certain statuses
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.ADMIN) {
                if (s == _cxConst.CP_DOCUMENT.STATUS.Posted || s == _cxConst.CP_DOCUMENT.STATUS.PostingError) {
                    this.options.buttons.push({ id: 'cp_reset_data', text: 'Reset To Ready', function: 'resetPostedStatus' });
                }
            }
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.CX_SUPPORT) {
                if (s == _cxConst.CP_DOCUMENT.STATUS.Posting || s == _cxConst.CP_DOCUMENT.STATUS.PostingRunning) {
                    this.options.buttons.push({ id: 'cp_reset_data', text: 'Reset To Ready', function: 'resetPostedStatus' });
                }
            }

            // allow to delete if not posted
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.USER) {
                if (s != _cxConst.CP_DOCUMENT.STATUS.Posting && s != _cxConst.CP_DOCUMENT.STATUS.PostingRunning && s != _cxConst.CP_DOCUMENT.STATUS.PostingError && s != _cxConst.CP_DOCUMENT.STATUS.Posted
                    && s != _cxConst.CP_DOCUMENT.STATUS.REFRESH && s != _cxConst.CP_DOCUMENT.STATUS.Generating) {
                    if (!this.dataSource.invGrpId) {
                        this.options.buttons.push({ id: 'cp_delete_document', text: 'Delete', function: 'deleteDocument', style: 'color: white; background-color: rgba(230,0,0,1);' });
                    }
                }
            }

            var buttonLabel = (this.options.query.viewLogs == 'T') ? 'Hide Logs' : 'Show Logs';
            this.options.buttons.push({ id: 'cp_view_logs', text: buttonLabel, function: 'viewLogs' });

            if (query) {
                this.options.buttons.push({ id: 'cp_manage_query', text: 'View Query', function: 'manageQuery' });
            } else {
                this.options.buttons.push({ id: 'cp_manage_query', text: 'Add Query', function: 'manageQuery' });
            }

            var queries = this.dataSource.cx.table(_cxSchema.cp_query);
            if (await queries.select({ invCreId: this.dataSource.id })) {
                this.options.buttons.push({ id: 'cp_view_queries', text: 'View Queries', function: 'viewQueries' });
            }
        }
    }

    async _record() {
        var query = await this.dataSource.cx.table(_cxSchema.cp_query).fetchOpenQuery(this.dataSource.invCreId, false, true);

        if (this.options.allowEdit) {
            if (this.dataSource.invGrpId) {
                this.options.allowEdit = (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.CX_SUPPORT)
            } else {
                this.options.allowEdit = (
                    this.dataSource.documentStatus == _cxConst.CP_DOCUMENT.STATUS.PostingReady ||
                    this.dataSource.documentStatus == _cxConst.CP_DOCUMENT.STATUS.NEED_ATTENTION ||
                    this.dataSource.documentStatus == _cxConst.CP_DOCUMENT.STATUS.PendingReview ||
                    this.dataSource.documentStatus == _cxConst.CP_DOCUMENT.STATUS.ERROR
                );
            }
        }
        //
        await this.setRecordTitle(query);
        // 
        await this.buildFormBody();
        // 
        await this.buildFormLists();
        //
        await this.buildFormActions(query);
    }

    async _list() {
        try {

            if (this.options.allowEdit == true) {
                var isCxRole = this.dataSource.cx.roleId >= _cxConst.CX_ROLE.CX_SUPPORT;
                this.options.allowEditCondition = function (object) {
                    if (object.invGrpId) { return isCxRole; }
                    return (
                        object.documentStatus == _cxConst.CP_DOCUMENT.STATUS.PostingReady ||
                        object.documentStatus == _cxConst.CP_DOCUMENT.STATUS.NEED_ATTENTION ||
                        object.documentStatus == _cxConst.CP_DOCUMENT.STATUS.PendingReview ||
                        object.documentStatus == _cxConst.CP_DOCUMENT.STATUS.ERROR
                    );
                }
            }

            if (this.options.query) {
                this.options.paging = true;
                this.options.pageNo = (this.options.query.page || 1);
            }

            var isBatchProcessing = (this.options.query && (this.options.query.batch == 'T' || this.options.query.batch == 'true'));
            var batchActionSelected = (isBatchProcessing && this.options.query.action);

            this.options.filters = [];

            if (isBatchProcessing) {
                this.options.title = 'invoice / credits batch processing';
                if (batchActionSelected) {
                    this.options.showButtons = [];
                    this.options.showButtons.push({ id: 'cp_batch_mark_all', text: 'select all', function: 'checkAll' });
                    this.options.showButtons.push({ id: 'cp_batch_unmark_all', text: 'clear selection', function: 'uncheckAll' });
                    this.options.showButtons.push({ id: 'cp_batch_submit', text: 'submit for batch processing', function: 'submitForBatchProcessing' });
                }
                this.options.filters.push({ fieldName: 'batch', type: _cxConst.RENDER.CTRL_TYPE.HIDDEN });
            }


            if (isBatchProcessing && !batchActionSelected) {
                this.options.filters.push({ label: 'ACTION', fieldName: 'action', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.BATCH_ACTIONS.toList('- all -') });
            } else {
                if (isBatchProcessing) { this.options.filters.push({ label: 'ACTION', fieldName: 'action', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.BATCH_ACTIONS.toList(), disabled: true }); }
                this.options.filters.push(await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }));
                this.options.filters.push({ label: 'status', fieldName: 'st', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.STATUS.toList('- all -') });
                this.options.filters.push({ label: 'type', fieldName: 'tt', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.TYPE_IC.toList('- all -') });
                this.options.filters.push({ label: 'supplier', fieldName: 'su', width: '125px', type: _cxConst.RENDER.CTRL_TYPE.TEXT });
                this.options.filters.push({ label: 'doc #', fieldName: 'tno', width: '100px', type: _cxConst.RENDER.CTRL_TYPE.TEXT });
                this.options.filters.push({ label: 'ref (erp)', fieldName: 'tref', width: '75px', type: _cxConst.RENDER.CTRL_TYPE.TEXT });
                this.options.filters.push({ label: 'ref (cx)', fieldName: 'tref2', width: '75px', type: _cxConst.RENDER.CTRL_TYPE.TEXT });
                if (!isBatchProcessing) { this.options.filters.push({ label: 'group invoice', fieldName: 'gno', width: '100px', type: _cxConst.RENDER.CTRL_TYPE.TEXT }); }
                this.options.filters.push({ label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE });
                this.options.filters.push({ label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE });
                this.options.filters.push({ label: 'upload date (from)', fieldName: 'udf', type: _cxConst.RENDER.CTRL_TYPE.DATE });
                this.options.filters.push({ label: 'upload date (to)', fieldName: 'udt', type: _cxConst.RENDER.CTRL_TYPE.DATE });
                //this.options.filters.push({ label: 'edited', fieldName: 'ued', type: _cxConst.RENDER.CTRL_TYPE.CHECK });
                this.options.filters.push({ label: 'edited', fieldName: 'ued', type: _cxConst.RENDER.CTRL_TYPE.SELECT, width: '75px', items: [{ value: '', text: 'either' }, { value: 'true', text: 'yes' }, { value: 'false', text: 'no' }] });
            }

            var signedCols = {
                Net: _cxSchema.cp_invoiceCredit.TOTALNET + 'Sign',
                Vat: _cxSchema.cp_invoiceCredit.TOTALVAT + 'Sign',
                Gross: _cxSchema.cp_invoiceCredit.TOTALGROSS + 'Sign',
                Discount: _cxSchema.cp_invoiceCredit.TOTALDISCOUNT + 'Sign',
            }
            this.options.columns = [];
            this.options.columns.push({ name: _cxSchema.cp_invoiceCredit.INVCREID, title: ' ', align: 'center' });
            this.options.columns.push({ name: 'shopInfo', title: 'store', width: '200px' });
            this.options.columns.push({ name: 'editedIcon', title: '&#x270E;', align: 'center', width: '10px', headerToolTip: 'edited flag' });
            this.options.columns.push({ name: 'status', title: 'status', align: 'center', width: '70px' });
            this.options.columns.push({ name: _cxSchema.cp_invoiceCredit.DOCUMENTTYPE, title: 'type', align: 'center', width: '70px', lookUps: _cxConst.CP_DOCUMENT.TYPE.toList() });
            if (this.matchingEnabled) {
                var matchIcon = `<img src="/public/images/puzzle_${this.dataSource.cx.theme}.png" style="width: 20px" />`;
                this.options.columns.push({ name: 'recoStatus', title: matchIcon, align: 'center', width: '10px', headerToolTip: 'matching status', toolTip: { valueField: 'recoStatusName', suppressText: true } });

                var queryIcon = `<img src="/public/images/query_${this.dataSource.cx.theme}.png" style="width: 20px" />`;
                this.options.columns.push({ name: 'queryCount', title: queryIcon, nullText: '', align: 'center', width: '10px', headerToolTip: 'query count', toolTip: { valueField: 'queryCountDisplay', suppressText: true } });
            }
            this.options.columns.push({ name: _cxSchema.cp_invoiceCredit.DOCUMENTDATE, title: 'date', align: 'center', width: '100px' });
            this.options.columns.push({ name: _cxSchema.cp_invoiceCredit.SUPPLIERCODE, title: 'supplier' });
            this.options.columns.push({ name: 'supplierName', title: 'supplier name' });
            this.options.columns.push({ name: _cxSchema.cp_invoiceCredit.DOCUMENTNUMBER, title: 'document number' });
            this.options.columns.push({ name: _cxSchema.cp_invoiceCredit.DOCUMENTREFERENCE, title: 'reference (erp)' });
            this.options.columns.push({ name: _cxSchema.cp_invoiceCredit.DOCUMENTSECONDREFERENCE, title: 'reference (cx)' });
            if (!this.options.listView) {
                // NOTE: this means it is a sublist of the group invoice so no reason to show this
                this.options.columns.push({ name: 'groupDocumentNumber', title: 'group invoice', link: { url: '/cp/invoice-group?id={groupDocumentNumber}', valueField: _cxSchema.cp_invoiceCredit.INVGRPID } });
            }
            this.options.columns.push({ name: signedCols.Discount, title: 'discount', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
            this.options.columns.push({ name: signedCols.Net, title: 'net', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
            this.options.columns.push({ name: signedCols.Vat, title: 'tax', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
            this.options.columns.push({ name: signedCols.Gross, title: 'gross', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
            this.options.columns.push({ name: _cxSchema.cp_invoiceCredit.UPLOADDATE, title: 'upload date', align: 'center', width: '100px' });
            this.options.columns.push({ name: _cxSchema.cp_invoiceCredit.CREATED, title: 'created', align: 'center', width: '130px' });

            if (isBatchProcessing && batchActionSelected) { this.options.columns.splice(0, 0, { name: 'check', title: 'post', width: '30px', type: 'check' }); }


            this.options.cellHighlights = [];
            this.options.cellHighlights.push({ column: signedCols.Discount, op: '=', value: '0', style: 'color: gray;', columns: [signedCols.Discount] });
            this.options.cellHighlights.push({ column: signedCols.Vat, op: '=', value: '0', style: 'color: gray;', columns: [signedCols.Vat] });
            this.options.cellHighlights.push({ column: signedCols.Net, op: '<', value: '0', style: 'color: red;', columns: [signedCols.Net] });
            this.options.cellHighlights.push({ column: signedCols.Vat, op: '<', value: '0', style: 'color: red;', columns: [signedCols.Vat] });
            this.options.cellHighlights.push({ column: signedCols.Gross, op: '<', value: '0', style: 'color: red;', columns: [signedCols.Gross] });
            this.options.cellHighlights.push({ column: signedCols.Discount, op: '<', value: '0', style: 'color: red;', columns: [signedCols.Discount] });


            var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
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

            if (this.matchingEnabled) {
                var recoStatuses = _cxConst.CP_DOCUMENT.RECO_STATUS.toList();
                for (let sx = 0; sx < recoStatuses.length; sx++) {
                    const s = recoStatuses[sx];
                    this.options.cellHighlights.push({
                        column: 'recoStatus',
                        op: '=',
                        value: s.value,
                        style: _cxConst.CP_DOCUMENT.RECO_STATUS.getStyleInverted(s.value) + 'padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;',
                        columns: ['recoStatus']
                    })
                }

                this.options.cellHighlights.push({
                    column: 'queryCount',
                    op: '>',
                    value: 0,
                    style: 'background-color: rgb(127,127,127); color: maroon; padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;',
                    columns: ['queryCount']
                })
                this.options.cellHighlights.push({
                    column: 'queryCountOpen',
                    op: '>',
                    value: 0,
                    style: 'background-color: yellow; color: maroon; padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;',
                    columns: ['queryCount']
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

            var applyStoreColorStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: auto; display: block; overflow: hidden; text-align: left;';
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
'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');
const { columns } = require('mssql');

class CSStockValuationRender extends RenderBase {
    matchingEnabled = false;
    constructor(dataSource, options) {
        super(dataSource, options);
        if (!options.path) { options.path = '../cs/stock-valuation'; }
        if (!options.listPath) { options.listPath = '../cs/stock-valuations'; }
    }

    async getValuationItemListOptions() {
        var transactionLines = this.dataSource.cx.table(_cxSchema.cs_stockValuationItem);
        await transactionLines.select({ stockValuationId: this.options.query.id });

        var transactionLinesOptions = await this.listOptions(transactionLines, { listView: true, documentType: this.dataSource.documentType });
        transactionLinesOptions.quickSearch = !this.options.embedded;
        return transactionLinesOptions;
    }

    async getDocumentLogListOptions() {
        var transactionLogs = this.dataSource.cx.table(_cxSchema.cs_stockValuationLog);
        await transactionLogs.select({ pid: this.options.query.id });

        var transactionLogsOptions = await this.listOptions(transactionLogs, { listView: true });
        transactionLogsOptions.quickSearch = true;
        return transactionLogsOptions;
    }

    async getErpGLListOptions(erpSett) {
        var transactionLines = this.dataSource.cx.table(_cxSchema.cs_erp_transaction_gl);
        await transactionLines.select({ id: this.options.query.id });

        if (this.options.allowEdit && this.options.mode == 'edit') {
            transactionLines.forceReadOnly = this.options.query.line == 'T';
        }
        if (this.invoiceEditMode == _cxConst.CP_PREFERENCE.INVOICE_EDIT_MODE.VALUES.ITEM_ONLY) {
            transactionLines.forceReadOnly = true;
        }

        var transactionLinesOptions = await this.listOptions(transactionLines, { listView: true, id: 'glItems', query: this.options.query, mergeGLAndTax: erpSett.mergeGLAndTax, showGlSegment3: erpSett.showGlSegment3 });
        transactionLinesOptions.quickSearch = true;
        transactionLinesOptions.title = '<span>erp gl transactions</span>';

        if (!transactionLines.forceReadOnly) {
            transactionLinesOptions.hideTitlePanel = true;
            transactionLinesOptions.lookupLists = {};

            var glAccounts = await this.dataSource.cx.table(_cxSchema.erp_gl_account).toErpLookUpList(this.dataSource.shopId, erpSett.erpCostCentre, erpSett.mergeGLAndTax);
            transactionLinesOptions.lookupLists[_cxSchema.cs_erp_transaction_gl.GLACCOUNTSEG1] = glAccounts;

            var glAccountSegs2 = await this.dataSource.cx.table(_cxSchema.erp_gl_account).toErpSeg2LookUpList(this.dataSource.shopId);
            transactionLinesOptions.lookupLists[_cxSchema.cs_erp_transaction_gl.GLACCOUNTSEG2] = glAccountSegs2;

            if (erpSett.mergeGLAndTax) {
                var taxAccounts = await this.dataSource.cx.table(_cxSchema.erp_tax_account).toErpLookUpList(this.dataSource.shopId);
                transactionLinesOptions.lookupLists[_cxSchema.cs_erp_transaction_tax.TAXACCOUNT] = taxAccounts;
            }

        }
        return transactionLinesOptions;
    }

    async getErpTaxListOptions() {
        var transactionLines = this.dataSource.cx.table(_cxSchema.cs_erp_transaction_tax);
        await transactionLines.select({ id: this.options.query.id });

        if (this.options.allowEdit && this.options.mode == 'edit') {
            transactionLines.forceReadOnly = this.options.query.line == 'T';
        }

        var transactionLinesOptions = await this.listOptions(transactionLines, { listView: true, id: 'taxItems', query: this.options.query });
        transactionLinesOptions.quickSearch = true;
        transactionLinesOptions.title = '<span>erp tax transactions</span>';

        if (!transactionLines.forceReadOnly) {
            transactionLinesOptions.hideTitlePanel = true;
            transactionLinesOptions.lookupLists = {};

            var taxAccounts = await this.dataSource.cx.table(_cxSchema.erp_tax_account).toErpLookUpList(this.dataSource.shopId);
            transactionLinesOptions.lookupLists[_cxSchema.cs_erp_transaction_tax.TAXACCOUNT] = taxAccounts;

        }
        return transactionLinesOptions;
    }



    async buildFormLists() {
        var erpSett = await this.dataSource.cx.table(_cxSchema.erp_shop_setting).fetchOrNew(this.dataSource.shopId);
        var erpSubListsGroupStyles = (erpSett.mergeGLAndTax) ? ['width: 100%; min-width: 500px;'] : ['width: 60%; min-width: 500px;', 'min-width: 400px;'];


        var erpSubListsGroup = { group: 'erp_sublists', columnCount: 2, styles: erpSubListsGroupStyles, fields: [] };
        this.options.fields.push(erpSubListsGroup);

        var erpGlLineOptions = await this.getErpGLListOptions(erpSett);
        erpSubListsGroup.fields.push({ group: 'erp_gl_lines', title: 'erp gl lines', column: 1, fields: [erpGlLineOptions] });
        if (!erpSett.mergeGLAndTax) {
            var erpTaxLineOptions = await this.getErpTaxListOptions(erpSett);
            erpSubListsGroup.fields.push({ group: 'erp_tax_lines', title: 'erp tax lines', column: 2, fields: [erpTaxLineOptions] });
        }

        var subListsGroup = { group: 'sublists', columnCount: 1, fields: [] };
        this.options.fields.push(subListsGroup);

        var transactionLineOptions = await this.getValuationItemListOptions();
        subListsGroup.fields.push({ group: 'items', title: 'stock valuation items', column: 1, fields: [transactionLineOptions] })

        if (this.options.query.viewLogs == 'T') {
            var transactionLogOptions = await this.getDocumentLogListOptions();
            this.options.fields.push({
                group: 'sublists_logs', columnCount: 1, fields: [{ group: 'logs', title: 'document logs', column: 1, fields: [transactionLogOptions], collapsed: true }]
            });

        }

    }


    async _record() {

        var docNumber = this.dataSource.reference || this.dataSource.date;
        this.options.tabTitle = `${_cxConst.CS_STOCK_VALUATION.TYPE.getName(this.dataSource.type).toUpperCase()} [${docNumber}]`;

        var applyStoreColorStyle = 'border: 5px solid var(--main-bg-color); display: table-cell; padding: 3px 17px 5px 17px; border-radius: 15px; font-size: 24px; overflow: hidden; text-align: center; vertical-align: middle;';
        // start with doc type and number
        this.options.title = `<div style="display: table;">`;
        // document number 
        this.options.title += `<div style="display: table-cell; padding: 5px 17px 3px 17px;">${docNumber}</div>`;

        // document status
        this.options.title += `
            <div style="${applyStoreColorStyle} ${_cxConst.CS_STOCK_VALUATION.STATUS.getStyleInverted(this.dataSource.status)}">
                ${_cxConst.CS_STOCK_VALUATION.STATUS.getName(this.dataSource.status)}
            </div>
        `;
        this.options.title += '</div>';

        var fieldGroups = [];
        fieldGroups.push({
            group: 'main1', title: 'main info', column: fieldGroups.length + 1, columnCount: 1, minWidth: '300px', fields: [
                {
                    group: 'main1.col1', column: 1, columnCount: 2, fields: [
                        await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId' }),
                        { name: _cxSchema.cs_stockValuation.TYPE, label: 'type', lookUps: _cxConst.CS_STOCK_VALUATION.TYPE.toList(), column: 2 },
                        { name: _cxSchema.cs_stockValuation.REFERENCE, label: 'reference' },
                        { name: _cxSchema.cs_stockValuation.NOTES, label: 'notes' },
                    ]
                }
            ]
        })

        var fieldGroups_totals = {
            group: 'totals', title: 'totals', column: fieldGroups.length + 1, columnCount: 2, inline: true, width: '300px', fields: [
                { name: _cxSchema.cs_stockValuation.TOTALCOSTVALUE, label: 'total cost value', formatMoney: 'N2' },
                { name: _cxSchema.cs_stockValuation.TOTALRETAILVALUE, label: 'total retail value', column: 2, formatMoney: 'N2' },
                { name: _cxSchema.cs_stockValuation.TOTALUNITSINSTOCK, label: 'total units in stock', formatMoney: 'N2' },
            ]
        };
        fieldGroups.push(fieldGroups_totals);

        fieldGroups.push({
            group: 'audit', title: 'audit info', column: fieldGroups.length + 1, columnCount: 1, width: '400px', fields: [
                {
                    group: 'audit0', title: '', column: 1, columnCount: 2, inline: true, fields: [
                        { name: _cxSchema.cs_stockValuation.STATUS, label: 'status', column: 1, readOnly: true, lookUps: _cxConst.CS_STOCK_VALUATION.STATUS.toList() },
                        { name: _cxSchema.cs_stockValuation.STATUSMESSAGE, label: 'status message', column: 2, readOnly: true },
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
        })

        this.options.fields = [{ group: 'main', title: '', columnCount: fieldGroups.length, fields: fieldGroups, }];

        await this.buildFormLists();

        if (this.options.mode == 'view') {
            var s = this.dataSource.status;
            // allow to refresh only under certain statuses
            if (s == _cxConst.CS_STOCK_VALUATION.STATUS.New || s == _cxConst.CS_STOCK_VALUATION.STATUS.NeedAttention || s == _cxConst.CS_STOCK_VALUATION.STATUS.PostingReady || s == _cxConst.CS_STOCK_VALUATION.STATUS.Error) {
                this.options.buttons.push({ id: 'cs_refresh_data', text: 'Refresh Data', function: 'refreshData' });
            } else if (s == _cxConst.CS_STOCK_VALUATION.STATUS.DeleteAndPull || s == _cxConst.CS_STOCK_VALUATION.STATUS.Refresh || s == _cxConst.CS_STOCK_VALUATION.STATUS.Transferring) {
                this.options.buttons.push({ id: 'cs_reset_data', text: 'Reset', function: 'resetStatus' });
            } else if (s == _cxConst.CS_STOCK_VALUATION.STATUS.Posting || s == _cxConst.CS_STOCK_VALUATION.STATUS.PostingRunning || s == _cxConst.CS_STOCK_VALUATION.STATUS.Posted || s == _cxConst.CS_STOCK_VALUATION.STATUS.PostingError || s == _cxConst.CS_STOCK_VALUATION.STATUS.PostingPrepAndPost) {
                if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.CX_SUPPORT) {
                    this.options.buttons.push({ id: 'cp_reset_data', text: 'Un-Post', style: 'color: white; background-color: rgba(230,0,0,1);', function: 'resetPostedStatus' });
                }
            }

            if (s == _cxConst.CS_STOCK_VALUATION.STATUS.PostingReady) {
                var erpShopSetting = this.dataSource.cx.table(_cxSchema.erp_shop_setting);
                var erpName = await erpShopSetting.getErpName(this.dataSource.shopId);
                var btnPostToErp = { id: 'cs_post_erp', text: 'Post to ' + erpName, function: 'postData', style: 'color: var(--action-btn-color); background-color: var(--action-btn-bg-color);', };
                this.options.buttons.push(btnPostToErp);
            }

            if (s == _cxConst.CS_STOCK_VALUATION.STATUS.New || s == _cxConst.CS_STOCK_VALUATION.STATUS.NeedAttention || s == _cxConst.CS_STOCK_VALUATION.STATUS.PostingReady || s == _cxConst.CS_STOCK_VALUATION.STATUS.Error) {
                this.options.buttons.push({ id: 'cs_delete_document', text: 'Delete', function: 'deleteData', style: 'color: white; background-color: rgba(230,0,0,1);' });
            }

            var buttonLabel = (this.options.query.viewLogs == 'T') ? 'Hide Logs' : 'Show Logs';
            this.options.buttons.push({ id: 'cs_view_logs', text: buttonLabel, function: 'viewLogs' });

        }

        if (this.options.embedded) { this.options.buttons = []; }
    }

    async _list() {
        try {
            if (this.options.query) {
                this.options.paging = true;
                this.options.pageNo = (this.options.query.page || 1);
            }

            this.options.filters = [];
            this.options.filters.push(await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }));
            this.options.filters.push({ label: 'type', fieldName: _cxSchema.cs_stockValuation.TYPE, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CS_STOCK_VALUATION.TYPE.toList('- all -') });
            this.options.filters.push({ label: 'state', fieldName: 'sta', width: '100px', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CS_STOCK_VALUATION.STATE.toList('- all -'), });
            this.options.filters.push({ label: 'reference', fieldName: _cxSchema.cs_stockValuation.REFERENCE, width: '150px', type: _cxConst.RENDER.CTRL_TYPE.TEXT });
            this.options.filters.push({ label: 'from', fieldName: _cxSchema.cs_stockValuation.DATE, type: _cxConst.RENDER.CTRL_TYPE.DATE, width: '120px' });
            this.options.filters.push({ label: 'to', fieldName: _cxSchema.cs_stockValuation.DATE + 'To', type: _cxConst.RENDER.CTRL_TYPE.DATE, width: '120px' });
            this.options.filters.push({ label: 'product details', fieldName: 'pdt', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '250px' });
            this.options.filters.push({
                label: 'search in fields', fieldName: 'pdtt', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: [
                    { value: 'all', text: 'all product fields' },
                    { value: 'barcode', text: 'product bar-code' },
                    { value: 'code', text: 'product code' },
                    { value: 'descr', text: 'product description' },
                ],
                width: '150px'
            });


            this.options.columns = [];
            this.options.columns.push({ name: _cxSchema.cs_stockValuation.STOCKVALUATIONID, title: ' ', align: 'center' });
            //this.options.columns.push({ name: 'editedIcon', title: '&#x270E;', align: 'center', width: '10px', headerToolTip: 'edited flag' });
            this.options.columns.push({ name: 'shopInfo', title: 'store', width: '200px' });
            this.options.columns.push({ name: _cxSchema.cs_stockValuation.STATUS, title: 'status', lookUps: _cxConst.CS_STOCK_VALUATION.STATUS.toList(), align: 'center', width: '70px' });
            this.options.columns.push({ name: _cxSchema.cs_stockValuation.TYPE, title: 'type', align: 'center', width: '70px', lookUps: _cxConst.CS_STOCK_VALUATION.TYPE.toList() });
            this.options.columns.push({ name: _cxSchema.cs_stockValuation.DATE, title: 'date', align: 'center', width: '100px' });
            this.options.columns.push({ name: _cxSchema.cs_stockValuation.REFERENCE, title: 'reference' });
            this.options.columns.push({ name: _cxSchema.cs_stockValuation.NOTES, title: 'notes' });
            this.options.columns.push({ name: _cxSchema.cs_stockValuation.TOTALCOSTVALUE, title: 'total cost', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
            this.options.columns.push({ name: _cxSchema.cs_stockValuation.TOTALRETAILVALUE, title: 'total retail', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
            this.options.columns.push({ name: _cxSchema.cs_stockValuation.TOTALUNITSINSTOCK, title: 'total units', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
            this.options.columns.push({ name: _cxSchema.cs_stockValuation.CREATED, title: 'created', align: 'center', width: '130px' });


            var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
            var statuses = _cxConst.CS_STOCK_VALUATION.STATUS.toList();
            for (let sx = 0; sx < statuses.length; sx++) {
                const s = statuses[sx];
                this.options.cellHighlights.push({
                    column: _cxSchema.cs_stockValuation.STATUS,
                    op: '=',
                    value: s.value,
                    style: _cxConst.CS_STOCK_VALUATION.STATUS.getStyleInverted(s.value) + applyStyle,
                    columns: ['status']
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

module.exports = CSStockValuationRender;
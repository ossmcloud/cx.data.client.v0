'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPDeliveryReturnRender extends RenderBase {
    matchingEnabled = false;
    constructor(dataSource, options) {
        super(dataSource, options);
        if (!options.path) { options.path = '../cp/delivery'; }
        if (!options.listPath) { options.listPath = '../cp/deliveries'; }
        this.matchingEnabled = this.hasModule('cm');
    }

    async getDocumentLineListOptions() {
        var transactionLines = this.dataSource.cx.table(_cxSchema.cp_deliveryReturnLine);
        await transactionLines.select({ pid: this.options.query.id });

        var transactionLinesOptions = await this.listOptions(transactionLines, { listView: true });
        transactionLinesOptions.quickSearch = true;
        return transactionLinesOptions;
    }

    async getDocumentLogListOptions() {
        var transactionLogs = this.dataSource.cx.table(_cxSchema.cp_deliveryReturnLog);
        await transactionLogs.select({ pid: this.options.query.id });

        var transactionLogsOptions = await this.listOptions(transactionLogs, { listView: true });
        transactionLogsOptions.quickSearch = true;
        return transactionLogsOptions;
    }

    async getRelatedDocumentListOptions() {
        var relatedTransactions = this.dataSource.cx.table(_cxSchema.cp_invoiceCredit);
        await relatedTransactions.select({ from: this.options.query.id });
        if (relatedTransactions.count() == 0) { return null; }

        var relatedTransactionsOptions = await this.listOptions(relatedTransactions, { listView: true });
        relatedTransactionsOptions.columns.splice(1, 1);
        //relatedTransactionsOptions.quickSearch = true;
        return relatedTransactionsOptions;
    }


    async getAttachmentListOptions() {
        var attachments = this.dataSource.cx.table(_cxSchema.cx_attachment);
        await attachments.select({ shopId: this.dataSource.shopId, recordType: this.dataSource.type, recordId: this.options.query.id });
        if (attachments.count() == 0) { return null; }
        var attachmentsOptions = await this.listOptions(attachments, { listView: true });
        return {
            options: attachmentsOptions,
            shortList: attachments.toHtmlList(),
        };
    }



    async _record() {
        var query = await this.dataSource.cx.table(_cxSchema.cp_query).fetchOpenQuery(this.dataSource.id, true, true);
        var generatedDocs = await this.dataSource.cx.exec({
            sql: 'select count(*) as generatedDocs from cp_invoiceCredit where createdFrom = @delRetId and createdFromType = @documentType',
            params: [
                { name: 'delRetId', value: this.dataSource.id },
                { name: 'documentType', value: this.dataSource.documentType }
            ],
            returnFirst: true
        });
        generatedDocs = generatedDocs.generatedDocs > 0;

        var docNumber = this.dataSource.documentNumber || this.dataSource.documentId;
        this.options.tabTitle = `${this.dataSource.documentTypeName.toUpperCase()} [${docNumber}]`;

        var applyStoreColorStyle = 'border: 5px solid var(--main-bg-color); display: table-cell; padding: 3px 17px 5px 17px; border-radius: 15px; font-size: 24px; overflow: hidden; text-align: center; vertical-align: middle;';
        // start with doc type and number
        this.options.title = `<div style="display: table;">`;
        // document number 
        this.options.title += `<div style="display: table-cell; padding: 5px 17px 3px 17px;">${docNumber}</div>`;

        if (query) {
            var viewQueryButton = `cursor: pointer;" onclick="window.open('&#47;cp&#47;query?id=${query.queryId}');`;
            this.options.title += `
                <div style="${applyStoreColorStyle} background-color: yellow; color: maroon; ${viewQueryButton}">
                    &#x26A0;
                </div>
            `;
        }

        // document type
        this.options.title += `
            <div style="${applyStoreColorStyle} ${_cxConst.CP_DOCUMENT.TYPE.getStyleInverted(this.dataSource.documentType)}">
                ${_cxConst.CP_DOCUMENT.TYPE.getName(this.dataSource.documentType).toLowerCase()}
            </div>
        `;
        // document status
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

        this.options.title += '</div>';


        var fieldGroups = [];
        fieldGroups.push({
            group: 'main1', title: 'main info', column: fieldGroups.length + 1, columnCount: 3, minWidth: '300px', fields: [
                {
                    group: 'main1.col1', column: 1, columnCount: 1, fields: [
                        await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId' }),
                        { name: _cxSchema.cp_deliveryReturn.DOCUMENTTYPE + 'Name', label: 'document type' },
                        { name: _cxSchema.cp_deliveryReturn.DOCUMENTID, label: 'document epos id' },
                    ]
                },
                {
                    group: 'main1.col2', column: 2, columnCount: 1, fields: [
                        { name: _cxSchema.cp_deliveryReturn.SUPPLIERCODE, label: 'supplier' },
                        { name: _cxSchema.cp_deliveryReturn.DOCUMENTDATE, label: 'date' },
                        { name: _cxSchema.cp_deliveryReturn.UPLOADDATE, label: 'upload date' },
                    ]
                },
                {
                    group: 'main1.col3', column: 3, columnCount: 1, fields: [
                        { name: _cxSchema.cp_deliveryReturn.CURRENCY, label: 'currency' },
                        { name: _cxSchema.cp_deliveryReturn.DOCUMENTNUMBER, label: 'document number' },
                    ]
                },
            ]
        })

        fieldGroups.push({
            group: 'main_ref', title: 'document references', column: fieldGroups.length + 1, columnCount: 1, width: '250px', fields: [
                { name: _cxSchema.cp_deliveryReturn.DOCUMENTREFERENCE, label: 'reference 1' },
                { name: _cxSchema.cp_deliveryReturn.DOCUMENTSECONDREFERENCE, label: 'reference 2' },
                { name: _cxSchema.cp_deliveryReturn.DOCUMENTMEMO, label: 'memo' },

            ]
        })

        fieldGroups.push({
            group: 'totals', title: 'totals', column: fieldGroups.length + 1, columnCount: 2, inline: true, width: '300px', fields: [
                { name: _cxSchema.cp_deliveryReturn.TOTALNET, label: 'total net', formatMoney: 'N2' },
                { name: _cxSchema.cp_deliveryReturn.TOTALDISCOUNT, label: 'discount', column: 2, formatMoney: 'N2' },
                { name: _cxSchema.cp_deliveryReturn.TOTALVAT, label: 'total vat', formatMoney: 'N2' },
                { name: _cxSchema.cp_deliveryReturn.TOTALGROSS, label: 'total gross', formatMoney: 'N2' },
            ]
        })

        var attachmentOptions = await this.getAttachmentListOptions();
        if (attachmentOptions) {
            fieldGroups.push({ group: 'attach', title: 'attachments', column: fieldGroups.length + 1, width: '400px', fields: [{ html: attachmentOptions.shortList }] })
        }

        fieldGroups.push({
            group: 'audit', title: 'audit info', column: fieldGroups.length + 1, columnCount: 1, width: '400px', fields: [
                {
                    group: 'audit0', title: '', column: 1, columnCount: 2, inline: true, fields: [
                        { name: _cxSchema.cp_deliveryReturn.DOCUMENTSTATUS, label: 'status', column: 1, readOnly: true, lookUps: _cxConst.CP_DOCUMENT.STATUS.toList() },
                        { name: _cxSchema.cp_deliveryReturn.DOCUMENTSTATUSMESSAGE, label: 'status message', column: 2, readOnly: true },
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

        var subListsGroup = { group: 'sublists', columnCount: 2, fields: [] };
        this.options.fields.push(subListsGroup);

        var transactionLineOptions = await this.getDocumentLineListOptions();
        subListsGroup.fields.push({ group: 'lines', title: 'document lines', column: 1, fields: [transactionLineOptions] })

        var relatedTransactionsOptions = await this.getRelatedDocumentListOptions();
        if (relatedTransactionsOptions) {
            subListsGroup.fields.push({ group: 'logs', title: 'related documents', column: 1, fields: [relatedTransactionsOptions], collapsed: true });
        }


        if (attachmentOptions) {
            subListsGroup.fields.push({ group: 'attachments_list', title: 'attachments', column: 1, fields: [attachmentOptions.options], collapsed: true });
        }

        if (this.options.query.viewLogs == 'T') {
            var transactionLogOptions = await this.getDocumentLogListOptions();
            subListsGroup.fields.push({ group: 'logs', title: 'document logs', column: 1, fields: [transactionLogOptions], collapsed: true });
        }


        if (this.options.mode == 'view') {

            var s = this.dataSource.documentStatus;
            // allow to refresh only under certain statuses
            if (s == _cxConst.CP_DOCUMENT.STATUS.New || s == _cxConst.CP_DOCUMENT.STATUS.Ready || s == _cxConst.CP_DOCUMENT.STATUS.NEED_ATTENTION || s == _cxConst.CP_DOCUMENT.STATUS.ERROR) {
                this.options.buttons.push({ id: 'cp_refresh_data', text: 'Refresh Data', function: 'refreshData' });
            }

            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.USER) {
                // @@TODO: check if we already have a doc for this

                if (!query && !generatedDocs) {
                    var generateDocumentLabel = 'Generate ' + ((this.dataSource.documentType == _cxConst.CP_DOCUMENT.TYPE.Delivery) ? 'Invoice' : 'Credit Note');
                    this.options.buttons.push({ id: 'cp_generate_doc', text: generateDocumentLabel, function: 'generateDocument' });
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
            if (await queries.select({ delRetId: this.dataSource.id })) {
                this.options.buttons.push({ id: 'cp_view_queries', text: 'View Queries', function: 'viewQueries' });
            }
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
                { label: 'type', fieldName: 'tt', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.TYPE_DR.toList('- all -') },
                { label: 'status', fieldName: 'st', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.STATUS.toList('- all -') },
                { label: 'supplier', fieldName: 'su', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
                { label: 'document no.', fieldName: 'tno', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
                { label: 'document refs.', fieldName: 'tref', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
                { label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE },
                { label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
                { label: 'upload date (from)', fieldName: 'udf', type: _cxConst.RENDER.CTRL_TYPE.DATE },
                { label: 'upload date (to)', fieldName: 'udt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            ];
            var signedCols = {
                Net: _cxSchema.cp_deliveryReturn.TOTALNET + 'Sign',
                Vat: _cxSchema.cp_deliveryReturn.TOTALVAT + 'Sign',
                Gross: _cxSchema.cp_deliveryReturn.TOTALGROSS + 'Sign',
                Discount: _cxSchema.cp_deliveryReturn.TOTALDISCOUNT + 'Sign',
            }
            this.options.columns = [];
            this.options.columns.push({ name: _cxSchema.cp_deliveryReturn.DELRETID, title: ' ', align: 'center' });
            this.options.columns.push({ name: 'editedIcon', title: '&#x270E;', align: 'center', width: '10px', headerToolTip: 'edited flag' });
            this.options.columns.push({ name: 'shopInfo', title: 'store', width: '200px' });
            this.options.columns.push({ name: 'status', title: 'status', align: 'center', width: '70px' });
            this.options.columns.push({ name: _cxSchema.cp_deliveryReturn.DOCUMENTTYPE, title: 'type', align: 'center', width: '70px', lookUps: _cxConst.CP_DOCUMENT.TYPE.toList() });

            if (this.matchingEnabled) {
                var matchIcon = `<img src="/public/images/puzzle_${this.dataSource.cx.theme}.png" style="width: 20px" />`;
                this.options.columns.push({ name: 'recoStatus', title: matchIcon, align: 'center', width: '10px', headerToolTip: 'matching status', toolTip: { valueField: 'recoStatusName', suppressText: true } });

                var queryIcon = `<img src="/public/images/query_${this.dataSource.cx.theme}.png" style="width: 20px" />`;
                this.options.columns.push({ name: 'queryCount', title: queryIcon, nullText: '', align: 'center', width: '10px', headerToolTip: 'query count', toolTip: { valueField: 'queryCountDisplay', suppressText: true } });
            }

            //
            var queryIcon = `<img src="/public/images/attach_${this.dataSource.cx.theme}.png" style="width: 20px" />`;
            this.options.columns.push({ name: 'attachIcon', title: queryIcon, nullText: '', align: 'center', width: '10px', headerToolTip: 'attachments count', toolTip: { valueField: 'attachCountDisplay', suppressText: false } });
            //this.options.columns.push({ name: 'attachIcon', title: queryIcon, nullText: '', align: 'center', width: '10px' });

            this.options.columns.push({ name: _cxSchema.cp_deliveryReturn.DOCUMENTDATE, title: 'date', align: 'center', width: '100px' });
            this.options.columns.push({ name: _cxSchema.cp_deliveryReturn.SUPPLIERCODE, title: 'supplier' });
            this.options.columns.push({ name: 'supplierName', title: 'supplier name' });
            this.options.columns.push({ name: _cxSchema.cp_deliveryReturn.DOCUMENTNUMBER, title: 'document number' });
            this.options.columns.push({ name: _cxSchema.cp_deliveryReturn.DOCUMENTREFERENCE, title: 'document reference' });
            this.options.columns.push({ name: _cxSchema.cp_deliveryReturn.DOCUMENTSECONDREFERENCE, title: 'second reference' });
            this.options.columns.push({ name: signedCols.Discount, title: 'discount', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
            this.options.columns.push({ name: signedCols.Net, title: 'net', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
            this.options.columns.push({ name: signedCols.Vat, title: 'tax', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
            this.options.columns.push({ name: signedCols.Gross, title: 'gross', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
            this.options.columns.push({ name: _cxSchema.cp_deliveryReturn.UPLOADDATE, title: 'upload date', align: 'center', width: '100px' });
            this.options.columns.push({ name: _cxSchema.cp_deliveryReturn.CREATED, title: 'created', align: 'center', width: '130px' });



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
                    column: _cxSchema.cp_deliveryReturn.DOCUMENTSTATUS,
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
                // this.options.cellHighlights.push({
                //     column: 'attachCount',
                //     op: '>',
                //     value: 0,
                //     style: 'background-color: rgb(0,127,127); color: maroon; padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;',
                //     columns: ['attachCount']
                // })
            }


            var types = _cxConst.CP_DOCUMENT.TYPE.toList();
            for (let sx = 0; sx < types.length; sx++) {
                const s = types[sx];
                this.options.cellHighlights.push({
                    column: _cxSchema.cp_deliveryReturn.DOCUMENTTYPE,
                    op: '=',
                    value: s.value,
                    style: _cxConst.CP_DOCUMENT.TYPE.getStyleInverted(s.value) + applyStyle,
                    columns: [_cxSchema.cp_deliveryReturn.DOCUMENTTYPE]
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

module.exports = CPDeliveryReturnRender;
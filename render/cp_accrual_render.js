'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPAccrualRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'accrual';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.cp_accrual.ACCRID] = null;
        this.autoLoadFields[_cxSchema.cp_accrual.SHOPID] = null;
        this.autoLoadFields[_cxSchema.cp_accrual.DOCUMENTSTATUS] = null;
        this.autoLoadFields[_cxSchema.cp_accrual.DOCUMENTNUMBER] = null;
        this.autoLoadFields[_cxSchema.cp_accrual.DOCUMENTREFERENCE] = null;
        this.autoLoadFields[_cxSchema.cp_accrual.DOCUMENTSECONDREFERENCE] = null;
        this.autoLoadFields[_cxSchema.cp_accrual.TOTALNET] = null;
        this.autoLoadFields[_cxSchema.cp_accrual.TOTALVAT] = null;
        this.autoLoadFields[_cxSchema.cp_accrual.TOTALGROSS] = null;
        this.autoLoadFields[_cxSchema.cp_accrual.TOTALDRS] = null;
        this.autoLoadFields[_cxSchema.cp_accrual.CREATEDBY] = null;
        this.autoLoadFields[_cxSchema.cp_accrual.CREATED] = null;
        
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.cp_query.SHOPID) {
            column.name = 'shopInfo';
            column.title = 'store';
            column.addTotals = false;
            column.align = 'left';
        } else if (field.name == _cxSchema.cp_accrual.DOCUMENTSTATUS) {
            column.title = 'status';
            column.addTotals = false;
            column.align = 'center';
            column.lookUps = _cxConst.CP_DOCUMENT.STATUS.toList();
            column.width = '75px';
        } else if (field.name == _cxSchema.cp_accrual.DOCUMENTSTATUSMESSAGE || field.name == _cxSchema.cp_accrual.SYSINFO) {
            column.hide = true;
        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_accrual.SHOPID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 'shopId' });
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_accrual.DOCUMENTSTATUS) {
            filter.replace = { label: 'status', fieldName: _cxSchema.cp_accrual.DOCUMENTSTATUS, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.STATE_INV.toList('- all -') }
            filter.hide = false;
        } else {
            filter.hide = true;
        }
    }

    async _list() {
        this.options.title = 'accrual list';

        var applyStoreColorStyle = 'padding: 3px 7px 3px 7px; border-radius: 5px; width: auto; display: block; overflow: hidden; text-align: left;';
        var shopColors = await this.dataSource.cx.table(_cxSchema.cx_shop).selectColors();
        for (var cx = 0; cx < shopColors.length; cx++) {
            if (!shopColors[cx].shopColor) { continue; }
            this.options.cellHighlights.push({
                column: 'shopId', op: '=', value: shopColors[cx].shopId, style: 'background-color: rgba(' + shopColors[cx].shopColor + ', 0.5); ' + applyStoreColorStyle, columns: ['shopInfo']
            })
        }

        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        var statuses = _cxConst.CP_DOCUMENT.STATUS.toList();
        for (let sx = 0; sx < statuses.length; sx++) {
            const s = statuses[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.cp_accrual.DOCUMENTSTATUS,
                op: '=',
                value: s.value,
                style: _cxConst.CP_DOCUMENT.STATUS.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.cp_accrual.DOCUMENTSTATUS]
            })
        }

    }




    async getDocumentLogListOptions() {
        var transactionLogs = this.dataSource.cx.table(_cxSchema.cp_accrualLog);
        await transactionLogs.select({ pid: this.options.query.id });
        var transactionLogsOptions = await this.listOptions(transactionLogs, { listView: true });
        transactionLogsOptions.quickSearch = true;
        return transactionLogsOptions;
    }
    async getDeliveryListOptions() {
        var canDetachDocuments = false;
        var s = this.dataSource.documentStatus;
        if (s == _cxConst.CP_DOCUMENT.STATUS.New || s == _cxConst.CP_DOCUMENT.STATUS.Ready || s == _cxConst.CP_DOCUMENT.STATUS.PostingReady || s == _cxConst.CP_DOCUMENT.STATUS.NEED_ATTENTION) {
            canDetachDocuments = true;
        }

        var transactions = this.dataSource.cx.table(_cxSchema.cp_deliveryReturn);
        await transactions.select({ accrId: this.options.query.id, noPaging: true });

        var transactionsOptions = await this.listOptions(transactions, { listView: true, linkTarget: '_blank', canDetachDocuments: canDetachDocuments });
        transactionsOptions.quickSearch = true;
        return transactionsOptions;
    }



    setRecordTitle() {
        // SET TAB TITLE
        this.options.tabTitle = `accrual`;
        // SET DOCUMENT TILE WITH DOC TYPE, STATUS AND EDITED BUBBLES
        var applyStoreColorStyle = 'border: 5px solid var(--main-bg-color); display: table-cell; padding: 3px 17px 5px 17px; border-radius: 15px; font-size: 24px; overflow: hidden; text-align: center; vertical-align: middle;';
        this.options.title = `<div style="display: table;">`;
        this.options.title += `<div style="display: table-cell; padding: 5px 17px 3px 17px;">${this.dataSource.documentNumber}</div>`;
        this.options.title += `
            <div style="${applyStoreColorStyle} ${_cxConst.CP_DOCUMENT.STATUS.getStyleInverted(this.dataSource.documentStatus)}">
                ${_cxConst.CP_DOCUMENT.STATUS.getName(this.dataSource.documentStatus)}
            </div>
        `;
        this.options.title += '</div>';
    }

    buildFormActions(erpName) {
        if (this.options.mode == 'view') {
            var s = this.dataSource.documentStatus;
            // 
            if (s == _cxConst.CP_DOCUMENT.STATUS.NEED_ATTENTION) {
                this.options.buttons.push({ id: 'cp_view_missmapped', text: 'View Mis-mapped Products', function: 'viewMisMappedProds' });
            }

            // allow to refresh only under certain statuses
            if (s == _cxConst.CP_DOCUMENT.STATUS.New || s == _cxConst.CP_DOCUMENT.STATUS.Ready || s == _cxConst.CP_DOCUMENT.STATUS.PostingReady || s == _cxConst.CP_DOCUMENT.STATUS.NEED_ATTENTION || s == _cxConst.CP_DOCUMENT.STATUS.ERROR) {
                this.options.buttons.push({ id: 'cp_refresh_data', text: 'Refresh Data', function: 'refreshData' });
            }
            // allow to post based on role only under certain statuses
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.USER) {
                if (s == _cxConst.CP_DOCUMENT.STATUS.PostingReady && !this.options.formBanner) {
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
            // in case something went wrong and we need to reset
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.CX_SUPPORT) {
                if (s == _cxConst.CP_DOCUMENT.STATUS.REFRESH) {
                    this.options.buttons.push({ id: 'cp_reset_status', text: 'Reset To Ready', function: 'resetStatus', style: 'color: var(--action-btn-color); background-color: var(--action-btn-bg-color);' });
                }
            }

            // allow to delete if not posted
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.USER) {
                if (s != _cxConst.CP_DOCUMENT.STATUS.Posting && s != _cxConst.CP_DOCUMENT.STATUS.PostingRunning && s != _cxConst.CP_DOCUMENT.STATUS.PostingError && s != _cxConst.CP_DOCUMENT.STATUS.Posted && s != _cxConst.CP_DOCUMENT.STATUS.REFRESH) {
                    this.options.buttons.push({ id: 'cp_delete_document', text: 'Delete', function: 'deleteDocument', style: 'color: white; background-color: rgba(230,0,0,1);' });
                }
            }

            var buttonLabel = (this.options.query.viewLogs == 'T') ? 'Hide Logs' : 'Show Logs';
            this.options.buttons.push({ id: 'cp_view_logs', text: buttonLabel, function: 'viewLogs' });
        }
    }

    async buildFormLists() {
        var deliveriesOptions = await this.getDeliveryListOptions();
        this.options.fields.push({ group: 'deliveries', title: 'deliveries', fields: [deliveriesOptions], collapsed: true });

        if (this.options.query.viewLogs == 'T') {
            var transactionLogOptions = await this.getDocumentLogListOptions();
            this.options.fields.push({ group: 'logs', title: 'document logs', fields: [transactionLogOptions], collapsed: true });
        }

    }

    async _record() {
        this.options.fields = [];

        var readOnly = true;
        if (this.options.mode != 'view') { readOnly = this.dataSource.documentStatus < _cxConst.CP_DOCUMENT.STATUS.Posting; }
        if (this.dataSource.documentStatus >= _cxConst.CP_DOCUMENT.STATUS.Posting) { this.options.allowEdit = false; }

        var fieldGroup_totals = {
            group: 'totals', title: 'totals', column: 3, columnCount: 2, inline: true, fields: [
                { name: _cxSchema.cp_accrual.TOTALNET, label: 'total net', formatMoney: 'N2', readOnly: true },
                { name: _cxSchema.cp_accrual.TOTALVAT, label: 'total vat', formatMoney: 'N2', readOnly: true },
                { name: _cxSchema.cp_accrual.TOTALGROSS, label: 'total gross', formatMoney: 'N2', readOnly: true },
            ]
        };
        if (this.cx.accountCountry == 'IE') {
            // DRS Scheme - only in Ireland
            fieldGroup_totals.fields.unshift({ name: _cxSchema.cp_accrual.TOTALDRS, label: 'DRS', column: 2, formatMoney: 'N2', readOnly: true });
        }

        this.options.fields = [
            {
                group: 'main', title: '', columnCount: 4, styles: ['min-width: 500px', 'min-width: 250px', 'min-width: 250px', 'min-width: 350px'], fields: [
                    {
                        group: 'main1', title: 'main info', column: 1, columnCount: 2, fields: [
                            {
                                group: 'main1.col1', column: 1, columnCount: 1, fields: [
                                    await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId', readOnly: true }),
                                ]
                            },
                            {
                                group: 'main1.col2', column: 2, columnCount: 1, fields: [
                                    { name: _cxSchema.cp_accrual.DOCUMENTDATE, label: 'date', width: '100%', validation: '{ "mandatory": true }' },
                                    { name: _cxSchema.cp_accrual.DOCUMENTNUMBER, label: 'document number', width: '100%', validation: '{ "mandatory": true, "max": 20  }' },
                                    { name: _cxSchema.cp_accrual.CURRENCY, label: 'currency', readOnly: true },
                                ]
                            },
                        ]
                    },

                    {
                        group: 'main_ref', title: 'document references', column: 2, columnCount: 1, fields: [
                            { name: _cxSchema.cp_accrual.DOCUMENTREFERENCE, label: 'reference 1' },
                            { name: _cxSchema.cp_accrual.DOCUMENTSECONDREFERENCE, label: 'reference 2' },
                            { name: _cxSchema.cp_accrual.DOCUMENTMEMO, label: 'memo' },

                        ]
                    },

                    fieldGroup_totals,

                    {
                        group: 'audit', title: 'audit info', column: 4, columnCount: 1, fields: [
                            {
                                group: 'audit0', title: '', column: 1, columnCount: 2, inline: true, fields: [
                                    { name: _cxSchema.cp_accrual.DOCUMENTSTATUS, label: 'status', column: 1, readOnly: true, lookUps: _cxConst.CP_DOCUMENT.STATUS.toList() },
                                    { name: _cxSchema.cp_accrual.DOCUMENTSTATUSMESSAGE, label: 'status message', column: 2, readOnly: true },
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
            }
        ];


        this.options.formBanner = await this.validateErpToken();

        await this.buildFormLists(); 

        var erpShopSetting = this.dataSource.cx.table(_cxSchema.erp_shop_setting);
        var erpName = await erpShopSetting.getErpName(this.dataSource.shopId);

        this.buildFormActions(erpName);
        this.setRecordTitle();

    }
}


module.exports = CPAccrualRender;

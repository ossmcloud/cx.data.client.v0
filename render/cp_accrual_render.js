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




    // async getQueryLogListOptions() {
    //     var queryLogs = this.dataSource.cx.table(_cxSchema.cp_queryLog);
    //     await queryLogs.select({ qid: this.dataSource.id });

    //     var queryLogsOptions = await this.listOptions(queryLogs, { listView: true });
    //     queryLogsOptions.quickSearch = true;
    //     queryLogsOptions.title = '<span>system logs</span>';
    //     return queryLogsOptions;
    // }

    // buildFormTitle() {
    //     var applyStyle = 'margin: 7px ;padding: 0px 7px 3px 7px; border-radius: 7px; width: calc(100% - 14px); display: inline; overflow: hidden; text-align: center;';
    //     this.options.title = `<div style="padding-bottom: 7px; width: 100%;"><table><tr>`;

    //     if (this.dataSource.invCreId) {
    //         this.options.title += `<td>${this.dataSource.wholesalerInfo} - query</td>`;
    //     } else {
    //         this.options.title += `<td>${this.dataSource.supplierInfo} - query</td>`;
    //     }

    //     this.options.title += `
    //         <td>
    //             <span style="${_cxConst.CP_QUERY_STATUS.getStyleInverted(this.dataSource.statusId) + applyStyle}">
    //                 ${_cxConst.CP_QUERY_STATUS.getName(this.dataSource.statusId)}
    //             </span>
    //         </td>`;

    //     if (this.dataSource.invCreId) {
    //         this.options.title += `
    //         <td style="padding-left: 17px;">
    //             <label style="display: block; padding: 0px;">invoice gross</label>
    //             <span  style="display: block; margin-bottom: -10px; color: var(--main-color-3);">${this.dataSource.documentGross}</span>
    //         </td>`;
    //     }

    //     if (this.dataSource.delRetId) {
    //         this.options.title += `
    //         <td style="padding-left: 17px;">
    //             <label style="display: block; padding: 0px;">delivery gross</label>
    //             <span  style="display: block; margin-bottom: -10px; color: var(--main-color-3);">${this.dataSource.docketGross}</span>
    //         </td>`;
    //     }
    //     this.options.title += `</tr></table></div>`;


    //     if (this.dataSource.isNew()) {
    //         this.options.tabTitle = `cx::new query`;
    //     } else {
    //         if (this.dataSource.queryReference == 'TBA') {
    //             this.options.tabTitle = `query::${_cxConst.CP_QUERY_STATUS.getName(this.dataSource.statusId)}`
    //         } else {
    //             this.options.tabTitle = `${this.dataSource.queryReference}`
    //         }
    //     }
    //     var icon = '';
    //     if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.RESOLVED) {
    //         icon = '\u2713 ';    // check mark
    //     } else if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.PENDING) {
    //         icon = '\u21BB ';
    //     } else if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.SUBMITTED || this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.IN_PROGRESS) {
    //         icon = '\u26A0 ';    // warning triangle
    //     } else if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.ERROR) {
    //         icon = '\u274C ';    // red x
    //     }
    //     this.options.tabTitle = `${icon}${this.options.tabTitle}`;

    // }


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




        // var body = { group: 'body', title: 'query messages', columnCount: 1, fields: [] };
        // body.fields = [
        //     { name: _cxSchema.cp_query.QUERYMESSAGE, label: 'query message', type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 7, column: 1, readOnly: readOnly, validation: '{"mandatory": true}' },
        //     { name: _cxSchema.cp_query.NOTES, label: 'internal notes', type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 3, column: 1, readOnly: readOnly },

        // ]
        // this.options.fields.push(body);

        // if (!this.dataSource.isNew()) {
        //     var queryLogOptions = await this.getQueryLogListOptions();
        //     var auditLogs = { group: 'logs', title: '', columnCount: 1, fields: [queryLogOptions] };
        //     this.options.fields.push(auditLogs);
        // }

        // var bwgShopOptions = await this.dataSource.cx.table(_cxSchema.cp_wholesalerShopConfig).getConfigValue(this.dataSource.wholesalerId, this.dataSource.shopId, _cxConst.CP_WHS_CONFIG.BWG_CRM_CONFIG, true);
        // if (this.options.mode == 'view') {
        //     if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.SUPERVISOR)
        //         if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.SUBMITTED || this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.IN_PROGRESS) {
        //             if (bwgShopOptions) {
        //                 this.options.buttons.push({ id: 'cp_check_status', text: 'Check BWG Status', function: 'checkQueryStatus' });
        //             }
        //         } else if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.RESOLVED || this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.RESOLVED_PENDING || this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.CLOSED) {
        //             if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.RESOLVED_PENDING) {
        //                 this.options.buttons.push({ id: 'cp_resolve_query', text: 'Mark as Resolved', function: 'resolveQuery' });
        //             }
        //             this.options.buttons.push({ id: 'cp_reopen_query', text: 'Re-Open', function: 'reopenQuery' });

        //         }

        // } else {
        //     if (!this.dataSource.isNew()) {
        //         if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.PENDING) {
        //             this.options.buttons.push({ id: 'cp_submit_query', text: 'Mark as submitted', function: 'submitQuery' });
        //         }
        //         if (this.dataSource.statusId != _cxConst.CP_QUERY_STATUS.CLOSED && this.dataSource.statusId != _cxConst.CP_QUERY_STATUS.RESOLVED) {
        //             this.options.buttons.push({ id: 'cp_close_query', text: 'Mark as closed', function: 'closeQuery' });
        //         }
        //     }
        // }

        // this.buildFormTitle();
    }
}


module.exports = CPAccrualRender;

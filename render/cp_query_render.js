'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPQueryRender extends RenderBase {
    #allQueryTypes = null;
    #allResolutionTypes = null;
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'document query';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.cp_query.QUERYID] = null;
        this.autoLoadFields[_cxSchema.cp_query.SHOPID] = null;
        this.autoLoadFields[_cxSchema.cp_query.STATUSID] = null;
        this.autoLoadFields[_cxSchema.cp_query.STATUSMESSAGE] = null;
        this.autoLoadFields[_cxSchema.cp_query.QUERYTYPEID] = null;
        this.autoLoadFields[_cxSchema.cp_query.INVCREID] = null;
        this.autoLoadFields[_cxSchema.cp_query.DELRETID] = null;

        this.autoLoadFields[_cxSchema.cp_query.DISPUTEDAMOUNT] = null;

        this.autoLoadFields[_cxSchema.cp_query.QUERYREFERENCE] = null;
        //this.autoLoadFields[_cxSchema.cp_query.NOTES] = null;
        this.autoLoadFields[_cxSchema.cp_query.SUBMITDATE] = null;
        this.autoLoadFields[_cxSchema.cp_query.RESOLUTIONTYPEID] = null;
        this.autoLoadFields[_cxSchema.cp_query.RESOLUTIONDATE] = null;

        //this.autoLoadFields[_cxSchema.cp_query.CREATED] = null;



    }

    async initColumn(field, column) {
        if (!this.#allQueryTypes) {
            this.#allQueryTypes = await this.dataSource.cx.table(_cxSchema.cp_queryType).toLookUpList(null, '- all -');
        }
        if (!this.#allResolutionTypes) {
            this.#allResolutionTypes = await this.dataSource.cx.table(_cxSchema.cp_queryResolutionType).toLookUpList(null, '- all -');
        }

        // if (field.name == _cxSchema.cp_query.WHOLESALERID) {
        //     column.name = 'wholesalerInfo';
        //     column.title = 'wholesaler';
        //     column.addTotals = false;
        //     column.align = 'left';
        // } else
        if (field.name == _cxSchema.cp_query.SHOPID) {
            column.name = 'shopInfo';
            column.title = 'store';
            column.addTotals = false;
            column.align = 'left';
        } else if (field.name == _cxSchema.cp_query.INVCREID) {
            column.name = 'documentNumber';
            column.title = 'document #';
            column.addTotals = false;
            column.align = 'left';
            column.link = { url: '/cp/invoice?id={documentNumber}', valueField: 'invCreId' };
        } else if (field.name == _cxSchema.cp_query.DELRETID) {
            column.name = 'docketNumber';
            column.title = 'docket #';
            column.addTotals = false;
            column.align = 'left';
            column.link = { url: '/cp/delivery?id={docketNumber}', valueField: 'delRetId' };
        } else if (field.name == _cxSchema.cp_query.QUERYTYPEID) {
            column.title = 'query type';
            column.addTotals = false;
            column.align = 'center';
            column.lookUps = this.#allQueryTypes;
        } else if (field.name == _cxSchema.cp_query.RESOLUTIONTYPEID) {
            column.title = 'resolution type';
            column.addTotals = false;
            column.align = 'center';
            column.lookUps = this.#allResolutionTypes;
            column.nullText = '';
        } else if (field.name == _cxSchema.cp_query.STATUSID) {
            column.title = 'status';
            column.addTotals = false;
            column.align = 'center';
            column.lookUps = _cxConst.CP_QUERY_STATUS.toList();
            column.width = '75px';
        } else if (field.name == _cxSchema.cp_query.DISPUTEDAMOUNT || field.name == _cxSchema.cp_query.RESOLUTIONDATE) {
            column.nullText = '';
        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_query.SHOPID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 'shopId' });
            filter.hide = false;
            // } else if (field.name == _cxSchema.cp_query.WHOLESALERID) {
            //     filter.replace = await this.filterDropDownOptions(_cxSchema.cp_wholesaler, { fieldName: 'wholesalerId' });
            //     filter.hide = false;
        } else if (field.name == _cxSchema.cp_query.STATUSID) {
            filter.replace = { label: 'status', fieldName: _cxSchema.cp_query.STATUSID, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_QUERY_STATUS.toList('- all -') }
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_query.QUERYTYPEID) {
            filter.replace = { label: 'query type', fieldName: _cxSchema.cp_query.QUERYTYPEID, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: this.#allQueryTypes }
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_query.INVCREID) {
            filter.replace = { label: 'document number', fieldName: 'doc.documentNumber' }
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_query.DELRETID) {
            filter.replace = { label: 'docket number', fieldName: 'del.documentNumber' }
            filter.hide = false;

        } else if (field.name == _cxSchema.cp_query.DISPUTEDAMOUNT || field.name == _cxSchema.cp_query.STATUSMESSAGE || field.name == _cxSchema.cp_query.CREATED) {
            filter.hide = true;
        }
    }

    async _list() {
        this.options.title = 'document query list';

        var applyStoreColorStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: auto; display: block; overflow: hidden; text-align: left;';
        var shopColors = await this.dataSource.cx.table(_cxSchema.cx_shop).selectColors();
        for (var cx = 0; cx < shopColors.length; cx++) {
            if (!shopColors[cx].shopColor) { continue; }
            this.options.cellHighlights.push({
                column: 'shopId', op: '=', value: shopColors[cx].shopId, style: 'background-color: rgba(' + shopColors[cx].shopColor + ', 0.5); ' + applyStoreColorStyle, columns: ['shopInfo']
            })
        }

        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        var statuses = _cxConst.CP_QUERY_STATUS.toList();
        for (let sx = 0; sx < statuses.length; sx++) {
            const s = statuses[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.cp_query.STATUSID,
                op: '=',
                value: s.value,
                style: _cxConst.CP_QUERY_STATUS.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.cp_query.STATUSID]
            })
        }

    }




    async getQueryLogListOptions() {
        var queryLogs = this.dataSource.cx.table(_cxSchema.cp_queryLog);
        await queryLogs.select({ qid: this.dataSource.id });

        var queryLogsOptions = await this.listOptions(queryLogs, { listView: true });
        queryLogsOptions.quickSearch = true;
        queryLogsOptions.title = '<span>system logs</span>';
        return queryLogsOptions;
    }

    buildFormTitle() {
        var applyStyle = 'margin: 7px ;padding: 0px 7px 3px 7px; border-radius: 7px; width: calc(100% - 14px); display: inline; overflow: hidden; text-align: center;';
        this.options.title = `<div style="padding-bottom: 7px; width: 100%;"><table><tr>`;

        if (this.dataSource.invCreId) {
            this.options.title += `<td>${this.dataSource.wholesalerInfo} - query</td>`;
        } else {
            this.options.title += `<td>${this.dataSource.supplierInfo} - query</td>`;
        }

        this.options.title += `
            <td>
                <span style="${_cxConst.CP_QUERY_STATUS.getStyleInverted(this.dataSource.statusId) + applyStyle}">
                    ${_cxConst.CP_QUERY_STATUS.getName(this.dataSource.statusId)}
                </span>
            </td>`;

        if (this.dataSource.invCreId) {
            this.options.title += `
            <td style="padding-left: 17px;">
                <label style="display: block; padding: 0px;">invoice gross</label>
                <span  style="display: block; margin-bottom: -10px; color: var(--main-color-3);">${this.dataSource.documentGross}</span>
            </td>`;
        }

        if (this.dataSource.delRetId) {
            this.options.title += `
            <td style="padding-left: 17px;">
                <label style="display: block; padding: 0px;">delivery gross</label>
                <span  style="display: block; margin-bottom: -10px; color: var(--main-color-3);">${this.dataSource.docketGross}</span>
            </td>`;
        }
        this.options.title += `</tr></table></div>`;


        if (this.dataSource.isNew()) {
            this.options.tabTitle = `cx::new query`;
        } else {
            if (this.dataSource.queryReference == 'TBA') {
                this.options.tabTitle = `query::${_cxConst.CP_QUERY_STATUS.getName(this.dataSource.statusId)}`
            } else {
                this.options.tabTitle = `${this.dataSource.queryReference}`
            }
        }
        var icon = '';
        if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.RESOLVED) {
            icon = '\u2713 ';    // check mark
        } else if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.PENDING) {
            icon = '\u21BB ';
        } else if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.SUBMITTED || this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.IN_PROGRESS) {
            icon = '\u26A0 ';    // warning triangle
        } else if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.ERROR) {
            icon = '\u274C ';    // red x
        }
        this.options.tabTitle = `${icon}${this.options.tabTitle}`;

    }


    async _record() {
        this.options.fields = [];

        var readOnly = true; var canResolve = false;
        if (this.options.mode != 'view') {
            readOnly = this.dataSource.statusId > _cxConst.CP_QUERY_STATUS.PENDING;
            canResolve = this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.SUBMITTED || this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.IN_PROGRESS;
        }
        if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.RESOLVED || this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.CLOSED) { this.options.allowEdit = false; }

        var queryTypes = await this.dataSource.cx.table(_cxSchema.cp_queryType).toLookUpList(this.dataSource.wholesalerId, true);
        var queryResTypes = await this.dataSource.cx.table(_cxSchema.cp_queryResolutionType).toLookUpList(this.dataSource.wholesalerId, true);

        var columnCount = (!this.dataSource.isNew() && !this.options.dialog) ? 7 : 6;
        var header = { group: 'head', title: 'query info', columnCount: columnCount, styles: ['width: 200px', 'width: 200px', 'width: 200px', 'width: calc(100% - 1400px)', 'width: 300px', 'width: 200px', 'width: 300px'], fields: [] };
        header.fields = [
            // NOTE: we need these fields on the form as we need the values to merge the query message template without having to make a server call
            { name: 'shopCode', hidden: true },
            { name: 'shopName', hidden: true },
            { name: 'documentNumber', hidden: true },
            { name: 'documentDate', hidden: true },
            { name: 'documentNet', hidden: true },
            { name: 'documentVat', hidden: true },
            { name: 'documentGross', hidden: true },
            { name: 'docketNumber', hidden: true },
            { name: 'docketDate', hidden: true },
            { name: 'docketNet', hidden: true },
            { name: 'docketVat', hidden: true },
            { name: 'docketGross', hidden: true },
            { name: 'docNumber', hidden: true },
            { name: 'docDate', hidden: true },
            { name: 'docNet', hidden: true },
            { name: 'docVat', hidden: true },
            { name: 'docGross', hidden: true },
            { name: 'groupInvoice', hidden: true },
            { name: 'groupInvoiceDate', hidden: true },
            //
            { name: _cxSchema.cp_query.STATUSID, hidden: true },
            { name: _cxSchema.cp_query.SUBMITDATE, hidden: true },
            { name: _cxSchema.cp_query.RESOLUTIONDATE, hidden: true },
            //
            { name: 'traderInfo', label: 'wholesaler', column: 1, readOnly: true },
            { name: 'shopInfo', label: 'shop', column: 1, readOnly: true },

            { name: _cxSchema.cp_query.QUERYTYPEID, label: 'query type', column: 2, lookUps: queryTypes, readOnly: readOnly, validation: '{"mandatory": true}' },
            { name: _cxSchema.cp_query.QUERYREFERENCE, label: 'query reference #', column: 2, readOnly: true },

            { name: _cxSchema.cp_query.DISPUTEDAMOUNT, label: 'disputed amount', column: 3, width: '125px', readOnly: readOnly },
            { name: 'documentNumber', label: 'document #', column: 3, readOnly: true },
            { name: 'groupInvoice', label: 'group invoice #', column: 3, readOnly: true },

            { name: _cxSchema.cp_query.STATUSID, label: 'status', column: 4, lookUps: _cxConst.CP_QUERY_STATUS.toList(), disabled: true, width: '100px' },
            { name: _cxSchema.cp_query.STATUSMESSAGE, label: 'status message', column: 4, readOnly: true },
            { name: _cxSchema.cp_query.SUBMITDATE, label: 'submit date', column: 4, readOnly: true },

            { name: _cxSchema.cp_query.RESOLUTIONTYPEID, label: 'resolution type:', column: 5, lookUps: queryResTypes, disabled: !canResolve, width: '250px' },      //lookUps: _cxConst.CP_QUERY_STATUS.toList(), 
            { name: _cxSchema.cp_query.RESOLUTIONMESSAGE, label: 'resolution message', column: 5, readOnly: !canResolve },
            { name: _cxSchema.cp_query.RESOLUTIONDATE, label: 'resolution date', column: 5, readOnly: true },

            { name: _cxSchema.cp_query.CREDITAPPLIED, label: 'credit applied:', column: 6, disabled: !canResolve },
            { name: _cxSchema.cp_query.CREDITNOTENUMBER, label: 'credit note number', column: 6, readOnly: !canResolve },
            { name: _cxSchema.cp_query.CREDITTOTAL, label: 'credit total', column: 6, readOnly: !canResolve },



        ]
        if (!this.dataSource.isNew() && !this.options.dialog) {
            header.fields.push({
                group: 'audit', title: '', column: 7, columnCount: 1, fields: [
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
            )
        }


        this.options.fields.push(header);

        var body = { group: 'body', title: 'query messages', columnCount: 1, fields: [] };
        body.fields = [
            { name: _cxSchema.cp_query.QUERYMESSAGE, label: 'query message', type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 7, column: 1, readOnly: readOnly, validation: '{"mandatory": true}' },
            { name: _cxSchema.cp_query.NOTES, label: 'internal notes', type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 3, column: 1, readOnly: readOnly },

        ]
        this.options.fields.push(body);

        if (!this.dataSource.isNew()) {
            var queryLogOptions = await this.getQueryLogListOptions();
            var auditLogs = { group: 'logs', title: '', columnCount: 1, fields: [queryLogOptions] };
            this.options.fields.push(auditLogs);
        }

        var bwgShopOptions = await this.dataSource.cx.table(_cxSchema.cp_wholesalerShopConfig).getConfigValue(this.dataSource.wholesalerId, this.dataSource.shopId, _cxConst.CP_WHS_CONFIG.BWG_CRM_CONFIG, true);
        if (this.options.mode == 'view') {
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.SUPERVISOR)
                if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.SUBMITTED || this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.IN_PROGRESS) {
                    if (bwgShopOptions) {
                        this.options.buttons.push({ id: 'cp_check_status', text: 'Check BWG Status', function: 'checkQueryStatus' });
                    }
                } else if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.RESOLVED || this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.RESOLVED_PENDING || this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.CLOSED) {
                    if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.RESOLVED_PENDING) {
                        this.options.buttons.push({ id: 'cp_resolve_query', text: 'Mark as Resolved', function: 'resolveQuery' });
                    }
                    this.options.buttons.push({ id: 'cp_reopen_query', text: 'Re-Open', function: 'reopenQuery' });

                }

        } else {
            if (!this.dataSource.isNew()) {
                if (this.dataSource.statusId == _cxConst.CP_QUERY_STATUS.PENDING) {
                    this.options.buttons.push({ id: 'cp_submit_query', text: 'Mark as submitted', function: 'submitQuery' });
                }
                if (this.dataSource.statusId != _cxConst.CP_QUERY_STATUS.CLOSED && this.dataSource.statusId != _cxConst.CP_QUERY_STATUS.RESOLVED) {
                    this.options.buttons.push({ id: 'cp_close_query', text: 'Mark as closed', function: 'closeQuery' });
                }
            }
        }

        this.buildFormTitle();
    }
}


module.exports = CPQueryRender;

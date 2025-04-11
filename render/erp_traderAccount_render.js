'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class ErpTraderAccount extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'erp trader account';
    }

    async _record() {
        this.options.fields = [
            {
                group: 'traderOuter', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                            { name: 'shopInfo', label: 'store', column: 1, readOnly: true },
                            { name: 'traderType', label: 'type', column: 2, readOnly: true },
                            { name: 'traderCode', label: 'Code', column: 1, readOnly: true },
                            { name: 'traderName', label: 'Name', column: 2, readOnly: true },
                            { name: 'contact', label: 'contact', column: 1, readOnly: true },
                            { name: 'phone', label: 'phone', column: 2, readOnly: true },
                            { name: 'address1', label: 'address line 1', column: 1, readOnly: true },
                            { name: 'address2', label: 'address line 2', column: 2, readOnly: true },
                            { name: 'address3', label: 'address line 3', column: 1, readOnly: true },
                            { name: 'address4', label: 'address line 4', column: 2, readOnly: true },
                            { name: 'postCode', label: 'post code', column: 1, readOnly: true },
                            { name: 'countryCode', label: 'Country', column: 2, readOnly: true },
                            { name: 'currencyCode', label: 'Currency', column: 3, readOnly: true },

                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 2, columnCount: 2, fields: [
                            {
                                group: 'audit1', title: '', column: 1, columnCount: 2, inline: true, fields: [
                                    { name: 'created', label: 'created', column: 1, readOnly: true },
                                    { name: 'createdBy', label: 'created by', column: 2, readOnly: true },
                                ]
                            },
                            {
                                group: 'audit2', title: '', column: 2, columnCount: 2, inline: true, fields: [
                                    { name: 'modified', label: 'modified', column: 1, readOnly: true },
                                    { name: 'modifiedBy', label: 'modified by', column: 2, readOnly: true },
                                ]
                            }
                        ]
                    }
                ]
            }
        ];


        var cxTraders = this.dataSource.cx.table(_cxSchema.cx_traderAccount);
        await cxTraders.select({ erp: this.dataSource.traderAccountId });

        if (cxTraders.records.length > 0) {
            var link = '/cr/config/trader-account?id=';
            var html = '';
            cxTraders.each(function (r, i) {
                if (i > 0) { html += ', '; }
                html += `<a href="${link + r.id}" target="_blank">[${r.traderCode}] ${r.traderName}</a>`;
            })

            this.options.formBanner = `this trader is linked to ${cxTraders.records.count} EPoS trader(s) : ` + html;
        } else {
            if (this.options.mode == 'view') {
                if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.ADMIN) {
                    this.options.buttons.push({ id: 'cx_create_account', text: 'create sruu account', function: 'createCxAccount' });
                }
            }
        }
    }

    async _list() {
        this.options.paging = true;
        this.options.pageNo = (this.options.query) ? (this.options.query.page || 1) : 1;

        this.options.recordTitle = 'trader account';
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { id: 'cx_trader_type', inputType: _cxConst.RENDER.CTRL_TYPE.SELECT, fieldName: 'tt', label: 'trader type', width: '100px', items: _cxConst.CX_TRADER_TYPE.toList(true) },
            { id: 'cx_trader_code', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'tc', label: 'trader code' },
            { id: 'cx_trader_name', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'tn', label: 'trader name' },
        ];
        this.options.columns = [
            { name: 'traderAccountId', title: ' ', align: 'center' },
            { name: 'shopInfo', title: 'store', width: '200px' },
            { name: 'traderType', title: 'type', width: '50px' },
            { name: 'traderCode', title: 'trader code' },
            { name: 'traderName', title: 'trader name' },
            { name: 'contact', title: 'contact' },
            { name: 'phone', title: 'phone' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
        ];

        var appendStyle = 'padding: 3px 5px 1px 5px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        this.options.cellHighlights = [];
        this.options.cellHighlights.push({
            column: _cxSchema.cx_traderAccount.TRADERTYPE,
            columns: [_cxSchema.cx_traderAccount.TRADERTYPE],
            op: '=',
            value: _cxConst.CX_TRADER_TYPE.CUSTOMER,
            style: 'background-color: green; color: white; ' + appendStyle,
        })
        this.options.cellHighlights.push({
            column: _cxSchema.cx_traderAccount.TRADERTYPE,
            columns: [_cxSchema.cx_traderAccount.TRADERTYPE],
            op: '=',
            value: _cxConst.CX_TRADER_TYPE.SUPPLIER,
            style: 'background-color: #1982c4; color: white; ' + appendStyle,
        })

    }

    async dropDown(options) {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select an erp account'; }
        if (this.options.label == undefined) { this.options.label = 'erp account'; }
        options.noPaging = true;

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(options); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.traderAccountId,
                text: '[' + record.traderCode + '] ' + record.traderName,
            });
        });
        this.options.items = dropDownItems;
    }


}

module.exports = ErpTraderAccount;



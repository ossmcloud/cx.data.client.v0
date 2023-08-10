'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');
const { cx_traderAccount } = require('../cx-client-schema');

class CXTraderAccount extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'trader account';
    }

    async _record() {
        var readOnly = !this.dataSource.isNew();
        if (this.dataSource.isNew()) {
            this.dataSource.shopId = this.options.query.s;
            this.dataSource.traderType = this.options.query.tt;
        }
        var validationMandatory = null;
        var shopField = { name: 'shopInfo', label: 'store', column: 1, readOnly: readOnly };
        if (!readOnly) {
            validationMandatory = '{ "mandatory": true }';
            shopField = await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId', column: 1, validation: '{ "mandatory": true }', label: 'store' });
        }

        if (this.dataSource.isNew() && (!this.options.query.s || !this.options.query.tt)) {
            this.dataSource.note = '<span style="color: var(--main-color-4)">select store and trader type</span>';
            this.options.fields = [
                {
                    group: 'traderOuter', title: '', columnCount: 1, fields: [
                        {
                            group: 'main', title: 'main info', column: 1, columnCount: 5, fields: [
                                { name: 'note', label: 'notes', column: 1, readOnly: true },
                                shopField,
                                { name: 'traderType', label: 'type', column: 1, readOnly: readOnly, items: [{ value: '', text: '' }, { value: 'C', text: 'Customer' }, { value: 'S', text: 'Supplier' }], validation: validationMandatory }
                            ]
                        }
                    ]
                }
            ];
        } else {
            shopField.readOnly = true;
            this.options.fields = [
                {
                    group: 'traderOuter', title: '', columnCount: 3, fields: [
                        {
                            group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                                shopField,
                                { name: 'traderType', label: 'type', column: 2, readOnly: true, items: [{ value: '', text: '' }, { value: 'C', text: 'Customer' }, { value: 'S', text: 'Supplier' }], validation: validationMandatory },
                                { name: 'traderCode', label: 'Code', column: 1, readOnly: readOnly, validation: validationMandatory },
                                { name: 'traderName', label: 'Name', column: 2, readOnly: readOnly },
                                { name: 'contact', label: 'contact', column: 1, readOnly: readOnly },
                                { name: 'phone', label: 'phone', column: 2, readOnly: readOnly },
                                { name: 'address1', label: 'address line 1', column: 1, readOnly: readOnly },
                                { name: 'address2', label: 'address line 2', column: 2, readOnly: readOnly },
                                { name: 'address3', label: 'address line 3', column: 1, readOnly: readOnly },
                                { name: 'address4', label: 'address line 4', column: 2, readOnly: readOnly },
                                { name: 'postCode', label: 'post code', column: 1, readOnly: readOnly },
                                { name: 'countryCode', label: 'Country', column: 2, readOnly: readOnly },


                            ]
                        },
                        {
                            group: 'mapping', title: 'erp mapping', column: 2, columnCount: 1, fields: [
                                await this.fieldDropDownOptions(_cxSchema.erp_traderAccount, {
                                    id: 'erpTraderAccountId', name: 'erpTraderAccountId', column: 1, dropDownSelectOptions: {
                                        s: this.dataSource.shopId || 0,
                                        tt: this.dataSource.traderType || 'X',
                                    }
                                }),
                                { name: 'isWholesaler', label: 'is wholesaler', column: 1 },
                                { name: 'wholesalerCode', label: 'wholesaler code', column: 1 },
                            ]
                        },
                        {
                            group: 'audit', title: 'audit info', column: 3, columnCount: 2, fields: [
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
        }
        // if (this.dataSource.status == _cxConst.RAW_GET_REQUEST.STATUS.PENDING && this.options.allowNew && !this.dataSource.isNew()) {
        //     this.options.buttons.push({ id: 'cr_rawGetRequest_delete', text: 'Delete', function: 'deleteRecord' });
        // }
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
            { name: 'traderType', title: 'type' },
            { name: 'traderCode', title: 'trader code' },
            { name: 'traderName', title: 'trader name' },
            { name: 'isWholesaler', title: 'is wholesaler' },
            { name: 'wholesalerCode', title: 'wholesaler code' },
            { name: 'erpTraderInfo', title: 'erp trader account' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
        ];
        // this.options.highlights = [
        //     { column: _cxSchema.cx_traderAccount.TRADERTYPE, op: '=', value: _cxConst.CX_TRADER_TYPE.CUSTOMER, style: 'color: green;' },
        //     { column: _cxSchema.cx_traderAccount.TRADERTYPE, op: '=', value: _cxConst.CX_TRADER_TYPE.SUPPLIER, style: 'color: blue;' },
        // ];

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
        //'#1982c4'

    }

    async dropDown(options) {
        if (!options) { options = {}; }
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a trader account'; }
        if (this.options.label == undefined) { this.options.label = 'trader account'; }
        this.options.noPaging = true;

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(options); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record[options.valueField || _cxSchema.cx_traderAccount.TRADERACCOUNTID],
                text: '[' + record.traderCode + '] ' + record.traderName,
            });
        });
        this.options.items = dropDownItems;
    }

}

module.exports = CXTraderAccount;




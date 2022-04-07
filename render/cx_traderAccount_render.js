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
        this.options.fields = [
            {
                group: 'traderOuter', title: '', columnCount: 3, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                            { name: 'shopInfo', label: 'shop', column: 1, readOnly: true },
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
                            
                            
                        ]
                    },
                    {
                        group: 'mapping', title: 'erp mapping', column: 2, columnCount: 1, fields: [
                            await this.fieldDropDownOptions(_cxSchema.erp_traderAccount, {
                                id: 'traderAccountId', name: 'erpTraderAccountId', column: 1, dropDownSelectOptions: {
                                    s: this.dataSource.shopId,
                                    tt: this.dataSource.traderType,
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
            // {
            //     group: 'get', title: 'get info', columnCount: 4, fields: [
            //         { name: 'getDate', label: 'date', align: 'center', type: 'inputDate', column: 1, validation: '{ "mandatory": true }' },
            //         { name: 'svcName', label: 'service', align: 'center', column: 1 },
            //         { name: 'getModule', label: 'module', align: 'center', column: 1, validation: '{ "mandatory": true }', lookUps: _cxConst.CX_MODULE.toList(true), },
            //         { name: 'getReference', label: 'message', column: 2, readOnly: true },
            //         { name: 'status', label: 'status', column: 2, lookUps: _cxConst.RAW_GET_REQUEST.STATUS.toList(), readOnly: true },
            //     ]
            // },
            // {
            //     group: 'audit', title: 'audit info', columnCount: 4, fields: [
            //         { name: 'created', label: 'created', readOnly: true },
            //         { name: 'createdBy', label: 'by', readOnly: true },
            //         { name: 'getRequestId', label: 'id', readOnly: true, column: 2 },
            //     ]
            // }
        ];

        // if (this.dataSource.status == _cxConst.RAW_GET_REQUEST.STATUS.PENDING && this.options.allowNew && !this.dataSource.isNew()) {
        //     this.options.buttons.push({ id: 'cr_rawGetRequest_delete', text: 'Delete', function: 'deleteRecord' });
        // }
    }

    async _list() {
        this.options.recordTitle = 'trader account';
        //var users = await this.dataSource.cx.table(_cxSchema.cx_login).selectList();
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { id: 'cx_trader_type', inputType: _cxConst.RENDER.CTRL_TYPE.SELECT, fieldName: 'tt', label: 'trader type', width: '100px', items: [{ value: '', text: ' - all -' }, { value: 'C', text: 'Customer' }, { value: 'S', text: 'Supplier' }] },
            { id: 'cx_trader_code', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'tc', label: 'trader code' },
            { id: 'cx_trader_name', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'tn', label: 'trader name' },
            // { id: 'cx_is_wholesaler', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'isWholesaler', label: 'is wholesaler' },
            // { id: 'cx_wholesaler_code', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'wholesalerCode', label: 'wholesaler code' },
            // { id: 'cx_erp_info', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'erpTraderInfo', label: 'erp trader account' },
            //isWholesaler
            //wholesalerCode
            //erpTraderInfo

        ];
        this.options.columns = [
            { name: 'traderAccountId', title: '', align: 'center' },
            { name: 'shopInfo', title: 'shop', width: '200px' },
            { name: 'traderCode', title: 'trader code' },
            { name: 'traderName', title: 'trader name' },
            { name: 'isWholesaler', title: 'is wholesaler' },
            { name: 'wholesalerCode', title: 'wholesaler code' },
            { name: 'erpTraderInfo', title: 'erp trader account' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
        ];
        // this.options.highlights = [
        //     { column: _cxSchema.raw_getRequest.STATUS, op: '=', value: _cxConst.RAW_GET_REQUEST.STATUS.ERROR, style: 'color: red;' },
        //     { column: _cxSchema.raw_getRequest.STATUS, op: '=', value: _cxConst.RAW_GET_REQUEST.STATUS.PROCESSING, style: 'color: yellow;' },
        //     { column: _cxSchema.raw_getRequest.STATUS, op: '=', value: _cxConst.RAW_GET_REQUEST.STATUS.PENDING, style: 'color: blue;' },
        // ];

    }

    async dropDown(options) {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select an erp account'; }
        if (this.options.label == undefined) { this.options.label = 'erp account'; }

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(options); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.traderAccountId,
                text: '[' + record.traderCode + ']' + record.traderName,
            });
        });
        this.options.items = dropDownItems;
    }

}

module.exports = CXTraderAccount;




'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class ErpBankAccount extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'erp bank account';
    }

    async _record() {
        this.options.fields = [
            {
                group: 'bankOuter', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                            { name: 'shopInfo', label: 'store', column: 1, readOnly: true },
                            { name: 'code', label: 'Code', column: 1, readOnly: true },
                            { name: 'description', label: 'Name', column: 2, readOnly: true },
                            { name: 'countryCode', label: 'Country', column: 1, readOnly: true },
                            { name: 'currencyCode', label: 'Currency', column: 2, readOnly: true },

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

    }

    async _list() {
        this.options.recordTitle = 'bank account';
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { id: 'cx_bank_code', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'bc', label: 'bank code' },
            { id: 'cx_bank_name', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'bd', label: 'bank name' },
        ];
        this.options.columns = [
            { name: 'erpBankAccountId', title: '', align: 'center' },
            { name: 'shopInfo', title: 'store', width: '200px' },
            { name: 'code', title: 'bank code' },
            { name: 'description', title: 'bank name' },
            { name: 'countryCode', title: 'country' },
            { name: 'currencyCode', title: 'currency' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
        ];


    }

    async dropDown(options) {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select an erp bank account'; }
        if (this.options.label == undefined) { this.options.label = 'erp bank account'; }

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(options); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.erpBankAccountId,
                text: '[' + record.code + '] ' + record.description,
            });
        });
        this.options.items = dropDownItems;
    }


}

module.exports = ErpBankAccount;



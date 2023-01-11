'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class ErpTaxAccount extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'erp tax account';
    }

    async _record() {
        this.options.fields = [
            {
                group: 'bankOuter', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 3, fields: [
                            { name: 'shopInfo', label: 'store', column: 1, readOnly: true },
                            { name: 'code', label: 'Code', column: 1, readOnly: true },
                            { name: 'rate', label: 'Rate', column: 2, readOnly: true },
                            { name: 'description', label: 'Name', column: 3, readOnly: true },
                            { name: 'countryCode', label: 'Country', column: 1, readOnly: true },
                            { name: 'currencyCode', label: 'Currency', column: 2, readOnly: true },
                            { name: 'ecTermId', label: 'EC Terms', column: 3, readOnly: true },

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
        this.options.paging = true;
        this.options.pageNo = (this.options.query) ? (this.options.query.page || 1) : 1;

        this.options.recordTitle = 'tax account';
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { id: 'cx_tax_code', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'txc', label: 'Tax code' },
            { id: 'cx_tax_name', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'txd', label: 'Tax Name' },
        ];
        this.options.columns = [
            { name: 'erpTaxAccountId', title: ' ', align: 'center' },
            { name: 'shopInfo', title: 'store', width: '200px' },
            { name: 'code', title: 'Tax code' },
            { name: 'rate', title: 'Tax Rate' },
            { name: 'description', title: 'Tax Name' },
            { name: 'countryCode', title: 'country' },
            { name: 'currencyCode', title: 'currency' },
            { name: 'ecTermId', title: 'terms' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
        ];


    }

    async dropDown(options) {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select an erp Tax account'; }
        if (this.options.label == undefined) { this.options.label = 'erp Tax account'; }
        options.noPaging = true;
        
        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(options); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.erpTaxAccountId,
                text: '[' + record.code + '] ' + record.description,
            });
        });
        this.options.items = dropDownItems;
    }


}

module.exports = ErpTaxAccount;



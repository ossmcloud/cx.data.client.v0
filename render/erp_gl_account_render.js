'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class ErpGLAccount extends RenderBase {
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
                            { name: 'shopInfo', label: 'shop', column: 1, readOnly: true },
                            { name: 'code', label: 'Code', column: 1, readOnly: true },
                            { name: 'costCentre', label: 'Sub Code 1', column: 2, readOnly: true },
                            { name: 'department', label: 'Sub Code 2', column: 3, readOnly: true },
                            { name: 'description', label: 'Name', column: 1, readOnly: true },
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
            { id: 'cx_gl_code', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'glc', label: 'GL code' },
            { id: 'cx_gl_name', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'gld', label: 'GL description' },
        ];
        this.options.columns = [
            { name: 'erpGLAccountId', title: '', align: 'center' },
            { name: 'shopInfo', title: 'shop', width: '200px' },
            { name: 'code', title: 'GL code' },
            { name: 'costCentre', title: 'GL Sub Code 1' },
            { name: 'department', title: 'GL Sub Code 2' },
            { name: 'description', title: 'GL Description' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
        ];


    }

    async dropDown(options) {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select an erp GL account'; }
        if (this.options.label == undefined) { this.options.label = 'erp GL account'; }

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(options); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.erpGLAccountId,
                text: '[' + record.code + '/' + record.costCentre + '/' + record.department + '] ' + record.description,
            });
        });
        this.options.items = dropDownItems;
    }


}

module.exports = ErpGLAccount;



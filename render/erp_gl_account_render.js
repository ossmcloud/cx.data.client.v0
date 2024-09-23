'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
//const _cx_ui = require('cx-core-ui');
const RenderBase = require('./render_base');

class ErpGLAccount extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options, true);
        options.title = 'erp gl account list';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.erp_gl_account.ERPGLACCOUNTID] = null;
        this.autoLoadFields[_cxSchema.erp_gl_account.SHOPID] = null;
        this.autoLoadFields[_cxSchema.erp_gl_account.CODE] = null;
        this.autoLoadFields[_cxSchema.erp_gl_account.COSTCENTRE] = null;
        this.autoLoadFields[_cxSchema.erp_gl_account.DEPARTMENT] = null;
        this.autoLoadFields[_cxSchema.erp_gl_account.DESCRIPTION] = null;
        this.autoLoadFields[_cxSchema.erp_gl_account.IGNORESTOREGLSEGMENTS] = null;
        this.autoLoadFields[_cxSchema.erp_gl_account.ISMANUAL] = null;
        this.autoLoadFields[_cxSchema.erp_gl_account.CREATED] = null;
        this.autoLoadFields[_cxSchema.erp_gl_account.MODIFIED] = null;

        this.options.highlights = [
            { column: 'isManual', op: '=', value: true, style: 'color: var(--main-color-3);' }
        ];

        if (this.options.allowEdit == true) {
            this.options.allowEditCondition = function (object) { return object.isManual; }
        }
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.erp_gl_account.SHOPID) {
            column.name = 'shopInfo';
            column.title = 'store';
            column.addTotals = false;
            column.align = 'left';
            column.width = '200px';
        }
        if (field.name == _cxSchema.erp_gl_account.CODE) { column.title = 'gl code'; }
        if (field.name == _cxSchema.erp_gl_account.COSTCENTRE) { column.title = 'gl sub code (1)'; }
        if (field.name == _cxSchema.erp_gl_account.DEPARTMENT) { column.title = 'gl sub code (2)'; }
        if (field.name == _cxSchema.erp_gl_account.IGNORESTOREGLSEGMENTS) {
            column.nullText = '';
            column.title = 'ignore gl segments';
            column.align = 'center';
            column.width = '150px';
        }
        if (field.name == _cxSchema.erp_gl_account.ISMANUAL) {
            column.nullText = '';
            column.title = 'manual';
            column.align = 'center';
            column.width = '50px';
        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.erp_gl_account.SHOPID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 'shopId' });
        }
        if (field.name == _cxSchema.erp_gl_account.DESCRIPTION) { filter.width = '250px'; }
        if (field.name == _cxSchema.erp_gl_account.CODE) { filter.label = 'gl code'; }
        if (field.name == _cxSchema.erp_gl_account.COSTCENTRE) { filter.label = 'gl sub code (1)'; }
        if (field.name == _cxSchema.erp_gl_account.DEPARTMENT) { filter.label = 'gl sub code (2)'; }
        if (field.name == _cxSchema.erp_gl_account.IGNORESTOREGLSEGMENTS) {
            filter.label = 'ignore gl segments';
            filter.type = _cxConst.RENDER.CTRL_TYPE.CHECK;
        }
        if (field.name == _cxSchema.erp_gl_account.ISMANUAL) {
            filter.label = 'is manual';
            filter.type = _cxConst.RENDER.CTRL_TYPE.CHECK;
        }
    }

    async getUserListOptions() {
        var testOptions = await super.getUserListOptions();
        return testOptions;
    }


    


    async _record() {

        var readOnly = (this.dataSource.isManual) ? false : !this.dataSource.isNew();
        if (this.options.mode == 'view') { readOnly = true; }
        if (this.dataSource.isManual) { this.options.title = '<span style="color: var(--main-color-3);" title="record was added manually">&#x2699;</span> ' + this.options.title; }

        this.options.allowDelete = this.dataSource.isManual;

        this.options.fields = [
            {
                group: 'bankOuter', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                            await this.fieldDropDownOptions(_cxSchema.cx_shop, {
                                id: 'shopId', name: 'shopId', column: 1, validation: (this.options.mode == 'view') ? '' : '{ "mandatory": true }', readOnly: !this.dataSource.isNew()
                            }),
                            { name: 'ignoreStoreGLSegments', label: 'ignore custom segments', column: 2 },
                            {
                                group: 'specification', title: '', column: 1, columnCount: 3, inline: true, fields: [
                                    { name: 'code', label: 'Code', column: 1, readOnly: readOnly, validation: '{ "mandatory": true }' },
                                    { name: 'costCentre', label: 'Sub Code 1', column: 2, readOnly: readOnly },
                                    { name: 'department', label: 'Sub Code 2', column: 3, readOnly: readOnly },
                                ]
                            },
                            { name: 'description', label: 'Name', column: 1, readOnly: readOnly, validation: '{ "mandatory": true }' },
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

  
    async dropDown(options) {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select an erp GL account'; }
        if (this.options.label == undefined) { this.options.label = 'erp GL account'; }
        options.noPaging = true;
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



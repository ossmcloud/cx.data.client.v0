'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPRecoSettingRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'matching settings';
        this.autoLoad = true;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.cp_recoSetting.WHOLESALERID) {
            column.name = 'wholesalerInfo';
            column.title = 'wholesaler';
            column.addTotals = false;
            column.align = 'left';
        } else if (field.name == _cxSchema.cp_recoSetting.SHOPID) {
            column.name = 'shopInfo';
            column.title = 'store';
            column.addTotals = false;
            column.align = 'left';
        } else if (field.name == _cxSchema.cp_recoSetting.HTOLERANCE || field.name == _cxSchema.cp_recoSetting.LTOLERANCE) {
            column.addTotals = false;
        } else if (field.name == _cxSchema.cp_recoSetting.FORCENOTES) {
            column.align = 'center';

        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_recoSetting.SHOPID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 'shopId' });
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_recoSetting.WHOLESALERID) {
            //filter.replace = await this.filterDropDownOptions(_cxSchema.cp_wholesaler, { fieldName: 'wholesalerId' });
            filter.hide = true;
        } else if (field.name == _cxSchema.cp_recoSetting.HTOLERANCE || field.name == _cxSchema.cp_recoSetting.LTOLERANCE || field.name == _cxSchema.cp_recoSetting.FORCENOTES) {
            filter.hide = true;
        }
    }

    async _list() { }

    async _record() {


        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                            //{ name: 'wholesalerId', label: 'wholesaler', column: 1 },
                            await this.fieldDropDownOptions(_cxSchema.cp_wholesaler, { id: 'wholesalerId', name: 'wholesalerId', column: 1 }),
                            //{ name: 'shopId', label: 'store', column: 1 },
                            await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId', column: 1 }),
                            { name: 'hTolerance', label: 'tolerance (header)', width: '130px', column: 2 },
                            { name: 'lTolerance', label: 'tolerance (line)', width: '130px', column: 2 },
                            { name: 'forceNotes', label: 'force entering notes when marking as matched', column: 2 },
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 2, columnCount: 1, fields: [
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
                ]
            }
        ];


    }


}


module.exports = CPRecoSettingRender;

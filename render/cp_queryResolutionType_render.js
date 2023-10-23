'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPQueryRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'document query';
        this.autoLoad = true;

        this.autoLoadFields = {};

        this.autoLoadFields[_cxSchema.cp_queryResolutionType.QUERYRESTYPEID] = null;
        this.autoLoadFields[_cxSchema.cp_queryResolutionType.WHOLESALERID] = null;
        this.autoLoadFields[_cxSchema.cp_queryResolutionType.CODE] = null;  
        this.autoLoadFields[_cxSchema.cp_queryResolutionType.NAME] = null;
        
        this.autoLoadFields[_cxSchema.cp_queryResolutionType.CREDITISSUED] = null;
        this.autoLoadFields[_cxSchema.cp_queryResolutionType.CREATED] = null;
        this.autoLoadFields[_cxSchema.cp_queryResolutionType.MODIFIED] = null;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.cp_queryResolutionType.WHOLESALERID) {
            column.name = 'wholesalerInfo';
            column.title = 'wholesaler';
            column.addTotals = false;
            column.align = 'left';
            column.width = '150px';
        } else if (field.name == _cxSchema.cp_queryResolutionType.CREDITISSUED) {
            column.width = '200px';
            column.nullText = '';
        } else if (field.name == _cxSchema.cp_queryResolutionType.CODE) {
            column.width = '120px';
        }
    }

    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_queryResolutionType.WHOLESALERID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cp_wholesaler, { fieldName: 'wholesalerId' });
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_queryResolutionType.CREATED || field.name == _cxSchema.cp_queryResolutionType.MODIFIED) {
            filter.hide = true;
        }
    }

    async _list() { }

    async _record() {
        this.options.fields = [];

        
        var newRecord = this.dataSource.isNew();

        var header = { group: 'head', title: 'query type', columnCount: 1, width: '400px', fields: [] };
        header.fields = [
            await this.fieldDropDownOptions(_cxSchema.cp_wholesaler, {
                id: _cxSchema.cp_queryResolutionType.WHOLESALERID, name: _cxSchema.cp_queryResolutionType.WHOLESALERID, column: 1, validation: '{"mandatory": true}', readOnly: !newRecord
            }),

            { name: _cxSchema.cp_queryResolutionType.NAME, label: 'resolution type name', column: 1, validation: '{"mandatory": true}' },
            { name: _cxSchema.cp_queryResolutionType.CODE, label: 'code', column: 1, validation: '{"mandatory": true}', readOnly: !newRecord },
            { name: _cxSchema.cp_queryResolutionType.CREDITISSUED, label: 'check this box is this resolution expects a credit note', column: 1 }

        ]
        this.options.fields.push(header);

    }
}

module.exports = CPQueryRender;
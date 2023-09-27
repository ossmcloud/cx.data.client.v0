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

        this.autoLoadFields[_cxSchema.cp_queryType.QUERYTYPEID] = null;
        this.autoLoadFields[_cxSchema.cp_queryType.WHOLESALERID] = null;
        this.autoLoadFields[_cxSchema.cp_queryType.NAME] = null;
        this.autoLoadFields[_cxSchema.cp_queryType.CODE] = null;
        this.autoLoadFields['messageTemplateDisplay'] = { name: 'messageTemplateDisplay', label: 'message template' };
        this.autoLoadFields[_cxSchema.cp_queryType.CREATED] = null;
        this.autoLoadFields[_cxSchema.cp_queryType.MODIFIED] = null;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.cp_queryType.WHOLESALERID) {
            column.name = 'wholesalerInfo';
            column.title = 'wholesaler';
            column.addTotals = false;
            column.align = 'left';
            column.width = '150px';
        } else if (field.name == _cxSchema.cp_queryType.NAME) {
            column.width = '200px';
        } else if (field.name == _cxSchema.cp_queryType.CODE) {
            column.width = '120px';
        }
    }

    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_queryType.WHOLESALERID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cp_wholesaler, { fieldName: 'wholesalerId' });
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_query.CREATED || field.name == _cxSchema.cp_query.MODIFIED) {
            filter.hide = true;
        }
    }

    async _list() { }

    async _record() {
        this.options.fields = [];

        var newRecord = this.dataSource.isNew();

        var header = { group: 'head', title: 'query type', columnCount: 2, styles: ['width: 20%', 'width: 80%'], fields: [] };
        header.fields = [
            await this.fieldDropDownOptions(_cxSchema.cp_wholesaler, { id: _cxSchema.cp_queryType.WHOLESALERID, name: _cxSchema.cp_queryType.WHOLESALERID, column: 1, readOnly: !newRecord, validation: '{"mandatory": true}' }),

            { name: _cxSchema.cp_queryType.NAME, label: 'query type name', column: 1, validation: '{"mandatory": true}' },
            { name: _cxSchema.cp_queryType.CODE, label: 'code', column: 1, readOnly: !newRecord, validation: '{"mandatory": true}' },

            { name: _cxSchema.cp_queryType.MESSAGETEMPLATE, type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 7, label: 'message template', column: 2 },
        ]
        this.options.fields.push(header);

    }
}

module.exports = CPQueryRender;
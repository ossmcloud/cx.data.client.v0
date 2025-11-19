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
        this.autoLoadFields[_cxSchema.cp_queryType.DEPARTMENT] = null;
        this.autoLoadFields[_cxSchema.cp_queryType.NAME] = null;
        this.autoLoadFields[_cxSchema.cp_queryType.CODE] = null;
        this.autoLoadFields[_cxSchema.cp_queryType.REQUIRESDISPUTEDAMOUNT] = null;
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
        } else if (field.name == _cxSchema.cp_queryType.REQUIRESDISPUTEDAMOUNT) {
            column.lookUps = _cxConst.CP_QUERY_TYPE_REQ_DISPUTED.toList();
            column.addTotals = false;
            column.align = 'center';
            column.width = '150px';
        } else if (field.name == _cxSchema.cp_queryType.NAME) {
            column.width = '200px';
        } else if (field.name == _cxSchema.cp_queryType.CODE) {
            column.width = '120px';
        } else if (field.name == _cxSchema.cp_queryType.DEPARTMENT) {
            column.lookUps = _cxConst.BWG_DEPARTMENTS.toList();
            column.addTotals = false;
            column.align = 'center';
            column.width = '150px';
        }
    }

    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_queryType.WHOLESALERID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cp_wholesaler, { fieldName: 'wholesalerId' });
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_queryType.DEPARTMENT) {
            filter.replace = { label: 'department', fieldName: _cxSchema.cp_queryType.DEPARTMENT, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.BWG_DEPARTMENTS.toList('- all -') }
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_queryType.REQUIRESDISPUTEDAMOUNT) {
            filter.replace = { label: 'require disputed amount', fieldName: _cxSchema.cp_queryType.REQUIRESDISPUTEDAMOUNT, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_QUERY_TYPE_REQ_DISPUTED.toList('- all -') }
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_query.CREATED || field.name == _cxSchema.cp_query.MODIFIED || field.name == 'messageTemplateDisplay') {
            filter.hide = true;
        }
    }

    async _list() {
        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; display: inline-block; min-width: 80px; overflow: hidden; text-align: center;';
        var statuses = _cxConst.CP_QUERY_TYPE_REQ_DISPUTED.toList();
        for (let sx = 0; sx < statuses.length; sx++) {
            const s = statuses[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.cp_queryType.REQUIRESDISPUTEDAMOUNT,
                op: '=',
                value: s.value,
                style: _cxConst.CP_QUERY_TYPE_REQ_DISPUTED.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.cp_queryType.REQUIRESDISPUTEDAMOUNT]
            })
        }
     }

    async _record() {
       
        this.options.fields = [];

        var newRecord = this.dataSource.isNew();

        var header = { group: 'head', title: 'query type', columnCount: 2, styles: ['width: 20%', 'width: 80%'], fields: [] };
        header.fields = [
            await this.fieldDropDownOptions(_cxSchema.cp_wholesaler, { id: _cxSchema.cp_queryType.WHOLESALERID, name: _cxSchema.cp_queryType.WHOLESALERID, column: 1, readOnly: !newRecord, validation: '{"mandatory": true}' }),

            { name: _cxSchema.cp_queryType.DEPARTMENT, label: 'department', items: _cxConst.BWG_DEPARTMENTS.toList(), column: 1, validation: '{"mandatory": true}' },
            { name: _cxSchema.cp_queryType.NAME, label: 'query type name', column: 1, validation: '{"mandatory": true}' },
            {
                name: 'grp', label: '', column: 1, columnCount: 2, fields: [
                    { name: _cxSchema.cp_queryType.REQUIRESDISPUTEDAMOUNT, label: 'requires disputed amount', items: _cxConst.CP_QUERY_TYPE_REQ_DISPUTED.toList(), column: 1, validation: '{"mandatory": true}' },
                    { name: _cxSchema.cp_queryType.CODE, label: 'code', column: 2, readOnly: !newRecord, validation: '{"mandatory": true}' },
                    
                ]
            },
            { name: _cxSchema.cp_queryType.MESSAGETEMPLATE, type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 10, label: 'message template', column: 2 },
        ]
        this.options.fields.push(header);

    }
}

module.exports = CPQueryRender;
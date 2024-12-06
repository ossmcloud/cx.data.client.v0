'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class SysListRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'system list';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.sys_listValue.SYSLISTVALUEID] = null;
        this.autoLoadFields[_cxSchema.sys_listValue.LISTID] = null;
        this.autoLoadFields[_cxSchema.sys_listValue.VALUE] = null;
        this.autoLoadFields[_cxSchema.sys_listValue.SORTIDX] = null;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.sys_listValue.SORTIDX) {
            column.addTotals = false;   
            column.nullText = '';
        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.sys_listValue.SORTIDX) {
            filter.hide = true;
        }
    }

    async _list() {
        this.options.title = 'system lists';

    }


    async _record() {
        this.options.fields = [
            {
                group: 'main', title: 'main info', width: '300px', columnCount: 1, fields: [
                    { name: 'listId', label: 'list', column: 1, validation: '{ "mandatory": true, "max": 50  }' },
                    { name: 'value', label: 'value', column: 1, validation: '{ "mandatory": true, "max": 60  }' },
                    { name: 'sortIdx', label: 'sort index', width: '100px', column: 1},
                ]
            }
        ];
    }
}


module.exports = SysListRender;

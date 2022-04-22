'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class RawGetLog extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        this.options.fields = [
            {
                group: 'main', title: 'main info', columnCount: 3, fields: [
                    { name: 'getLogId', label: 'id', readOnly: true, column: 1 },
                    { name: 'shopInfo', label: 'store', column: 2 },
                    { name: 'transmissionID', label: 'transmission ID', width: '150px', column: 3 },
                ]
            },
            {
                group: 'get', title: 'get info', columnCount: 3, fields: [
                    { name: 'getModule', label: 'module', align: 'center', width: '70px', column: 1 },
                    { name: 'getReference', label: 'reference', column: 1 },
                    { name: 'getSuccess', label: 'success', align: 'center', width: '70px', column: 1 },
                    { name: 'getDate', label: 'date', align: 'center', column: 2 },
                    { name: 'getResponse', label: 'response', column: 2 },
                ]
            },
            {
                group: 'audit', title: 'audit info', columnCount: 3, fields: [
                    { name: 'created', label: 'created', readOnly: true },
                ]
            }
        ];
    }

    async _list() {
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { id: 'cx_transmission', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'tr', label: 'transmission' },
            { id: 'cx_date_from', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'df', label: 'from' },
            { id: 'cx_date_to', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'dt', label: 'to' },
            { id: 'cx_success', inputType: _cxConst.RENDER.CTRL_TYPE.SELECT, fieldName: 'suc', label: 'success', width: '50px', placeHolder: 'either', items: [{ value: '', text: 'either' }, { value: 'true', text: 'true' }, { value: 'false', text: 'false' }] },
        ];
        this.options.columns = [
            { name: 'getLogId', title: '', align: 'center' },
            { name: 'shopInfo', title: 'store', width: '200px' },
            { name: 'transmissionID', title: 'transmission ID', align: 'center', width: '150px' },
            { name: 'getDate', title: 'date', align: 'center', width: '130px' },
            { name: 'getModule', title: 'module', align: 'center', width: '70px' },
            { name: 'getReference', title: 'reference' },
            { name: 'getResponse', title: 'response' },
            { name: 'getSuccess', title: 'success', align: 'center', width: '70px' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
        ];
        this.options.highlights = [
            { column: _cxSchema.raw_getLog.GETSUCCESS, op: '=', value: false, style: 'color: red;' },
        ];
    }
}

module.exports = RawGetLog;




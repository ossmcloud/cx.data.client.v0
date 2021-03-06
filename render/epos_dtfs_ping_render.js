'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class EposDtfsPing extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 3, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 1, fields: [
                            { name: 'pingId', label: 'id', readOnly: true, column: 1 },
                            { name: 'dtfsInfo', label: 'shop', column: 1 }
                        ]
                    },
                    {
                        group: 'ping', title: 'ping info', column: 2, columnCount: 1, fields: [
                            { name: 'pingIP', label: 'ping IP', width: '150px', column: 1 },
                            { name: 'response', label: 'ping response', width: '150px', column: 1 },
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 3, columnCount: 1, fields: [
                            { name: 'created', label: 'created', readOnly: true }
                        ]
                    }
                ]
            }
        ];
    }

    async _list() {
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.epos_dtfs_setting, { fieldName: 's' }),
            { id: 'cx_ping_ip', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'ip', label: 'ping IP', width: '70px' },
            { id: 'cx_date_from', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'df', label: 'from', width: '130px' },
            { id: 'cx_date_to', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'dt', label: 'to', width: '130px' },
        ];
        this.options.columns = [
            { name: 'pingId', title: 'actions', align: 'center' },
            { name: 'dtfsInfo', title: 'dtfs info' },
            { name: 'pingIP', title: 'ping IP', align: 'center', width: '100px' },
            { name: 'response', title: 'response' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
        ];
    }
}

module.exports = EposDtfsPing;




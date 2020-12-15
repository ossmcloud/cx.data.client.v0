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
                group: 'all', title: '', columnCount: 3, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 1, fields: [
                            { group: 'main', name: 'pingId', label: 'id', readOnly: true, column: 1 },
                            { group: 'main', name: 'shopInfo', label: 'shop', column: 1 }
                        ]
                    },
                    {
                        group: 'ping', title: 'ping info', column: 2, columnCount: 1, fields: [
                            { group: 'ping', name: 'pingIP', label: 'ping IP', width: '150px', column: 1 },
                            { group: 'ping', name: 'response', label: 'ping response', width: '150px', column: 2 },
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 3, columnCount: 1, fields: [
                            { group: 'audit', name: 'created', label: 'created', readOnly: true }
                        ]
                    }
                ]
            }
        ];
    }

    async _list() {
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { id: 'cx_ping_ip', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'ip', label: 'ping IP', width: '70px' },
            { id: 'cx_date_from', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'df', label: 'from', width: '130px' },
            { id: 'cx_date_to', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'dt', label: 'to', width: '130px' },
        ];
        this.options.columns = [
            { name: 'pingId', title: 'actions', align: 'center' },
            { name: 'shopInfo', title: 'shop' },
            { name: 'pingIP', title: 'ping IP', align: 'center', width: '100px' },
            { name: 'response', title: 'response' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
        ];
    }
}

module.exports = RawGetLog;




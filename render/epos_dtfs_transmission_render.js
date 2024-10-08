'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class EposTransmissionRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        this.options.fields = [
            {
                group: 'main', title: 'main info', columnCount: 2, inline: true, fields: [
                    { name: 'transmissionId', label: 'transmission ID', width: '150px', readOnly: true, column: 1 },
                    { name: 'shopInfo', label: 'store', column: 1 },
                    { name: 'message', label: 'message', column: 1 },
                    { name: 'status', label: 'status', width: '100px', column: 2, lookUps: _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.toList()  },
                    { name: 'action', label: 'action', width: '100px', column: 2, lookUps: _cxConst.EPOS_DTFS_TRANSMISSION.ACTION.toList() },
                    { name: 'created', label: 'created on', column: 2, readOnly: true},
                ]
            },
            
        ];
        if (this.dataSource.status == _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.TRANSMITTING || this.dataSource.status == _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.PENDING) {
            this.options.buttons.push({ id: 'epos_dtfs_transmission_abort', text: 'Abort Transmission', function: 'abort' });
        }
    }

    async _list() {
        this.options.paging = true;
        this.options.pageNo = (this.options.query) ? (this.options.query.page || 1) : 1;

        this.options.filters = [
            //await this.dataSource.db.table(_cxSchema.cx_shop).renderDropDownOptions({ fieldName: 's' }),
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            await this.filterDropDownOptions(_cxSchema.epos_dtfs_setting, { fieldName: 'dtfs' }),
            { label: 'transmission', fieldName: 'tr', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            { label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            {
                label: 'status', fieldName: 'st', width: '100px', type: _cxConst.RENDER.CTRL_TYPE.SELECT,
                items: _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.toList('- all -'),
            }
        ];
        this.options.columns = [
            { name: 'transmissionId', title: ' ', align: 'center' },
            { name: 'transmissionIdText', title: 'transmission ID', align: 'center', width: '150px' },
            { name: 'shopInfo', title: 'store', width: '200px' },
            { name: 'dtfsSettingName', title: 'epos component', width: '200px' },
            { name: 'eposProvider', title: 'epos provider', width: '100px' },
            { name: 'status', title: 'status', align: 'center', width: '130px', lookUps: _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.toList(), },
            { name: 'action', title: 'action', align: 'center', width: '70px', lookUps: _cxConst.EPOS_DTFS_TRANSMISSION.ACTION.toList() },
            { name: 'message', title: 'message' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
        ];
        this.options.highlights = [
            { column: 'status', op: '=', value: _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.ERROR, style: 'color: red; background-color: var(--element-bg-color);' },
            { column: 'status', op: '=', value: _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.TRANSMITTING, style: 'color: #FFCD00; background-color: var(--element-bg-color);' }
        ];
    }

}

module.exports = EposTransmissionRender;
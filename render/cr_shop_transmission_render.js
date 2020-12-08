'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxShopTransmissionRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async record() {
        this.options.fields = [
            {
                group: 'main', title: 'main info', columnCount: 2, inline: true, fields: [
                    { name: 'transmissionId', label: 'transmission ID', width: '150px', readOnly: true, column: 1 },
                    { name: 'shopInfo', label: 'shop', column: 1 },
                    { name: 'message', label: 'message', column: 1 },
                    { name: 'status', label: 'status', width: '100px', column: 2, lookUps: _cxConst.CR_SHOP_TRANSMISSION.STATUS.toList()  },
                    { name: 'action', label: 'action', width: '100px', column: 2, lookUps: _cxConst.CR_SHOP_TRANSMISSION.ACTION.toList() },
                    { name: 'created', label: 'created on', column: 2, readOnly: true},
                ]
            },
            
        ];
        if (this.dataSource.status == _cxConst.CR_SHOP_TRANSMISSION.STATUS.TRANSMITTING) {
            this.options.buttons.push({ id: 'cr_shop_transmission_abort', text: 'Abort Transmission', function: 'abort' });
        }
    }

    async list() {
        
        this.options.filters = [
            //await this.dataSource.db.table(_cxSchema.cx_shop).renderDropDownOptions({ fieldName: 's' }),
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { label: 'transmission', fieldName: 'tr', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            { label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            {
                label: 'status', fieldName: 'st', width: '100px', type: _cxConst.RENDER.CTRL_TYPE.SELECT,
                items: _cxConst.CR_SHOP_TRANSMISSION.STATUS.toList('- all -'),
            }
        ];
        this.options.columns = [
            { name: 'transmissionId', title: '', align: 'center' },
            { name: 'transmissionIdText', title: 'transmission ID', align: 'center', width: '150px' },
            { name: 'shopInfo', title: 'shop', width: '200px' },
            { name: 'status', title: 'status', align: 'center', width: '130px', lookUps: _cxConst.CR_SHOP_TRANSMISSION.STATUS.toList(), },
            { name: 'action', title: 'action', align: 'center', width: '70px', lookUps: _cxConst.CR_SHOP_TRANSMISSION.ACTION.toList() },
            { name: 'message', title: 'message' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
        ];
        this.options.highlights = [
            { column: 'status', op: '=', value: _cxConst.CR_SHOP_TRANSMISSION.STATUS.ERROR, style: 'color: #DF0101; background-color: black' },
            { column: 'status', op: '=', value: _cxConst.CR_SHOP_TRANSMISSION.STATUS.TRANSMITTING, style: 'color: yellow; background-color: black' }
        ];
    }

}

module.exports = CxShopTransmissionRender;
'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CRCashBookRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    // async _record() {
    //     this.options.fields = [
    //         {
    //             group: 'main', title: 'main info', columnCount: 2, inline: true, fields: [
    //                 { name: 'transmissionId', label: 'transmission ID', width: '150px', readOnly: true, column: 1 },
    //                 { name: 'shopInfo', label: 'shop', column: 1 },
    //                 { name: 'message', label: 'message', column: 1 },
    //                 { name: 'status', label: 'status', width: '100px', column: 2, lookUps: _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.toList() },
    //                 { name: 'action', label: 'action', width: '100px', column: 2, lookUps: _cxConst.EPOS_DTFS_TRANSMISSION.ACTION.toList() },
    //                 { name: 'created', label: 'created on', column: 2, readOnly: true },
    //             ]
    //         },

    //     ];
    //     if (this.dataSource.status == _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.TRANSMITTING || this.dataSource.status == _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.PENDING) {
    //         this.options.buttons.push({ id: 'epos_dtfs_transmission_abort', text: 'Abort Transmission', function: 'abort' });
    //     }
    // }

    async _list() {

        this.options.filters = [
            //await this.dataSource.db.table(_cxSchema.cx_shop).renderDropDownOptions({ fieldName: 's' }),
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { label: 'transmission', fieldName: 'tr', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            { label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            {
                label: 'status', fieldName: 'st', width: '100px', type: _cxConst.RENDER.CTRL_TYPE.SELECT,
                items: _cxConst.CR_CASH_BOOK.STATUS.toList('- all -'),
            }
        ];
        this.options.columns = [
            { name: 'cbTranId', title: '', align: 'center' },
            
            { name: 'shopInfo', title: 'shop', width: '200px' },
            { name: 'date', title: 'date', align: 'center', width: '130px' },
            { name: 'status', title: 'status', align: 'left', width: '30px', lookUps: _cxConst.CR_CASH_BOOK.STATUS.toList(), },
            { name: 'statusMessage', title: 'status message', align: 'left', lookUps: _cxConst.CR_CASH_BOOK.STATUS.toList(), },
            { name: 'totalSales', title: 'sales', align: 'right', width: '90px', },
            { name: 'totalLodgement', title: 'lodgements', align: 'right', width: '90px', },
            { name: 'tillDifference', title: 'diff', align: 'right', width: '90px', },
            { name: 'totalAccountSales', title: 'a/c sales', align: 'right', width: '90px', },
            { name: 'totalAccountLodgement', title: 'a/c lodgements', align: 'right', width: '90px', },

            { name: 'transmissionIdText', title: 'transmission ID', align: 'center', width: '150px' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
        ];
        this.options.highlights = [
            { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.Error, style: 'color: #DF0101; background-color: var(--element-bg-color);' },
            { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.PostingError, style: 'color: #DF0101; background-color: var(--element-bg-color);' },
            { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.New, style: 'color: var(--main-color-3); ' },
            { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.Refresh, style: 'color: grey; ' },
            { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.Delete, style: 'color: purple; ' },
            { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.DeleteAndPull, style: 'color: purple; ' },
            { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.Pending, style: 'color: orange; background-color: var(--element-bg-color);' },
            { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.Transferring, style: 'color: grey; ' },
            { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.Posting, style: 'color: grey; ' },
            
        ];
    }

}

module.exports = CRCashBookRender;
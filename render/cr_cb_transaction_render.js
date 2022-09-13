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
    //                 { name: 'shopInfo', label: 'store', column: 1 },
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
            { label: 'batch', fieldName: 'batch', type: _cxConst.RENDER.CTRL_TYPE.TEXT, hidden: true },
        ];

        if (this.options.query.batch == 'T') {
            this.options.title = 'cash-book batch processing';
            this.options.showButtons = [];
            this.options.showButtons.push({ id: 'cb_batch_mark_all', text: 'check all', function: 'checkAll' });
            this.options.showButtons.push({ id: 'cb_batch_mark_all', text: 'uncheck all', function: 'uncheckAll' });
            this.options.showButtons.push({ id: 'cb_batch_mark_all', text: 'submit for posting', function: 'submitForPosting' });
        } else {
            this.options.filters.push({
                label: 'state', fieldName: 'sta', width: '100px', type: _cxConst.RENDER.CTRL_TYPE.SELECT,
                items: _cxConst.CR_CASH_BOOK.STATE.toList('- all -'),
            });
            this.options.filters.push({
                label: 'status', fieldName: 'st', width: '100px', type: _cxConst.RENDER.CTRL_TYPE.SELECT,
                items: _cxConst.CR_CASH_BOOK.STATUS.toList('- all -'),
            });
        }

        
        this.options.columns = [
            { name: 'cbTranId', title: ' ', align: 'center' },
            { name: 'shopInfo', title: 'store', width: '200px' },
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


        if (this.options.query.batch == 'T') {
            this.options.columns.splice(1, 0, { name: 'check', title: 'post', width: '30px', type: 'check' });
        }


        this.options.highlights = [];
        var statuses = _cxConst.CR_CASH_BOOK.STATUS.toList();
        for (let sx = 0; sx < statuses.length; sx++) {
            const s = statuses[sx];
            this.options.highlights.push({
                column: 'status',
                op: '=',
                value: s.value,
                style: _cxConst.CR_CASH_BOOK.STATUS.getStyle(s.value),
            })
        }
        this.options.highlights.push({
            column: 'tillDifference',
            customStyle: function (object, value, highlight) {
                if (value == 0) { return; }
                if (object.status == _cxConst.CR_CASH_BOOK.STATUS.New || object.status == _cxConst.CR_CASH_BOOK.STATUS.Pending || object.status == _cxConst.CR_CASH_BOOK.STATUS.PostingReady) {
                    return 'background-color: rgba(255,0,0,0.10);'
                }
            }
        })


    }

}

module.exports = CRCashBookRender;
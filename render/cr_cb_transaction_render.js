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

        var isBatchProcessing = (this.options.query && this.options.query.batch == 'T');
        var isExpanded = (this.options.query && this.options.query.expanded == 'true');

        this.options.paging = true;
        this.options.pageNo = (this.options.query) ? (this.options.query.page || 1) : 1;

        this.options.filters = [
            //await this.dataSource.db.table(_cxSchema.cx_shop).renderDropDownOptions({ fieldName: 's' }),
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { label: 'transmission', fieldName: 'tr', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            { label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            { label: 'batch', fieldName: 'batch', type: _cxConst.RENDER.CTRL_TYPE.TEXT, hidden: true },
        ];

        if (isBatchProcessing) {
            this.options.filters.push({ label: 'target status (value)', fieldName: 'tst', type: _cxConst.RENDER.CTRL_TYPE.NUMERIC, hidden: true });
            this.options.filters.push({ label: 'target status', fieldName: 'target_status', value: _cxConst.CR_CASH_BOOK.STATUS.getName(this.options.query.tst), readOnly: true });
            // this.options.filters.push({
            //     label: 'target status', fieldName: 'tst', width: '200px', type: _cxConst.RENDER.CTRL_TYPE.SELECT,
            //     lookUps: _cxConst.CR_CASH_BOOK.STATUS.toList(),
            //     readOnly: true
            // });

            this.options.title = 'cash-book batch processing';
            this.options.showButtons = [];
            this.options.showButtons.push({ id: 'cb_batch_mark_all', text: 'check all', function: 'checkAll' });
            this.options.showButtons.push({ id: 'cb_batch_unmark_all', text: 'uncheck all', function: 'uncheckAll' });
            this.options.showButtons.push({ id: 'cb_batch_submit', text: 'submit for batch processing', function: 'submitForBatchProcessing' });
        } else {
            this.options.filters.push({
                label: 'state', fieldName: 'sta', width: '100px', type: _cxConst.RENDER.CTRL_TYPE.SELECT,
                items: _cxConst.CR_CASH_BOOK.STATE.toList('- all -'),
            });
            this.options.filters.push({
                label: 'status', fieldName: 'st', width: '100px', type: _cxConst.RENDER.CTRL_TYPE.SELECT,
                items: _cxConst.CR_CASH_BOOK.STATUS.toList('- all -'),
            });
            this.options.filters.push({ label: 'expanded', fieldName: 'expanded', type: _cxConst.RENDER.CTRL_TYPE.CHECK });
        }
        

        this.options.columns = [];
        if (isBatchProcessing) { this.options.columns.push({ name: 'check', title: 'post', width: '30px', type: 'check' }); }
        this.options.columns.push({ name: 'cbTranId', title: ' ', align: 'center' });
        this.options.columns.push({ name: 'shopInfo', title: 'store', width: 'auto' });
        this.options.columns.push({ name: 'date', title: 'date', align: 'center', width: '130px' });
        if (isBatchProcessing) { this.options.columns.push({ name: 'statusX', title: ' ', unbound: true }); }
        if (isExpanded) {
            this.options.columns.push({ name: 'statusX', title: ' ', unbound: true });
        } else {
            this.options.columns.push({ name: 'status', title: 'status', align: 'left', width: '30px', lookUps: _cxConst.CR_CASH_BOOK.STATUS.toList(), });
            this.options.columns.push({ name: 'statusMessage', title: 'status message', align: 'left', lookUps: _cxConst.CR_CASH_BOOK.STATUS.toList(), });
        }
        this.options.columns.push({ name: 'totalSales', title: 'sales', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
        this.options.columns.push({ name: 'totalLodgement', title: 'lodgements', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
        this.options.columns.push({ name: 'tillDifference', title: 'diff', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
        if (isExpanded) {
            for (var ax = 0; ax < this.dataSource.additionalColumns.length; ax++) {
                var ac = this.dataSource.additionalColumns[ax];
                this.options.columns.push({ name: 'AC_' + ac.id, title: ac.title, align: 'right', width: '90px', formatMoney: 'N2', addTotals: true, nullText: '' });
            }

        }
        this.options.columns.push({ name: 'totalAccountSales', title: 'a/c sales', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
        this.options.columns.push({ name: 'totalAccountLodgement', title: 'a/c lodgements', align: 'right', width: '90px', formatMoney: 'N2', addTotals: true });
        this.options.columns.push({ name: 'modified', title: 'modified on', align: 'center', width: '130px' });
        this.options.columns.push({ name: 'modifiedBy', title: 'by' });
        //this.options.columns.push({ name: 'transmissionIdText', title: 'transmission ID', align: 'center', width: '150px' });

        //if (isBatchProcessing) { this.options.columns.splice(1, 0, { name: 'check', title: 'post', width: '30px', type: 'check' }); }


        this.options.cellHighlights = [];
        var applyToColumn = 'status';
        var applyStyle = 'padding: 3px 7px 3px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        if (isBatchProcessing || isExpanded) {
            applyToColumn = 'statusX';
            applyStyle = 'padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;';
        }

        var statuses = _cxConst.CR_CASH_BOOK.STATUS.toList();
        for (let sx = 0; sx < statuses.length; sx++) {
            const s = statuses[sx];
            this.options.cellHighlights.push({
                column: 'status',
                op: '=',
                value: s.value,
                //style: _cxConst.CR_CASH_BOOK.STATUS.getStyleInverted(s.value) + 'padding: 3px 7px 3px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden;',
                //style: _cxConst.CR_CASH_BOOK.STATUS.getStyleInverted(s.value) + 'padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;',
                style: _cxConst.CR_CASH_BOOK.STATUS.getStyleInverted(s.value) + applyStyle,
                columns: [applyToColumn]
            })
        }

        //this.options.highlights = [];
        this.options.cellHighlights.push({
            column: 'tillDifference',
            columns: ['tillDifference'],
            customStyle: function (object, value, highlight) {
                //if (value == 0) { return; }
                //if (object.status == _cxConst.CR_CASH_BOOK.STATUS.New || object.status == _cxConst.CR_CASH_BOOK.STATUS.Pending || object.status == _cxConst.CR_CASH_BOOK.STATUS.PostingReady) {
                //return 'background-color: rgba(255,0,0,0.10);'
                if (value < 0) { return 'font-weight: bold; color: red;'; }
                if (value > 0) { return 'color: #34ad68;'; }
                return 'color: var(--element-bd-color);';
                //}
            }
        })

        var applyStoreColorStyle = 'padding: 3px 7px 3px 7px; border-radius: 5px; width: auto; display: block; overflow: hidden; text-align: left;';
        var shopColors = await this.dataSource.cx.table(_cxSchema.cx_shop).selectColors();
        for (var cx = 0; cx < shopColors.length; cx++) {
            if (!shopColors[cx].shopColor) { continue; }
            this.options.cellHighlights.push({ column: 'shopId', op: '=', value: shopColors[cx].shopId, style: 'background-color: rgba(' + shopColors[cx].shopColor + ', 0.5); ' + applyStoreColorStyle, columns: ['shopInfo'] })
        }


    }

}

module.exports = CRCashBookRender;
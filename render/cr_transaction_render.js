'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CRCashBookRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        this.options.fields = [
            {
                group: 'main', title: 'main info', columnCount: 3, inline: true, fields: [
                    { name: _cxSchema.cr_transaction.CBTRANID, label: 'cb tran id', width: '70px', readOnly: true, column: 1 },
                    
                    { name: 'shopInfo', label: 'shop', column: 1 },
                    { name: _cxSchema.cr_transaction.TRANSACTIONDATE, label: 'tran date', column: 1 },
                    { name: _cxSchema.cr_transaction.TRANSACTIONDATETIME, label: 'tran date/tme', column: 1 },
                    { name: _cxSchema.cr_transaction.EPOSTRANSACTIONNO, label: 'epos tran no', column: 1 },
                    { name: _cxSchema.cr_transaction.TRANSACTIONTYPE, label: 'epos tran type', column: 1 },
                    { name: _cxSchema.cr_transaction.TRANSACTIONSUBTYPE, label: 'sub-type' },

                    { name: _cxSchema.cr_transaction.REFERENCE1, label: 'reference 1' , column: 2},
                    { name: _cxSchema.cr_transaction.REFERENCE2, label: 'reference 2' , column: 2},
                    { name: _cxSchema.cr_transaction.LINENUMBER, label: 'line', align: 'right', width: '30px' , column: 2},
                    { name: _cxSchema.cr_transaction.ITEMBARCODE, label: 'barcode' , column: 2},
                    { name: _cxSchema.cr_transaction.ITEMDESCRIPTION, label: 'item description' , column: 2},

                    { name: _cxSchema.cr_transaction.VALUEGROSS, label: 'gross', align: 'right', width: '90px', column: 3 },
                    { name: _cxSchema.cr_transaction.VALUENET, label: 'net', align: 'right', width: '90px', column: 3 },
                    { name: _cxSchema.cr_transaction.VALUENET, label: 'tax', align: 'right', width: '90px', column: 3 },
                    { name: _cxSchema.cr_transaction.VALUEDISCOUNT, label: 'discount', align: 'right', width: '90px', column: 3 },
                    { name: _cxSchema.cr_transaction.VALUEDISCOUNTPROMO, label: 'promo', align: 'right', width: '90px', column: 3 },
                ]
            },

        ];

        this.options.buttons.push({ id: 'cr_cb_view', text: 'View Cash Book', function: 'viewCashBook' });
        // if (this.dataSource.status == _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.TRANSMITTING || this.dataSource.status == _cxConst.EPOS_DTFS_TRANSMISSION.STATUS.PENDING) {
        //     this.options.buttons.push({ id: 'epos_dtfs_transmission_abort', text: 'Abort Transmission', function: 'abort' });
        // }
    }

    async _list() {
        var cbTranTypes = [{ value: '', text: ' - all - ' }];
        var query = { sql: 'select cbTranTypeId as value, code as text from cr_cb_tran_type' };
        var cbTranTypeSrc = await this.dataSource.cx.exec(query);
        cbTranTypeSrc.each(function (t) {
            cbTranTypes.push({ value: t.value, text: t.text });
        })


        this.options.filters = [
            //await this.dataSource.db.table(_cxSchema.cx_shop).renderDropDownOptions({ fieldName: 's' }),
            { label: 'cb', fieldName: 'cb', type: _cxConst.RENDER.CTRL_TYPE.NUMERIC, width: '30px', readOnly: true },
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            { label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            {
                label: 'transaction type', fieldName: 'tt', width: '150px', type: _cxConst.RENDER.CTRL_TYPE.SELECT,
                items: cbTranTypes,
            },
            { label: 'epos tran. type', fieldName: 'e_tt', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
            { label: 'epos tran. sub-type', fieldName: 'e_ts', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
            { label: 'epos tran. no', fieldName: 'e_tn', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
        ];
        this.options.columns = [
            { name: 'tranId', title: '', align: 'center' },

            { name: 'shopInfo', title: 'shop', width: '200px' },
            { name: _cxSchema.cr_transaction.TRANSACTIONDATE, title: 'date', align: 'center', width: '130px' },
            { name: _cxSchema.cr_transaction.TRANSACTIONDATETIME, title: 'date/time', align: 'center', width: '130px' },
            { name: _cxSchema.cr_transaction.EPOSTRANSACTIONNO, title: 'epos tran. no' },
            { name: _cxSchema.cr_transaction.TRANSACTIONTYPE, title: 'epos tran type' },
            { name: _cxSchema.cr_transaction.TRANSACTIONSUBTYPE, title: 'sub-type' },
            { name: _cxSchema.cr_transaction.REFERENCE1, title: 'reference 1' },
            { name: _cxSchema.cr_transaction.REFERENCE2, title: 'reference 2' },
            { name: _cxSchema.cr_transaction.LINENUMBER, title: 'line', align: 'right', width: '30px' },
            { name: _cxSchema.cr_transaction.ITEMBARCODE, title: 'barcode' },
            { name: _cxSchema.cr_transaction.ITEMDESCRIPTION, title: 'item description' },

            { name: _cxSchema.cr_transaction.VALUEGROSS, title: 'gross', align: 'right', width: '90px', },
            { name: _cxSchema.cr_transaction.VALUENET, title: 'net', align: 'right', width: '90px', },
            { name: _cxSchema.cr_transaction.VALUENET, title: 'tax', align: 'right', width: '90px', },
            { name: _cxSchema.cr_transaction.VALUEDISCOUNT, title: 'discount', align: 'right', width: '90px', },
            { name: _cxSchema.cr_transaction.VALUEDISCOUNTPROMO, title: 'promo', align: 'right', width: '90px', },

            { name: _cxSchema.cr_transaction.CHANGE, title: 'change', align: 'right', width: '90px', },

            { name: 'created', title: 'created', align: 'center', width: '130px' },
        ];
        this.options.highlights = [
            // { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.Error, style: 'color: #DF0101; background-color: var(--element-bg-color);' },
            // { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.PostingError, style: 'color: #DF0101; background-color: var(--element-bg-color);' },
            // { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.New, style: 'color: cyan; ' },
            // { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.Pending, style: 'color: yellow; background-color: var(--element-bg-color);' }
        ];
    }

}

module.exports = CRCashBookRender;
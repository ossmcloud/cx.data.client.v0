'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');
const objBuilder = require('cx-data/builder/obj-builder');

class CRCashBookRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }



    async _record() {
        this.options.allowEdit = this.dataSource.isManual;

        var depLookUp = null; var subDepLookUp = null; var taxCodeLookUp = null;
        var tranTypeLookUp = null; var tranSubTypeLookUp = null;
        

        if (this.options.allowEdit) {    
            //
            tranSubTypeLookUp = [];
            var tranTypes = this.dataSource.cx.table(_cxSchema.cr_tran_type_config);
            tranTypeLookUp = await tranTypes.toLookUpListByShop(this.dataSource.shopId);
            if (this.dataSource.transactionType) { tranSubTypeLookUp = await tranTypes.toLookUpListByShop(this.dataSource.shopId, this.dataSource.transactionType); }

            //
            subDepLookUp = [];
            var departments = this.dataSource.cx.table(_cxSchema.cx_map_config_dep);
            depLookUp = await departments.toLookUpList(this.dataSource.shopId);
            if (this.dataSource.department) { subDepLookUp = await departments.toLookUpList(this.dataSource.shopId, this.dataSource.department); }

            //
            var taxCodes = this.dataSource.cx.table(_cxSchema.cx_map_config_tax);
            taxCodeLookUp = await taxCodes.toLookUpList(this.dataSource.shopId);
        }


        this.options.fields = [
            {
                group: 'mainOuter', title: '', columnCount: 4, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, inline: true, fields: [
                            { name: _cxSchema.cr_transaction.CBTRANID, label: 'cb tran id', readOnly: true, column: 1 },
                            { name: 'shopInfo', label: 'store', readOnly: true, column: 1 },
                            { name: _cxSchema.cr_transaction.TRANSACTIONDATE, label: 'tran date', column: 1 },
                            { name: _cxSchema.cr_transaction.TRANSACTIONDATETIME, label: 'tran date/tme', column: 1 },
                            { name: _cxSchema.cr_transaction.EPOSTRANSACTIONNO, label: 'epos tran no', column: 1 },
                            { name: _cxSchema.cr_transaction.EPOSTRANSACTIONID, label: 'epos tran id', column: 1 },
                            
                            
                            { name: _cxSchema.cr_transaction.TRANSACTIONTYPE, label: 'epos tran type', column: 1, lookUps: tranTypeLookUp },
                            { name: _cxSchema.cr_transaction.TRANSACTIONSUBTYPE, label: 'sub-type', column: 1, lookUps: tranSubTypeLookUp },

                            { name: _cxSchema.cr_transaction.REFERENCE1, label: 'reference 1', column: 2 },
                            { name: _cxSchema.cr_transaction.REFERENCE2, label: 'reference 2', column: 2 },
                            { name: _cxSchema.cr_transaction.LINENUMBER, label: 'line', column: 2 },
                            { name: _cxSchema.cr_transaction.QUANTITY, label: 'quantity', column: 2 },
                            { name: _cxSchema.cr_transaction.ITEMBARCODE, label: 'barcode', column: 2 },
                            { name: _cxSchema.cr_transaction.ITEMDESCRIPTION, label: 'item description', column: 2 },
                            { name: _cxSchema.cr_transaction.PLUCODE, label: 'plu code', column: 2 },
                        ]
                    },
                    {
                        group: 'value', title: 'values info', column: 2, columnCount: 2, inline: true, fields: [
                            { name: _cxSchema.cr_transaction.VALUEGROSS, label: 'gross', column: 1 },
                            { name: _cxSchema.cr_transaction.VALUENET, label: 'net', column: 1 },
                            { name: _cxSchema.cr_transaction.VALUETAX, label: 'tax', column: 1 },
                            { name: _cxSchema.cr_transaction.VALUEDISCOUNT, label: 'discount', column: 1 },
                            { name: _cxSchema.cr_transaction.VALUEDISCOUNTPROMO, label: 'promo', column: 1 },
                            { name: _cxSchema.cr_transaction.CASHBACK, label: 'cashback', column: 1 },
                            { name: _cxSchema.cr_transaction.CHANGE, label: 'change', column: 1 },

                            { name: _cxSchema.cr_transaction.UNITPRICE, label: 'unit price', column: 1 },
                            { name: _cxSchema.cr_transaction.UNITCOST, label: 'unit cost', column: 1 },

                            { name: _cxSchema.cr_transaction.RAW_VALUEGROSS, label: 'gross (raw)', column: 2 },
                            { name: _cxSchema.cr_transaction.RAW_VALUENET, label: 'net (raw)', column: 2 },
                            { name: _cxSchema.cr_transaction.RAW_VALUETAX, label: 'tax (raw)', column: 2 },
                            { name: _cxSchema.cr_transaction.RAW_VALUEDISCOUNT, label: 'discount (raw)', column: 2 },
                            { name: _cxSchema.cr_transaction.RAW_VALUEDISCOUNTPROMO, label: 'promo (raw)', column: 2 },

                            { name: _cxSchema.cr_transaction.TAXCODE, label: 'tax code', lookUps: taxCodeLookUp, column: 2 },
                            { name: _cxSchema.cr_transaction.TAXRATE, label: 'tax rate', column: 2 },
                        ]
                    },
                    {
                        group: 'other', title: 'other info', column: 3, columnCount: 2, inline: true, fields: [
                          //  { name: _cxSchema.cr_transaction.CUSTOMERACCOUNT, label: 'customer account', column: 1 },
                            //await this.fieldDropDownOptions(_cxSchema.cx_traderAccount, { id: 'traderAccountId', name: 'traderCode', column: 1, }),
                            await this.fieldDropDownOptions(_cxSchema.cx_traderAccount, {
                                id: _cxSchema.cr_transaction.CUSTOMERACCOUNT, name: _cxSchema.cr_transaction.CUSTOMERACCOUNT, column: 1, dropDownSelectOptions: {
                                    s: this.dataSource.shopId,
                                    tt: 'C',
                                    valueField: _cxSchema.cx_traderAccount.TRADERCODE
                                }
                            }),

                            { name: _cxSchema.cr_transaction.DEPARTMENT, label: 'department', lookUps: depLookUp, column: 1 },
                            { name: _cxSchema.cr_transaction.SUBDEPARTMENT, label: 'sub-department', lookUps: subDepLookUp, column: 1 },
                            { name: _cxSchema.cr_transaction.CASHIERID, label: 'cashier id', column: 1 },
                            { name: _cxSchema.cr_transaction.TILLID, label: 'till id', column: 1 },

                            { name: _cxSchema.cr_transaction.VOIDED, label: 'voided', column: 2 },
                            { name: _cxSchema.cr_transaction.ISMANUAL, label: 'manual', readOnly: true, column: 2 },
                            { name: _cxSchema.cr_transaction.ISDUPLICATE, label: 'duplicate', readOnly: true, column: 2 },
                            { name: _cxSchema.cr_transaction.IGNORED, label: 'ignored', column: 2 },
                            { name: _cxSchema.cr_transaction.PAIDINOUTREASONID, label: 'paid in/out reason', column: 2 },
                            { name: _cxSchema.cr_transaction.PAIDINOUTREASONDESCRIPTION, label: 'paid in/out description', column: 2 },
                        ]
                    },
                    {
                        group: 'fuel', title: 'fuel info', column: 4, columnCount: 1, fields: [
                            { name: _cxSchema.cr_transaction.PUMPNUMBER, label: 'pump number', column: 1 },
                            { name: _cxSchema.cr_transaction.CARDTYPE, label: 'card type', column: 1 },
                            { name: _cxSchema.cr_transaction.CARDNAME, label: 'card name', column: 1 },
                            { name: _cxSchema.cr_transaction.BUNKERED, label: 'bunkered', column: 1 },

                        ]
                    }
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
            { label: 'cashbook heading', fieldName: 'cb_h', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
        ];
        this.options.columns = [
            { name: 'tranId', title: ' ', align: 'center' },

            { name: 'shopInfo', title: 'store', width: '200px' },
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
            { column: 'isManual', op: '=', value: true, style: 'color: var(--main-color-3);' }
            // { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.Error, style: 'color: #DF0101; background-color: var(--element-bg-color);' },
            // { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.PostingError, style: 'color: #DF0101; background-color: var(--element-bg-color);' },
            // { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.New, style: 'color: darkturquoise; ' },
            // { column: 'status', op: '=', value: _cxConst.CR_CASH_BOOK.STATUS.Pending, style: 'color: #FFCD00; background-color: var(--element-bg-color);' }
        ];

        this.options.actionsShowFirst = true;
        this.options.actions = [
            { label: 'delete', funcName: 'deleteManualTransaction' },
            { label: 'edit', funcName: 'editManualTransaction' },
            //{ label: 'epos', link: '/epos/transmissions?s=', target: '_blank' },
        ]

        // this.options.allowEditCondition = function (object) {
        //     return object.isManual;
        // }

        this.options.allowActionCondition = function (action, object) {
            // TODO: also do not allow if cb processed some-how
            // if (!object.isManual) { return false; }
            // var query = { sql: 'select status from cr_cb_transaction where cbTranId=@cbTranId', params: [{ name: 'cbTranId', value: object.cbTranId }] };
            // var cbStatus = await this.dataSource.cx.exec(query);
            // return !(cbStatus == _cx.Const.CR_CASH_BOOK.STATUS.New || cbStatus == _cx.Const.CR_CASH_BOOK.STATUS.Pending || cbStatus == _cx.Const.CR_CASH_BOOK.STATUS);
            return object.isManual;
        }


    }

}

module.exports = CRCashBookRender;
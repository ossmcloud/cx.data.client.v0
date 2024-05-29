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
        this.options.allowEdit = this.dataSource.isManual;
        this.options.allowDelete = this.dataSource.isManual;

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

        var tranTypeCfg = null; var showAllFields = this.options.query.show == 'all_fields';
        if (this.dataSource.tranTypeConfigId) {
            tranTypeCfg = await this.dataSource.cx.table(_cxSchema.cr_tran_type_config).fetch(this.dataSource.tranTypeConfigId, true);
        }



        var fgMainInfo = { group: 'main', title: 'main info', column: 1, columnCount: 2, inline: true, fields: [] }
        var fgValueInfo = { group: 'value', title: 'values info', column: 2, columnCount: 2, inline: true, fields: [] }
        var fgOtherInfo = { group: 'other', title: 'other info', column: 3, columnCount: 2, inline: true, fields: [] };
        var fgFuelInfo = { group: 'fuel', title: 'fuel info', column: 4, columnCount: 1, fields: [] };
        var fdTraderAccount = await this.fieldDropDownOptions(_cxSchema.cx_traderAccount, {
            id: _cxSchema.cr_transaction.CUSTOMERACCOUNT, name: _cxSchema.cr_transaction.CUSTOMERACCOUNT, column: 1, dropDownSelectOptions: {
                s: this.dataSource.shopId,
                tt: 'C',
                valueField: _cxSchema.cx_traderAccount.TRADERCODE
            }
        });

        if (!tranTypeCfg || showAllFields) {
            fgMainInfo.fields = [
                { name: _cxSchema.cr_transaction.CBTRANID, label: 'cb tran id', readOnly: true, column: 1, noFormat: true },
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
            ];
            fgValueInfo.fields = [
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
            ];
            fgOtherInfo.fields = [
                fdTraderAccount,

                { name: _cxSchema.cr_transaction.DEPARTMENT, label: 'department', lookUps: depLookUp, column: 1 },
                { name: _cxSchema.cr_transaction.SUBDEPARTMENT, label: 'sub-department', lookUps: subDepLookUp, column: 1 },
                { name: _cxSchema.cr_transaction.CASHIERID, label: 'cashier id', column: 1 },
                { name: _cxSchema.cr_transaction.TILLID, label: 'till id', column: 1 },
                { name: _cxSchema.cr_transaction.ANALYSIS1, label: 'analysis 1', column: 1 },
                { name: _cxSchema.cr_transaction.ANALYSIS2, label: 'analysis 2', column: 1 },
                { name: _cxSchema.cr_transaction.ANALYSIS3, label: 'analysis 3', column: 1 },
                

                { name: _cxSchema.cr_transaction.VOIDED, label: 'voided', column: 2 },
                { name: _cxSchema.cr_transaction.ISMANUAL, label: 'manual', readOnly: true, column: 2 },
                { name: _cxSchema.cr_transaction.ISDUPLICATE, label: 'duplicate', readOnly: true, column: 2 },
                { name: _cxSchema.cr_transaction.IGNORED, label: 'ignored', column: 2 },
                { name: _cxSchema.cr_transaction.PAIDINOUTREASONID, label: 'paid in/out reason', column: 2 },
                { name: _cxSchema.cr_transaction.PAIDINOUTREASONDESCRIPTION, label: 'paid in/out description', column: 2 },
            ];
            fgFuelInfo.fields = [
                { name: _cxSchema.cr_transaction.PUMPNUMBER, label: 'pump number', column: 1 },
                { name: _cxSchema.cr_transaction.CARDTYPE, label: 'card type', column: 1 },
                { name: _cxSchema.cr_transaction.CARDNAME, label: 'card name', column: 1 },
                { name: _cxSchema.cr_transaction.BUNKERED, label: 'bunkered', column: 1 },

            ];

        } else {

            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.CBTRANID, label: 'cb tran id', readOnly: true, column: 1, noFormat: true });
            fgMainInfo.fields.push({ name: 'shopInfo', label: 'store', readOnly: true, column: 1 });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.TRANSACTIONDATE, label: 'tran date', column: 1, validation: '{ "mandatory": true }' });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.TRANSACTIONDATETIME, label: 'tran date/tme', column: 1 });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.EPOSTRANSACTIONNO, label: 'epos tran no', column: 1 });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.EPOSTRANSACTIONID, label: 'epos tran id', column: 1 });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.TRANSACTIONTYPE, label: 'epos tran type', column: 1, lookUps: tranTypeLookUp, readOnly: true });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.TRANSACTIONSUBTYPE, label: 'sub-type', column: 1, lookUps: tranSubTypeLookUp, readOnly: true });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.REFERENCE1, label: 'reference 1', column: 2, validation: '{ "mandatory": true }' });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.REFERENCE2, label: 'reference 2', column: 2 });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.LINENUMBER, label: 'line', column: 2 });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.QUANTITY, label: 'quantity', column: 2 });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.ITEMBARCODE, label: 'barcode', column: 2 });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.ITEMDESCRIPTION, label: 'item description', column: 2 });
            fgMainInfo.fields.push({ name: _cxSchema.cr_transaction.PLUCODE, label: 'plu code', column: 2 });

            if (tranTypeCfg.cbTranTypeId == 2 || tranTypeCfg.cbTranTypeId == 3 || tranTypeCfg.cbTranTypeId == 4) {
                // Lodgement, Pay-Ins/Outs, Supplier Payouts
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.VALUEGROSS, label: 'amount', column: 1, validation: '{ "mandatory": true }' });
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.CASHBACK, label: 'cashback', column: 1 });
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.CHANGE, label: 'change', column: 1 });

                fgOtherInfo.fields.push(fdTraderAccount);

                fgOtherInfo.fields.push({ name: _cxSchema.cr_transaction.PAIDINOUTREASONID, label: 'paid in/out reason', column: 2 });
                fgOtherInfo.fields.push({ name: _cxSchema.cr_transaction.PAIDINOUTREASONDESCRIPTION, label: 'paid in/out description', column: 2 });

            } else {
                // SALES, others, Wastage
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.VALUEGROSS, label: 'gross', column: 1, validation: '{ "mandatory": true }' });
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.VALUENET, label: 'net', column: 1, validation: '{ "mandatory": true }' });
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.VALUETAX, label: 'tax', column: 1, validation: '{ "mandatory": true }' });
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.VALUEDISCOUNT, label: 'discount', column: 1 });
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.VALUEDISCOUNTPROMO, label: 'promo', column: 1 });
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.UNITPRICE, label: 'unit price', column: 1 });
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.UNITCOST, label: 'unit cost', column: 1 });
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.TAXCODE, label: 'tax code', lookUps: taxCodeLookUp, column: 2, validation: '{ "mandatory": true }' });
                fgValueInfo.fields.push({ name: _cxSchema.cr_transaction.TAXRATE, label: 'tax rate', column: 2, validation: '{ "mandatory": true }' });

                fgOtherInfo.fields.push(fdTraderAccount);

                fgOtherInfo.fields.push({ name: _cxSchema.cr_transaction.DEPARTMENT, label: 'department', lookUps: depLookUp, column: 1, validation: '{ "mandatory": true }' });
                fgOtherInfo.fields.push({ name: _cxSchema.cr_transaction.SUBDEPARTMENT, label: 'sub-department', lookUps: subDepLookUp, column: 1 });
                fgOtherInfo.fields.push({ name: _cxSchema.cr_transaction.CASHIERID, label: 'cashier id', column: 1 });
                fgOtherInfo.fields.push({ name: _cxSchema.cr_transaction.TILLID, label: 'till id', column: 1 });
                fgOtherInfo.fields.push({ name: _cxSchema.cr_transaction.VOIDED, label: 'voided', column: 2 });
                fgOtherInfo.fields.push({ name: _cxSchema.cr_transaction.ISMANUAL, label: 'manual', readOnly: true, column: 2 });
                fgOtherInfo.fields.push({ name: _cxSchema.cr_transaction.ISDUPLICATE, label: 'duplicate', readOnly: true, column: 2 });
                fgOtherInfo.fields.push({ name: _cxSchema.cr_transaction.IGNORED, label: 'ignored', column: 2 });
            }

        }



        this.options.fields = [{ group: 'mainOuter', title: '', columnCount: 4, fields: [fgMainInfo, fgValueInfo] }];
        if (fgOtherInfo.fields.length > 0) {
            this.options.fields[0].fields.push(fgOtherInfo);
            this.options.fields[0].columnCount += 1;
            fgOtherInfo.column = this.options.fields[0].columnCount;
        }
        if (fgFuelInfo.fields.length > 0) {
            this.options.fields[0].fields.push(fgFuelInfo);
            this.options.fields[0].columnCount += 1;
            fgFuelInfo.column = this.options.fields[0].columnCount;
        }

        this.options.buttons.push({ id: 'cr_cb_view', text: 'View Cash Book', function: 'viewCashBook' });

        if (this.options.mode == 'view') {
            this.options.buttons.push({ id: 'cr_cb_all_fields', text: (showAllFields) ? 'Show less fields' : 'Show all fields', function: 'toggleAllFields' });
        }
    }

    async _list() {
        var cbTranTypes = [{ value: '', text: ' - all - ' }];
        var query = { sql: 'select cbTranTypeId as value, code as text from cr_cb_tran_type' };
        var cbTranTypeSrc = await this.dataSource.cx.exec(query);
        cbTranTypeSrc.each(function (t) { cbTranTypes.push({ value: t.value, text: t.text }); });

        if (this.options.query.cb) {
            this.options.query.s = await this.dataSource.cx.table(_cxSchema.cr_cb_transaction).lookUp(this.options.query.cb, _cxSchema.cr_cb_transaction.SHOPID);
        }

        var tranTypeConfigs = await this.dataSource.cx.table(_cxSchema.cr_tran_type_config).toLookUpList(this.options.query.s, '- all -');

        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            { label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            { label: 'transaction type', fieldName: 'tt', width: '150px', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: cbTranTypes, },
            { label: 'tran. config.', fieldName: 'ttt', width: '200px', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: tranTypeConfigs, },
            { label: 'manual', fieldName: 'manual', type: _cxConst.RENDER.CTRL_TYPE.SELECT, width: '75px', items: [{ value: '', text: 'either' }, { value: 'true', text: 'yes' }, { value: 'false', text: 'no' }] },
            { label: 'edited', fieldName: 'edited', type: _cxConst.RENDER.CTRL_TYPE.SELECT, width: '75px', items: [{ value: '', text: 'either' }, { value: 'true', text: 'yes' }, { value: 'false', text: 'no' }] },
            { label: 'duplicate', fieldName: 'duplicate', type: _cxConst.RENDER.CTRL_TYPE.SELECT, width: '75px', items: [{ value: '', text: 'either' }, { value: 'true', text: 'yes' }, { value: 'false', text: 'no' }] },
            { label: 'voided', fieldName: 'voided', type: _cxConst.RENDER.CTRL_TYPE.SELECT, width: '75px', items: [{ value: '', text: 'either' }, { value: 'true', text: 'yes' }, { value: 'false', text: 'no' }] },
            { label: 'ignored', fieldName: 'ignored', type: _cxConst.RENDER.CTRL_TYPE.SELECT, width: '75px', items: [{ value: '', text: 'either' }, { value: 'true', text: 'yes' }, { value: 'false', text: 'no' }] },
            { html: '<br />' },
            { label: 'customer', fieldName: 'cust', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
            { label: 'epos tran. type', fieldName: 'e_tt', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
            { label: 'epos tran. sub-type', fieldName: 'e_ts', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
            { label: 'epos tran. no', fieldName: 'e_tn', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
            { label: 'cashbook heading', fieldName: 'cb_h', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
            { label: 'reference 1', fieldName: 'ref1', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '200px' },
            { label: 'reference 2', fieldName: 'ref2', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '200px' },
            { label: 'item code', fieldName: 'barcode', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '100px' },
            { label: 'item description', fieldName: 'descr', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '200px' },
            { label: 'cb', fieldName: 'cb', type: _cxConst.RENDER.CTRL_TYPE.NUMERIC, formatMoney: false, width: '30px', readOnly: true },
            { html: '<br />' },
            { label: 'epos department', fieldName: 'epos_dep', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
            { label: 'epos sub department', fieldName: 'epos_sdep', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
            { label: 'epos description', fieldName: 'epos_depd', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '350px' },
            { label: 'gl code', fieldName: 'erp_code', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
            { label: 'gl sub code', fieldName: 'erp_scode', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '150px' },
            { label: 'gl description', fieldName: 'erp_coded', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '350px' },

            { label: 'epos tax code', fieldName: 'epos_tax', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '100px' },
            { label: 'gl tax code', fieldName: 'erp_tax', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '100px' },
        ];

        var addValuesStyle = 'border-top: 1px dotted rgb(97,97,97); color: gray;';
        var addValuesStyleTitle = `<br /><span style="${addValuesStyle}">`;
        this.options.columns = [];
        this.options.columns.push({ name: 'tranId', title: ' ', align: 'center' });
        if (!this.options.query.s) { this.options.columns.push({ name: 'shopInfo', title: 'store', width: '200px' }); }

        //
        this.options.columns.push({ name: 'editedIcon', headerToolTip: 'manual / edited', title: ' ', align: 'center', width: '30px' });
        this.options.columns.push({ name: 'voidedIcon', headerToolTip: 'voided or ignored', title: ' ', align: 'center', width: '30px' });
        this.options.columns.push({ name: 'isDuplicateIcon', headerToolTip: 'is duplicated transaction', title: ' ', align: 'center', width: '30px' });
        this.options.columns.push({ name: 'transactionDateDisplay', title: `date${addValuesStyleTitle}time</span>`, align: 'center', width: '130px' });
        this.options.columns.push({ name: _cxSchema.cr_transaction.EPOSTRANSACTIONNO, title: `epos tran. no${addValuesStyleTitle}customer</span>`, addValues: [{ name: 'customerAccountDisplay', style: addValuesStyle }], nullText: '' });
        this.options.columns.push({ name: "cbTranInfo", title: `cb tran. type${addValuesStyleTitle}epos tran. type</span>`, addValues: [{ name: 'transactionTypeDisplay', style: addValuesStyle }] });
        this.options.columns.push({ name: _cxSchema.cr_transaction.REFERENCE1, title: `reference 1${addValuesStyleTitle}reference 2</span>`, addValues: [{ name: _cxSchema.cr_transaction.REFERENCE2, style: addValuesStyle }] });
        this.options.columns.push({ name: _cxSchema.cr_transaction.LINENUMBER, title: `line${addValuesStyleTitle}qty</span>`, align: 'right', width: '30px', addValues: [{ name: 'quantityDisplay', style: addValuesStyle }] });
        this.options.columns.push({ name: _cxSchema.cr_transaction.ITEMBARCODE, title: `item barcode${addValuesStyleTitle}item description</span>`, nullText: '', addValues: [{ name: 'itemDescriptionDisplay', style: addValuesStyle }] });
        this.options.columns.push({ name: "departmentInfo", title: `department${addValuesStyleTitle}gl account info</span>`, addValues: [{ name: 'erpGLInfo', style: addValuesStyle }] });
        this.options.columns.push({ name: "taxInfo", title: `tax${addValuesStyleTitle}gl tax info</span>`, addValues: [{ name: 'erpTaxInfo', style: addValuesStyle }] });
        this.options.columns.push({ name: _cxSchema.cr_transaction.VALUEGROSS, title: 'gross', align: 'right', width: '90px', addTotals: true, nullText: '' });
        this.options.columns.push({ name: _cxSchema.cr_transaction.VALUENET, title: 'net', align: 'right', width: '90px', addTotals: true, nullText: '' });
        this.options.columns.push({ name: _cxSchema.cr_transaction.VALUETAX, title: 'tax', align: 'right', width: '90px', addTotals: true, nullText: '' });
        this.options.columns.push({ name: _cxSchema.cr_transaction.VALUEDISCOUNT, title: 'discount', align: 'right', width: '90px', addTotals: true, nullText: '' });
        this.options.columns.push({ name: _cxSchema.cr_transaction.VALUEDISCOUNTPROMO, title: 'promo', align: 'right', width: '90px', addTotals: true, nullText: '' });
        this.options.columns.push({ name: _cxSchema.cr_transaction.CHANGE, title: 'change', align: 'right', width: '90px', addTotals: true, nullText: '' });
        this.options.columns.push({ name: _cxSchema.cr_transaction.CASHBACK, title: 'cashback', align: 'right', width: '90px', addTotals: true, nullText: '' });

        this.options.highlights = [
            { column: 'isManual', op: '=', value: true, style: 'color: var(--main-color-3);' },
            { column: 'voided', op: '=', value: true, style: 'color: var(--element-color-faint);' },
            { column: 'ignored', op: '=', value: true, style: 'color: var(--element-color-faint);' },
        ];

        if (!this.options.dialog) {
            this.options.paging = true;
            this.options.pageNo = (this.options.query.page || 1);

        }

        this.options.allowActionCondition = function (action, object) { return object.isManual; }
    }

}

module.exports = CRCashBookRender;
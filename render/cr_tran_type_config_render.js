'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CrTranTypeConfigRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {

        var shop = this.dataSource.cx.table(_cxSchema.cx_shop);
        await shop.select({ ttcfg: this.dataSource.mapConfigId });
        shop = shop.first();
        var shopId = (shop) ? shop.shopId : -1;

        var cbTranTypeLookUps = this.dataSource.cx.table(_cxSchema.cr_cb_tran_type);
        cbTranTypeLookUps = await cbTranTypeLookUps.toLookUpList(true);
        
        var duplicateAsLookUps = this.dataSource.cx.table(_cxSchema.cr_tran_type_config);
        duplicateAsLookUps = await duplicateAsLookUps.toLookUpListByCfg(this.dataSource.mapConfigId, true);

        var erpTranTypeLookUps = this.dataSource.cx.table(_cxSchema.sys_erp_tran_type);
        erpTranTypeLookUps = await erpTranTypeLookUps.toLookUpList('', true);
        

        this.options.fields = [
            {
                group: 'mainOuter', title: '', columnCount: 4, fields: [
                    {
                        group: 'epos', title: 'epos info', column: 1, columnCount: 1, inline: true, fields: [
                            { name: _cxSchema.cr_tran_type_config.EPOSTRANTYPE, label: 'Type', readOnly: true, column: 1 },
                            { name: _cxSchema.cr_tran_type_config.EPOSTRANSUBTYPE, label: 'Sub Type', readOnly: true, column: 1 },
                            { name: _cxSchema.cr_tran_type_config.DESCRIPTION, label: 'Description', column: 1 },
                        ]
                    },

                    {
                        group: 'cb', title: 'cash-book configurations', column: 2, columnCount: 2, inline: true, fields: [
                            { name: _cxSchema.cr_tran_type_config.CBTRANTYPEID, label: 'CB Type', column: 1, lookUps: cbTranTypeLookUps },
                            { name: _cxSchema.cr_tran_type_config.CBHEADING, label: 'CB Heading', column: 2 },
                            { name: _cxSchema.cr_tran_type_config.DUPLICATEAS, label: 'Duplicate As', column: 1, lookUps: duplicateAsLookUps },
                            { name: _cxSchema.cr_tran_type_config.REQUIRESDECLARATION, label: 'Declarations', lookUps: _cxConst.CR_CASH_BOOK.REQUIRE_DECLARATION.toList(), column: 2 },
                            {
                                group: 'cb1', column: 1, columnCount: 3, inline: true, fields: [
                                    { name: _cxSchema.cr_tran_type_config.IGNORE, label: 'Ignore', column: 1 },
                                    { name: _cxSchema.cr_tran_type_config.INVERTSIGN, label: 'Invert Sign', column: 2 },
                                    { name: _cxSchema.cr_tran_type_config.ALLOWEDIT, label: 'Allow Edit', column: 3 },
                                ]
                            },
                            
                            
                        ]
                    },

                    {
                        group: 'erp', title: 'erp configurations', column: 3, columnCount: 1, inline: true, fields: [
                            { name: _cxSchema.cr_tran_type_config.ERPTRANTYPEID, label: 'ERP Type', column: 1, lookUps: erpTranTypeLookUps },
                            //{ name: _cxSchema.cr_tran_type_config.TRADERACCOUNT, label: 'A/C Ref', column: 1 },
                            await this.fieldDropDownOptions(_cxSchema.cx_traderAccount, {
                                id: _cxSchema.cr_tran_type_config.TRADERACCOUNT, name: _cxSchema.cr_tran_type_config.TRADERACCOUNT, column: 1, dropDownSelectOptions: {
                                    s: shopId,
                                    tt: 'C',
                                    //valueField: _cxSchema.cx_traderAccount.TRADERCODE
                                }
                            }),
                            //{ name: _cxSchema.cr_tran_type_config.ERPGLACCOUNTID, label: 'ERP GL Account', column: 1 },
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                id: _cxSchema.cr_tran_type_config.ERPGLACCOUNTID, name: _cxSchema.cr_tran_type_config.ERPGLACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            //{ name: _cxSchema.cr_tran_type_config.ERPCBACCOUNTID, label: 'ERP CB Account', column: 1 },
                            await this.fieldDropDownOptions(_cxSchema.erp_bank_account, {
                                id: _cxSchema.cr_tran_type_config.ERPCBACCOUNTID, name: _cxSchema.cr_tran_type_config.ERPCBACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            //{ name: _cxSchema.cr_tran_type_config.ERPTAXACCOUNTID, label: 'ERP Tax Account', column: 1 },
                            await this.fieldDropDownOptions(_cxSchema.erp_tax_account, {
                                id: _cxSchema.cr_tran_type_config.ERPTAXACCOUNTID, name: _cxSchema.cr_tran_type_config.ERPTAXACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                        ]
                    },

                    {
                        group: 'audit', title: 'audit info', column: 4, columnCount: 1, fields: [
                            { name: _cxSchema.cr_tran_type_config.CREATEDBY, label: 'created by', column: 1, readOnly: true },
                            { name: _cxSchema.cr_tran_type_config.CREATED, label: 'created on', column: 1, readOnly: true },
                            { name: _cxSchema.cr_tran_type_config.MODIFIEDBY, label: 'modified by', column: 1, readOnly: true },
                            { name: _cxSchema.cr_tran_type_config.MODIFIED, label: 'modified on', column: 1, readOnly: true },
                        ]
                    }
                ]
            }
        ]

    }

    async _list() {

        this.options.filters = [
            { label: 'tran type', fieldName: 'tt', name: _cxSchema.cr_tran_type_config.EPOSTRANTYPE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'tran sub-type', fieldName: 'ts', name: _cxSchema.cr_tran_type_config.EPOSTRANSUBTYPE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'description', fieldName: 'desc', name: _cxSchema.cr_tran_type_config.DESCRIPTION, type: _cxConst.RENDER.CTRL_TYPE.TEXT },

        ];
        this.options.columns = [
            { title: ' ', name: _cxSchema.cr_tran_type_config.TRANTYPECONFIGID },
            { title: 'map id', name: _cxSchema.cr_tran_type_config.MAPCONFIGID },
            { title: 'department', name: _cxSchema.cr_tran_type_config.EPOSTRANTYPE },
            { title: 'sub-department', name: _cxSchema.cr_tran_type_config.EPOSTRANSUBTYPE },
            { title: 'description', name: _cxSchema.cr_tran_type_config.DESCRIPTION },

            { title: 'c/b tran. type', name: 'cbTranType' },
            { title: 'c/b heading', name: _cxSchema.cr_tran_type_config.CBHEADING },
            { title: 'declarations', name: _cxSchema.cr_tran_type_config.REQUIRESDECLARATION, lookUps: _cxConst.CR_CASH_BOOK.REQUIRE_DECLARATION.toList() },
            { title: 'allow edit', name: _cxSchema.cr_tran_type_config.ALLOWEDIT },
            { title: 'invert sign', name: _cxSchema.cr_tran_type_config.INVERTSIGN },
            { title: 'ignore', name: _cxSchema.cr_tran_type_config.IGNORE },
            // 

            { title: 'erp tran. type', name: 'erpTranType' },

            { title: 'created', name: _cxSchema.cr_tran_type_config.CREATED },
            { title: 'by', name: _cxSchema.cr_tran_type_config.CREATEDBY },
            { title: 'modified', name: _cxSchema.cr_tran_type_config.MODIFIED },
            { title: 'by', name: _cxSchema.cr_tran_type_config.MODIFIEDBY },
        ];

        this.options.highlights = [
            { column: _cxSchema.cr_tran_type_config.IGNORE, op: '=', value: true, style: 'color: gray; font-style: italic;' }
        ];

    }


}

module.exports = CrTranTypeConfigRender;
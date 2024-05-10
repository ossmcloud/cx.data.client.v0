'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CrTranTypeShopConfigRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        var shopId = this.dataSource.shopId;

        var erpTranTypeLookUps = this.dataSource.cx.table(_cxSchema.sys_erp_tran_type);
        var erpCode = await this.dataSource.cx.table(_cxSchema.erp_shop_setting).getErpCode(shopId);
        erpTranTypeLookUps = await erpTranTypeLookUps.toLookUpList(erpCode, true);

        this.options.fields = [
            {
                group: 'mainOuter', title: '', columnCount: 2, fields: [
                    {
                        group: 'erp', title: 'erp configurations', column: 1, columnCount: 1, inline: true, fields: [
                            {
                                group: 'tran_type', columnCount: 3, styles: ['display: inline-block; max-width: 95px;', 'display: inline-block; max-width: 90px;', 'display: inline-block; width: calc(100% - 195px);'], fields: [
                                    { name: _cxSchema.cr_tran_type_config_shop.STOPPOSTING, label: 'STOP Posting', column: 1 },
                                    { name: _cxSchema.cr_tran_type_config_shop.SKIPPOSTING, label: 'Skip Posting', column: 2 },
                                    { name: _cxSchema.cr_tran_type_config_shop.ERPTRANTYPEID, label: 'ERP Type', column: 3, lookUps: erpTranTypeLookUps },
                                ]
                            },
                            {
                                group: 'trader_account', columnCount: 2, styles: ['display: inline-block; width: calc(100% - 95px);', 'display: inline-block; max-width: 90px;'], fields: [
                                    await this.fieldDropDownOptions(_cxSchema.cx_traderAccount, {
                                        id: _cxSchema.cr_tran_type_config_shop.TRADERACCOUNT, name: _cxSchema.cr_tran_type_config_shop.TRADERACCOUNT, column: 1, dropDownSelectOptions: { s: shopId, tt: 'C' }
                                    }),
                                    { name: _cxSchema.cr_tran_type_config_shop.ERPIGNORECUSTOMER, label: 'Ignore Cust', column: 2 },
                                ]
                            },
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                id: _cxSchema.cr_tran_type_config_shop.ERPGLACCOUNTID, name: _cxSchema.cr_tran_type_config_shop.ERPGLACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                label: 'erp CONTRA GL account', id: _cxSchema.cr_tran_type_config_shop.ERPGLCONTRAACCOUNTID, name: _cxSchema.cr_tran_type_config_shop.ERPGLCONTRAACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_bank_account, {
                                id: _cxSchema.cr_tran_type_config_shop.ERPCBACCOUNTID, name: _cxSchema.cr_tran_type_config_shop.ERPCBACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_tax_account, {
                                id: _cxSchema.cr_tran_type_config_shop.ERPTAXACCOUNTID, name: _cxSchema.cr_tran_type_config_shop.ERPTAXACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                        ]
                    },

                    {
                        group: 'erp', title: 'erp configurations (secondary)', column: 2, columnCount: 1, inline: true, fields: [
                            { name: _cxSchema.cr_tran_type_config_shop.ERP2NDTRANTYPEID, label: 'ERP Type (secondary)', column: 1, lookUps: erpTranTypeLookUps },
                            {
                                group: 'trader_account_2', columnCount: 2, styles: ['display: inline-block; width: calc(100% - 95px);', 'display: inline-block; max-width: 90px;'], fields: [
                                    await this.fieldDropDownOptions(_cxSchema.cx_traderAccount, {
                                        id: _cxSchema.cr_tran_type_config_shop.ERP2NDTRADERACCOUNT, name: _cxSchema.cr_tran_type_config_shop.ERP2NDTRADERACCOUNT, column: 1, dropDownSelectOptions: { s: shopId, tt: 'C' }
                                    }),
                                    { name: _cxSchema.cr_tran_type_config_shop.ERP2NDIGNORECUSTOMER, label: 'Ignore Cust', column: 2 },
                                ]
                            },
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                id: _cxSchema.cr_tran_type_config_shop.ERP2NDGLACCOUNTID, name: _cxSchema.cr_tran_type_config_shop.ERP2NDGLACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                label: 'erp CONTRA GL account', id: _cxSchema.cr_tran_type_config_shop.ERP2NDGLCONTRAACCOUNTID, name: _cxSchema.cr_tran_type_config_shop.ERP2NDGLCONTRAACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_bank_account, {
                                id: _cxSchema.cr_tran_type_config_shop.ERP2NDCBACCOUNTID, name: _cxSchema.cr_tran_type_config_shop.ERP2NDCBACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_tax_account, {
                                id: _cxSchema.cr_tran_type_config_shop.ERP2NDTAXACCOUNTID, name: _cxSchema.cr_tran_type_config_shop.ERP2NDTAXACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                        ]
                    },
                ]
            }
        ]

    }

    async _list() {
        this.options.columns = [
            { dataHidden: 'shop-id', name: 'shopId' },
            { title: 'shop', name: 'shopInfo', nullText: 'not set' },
            { title: 'skip posting', name: 'skipPosting', nullText: '', align: 'center' },
            { title: 'STOP posting', name: 'stopPosting', nullText: '', align: 'center' },
            { title: 'erp tran type', name: 'tranInfo', nullText: 'not set' },
            { title: 'trader', name: 'traderInfo', nullText: 'not set' },
            { title: 'gl account', name: 'glAccount', nullText: 'not set' },
            { title: 'gl (contra) account', name: 'glAccountContra', nullText: 'not set' },
            { title: 'bank account', name: 'bankAccount', nullText: 'not set' },
            { title: 'tax account', name: 'taxAccount', nullText: 'not set' },
            { title: '2nd erp tran type', name: 'tranInfo2', nullText: 'not set' },
            { title: '2nd trader', name: 'traderInfo2', nullText: 'not set' },
            { title: '2nd gl account', name: 'glAccount2', nullText: 'not set' },
            { title: '2nd gl (contra) account', name: 'glAccountContra2', nullText: 'not set' },
            { title: '2nd bank account', name: 'bankAccount2', nullText: 'not set' },
            { title: '2nd tax account', name: 'taxAccount2', nullText: 'not set' },



        ]
    }
}


module.exports = CrTranTypeShopConfigRender;
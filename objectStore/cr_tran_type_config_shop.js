'use strict'
//
const _cx_schema = require('../cx-client-schema');
const _persistentTable = require('./persistent/p-cr_tran_type_config_shop');
//
class cr_tran_type_config_shop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_tran_type_config_shop(this, defaults);
    }

    async select(params) {
        if (!params) { params = {}; }
        if (!isNaN(parseInt(params))) {
            params = { id: params };
        }
        var query = { sql: '', params: [] };
        query.params.push({ name: 'tranTypeConfigId', value: params.id });
        query.sql = `
            select				tranTypeShop.*,
                                ('[' + s.shopCode + '] ' + s.shopName) as shopInfo,
                                (tranType.tranLedger + ' ' + tranType.tranName) as tranInfo,
                                ('[' + traderAcc.traderCode + '] ' + traderAcc.traderName) as traderInfo,
                                ('[' + glAcc.code + '] ' + glAcc.description) as glAccount,
                                ('[' + glAccContra.code + '] ' + glAccContra.description) as glAccountContra,
                                ('[' + bankAcc.code + '] ' + bankAcc.description) as bankAccount,
                                ('[' + taxAcc.code + '] ' + taxAcc.description) as taxAccount,

                                ('[' + tranType2.tranLedger + '] ' + tranType2.tranName) as tranInfo2,
                                ('[' + traderAcc2.traderCode + '] ' + traderAcc2.traderName) as traderInfo2,
                                ('[' + glAcc2.code + '] ' + glAcc2.description) as glAccount2,
                                ('[' + glAccContra2.code + '] ' + glAccContra.description) as glAccountContra2,
                                ('[' + bankAcc2.code + '] ' + bankAcc2.description) as bankAccount2,
                                ('[' + taxAcc2.code + '] ' + taxAcc2.description) as taxAccount2
                                                                
            from				cr_tran_type_config_shop tranTypeShop
            inner join          cx_shop s ON s.shopId = tranTypeShop.shopId
            left outer join		sys_erp_tran_type tranType ON tranType.tranTypeId = tranTypeShop.erpTranTypeId
            left outer join		cx_traderAccount traderAcc ON traderAcc.traderAccountId = tranTypeShop.traderAccount
            left outer join		erp_gl_account glAcc ON glAcc.erpGLAccountId = tranTypeShop.erpGLAccountId
            left outer join		erp_gl_account glAccContra ON glAccContra.erpGLAccountId = tranTypeShop.erpGLContraAccountId
            left outer join		erp_bank_account bankAcc ON bankAcc.erpBankAccountId = tranTypeShop.erpCBAccountId
            left outer join		erp_tax_account taxAcc ON taxAcc.erpTaxAccountId = tranTypeShop.erpTaxAccountId

            left outer join		sys_erp_tran_type tranType2 ON tranType2.tranTypeId = tranTypeShop.erp2ndTranTypeId
            left outer join		cx_traderAccount traderAcc2 ON traderAcc2.traderAccountId = tranTypeShop.erp2ndTraderAccount
            left outer join		erp_gl_account glAcc2 ON glAcc2.erpGLAccountId = tranTypeShop.erp2ndGLAccountId
            left outer join		erp_gl_account glAccContra2 ON glAccContra2.erpGLAccountId = tranTypeShop.erp2ndGLContraAccountId
            left outer join		erp_bank_account bankAcc2 ON bankAcc2.erpBankAccountId = tranTypeShop.erp2ndCBAccountId
            left outer join		erp_tax_account taxAcc2 ON taxAcc2.erpTaxAccountId = tranTypeShop.erp2ndTaxAccountId

            where				tranTypeShop.tranTypeConfigId = @tranTypeConfigId
        `
        
        // this.query.clear();
        // this.query.addFilter({ name: _cx_schema.cr_tran_type_config_shop.TRANTYPECONFIGID, value: options.tranTypeConfigId });
        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cr_tran_type_config_shop extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);

        // @@TODO: move this bit to base class but do not run by default
        for (var key in defaults) {
            if (key == 'rowver') { continue; }
            if (this.fields[key] === undefined) {
                this[key] = defaults[key];
            }
        }

    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cr_tran_type_config_shop_Collection,
    Record: cr_tran_type_config_shop,
}


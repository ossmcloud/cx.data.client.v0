'use strict'
//
const _persistentTable = require('./persistent/p-erp_bank_account');
const _declarations = require('../cx-client-declarations');
//
class erp_bank_account_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new erp_bank_account(this, defaults);
    }

    async select(params) {
        if (!params) { params = {}; }
        var query = { sql: '', params: [] };

        var shopFilter = 'in';
        var shopFilterValue = this.cx.shopList;
        if (params.s) {
            shopFilter = '=';
            shopFilterValue = '@shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }

        query.sql = `select	t.*, s.shopCode, s.shopName
                    from	erp_bank_account t
                    inner join cx_shop s on s.shopId = t.shopId
                    where	s.shopId ${shopFilter} ${shopFilterValue}`;

        // if (params.tt) {
        //     query.sql += ' and t.traderType = @traderType';
        //     query.params.push({ name: 'traderType', value: params.tt });
        // }

        if (params.bc) {
            query.sql += ' and t.code like @code';
            query.params.push({ name: 'code', value: params.bc + '%' });
        }
        if (params.bd) {
            query.sql += ' and t.description like @description';
            query.params.push({ name: 'description', value: params.bd + '%' });
        }
        if (params.man) {
            query.sql += ' and isnull(t.isManual,0) like @isManual';
            query.params.push({ name: 'isManual', value: (params.man == 'true' || params.man == 'T') ? '1' : '0' });
        }

        query.sql += ' order by s.shopCode, t.code';

        if (!params.noPaging) {
            query.paging = {
                page: params.page || 1,
                pageSize: _declarations.SQL.PAGE_SIZE
            }
        }
        
        await super.select(query);
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: 'erpBankAccountId', value: id }] };

        var shopFilter = 'in';
        var shopFilterValue = this.cx.shopList;
        query.sql = `select	t.*, s.shopCode, s.shopName
                    from	erp_bank_account t
                    inner join cx_shop s on s.shopId = t.shopId
                    where	s.shopId ${shopFilter} ${shopFilterValue}
                    and     t.erpBankAccountId = @erpBankAccountId`;

        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }

    async findFromOtherShop(sourceErpAccountId, targetShopId, returnRecord) {
        var query = {
            sql: `
                select	erpTarget.erpBankAccountId
                        -- NOTE: need this for debug purposes
                        -- , erpTarget.code, erpTarget.description,
                        -- erpSource.erpBankAccountId, erpSource.code, erpSource.description
                                        
                from	erp_bank_account erpSource
                left outer join erp_shop_setting erpSett on erpSett.shopId = @targetShopId
                left outer join erp_bank_account  erpTarget on erpTarget.shopId = @targetShopId and erpTarget.code = erpSource.code
                where	erpSource.erpBankAccountId = @sourceErpAccountId
            `,
            params: [
                { name: 'sourceErpAccountId', value: sourceErpAccountId },
                { name: 'targetShopId', value: targetShopId },
            ],
            returnFirst: true,
        }

        var res = await this.cx.exec(query);
        if (!res) { return null; }
        if (returnRecord) { return await this.fetch(res.erpBankAccountId); }
        return res.erpBankAccountId
    }


}
//
// ----------------------------------------------------------------------------------------
//
class erp_bank_account extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    constructor(table, defaults) {
        if (!defaults) { defaults = {}; }
        super(table, defaults);
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }



    async save() {
        if (this.isNew() && this.cx.tUserId > 0) { this.isManual = true; }
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: erp_bank_account_Collection,
    Record: erp_bank_account,
}


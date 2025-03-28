'use strict'
//
const _persistentTable = require('./persistent/p-erp_gl_account');
const _declarations = require('../cx-client-declarations');
//
class erp_gl_account_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new erp_gl_account(this, defaults);
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
                    from	erp_gl_account t
                    inner join cx_shop s on s.shopId = t.shopId
                    where	s.shopId ${shopFilter} ${shopFilterValue}
                    --AND     isnull(t.costCentre, '') = ''
                    `;

        this.queryFromParams(query, params, 't');

        // if (params.tt) {
        //     query.sql += ' and t.traderType = @traderType';
        //     query.params.push({ name: 'traderType', value: params.tt });
        // }

        // if (params.glc) {
        //     query.sql += ' and (t.code like @code or t.costCentre like @code or department like @code)';
        //     query.params.push({ name: 'code', value: params.glc + '%' });
        // }


        // if (params.gld) {
        //     query.sql += ' and t.description like @description';
        //     query.params.push({ name: 'description', value: params.gld + '%' });
        // }

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
        var query = { sql: '', params: [{ name: 'erpGLAccountId', value: id }] };

        var shopFilter = 'in';
        var shopFilterValue = this.cx.shopList;
        query.sql = `select	t.*, s.shopCode, s.shopName
                    from	erp_gl_account t
                    inner join cx_shop s on s.shopId = t.shopId
                    where	s.shopId ${shopFilter} ${shopFilterValue}
                    and     t.erpGLAccountId = @erpGLAccountId`;

        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }

    async toErpLookUpList(shopId, fixedGlSeg2, mergeGLAndTax) {
        if (mergeGLAndTax) {
            await super.select({
                sql: 'select code, description, ignoreStoreGLSegments from erp_gl_account where shopId = @shopId order by code',
                params: [
                    { name: 'shopId', value: shopId },
                ],
                noPaging: true,
            });
        } else {
            await super.select({
                sql: 'select code, description, ignoreStoreGLSegments from erp_gl_account where shopId = @shopId group by code, description, ignoreStoreGLSegments order by code',
                params: [
                    { name: 'shopId', value: shopId },
                ],
                noPaging: true,
            });
        }

        var lookUpValues = [];
        super.each(function (rec) {
            lookUpValues.push({
                value: rec.code,
                text: rec.code,
                others: {
                    glAccountDescription: rec.description,
                    glAccountSeg2: (rec.ignoreStoreGLSegments) ? '' : fixedGlSeg2
                }
            })
        });
        return lookUpValues;
    }

    async toErpSeg2LookUpList(shopId) {
        await super.select({
            sql: 'select costCentre from erp_gl_account where shopId = @shopId group by costCentre order by costCentre',
            params: [
                { name: 'shopId', value: shopId },
            ],
            noPaging: true,
        });

        var lookUpValues = [];
        super.each(function (rec) {
            lookUpValues.push({
                value: rec.costCentre,
                text: rec.costCentre,
            })
        });
        return lookUpValues;
    }


    async findFromOtherShop(sourceErpAccountId, targetShopId, returnRecord) {
        var sqlScript = `
            select	glTarget.erpGLAccountId
                    -- NOTE: need this for debug purposes
                    -- , glTarget.code, glTarget.costCentre,
                    -- glSource.erpGLAccountId, glSource.code, glSource.costCentre

            from	erp_gl_account glSource
            left outer join erp_shop_setting erpSett on erpSett.shopId = @targetShopId
            left outer join erp_gl_account  glTarget on glTarget.shopId = @targetShopId and glTarget.code = glSource.code
                    {USE_COST_CENTER}
            where	glSource.erpGLAccountId = @sourceErpAccountId
        `

        var query = {
            sql: '',
            params: [
                { name: 'sourceErpAccountId', value: sourceErpAccountId },
                { name: 'targetShopId', value: targetShopId },
            ],
            returnFirst: true,
        }
        query.sql = sqlScript.replace('{USE_COST_CENTER}', " and isnull(glTarget.costCentre, '') = isnull(erpSett.erpCostCentre, '')");

        var res = await this.cx.exec(query);
        if (!res) {
            query.sql = sqlScript.replace('{USE_COST_CENTER}', '');
            res = await this.cx.exec(query);

            if (!res) { return null; }
        }
        if (returnRecord) { return await this.fetch(res.erpGLAccountId); }
        return res.erpGLAccountId
    }


}
//
// ----------------------------------------------------------------------------------------
//
class erp_gl_account extends _persistentTable.Record {
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
    Table: erp_gl_account_Collection,
    Record: erp_gl_account,
}


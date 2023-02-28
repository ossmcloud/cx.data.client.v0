'use strict'
//
const _persistentTable = require('./persistent/p-cx_map_config_tax');
const _declarations = require('../cx-client-declarations');
//
class cx_map_config_tax_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_map_config_tax(this, defaults);
    }

    async select(params) {
        if (!params) { params = {}; }
        var query = { sql: '', params: [] };
        query.sql = `select	tax.*, 
                            ('[' + etax.code + '] ' + etax.description + '(' + convert(varchar, etax.rate) + '%) - ' + etax.currencyCode) as taxAccount,
                            ('[' + etaxp.code + '] ' + etaxp.description + '(' + convert(varchar, etaxp.rate) + '%) - ' + etaxp.currencyCode) as taxAccountPurchase
                    from	cx_map_config_tax tax
                    left outer join erp_tax_account etax ON tax.taxAccountId = etax.erpTaxAccountId
                    left outer join erp_tax_account etaxp ON tax.purchaseTaxAccountId = etaxp.erpTaxAccountId
                    where   1 = 1`;

        if (params.mid) {
            query.sql += ' and mapConfigId = @mapConfigId';
            query.params.push({ name: 'mapConfigId', value: params.mid });
        }
        if (params.tt) {
            query.sql += ' and eposTaxCode like @eposTaxCode';
            query.params.push({ name: 'eposTaxCode', value: params.tt + '%' });
        }
        if (params.ts) {
            query.sql += ' and eposDescription like @eposDescription';
            query.params.push({ name: 'eposDescription', value: params.ts + '%' });
        }

        query.sql += ' order by eposTaxCode';

        if (!params.noPaging) {
            query.paging = {
                page: params.page || 1,
                pageSize: _declarations.SQL.PAGE_SIZE
            }
        }


        await super.select(query);
    }


    async toLookUpList(shopId) {
        var query = { sql: '', params: [{ name: 'shopId', value: shopId }] };
        query.sql = `
            select	eposTaxCode, eposTaxRate, eposDescription
                
            from	cx_map_config_tax tax
            inner join cx_shop s on tax.mapConfigId = s.depMapConfigId
            where	s.shopId = @shopId
            order by eposTaxCode`;

        var lookUpValues = [{ value: '', text: '' }];
        var result = await this.db.exec(query);
        for (var rx = 0; rx < result.rows.length; rx++) {
            var row = result.rows[rx];
            lookUpValues.push({
                value: row.eposTaxCode,
                text: row.eposDescription,
                object: JSON.stringify(row),
            })
        }

        return lookUpValues;
    }


}
//
// ----------------------------------------------------------------------------------------
//
class cx_map_config_tax extends _persistentTable.Record {
    #taxAccount = '';
    #taxAccountPurchase = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (defaults) {
            this.#taxAccount = defaults['taxAccount'] || '';
            this.#taxAccountPurchase = defaults['taxAccountPurchase'] || '';
        }
    };

    get taxAccount() { return this.#taxAccount; }
    get taxAccountPurchase() { return this.#taxAccountPurchase; }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cx_map_config_tax_Collection,
    Record: cx_map_config_tax,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cx_map_config_tax');
//
class cx_map_config_tax_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_map_config_tax(this, defaults);
    }

    async select(params) {
        if (!params) { params = {}; }
        var query = { sql: '', params: [] };
        query.sql = `select	tax.*, ('[' + etax.code + '] ' + etax.description + '(' + convert(varchar, etax.rate) + '%) - ' + etax.currencyCode) as taxAccount
                    from	cx_map_config_tax tax
                    left outer join erp_tax_account etax ON tax.taxAccountId = etax.erpTaxAccountId
                    where   1 = 1`;

        if (params.mid) {
            query.sql += ' and mapConfigId = @mapConfigId';
            query.params.push({ name: 'mapConfigId', value: params.mid });
        }

        query.sql += ' order by eposTaxCode';
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
                text:  row.eposDescription,
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
    constructor(table, defaults) {
        super(table, defaults);
        if (defaults) {
            this.#taxAccount = defaults['taxAccount'] || '';
        }
    };

    get taxAccount() { return this.#taxAccount; }

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


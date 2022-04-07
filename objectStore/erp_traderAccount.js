'use strict'
//
const _persistentTable = require('./persistent/p-erp_traderAccount');
//
class erp_traderAccount_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new erp_traderAccount(this, defaults);
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

        query.sql = `select	top 1000 t.*, s.shopCode, s.shopName
                    from	erp_traderAccount t
                    inner join cx_shop s on s.shopId = t.shopId
                    where	s.shopId ${shopFilter} ${shopFilterValue}`;

        if (params.tt) {
            query.sql += ' and t.traderType = @traderType';
            query.params.push({ name: 'traderType', value: params.tt });
        }

        if (params.tc) {
            query.sql += ' and t.traderCode like @traderCode';
            query.params.push({ name: 'traderCode', value: params.tc + '%' });
        }
        if (params.tn) {
            query.sql += ' and t.traderName like @traderName';
            query.params.push({ name: 'traderName', value: params.tn + '%' });
        }

        query.sql += ' order by s.shopCode, t.traderCode';

       
        await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class erp_traderAccount extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
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
    Table: erp_traderAccount_Collection,
    Record: erp_traderAccount,
}


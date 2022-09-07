'use strict'
//
const _persistentTable = require('./persistent/p-erp_gl_account');
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
                    where	s.shopId ${shopFilter} ${shopFilterValue}`;

        // if (params.tt) {
        //     query.sql += ' and t.traderType = @traderType';
        //     query.params.push({ name: 'traderType', value: params.tt });
        // }

        if (params.glc) {
            query.sql += ' and (t.code like @code or t.costCentre like @code or department like @code)';
            query.params.push({ name: 'code', value: params.glc + '%' });
        }
        if (params.gld) {
            query.sql += ' and t.description like @description';
            query.params.push({ name: 'description', value: params.gld + '%' });
        }

        query.sql += ' order by s.shopCode, t.code';


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


}
//
// ----------------------------------------------------------------------------------------
//
class erp_gl_account extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }


    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: erp_gl_account_Collection,
    Record: erp_gl_account,
}


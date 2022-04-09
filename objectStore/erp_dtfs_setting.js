'use strict'
//
const _persistentTable = require('./persistent/p-erp_dtfs_setting');
//
class erp_dtfs_setting_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new erp_dtfs_setting(this, defaults);
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

        query.sql = `select	top 1000 t.*
                    from	erp_dtfs_setting t
                    inner join erp_shop_setting s on s.dtfsSettingId = t.dtfsSettingId
                    where	s.shopId ${shopFilter} ${shopFilterValue}`;

        // if (params.tt) {
        //     query.sql += ' and t.traderType = @traderType';
        //     query.params.push({ name: 'traderType', value: params.tt });
        // }

        query.sql += ' order by t.dtfsSettingName';
        await super.select(query);
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: 'dtfsSettingId', value: id }] };

        var shopFilter = 'in';
        var shopFilterValue = this.cx.shopList;
        query.sql = `select	t.*
                    from	erp_dtfs_setting t
                    inner join erp_shop_setting s on s.dtfsSettingId = t.dtfsSettingId
                    where	s.shopId ${shopFilter} ${shopFilterValue}
                    and     t.dtfsSettingId = @dtfsSettingId`;

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
class erp_dtfs_setting extends _persistentTable.Record {
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
    Table: erp_dtfs_setting_Collection,
    Record: erp_dtfs_setting,
}


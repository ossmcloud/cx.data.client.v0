'use strict'
//
const _persistentTable = require('./persistent/p-erp_dtfs_ping');
const _declarations = require('../cx-client-declarations');

//
class erp_dtfs_ping_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new erp_dtfs_ping(this, defaults);
    }

    async select(params) {
        if (this.cx.cxSvc == true) { return await super.select(); }

        if (!params) { params = {}; }
        var query = { sql: '', params: [] };

        var shopFilter = 'in';
        var shopFilterValue = this.cx.shopList;
        if (params.s) {
            shopFilter = '=';
            shopFilterValue = '@shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }

        query.sql = `select	p.*, s.dtfsSettingName, s.dtfsPairedMachineName
                    from	erp_dtfs_ping p
                    inner join erp_dtfs_setting s on s.dtfsSettingId = p.dtfsSettingId
                    where	p.dtfsSettingId in (
                        select	dtfsSettingId 
                        from	erp_shop_setting ss 
                        where	ss.dtfsSettingId = s.dtfsSettingId
                        and		ss.shopId ${shopFilter} ${shopFilterValue}
                    )`;

        this.queryFromParams(query, params, 'p');

        query.sql += ' order by p.created desc, p.pingId desc';

        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }

        await super.select(query);
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: 'pingId', value: id }] };
        var shopFilter = 'in';
        var shopFilterValue = this.cx.shopList;
        
        query.sql = `select	top 1000 p.*, s.dtfsSettingName, s.dtfsPairedMachineName
                    from	erp_dtfs_ping p
                    inner join erp_dtfs_setting s on s.dtfsSettingId = p.dtfsSettingId
                    where	p.dtfsSettingId in (
                        select	dtfsSettingId 
                        from	erp_shop_setting ss 
                        where	ss.dtfsSettingId = s.dtfsSettingId
                        and		ss.shopId ${shopFilter} ${shopFilterValue}
                    )
                    and     p.pingId = @pingId`;

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
class erp_dtfs_ping extends _persistentTable.Record {
    #dtfsInfo = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#dtfsInfo = defaults['dtfsSettingName'] || defaults['dtfsInfo'] || '';

    };

    get dtfsInfo() { return this.#dtfsInfo; }

    async save() {
        if (this.isNew()) { this.created = new Date(); }
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: erp_dtfs_ping_Collection,
    Record: erp_dtfs_ping,
}


'use strict'
//
const _persistentTable = require('./persistent/p-epos_dtfs_ping');
const _declarations = require('../cx-client-declarations');
//
class epos_dtfs_ping_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new epos_dtfs_ping(this, defaults);
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
                    from	epos_dtfs_ping p
                    inner join epos_dtfs_setting s on s.dtfsSettingId = p.dtfsSettingId
                    where	p.dtfsSettingId in (
                        select	dtfsSettingId 
                        from	epos_shop_setting ss 
                        where	ss.dtfsSettingId = s.dtfsSettingId
                        and		ss.shopId ${shopFilter} ${shopFilterValue}
                    )`;
                    
        if (params.df) {
            query.sql += ' and p.created >= @dateFrom';
            query.params.push({ name: 'dateFrom', value: params.df });
        }
        if (params.dt) {
            query.sql += ' and p.created <= @dateTo';
            query.params.push({ name: 'dateTo', value: params.dt });
        }
        if (params.ss) {
            query.sql += ' and p.dtfsSettingId = @dtfsSettingId';
            query.params.push({ name: 'dtfsSettingId', value: params.ss });
        }

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
        // if (params.s) {
        //     shopFilter = '=';
        //     shopFilterValue = '@shopId';
        //     query.params.push({ name: 'shopId', value: params.s });
        // }

        query.sql = `select	top 1000 p.*, s.dtfsSettingName, s.dtfsPairedMachineName
                    from	epos_dtfs_ping p
                    inner join epos_dtfs_setting s on s.dtfsSettingId = p.dtfsSettingId
                    where	p.dtfsSettingId in (
                        select	dtfsSettingId 
                        from	epos_shop_setting ss 
                        where	ss.dtfsSettingId = s.dtfsSettingId
                        and		ss.shopId ${shopFilter} ${shopFilterValue}
                    )
                    and     p.pingId = @pingId`;

        
        
        // query.sql = `select  p.*, s.shopCode, s.shopName
        //              from    epos_dtfs_ping p, cx_shop s
        //              where   p.shopId = s.shopId
        //              and     p.pingId = @pingId
        //              and     p.${this.FieldNames.SHOPID} in ${this.cx.shopList} `;
        
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }

}
//
//
//
class epos_dtfs_ping extends _persistentTable.Record {
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
//
//
module.exports = {
    Table: epos_dtfs_ping_Collection,
    Record: epos_dtfs_ping,
}


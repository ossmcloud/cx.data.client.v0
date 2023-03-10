'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _persistentTable = require('./persistent/p-raw_getLog');
const _declarations = require('../cx-client-declarations');

//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class raw_getLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_getLog(this, defaults);
    }

    async getDates(params) {
        if (!params) { params = {}; }
        
        var query = {};
        query.sql = `select shopId, replace(convert(varchar, getDate, 111),'/','-') as [getDate], count(getLogId) as logCount, max(getResponse) as logMessage
                    from raw_getLog
                    where	getModule = 'retail'
                        and getResponse not like '%static%'
                        and getSuccess = 1
                        and shopId = @shopId
                        and	MONTH(getDate) = @month
                        and	YEAR(getDate) = @year
                    group by shopId, getDate
                    order by getDate`;
        
        query.params = [
            { name: 'shopId', value: params.s },
            { name: 'month', value: params.m },
            { name: 'year', value: params.y }
        ];

        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }



        var dates = [];
        var rawResults = await this.db.exec(query);
        rawResults.each(function (res, idx) {
            dates.push({
                d: res.getDate,
                toolTip: `${res.logCount} transmission(s)\n${res.logMessage}`,
                link: `../raw/summary?s=${res.shopId}&d=${res.getDate}`,
            })
        });
        return dates;
    }

    async select(params) {
        if (this.cx.cxSvc == true) { return await super.select(); }

        if (params.sql) {
            return await super.select(params);

        } else {
            var query = { sql: '', params: [] };
            query.sql = `
                    select  l.*, s.shopCode, s.shopName
                    from    raw_getLog l, cx_shop s
                    where   l.shopId = s.shopId
                    and     l.${this.FieldNames.SHOPID} in ${this.cx.shopList}
                `
            if (params.s) {
                query.sql += ' and l.shopId = @shopId';
                query.params.push({ name: 'shopId', value: params.s });
            }
            if (params.m) {
                query.sql += ' and l.getModule = @getModule';
                query.params.push({ name: 'getModule', value: params.m });
            }
            if (params.tr) {
                query.sql += ' and l.transmissionId like @transmissionId';
                query.params.push({ name: 'transmissionId', value: ('%' + params.tr + '%') });
            }
            if (params.df) {
                query.sql += ' and l.getDate >= @from';
                query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
            }
            if (params.dt) {
                query.sql += ' and l.getDate <= @to';
                query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
            }
            if (params.suc) {
                query.sql += ' and l.getSuccess = @success';
                query.params.push({ name: 'success', value: (params.suc === 'true') });
            }
            if (params.svc) {
                query.sql += ' and l.svcName = @svcName';
                query.params.push({ name: 'svcName', value: params.svc });
            }

            query.paging = {
                page: params.page || 1,
                pageSize: _declarations.SQL.PAGE_SIZE
            }

            query.sql += ' order by l.created desc';
            return await super.select(query);
            
        }
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: 'id', value: id }] };
        query.sql = `
                    select  l.*, s.shopCode, s.shopName
                    from    raw_getLog l, cx_shop s
                    where   l.shopId = s.shopId
                    and     l.getLogId = @id
                `
        query.noResult = 'null';
        query.returnFirst = true;
        
        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist or was deleted!`); }
        
        return super.populate(rawRecord);
    }

  

}
//
// 
//
class raw_getLog extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    async save() {
        if (this.isNew()) { this.created = new Date(); }
        await super.save()
    }
}
//
// 
//
module.exports = {
    Table: raw_getLog_Collection,
    Record: raw_getLog,
}


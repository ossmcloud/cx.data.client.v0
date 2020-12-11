'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _persistentTable = require('../persistent/p-raw_getLog');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class raw_getLog_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new raw_getLog(this, defaults);
    }

    async getDates(params) {
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

        var dates = [];
        var rawResults = await this.db.exec(query);
        rawResults.each(function (res, idx) {
            dates.push({
                d: res.getDate,
                toolTip: `${res.logCount} transmission(s)\n${res.logMessage}`,
                link: `../cr/cashbook?s=${res.shopId}&d=${res.getDate}`,
            })
        });
        return dates;
    }

    async select(params) {
        var _this = this;
        this.query = {
            build: function () {
                var query = { sql: '', params: [] };
                query.sql = `
                    select  top 1000 l.*, s.shopCode, s.shopName
                    from    raw_getLog l, cx_shop s
                    where   l.shopId = s.shopId
                    and     l.${_this.FieldNames.SHOPID} in ${_this.cx.shopList}
                `
                if (params.s) {
                    query.sql += ' and l.shopId = @shopId';
                    query.params.push({ name: 'shopId', value: params.s });
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

                query.sql += ' order by l.created desc';
                return query;
            }
        }
        await super.select();
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: 'shopId', value: id }] };
        query.sql = `
                    select  l.*, s.shopCode, s.shopName
                    from    raw_getLog l, cx_shop s
                    where   l.shopId = s.shopId
                    and     l.getLogId = @shopId
                `
        query.noResult = 'null';
        query.returnFirst = true;
        
        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist or was deleted!`); }
        
        return super.populate(rawRecord);
    }

  

}
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD SHOULD BE BUILT HERE
//
class raw_getLog extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() {
        return `[${this.#shopCode}] ${this.#shopName}`;
    }

  
}
//
// EXPORTS ONLY TABLE AND RECORD
//
module.exports = {
    Table: raw_getLog_Collection,
    Record: raw_getLog,
}


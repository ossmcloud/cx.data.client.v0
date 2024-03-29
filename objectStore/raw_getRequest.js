'use strict'
//
const _persistentTable = require('./persistent/p-raw_getRequest');
const _declarations = require('../cx-client-declarations');
//
class raw_getRequest_Collection extends _persistentTable.Table {
    createNew(defaults) {
        var newRecord = new raw_getRequest(this, defaults);
        //newRecord.createdBy = this.cx.tUserId;
        return newRecord;
    }

    async select(params) {
        if (this.cx.cxSvc == true) { return await super.select(); }
        
        if (!params) { params = {}; }
        var query = { sql: '', params: [] };
        query.sql = `
                    select  l.*, s.shopCode, s.shopName
                    from    raw_getRequest l, cx_shop s
                    where   l.shopId = s.shopId
                    and     l.${this.FieldNames.SHOPID} in ${this.cx.shopList}
                `
        if (params.s) {
            if (params.s == '@NULL@') {
                query.sql += ` and l.shopId is null`;
            } else {
                query.sql += ' and l.shopId = @shopId';
                query.params.push({ name: 'shopId', value: params.s });
            }
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
        if (params.st) {
            query.sql += ' and l.status = @status';
            query.params.push({ name: 'status', value: params.st });
        }

        if (params.svc) {
            query.sql += ' and l.svcName = @svcName';
            query.params.push({ name: 'svcName', value: params.svc });
        }

        query.sql += ' order by l.created desc';

        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }

        await super.select(query);
    }

    async fetch(id, defaults) {
        var query = { sql: '', params: [{ name: 'id', value: id }] };
        query.sql = `
                    select  l.*, s.shopCode, s.shopName
                    from    raw_getRequest l, cx_shop s
                    where   l.shopId = s.shopId
                    and     l.getRequestId = @id
                `
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return this.createNew(defaults); }

        return super.populate(rawRecord);
    }

}
//
//
//
class raw_getRequest extends _persistentTable.Record {
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
        return await super.save();
    }
}
//
// 
//
module.exports = {
    Table: raw_getRequest_Collection,
    Record: raw_getRequest,
}


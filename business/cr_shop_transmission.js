'use strict'
//
// REQUIRE PERSISTENT TABLE
//
const _persistentTable = require('../persistent/p-cr_shop_transmission');
const _declarations = require('../cx-client-declarations');
const _cx_render = require('../cx-client-render');
//
// NOTE: BUSINESS LOGIC RELATED TO THE RECORD COLLECTION SHOULD BE BUILT HERE
//
class cr_shop_transmission_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_shop_transmission(this, defaults);
    }

    async renderOptions(options) {
        return _cx_render.getListOptions(this, options);
    }


    async select(params) {
        var _this = this;
        this.query = {
            build: function () {
                var query = { sql: '', params: [] };
                query.sql = `
                    select  top ${_declarations.SQL.MAX_ROWS} l.*, s.shopCode, s.shopName
                    from    ${_this.type} l, cx_shop s
                    where   l.${_this.FieldNames.SHOPID} = s.shopId
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
                    query.sql += ' and l.created >= @from';
                    query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
                }

                if (params.dt) {
                    query.sql += ' and l.created <= @to';
                    query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
                }

                if (params.st) {
                    query.sql += ' and l.status = @status';
                    query.params.push({ name: 'status', value: params.st });
                }

                query.sql += ' order by l.created desc';
                return query;
            }
        }
        await super.select();
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: 'transmissionId', value: id }] };
        query.sql = `
                    select  l.*, s.shopCode, s.shopName
                    from    ${this.type} l, cx_shop s
                    where   l.${this.FieldNames.SHOPID} = s.shopId
                    and     l.${this.FieldNames.TRANSMISSIONID} = @transmissionId
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
class cr_shop_transmission extends _persistentTable.Record {
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

    get transmissionIdText() {
        return this.transmissionId.toString();
    }


    async renderOptions(options) {
        return _cx_render.getRecordOptions(this, options);
    }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// EXPORTS ONLY TABLE AND RECORD
//
module.exports = {
    Table: cr_shop_transmission_Collection,
    Record: cr_shop_transmission,
}


'use strict'
//
const _persistentTable = require('./persistent/p-cs_stockValuationItem');
//
class cs_stockValuationItem_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cs_stockValuationItem(this, defaults);
    }

    async select(params) {

        var query = { sql: `select * from cs_stockValuationItem where 1 = 1 `, params: [] };
        this.queryFromParams(query, params);
        query.sql += ' order by created desc';
        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cs_stockValuationItem extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    get totalInStock() {
        return (this.outersInStock * this.unitsInOuter) + this.unitsInStock;
    }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cs_stockValuationItem_Collection,
    Record: cs_stockValuationItem,
}


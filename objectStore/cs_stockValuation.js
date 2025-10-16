'use strict'
//
const _persistentTable = require('./persistent/p-cs_stockValuation');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
//
class cs_stockValuation_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cs_stockValuation(this, defaults);
    }


    async select(params) {

        var query = {
            sql: `
                select  s.shopCode, s.shopName,  sv.*
                from    cs_stockValuation sv
                join    cx_shop s on s.shopId = sv.shopId
                where   1 = 1
            `,
            params: []
        };
        this.queryFromParams(query, params);
        query.sql += ' order by created desc';
        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cs_stockValuation extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #logs = null;
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get logs() {
        return this.#logs;
    } set logs(logs) {
        this.#logs = logs;
    }

  
    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }

    async log(message, info) {
        await this.logBase(_declarations.CS_STOCK_VALUATION_LOG.STATUS.INFO, message, info);
    }
    async logWarning(message, info) {
        await this.logBase(_declarations.CS_STOCK_VALUATION_LOG.STATUS.WARNING, message, info);
    }
    async logError(error, info) {
        if (!info && error.stack) { info = error.stack; }
        if (error && error.message) { error = error.message; }
        await this.logBase(_declarations.CS_STOCK_VALUATION_LOG.STATUS.ERROR, error, info);

    }
    async logBase(type, message, info) {
        if (!this.#logs) {
            this.#logs = this.cx.table(_schema.cs_stockValuationLog);
        }
        var log = await this.#logs.log(this.stockValuationId, type, message, info);
        this.#logs.records.push(log);
        return log;
    }

}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cs_stockValuation_Collection,
    Record: cs_stockValuation,
}


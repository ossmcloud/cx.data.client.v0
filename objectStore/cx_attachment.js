'use strict'
//
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cx_attachment');
//
class cx_attachment_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_attachment(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {};
        query.sql = `
            select  a.*, s.shopCode, s.shopName
            from    cx_attachment a
            join    cx_shop s ON s.shopId = a.shopId

            where   1 = 1
        `;

        this.queryFromParams(query, params, 'a');
        query.sql += ' order by a.name';

        return await super.select(query);
    }



}
//
// ----------------------------------------------------------------------------------------
//
class cx_attachment extends _persistentTable.Record {
    #shopCode = '';
    #shopName = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }

        this.#shopCode = defaults['shopCode'] || '';
        this.#shopName = defaults['shopName'] || '';
    };

    get shopCode() { return this.#shopCode; }
    get shopName() { return this.#shopName; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get type() {
        return _declarations.CX_ATTACHMENT.TYPE.getName(this.typeId);
    }   

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cx_attachment_Collection,
    Record: cx_attachment,
}


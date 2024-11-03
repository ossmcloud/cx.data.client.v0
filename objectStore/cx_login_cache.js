'use strict'
//
const _persistentTable = require('./persistent/p-cx_login_cache');
//
class cx_login_cache_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_login_cache(this, defaults);
    }

    async fetch(loginId, cacheType, cacheKey) {
        var query = {};
        query.sql = `
            select  t.*, l.masterLoginId, l.firstName + ' ' + l.lastName as loginName
            from    cx_login_cache t
            join    cx_login l ON l.loginId = t.loginId
            where   t.loginId = @loginId
            and     t.cacheType = @cacheType
            and     t.cacheKey = @cacheKey
        `;
        query.params = [];
        query.params.push({ name: 'loginId', value: loginId });
        query.params.push({ name: 'cacheType', value: cacheType });
        query.params.push({ name: 'cacheKey', value: cacheKey });

        if (await super.select(query)) { return this.first(); }
        return null;
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cx_login_cache extends _persistentTable.Record {
    #masterLoginId = null;
    #loginName = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#masterLoginId = defaults['masterLoginId'] || null;
        this.#loginName = defaults['loginName'] || '';
    };

    get loginName() {
        return this.#loginName;
    } set loginName(val) {
        this.#loginName = val;
    }
    get masterLoginId() {
        return this.#masterLoginId;
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
    Table: cx_login_cache_Collection,
    Record: cx_login_cache,
}


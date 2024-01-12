'use strict'
//
const _core = require('cx-core');
const _cxSchema = require('../cx-client-schema');
const _persistentTable = require('./persistent/p-cx_login_token');
//
class cx_login_token_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_login_token(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {};
        query.sql = `
            select  t.*, l.masterLoginId, l.firstName + ' ' + l.lastName as loginName
            from    cx_login_token t
            join    cx_login l ON l.loginId = t.loginId
            where   1 = 1
        `;

        this.queryFromParams(query, params, 't');
        query.sql += ' order by t.modified desc';

        return await super.select(query);
    }


   
    async fetchByStateKey(stateKey) {
        this.query.clear();
        this.query.addFilter({ name: _cxSchema.cx_login_token.STATEKEY, value: stateKey });
        if (await super.select()) { return this.first(); }
        throw new Error(`User Token not found with given state key: ${stateKey}`);
    }

    async fetch(values, returnNull) {
        if (Array.isArray(values)) {
            return await this.fetchTokenByType(values[0], values[1], values[2], returnNull);    
        }
        return await this.fetchToken(values, returnNull);
    }

    async fetchToken(id, returnNull) {
        var query = {};
        query.sql = `
            select  t.*, l.masterLoginId, l.firstName + ' ' + l.lastName as loginName
            from    cx_login_token t
            join    cx_login l ON l.loginId = t.loginId
            where   t.loginTokenId = @loginTokenId
        `;
        query.params = [];
        query.params.push({ name: 'loginTokenId', value: id });
        
        if (await super.select(query)) { return this.first(); }
        if (returnNull) { return null; }
        throw new Error(`User Token [${type}] not found with given login/setting: ${loginId}/${settingId}`);
    }

    async fetchTokenByType(type, loginId, settingId, returnNull) {
        // this.query.clear();
        // this.query.addFilter({ name: _cxSchema.cx_login_token.TYPE, value: type });
        // this.query.addFilter({ name: _cxSchema.cx_login_token.LOGINID, value: loginId });
        // this.query.addFilter({ name: _cxSchema.cx_login_token.DTFSSETTINGID, value: settingId });

        var query = {};
        query.sql = `
            select  t.*, l.masterLoginId, l.firstName + ' ' + l.lastName as loginName
            from    cx_login_token t
            join    cx_login l ON l.loginId = t.loginId
            where   type = @type
            and     t.loginId = @loginId
            and     t.dtfsSettingId = @settingId
        `;
        query.params = [];
        query.params.push({ name: 'type', value: type });
        query.params.push({ name: 'loginId', value: loginId });
        query.params.push({ name: 'settingId', value: settingId });

        if (await super.select(query)) { return this.first(); }
        if (returnNull) {return null; }
        throw new Error(`User Token [${type}] not found with given login/setting: ${loginId}/${settingId}`);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cx_login_token extends _persistentTable.Record {
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
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cx_login_token_Collection,
    Record: cx_login_token,
}


'use strict'
//
const _cxSchema = require('../cx-client-schema');
const _persistentTable = require('./persistent/p-cx_login_token');
//
class cx_login_token_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_login_token(this, defaults);
    }

   
    async fetchByStateKey(stateKey) {
        this.query.clear();
        this.query.addFilter({ name: _cxSchema.cx_login_token.STATEKEY, value: stateKey });
        if (await super.select()) { return this.first(); }
        throw new Error(`User Token not found with given state key: ${stateKey}`);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cx_login_token extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    get isExpired() {
        return (token.expiryDate.toNow().hours > -1);
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


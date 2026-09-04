'use strict'
//
const _schema = require('../cx-client-schema');
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-ca_settingApprover');
//
class ca_settingApprover_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new ca_settingApprover(this, defaults);
    }

    buildQuery() {
        return `
            select	            sett.*,
                                whs.code as wholesalerCode, whs.name as wholesalerName,
                                u.firstName as loginFirstName, u.lastName as loginLastName,
                                (select count(*) from ca_settingApproverShop settShop where settShop.settingApproverId = sett.settingApproverId) as shopCount
            from	            ca_settingApprover      sett
            left outer join     cx_login    	        u ON u.loginId = sett.loginId
            left outer join     cp_wholesaler	        whs ON whs.wholesalerId = sett.wholesalerId
            where   1 = 1
        `;
    }

    async select(params) {
        if (!params) { params = {} };

        var query = { sql: this.buildQuery() };
        this.queryFromParams(query, params, 'sett');
        query.sql += ' order by sett.level, u.firstName';

        return await super.select(query);
    }

    async fetch(id) {
        var query = { sql: this.buildQuery(), params: [{ name: 'settingApproverId', value: id }] };
        query.sql += ` and sett.settingApproverId = @settingApproverId`;
        query.noResult = 'null';
        query.returnFirst = true;
        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist, was deleted or you do not have permission!`); }
        return super.populate(rawRecord);
    }

}
//
// ----------------------------------------------------------------------------------------
//
class ca_settingApprover extends _persistentTable.Record {
    #wholesalerName = '';
    #wholesalerCode = '';
    #loginFirstName = '';
    #loginLastName = '';
    #shopCount = null;
    #shops = null;
    constructor(table, defaults) {
        super(table, defaults);
        if (defaults) {
            this.#wholesalerName = defaults['wholesalerName'] || '';
            this.#wholesalerCode = defaults['wholesalerCode'] || '';
            this.#loginFirstName = defaults['loginFirstName'] || '';
            this.#loginLastName = defaults['loginLastName'] || '';
            this.#shopCount = defaults['shopCount'] || null;
        }
    };

    get wholesalerName() { return this.#wholesalerName; }
    get wholesalerCode() { return this.#wholesalerCode; }
    get wholesalerInfo() {
        if (!this.#wholesalerCode) { return null; }
        return `[${this.#wholesalerCode}] ${this.#wholesalerName}`;
    }

    get loginFirstName() { return this.#loginFirstName; }
    get loginLastName() { return this.#loginLastName; }
    get loginInfo() {
        if (!this.#loginFirstName) { return null; }
        return `[${this.#loginFirstName}] ${this.#loginLastName}`;
    }

    get shopCount() { return this.#shopCount; }

    async getShops() {
        if (!this.#shops) {
            this.#shops = this.cx.table(_schema.ca_settingApproverShop);
            await this.#shops.select({ [_schema.ca_settingApproverShop.SETTINGAPPROVERID]: this.settingApproverId });
        }
        // return this.#shops; 
    }

    async getShop(shopId) {
        await this.getShops();
        return this.#shops.records.find(s => { return s.shopId == shopId; })
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
    Table: ca_settingApprover_Collection,
    Record: ca_settingApprover,
}


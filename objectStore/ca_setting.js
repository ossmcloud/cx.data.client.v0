'use strict'
//
const _persistentTable = require('./persistent/p-ca_setting');
//
class ca_setting_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new ca_setting(this, defaults);
    }

    buildQuery() {
        return `
                select	            sett.*, whs.code as wholesalerCode, whs.name as wholesalerName,
                                    (select count(*) from ca_settingShop settShop where settShop.settingId = sett.settingId) as shopCount
                from	            ca_setting      sett
                left outer join     cp_wholesaler	whs ON whs.wholesalerId = sett.wholesalerId
                where   1 = 1
            `;
    }

    async select(params) {
        if (!params) { params = {} };

        var query = { sql: this.buildQuery() };

        // if (params.s) {
        //     query.sql += ' where s.shopId = @shopId\n';
        //     query.params = [{ name: 'shopId', value: params.s }];
        // } else {
        this.queryFromParams(query, params);
        // }

        query.sql += ' order by sett.settingId';

        return await super.select(query);
    }

    async fetch(id) {
        var query = { sql: this.buildQuery(), params: [{ name: 'settingId', value: id }] };
        query.sql += ` and sett.settingId = @settingId`;
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
class ca_setting extends _persistentTable.Record {
    #wholesalerName = '';
    #wholesalerCode = '';
    #shopCount = null;
    constructor(table, defaults) {
        super(table, defaults);
        if (defaults) {
            this.#wholesalerName = defaults['wholesalerName'] || '';
            this.#wholesalerCode = defaults['wholesalerCode'] || '';
            this.#shopCount = defaults['shopCount'] || null;
        }
    };

    get wholesalerName() { return this.#wholesalerName; }
    get wholesalerCode() { return this.#wholesalerCode; }
    get wholesalerInfo() {
        if (!this.#wholesalerCode) { return null; }
        return `[${this.#wholesalerCode}] ${this.#wholesalerName}`;
    }

    get shopCount() { return this.#shopCount;    }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: ca_setting_Collection,
    Record: ca_setting,
}


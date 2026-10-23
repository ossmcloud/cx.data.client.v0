'use strict'
//
const _declarations = require('../cx-client-declarations');
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
        this.validateLevels();
        return await super.save()
    }

    // NOTE: levels must not overlap, apart from level 0 the min is the max of the previous level with a max set
    //       (same rule as jca_setting.js, the min input is read-only on the form so it is not posted)
    validateLevels() {
        var hasValue = (v) => { return (v !== null && v !== undefined && v !== ''); };
        var prevMax = null;
        for (var l = 0; l <= _declarations.CP_DOCUMENT.APPROVAL_LEVELS; l++) {
            var max = this[`level${l}Max`];
            if (l > 0) { this[`level${l}Min`] = (hasValue(max)) ? prevMax : null; }

            var min = this[`level${l}Min`];
            if (hasValue(min) && hasValue(max) && Number(min) > Number(max)) {
                throw new Error(`level ${l} min [${min}] cannot be greater than its max [${max}]`);
            }
            if (hasValue(max)) { prevMax = max; }
        }
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: ca_setting_Collection,
    Record: ca_setting,
}


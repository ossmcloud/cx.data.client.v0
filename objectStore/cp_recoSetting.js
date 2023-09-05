'use strict'
//
const _persistentTable = require('./persistent/p-cp_recoSetting');
//
class cp_recoSetting_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_recoSetting(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select	            sett.*, whs.code as wholesalerCode, whs.name as wholesalerName, s.shopCode, s.shopName
                from	            cp_recoSetting  sett
                left outer join     cp_wholesaler	whs ON whs.wholesalerId = sett.wholesalerId
                left outer join     cx_shop         s   ON s.shopId = sett.shopId
            `
        };

        // if (params.s) {
        //     query.sql += ' where s.shopId = @shopId\n';
        //     query.params = [{ name: 'shopId', value: params.s }];
        // } else {
            this.queryFromParams(query, params);
        // }

        query.sql += ' order by sett.recoSettingId';

        return await super.select(query);
    }

    find(wholesalerId, shopId) {
        var found = null;
        this.each((s, i) => {
            if (s.shopId == shopId && s.wholesalerId == wholesalerId) { found = s; return false; }
        });
        if (found) { return found; }
        this.each((s, i) => {
            if (s.wholesalerId == wholesalerId) { found = s; return false; }
        });
        if (found) { return found; }
        this.each((s, i) => {
            if (s.shopId==0 && s.wholesalerId == 0) { found = s; return false; }
        });
        if (found) { return found; }
        return cp_recoSetting_Collection.createNew();
    }

}
//
// ----------------------------------------------------------------------------------------
//
class cp_recoSetting extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #wholesalerName = '';
    #wholesalerCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#wholesalerName = defaults['wholesalerName'] || '';
        this.#wholesalerCode = defaults['wholesalerCode'] || '';
    };

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get wholesalerName() { return this.#wholesalerName; }
    get wholesalerCode() { return this.#wholesalerCode; }
    get wholesalerInfo() { return `[${this.#wholesalerCode}] ${this.#wholesalerName}`; }

}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_recoSetting_Collection,
    Record: cp_recoSetting,
}


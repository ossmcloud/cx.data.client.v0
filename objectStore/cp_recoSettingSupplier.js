'use strict'
//
const _persistentTable = require('./persistent/p-cp_recoSettingSupplier');
//
class cp_recoSettingSupplier_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_recoSettingSupplier(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select	            supp.*, whs.code as wholesalerCode, whs.name as wholesalerName, s.shopCode, s.shopName
                from	            cp_recoSettingSupplier  supp
                left outer join     cp_recoSetting	        sett ON sett.recoSettingId = supp.recoSettingId
                left outer join     cp_wholesaler	        whs ON whs.wholesalerId = sett.wholesalerId
                left outer join     cx_shop                 s   ON s.shopId = sett.shopId
                where               1 = 1
            `
        };

        // if (params.s) {
        //     query.sql += ' where s.shopId = @shopId\n';
        //     query.params = [{ name: 'shopId', value: params.s }];
        // } else {
        this.queryFromParams(query, params, 'supp');
        // }

        query.sql += ' order by supp.supplierCode';

        return await super.select(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_recoSettingSupplier extends _persistentTable.Record {
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

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get wholesalerName() { return this.#wholesalerName; }
    get wholesalerCode() { return this.#wholesalerCode; }
    get wholesalerInfo() { return `[${this.#wholesalerCode}] ${this.#wholesalerName}`; }

    get settingInfo() { return `${this.wholesalerInfo} / ${this.shopInfo}`; }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
    
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_recoSettingSupplier_Collection,
    Record: cp_recoSettingSupplier,
}


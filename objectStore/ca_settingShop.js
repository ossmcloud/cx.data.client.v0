'use strict'
//
const _persistentTable = require('./persistent/p-ca_settingShop');
//
class ca_settingShop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new ca_settingShop(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {
            sql: `
                select	            sett.*, s.shopCode, s.shopName
                from	            ca_settingShop  sett
                left outer join     cx_shop         s   ON s.shopId = sett.shopId
                where               1 = 1
            `
        };

        // if (params.s) {
        //     query.sql += ' where s.shopId = @shopId\n';
        //     query.params = [{ name: 'shopId', value: params.s }];
        // } else {
        this.queryFromParams(query, params, 'sett');
        // }

        query.sql += ' order by s.shopCode';

        return await super.select(query);
    }


    async deleteBySetting(settingId, shopId) {
        var query = {
            sql: 'delete from ca_settingShop where settingId = @settingId and shopId = @shopId',
            params: [
                { name: 'settingId', value: settingId },
                { name: 'shopId', value: shopId },
            ]
        }
        return await this.cx.exec(query);
    }

    async updateBySetting(settingId, shops) {
        var errors = '';
        for (var sx = 0; sx < shops.length; sx++) {
            try {
                var settingShop = this.createNew();
                settingShop.settingId = settingId;
                settingShop.shopId = shops[sx];
                await settingShop.save();
            } catch (error) {
                errors += `store id: ${shops[sx]} - error: ${error.message}\n`;
            }
        }
        if (errors) {
            throw new Error('one or more stores could not be added:\n\n' + errors);
        }
    }
}
//
// ----------------------------------------------------------------------------------------
//
class ca_settingShop extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: ca_settingShop_Collection,
    Record: ca_settingShop,
}


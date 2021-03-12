'use strict'
//
const _cxConst = require('../cx-client-declarations');
const _cxSchema = require('../cx-client-schema');
const _persistentTable = require('./persistent/p-epos_shop_setting');
//
class epos_shop_setting_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new epos_shop_setting(this, defaults);
    }

    async select(params) {

        if (!params) {
            return await super.select();
        }

        var query = {
            sql: `  select  sr.*, sx.shopCode, sx.shopName, sg.groupCode, sg.groupName, ds.dtfsSettingName
                    from    epos_shop_setting sr
                    left    outer join epos_dtfs_setting ds on ds.dtfsSettingId = sr.dtfsSettingId
                    left    outer join cx_shop sx on sx.shopId = sr.shopId
                    left    outer join cx_shop_group sg on sg.shopGroupId = sx.shopGroupId
                    where   sr.shopId in ${this.cx.shopList}`,
            params: []
        }

        if (params.sg) {
            if (params.sg == '@NULL@') {
                query.sql += `and  sg.shopGroupId is null`;
            } else {
                query.sql += `and  sg.shopGroupId = @shopGroupId`;
                query.params.push({ name: 'shopGroupId', value: params.sg })
            }
        }
        if (params.sc) {
            query.sql += `and  sx.shopCode like @shopCode`;
            query.params.push({ name: 'shopCode', value: params.sc + '%' })
        }
        if (params.sec) {
            query.sql += `and  sx.eposShopCode like @eposShopCode`;
            query.params.push({ name: 'eposShopCode', value: params.sec + '%' })
        }
        if (params.sen) {
            query.sql += `and  sx.eposShopName like @eposShopName`;
            query.params.push({ name: 'eposShopName', value: params.sen + '%' })
        }
        if (params.dtfs) {
            if (params.dtfs == '@NULL@') {
                query.sql += `and  sr.dtfsSettingId is null`;
            } else {
                query.sql += `and  sr.dtfsSettingId = @dtfsSettingId`;
                query.params.push({ name: 'dtfsSettingId', value: params.dtfs })
            }
        }
        return await super.select(query);
    }

    async fetch(id, returnNull) {
        var query = {
            sql: `  select  sr.*, sx.shopCode, sx.shopName, sg.groupCode, sg.groupName, ds.dtfsSettingName
                    from    epos_shop_setting sr
                    left    outer join epos_dtfs_setting ds on ds.dtfsSettingId = sr.dtfsSettingId
                    left    outer join cx_shop sx on sx.shopId = sr.shopId
                    left    outer join cx_shop_group sg on sg.shopGroupId = sx.shopGroupId
                    where   sr.shopId in ${this.cx.shopList}
                    and     sr.shopId = @shopId`,
            params: [{ name: 'shopId', value: id }],
            noResult: 'null',
            returnFirst: true,
        }

        var record = await this.db.exec(query);
        if (!record) {
            if (returnNull) { return null; }
            throw new Error(`${this.type} record [${id}] does not exist or was deleted!`);
        }

        return super.populate(record);
    }
}
//
//
//
class epos_shop_setting extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #groupName = '';
    #groupCode = '';
    #dtfsInfo = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#groupName = defaults['groupName'] || '';
        this.#groupCode = defaults['groupCode'] || '';
        this.#dtfsInfo = defaults['dtfsSettingName'] || defaults['dtfsInfo'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }
    get groupName() { return this.#groupName; }
    get groupCode() { return this.#groupCode; }
    get groupInfo() { return `[${this.#groupCode}] ${this.#groupName}`; }
    get dtfsInfo() { return this.#dtfsInfo; }

    async save() {
        var newSettings = this.isNew();

        await super.save();

        if (newSettings) {
            //
            var query = { sql: '', params: [] };
            var epos = _cxConst.CX_EPOS_PROVIDERS.getConfigDefaults(this.eposProvider);
            for (var ex = 0; ex < epos.length; ex++) {
                query.sql += `insert into ${_cxSchema.epos_shop_configs.TBL_NAME} (${_cxSchema.epos_shop_configs.SHOPID}, ${_cxSchema.epos_shop_configs.CONFIGNAME}, ${_cxSchema.epos_shop_configs.CONFIGVALUE}, ${_cxSchema.epos_shop_configs.CREATEDBY})`;
                query.sql += `values (${this.shopId}, '${epos[ex].name}', '${epos[ex].value}', ${this.cx.tUserId})`;
            }
            await this.cx.exec(query);
        }
    }
}
//
// 
//
module.exports = {
    Table: epos_shop_setting_Collection,
    Record: epos_shop_setting,
}

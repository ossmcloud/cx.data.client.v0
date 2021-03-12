'use strict'
//
const _persistentTable = require('./persistent/p-epos_dtfs_setting');
//
class epos_dtfs_setting_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new epos_dtfs_setting(this, defaults);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class epos_dtfs_setting extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

    async select() {
        super.select();
    }

    // async select(params) {
    //     var query = {
    //         sql: `  select  sr.*, sx.shopCode, sx.shopName, sg.groupCode, sg.groupName
    //                 from    epos_dtfs_setting sr
    //                 left    outer join cx_shop sx on sx.shopId = sr.shopId
    //                 left    outer join cx_shop_group sg on sg.shopGroupId = sx.shopGroupId
    //                 where   sr.shopId in ${this.cx.shopList}`,
    //         params: []
    //     }

    //     if (params.sg) {
    //         if (params.sg == '@NULL@') {
    //             query.sql += `and  sg.shopGroupId is null`;
    //         } else {
    //             query.sql += `and  sg.shopGroupId = @shopGroupId`;
    //             query.params.push({ name: 'shopGroupId', value: params.sg })
    //         }
    //     }
    //     if (params.sc) {
    //         query.sql += `and  sx.shopCode like @shopCode`;
    //         query.params.push({ name: 'shopCode', value: params.sc + '%' })
    //     }
    //     if (params.sec) {
    //         query.sql += `and  sx.eposShopCode like @eposShopCode`;
    //         query.params.push({ name: 'eposShopCode', value: params.sec + '%' })
    //     }
    //     if (params.sen) {
    //         query.sql += `and  sx.eposShopName like @eposShopName`;
    //         query.params.push({ name: 'eposShopName', value: params.sen + '%' })
    //     }
    //     return await super.select(query);
    // }

    async fetch(id, returnNull) {
        var query = {
            sql: `  select  *
                    from    epos_dtfs_setting
                    where   dtfsSettingId = @dtfsSettingId`,
            params: [{ name: 'dtfsSettingId', value: id }],
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

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: epos_dtfs_setting_Collection,
    Record: epos_dtfs_setting,
}

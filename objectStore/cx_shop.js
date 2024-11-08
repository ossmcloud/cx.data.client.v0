'use strict'
//
const _ex = require('cx-core/errors/cx-errors');
const _cx_render = require('../cx-client-render');
const _cx_schema = require('../cx-client-schema');
const _persistentTable = require('./persistent/p-cx_shop');

//
class cx_shop_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_shop(this, defaults);
    }

    async updateGroup(groupId, shops) {
        var query = {
            sql: `update cx_shop set shopGroupId = @shopGroupId where shopId in (${shops.replace('-', ',')})`,
            params: [{ name: 'shopGroupId', value: groupId }]
        }
        await this.cx.exec(query);
    }

    async selectFlatFiles(userId) {
        var query = {
            sql: `  
                select  s.*
                FROM    cx_shop s
                join    cx_login_shop l on l.shopId = s.shopId
                join    epos_shop_setting ss on ss.shopId=s.shopId
                join    sys_provider p on p.code = ss.eposProvider
                where   l.loginId = @loginId
                and     p.isFlatFiles = 1
            `,
            params: [{ name: 'loginId', value: userId }]
        }
        return await super.select(query);
    }

    async selectByUser(userId) {
        var query = {
            sql: `  select  s.*, g.groupCode, g.groupName
                    from    cx_shop s
                    inner   join cx_login_shop l on l.shopId = s.shopId
                    left    outer join cx_shop_group g on g.shopGroupId = s.shopGroupId
                    where   l.loginId = @loginId
                    order by g.groupCode, s.shopCode`,
            params: [{ name: 'loginId', value: userId }]
        }
        return await super.select(query);
    }

    async selectByUserNot(userId) {
        var query = {
            sql: `  select  s.*, g.groupCode, g.groupName
                    from    cx_shop s
                    left    outer join cx_shop_group g on g.shopGroupId = s.shopGroupId
                    where   s.shopId not in (select shopId from cx_login_shop where loginId = @loginId)
                    order by g.groupCode, s.shopCode`,
            params: [{ name: 'loginId', value: userId }]
        }
        return await super.select(query);

    }

    async selectByCustomScriptNot(scriptId) {
        var query = {
            sql: `  select  s.*, g.groupCode, g.groupName
                    from    cx_shop s
                    left    outer join cx_shop_group g on g.shopGroupId = s.shopGroupId
                    where   s.shopId not in (select shopId from sys_customScriptShop where scriptId = @scriptId)
                    order by g.groupCode, s.shopCode`,
            params: [{ name: 'scriptId', value: scriptId }]
        }
        return await super.select(query);

    }


    async select(params) {
        if (!params) { params = {}; }
        var query = { sql: '', params: [] };
        //query.sql = `select * from ${this.type} where shopId in ${this.cx.shopList}`;
        query.sql = `select  s.*, g.groupCode, g.groupName
                             from    ${this.type} s
                             left outer join ${_cx_schema.cx_shop_group.TBL_NAME} g
                             on      s.${this.FieldNames.SHOPGROUPID} = g.${_cx_schema.cx_shop_group.SHOPGROUPID}
                             where   s.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

        if (params.sg) {
            if (params.sg == '@NULL@') {
                query.sql += ` and s.${this.FieldNames.SHOPGROUPID} is null`;
            } else {
                query.sql += ` and s.${this.FieldNames.SHOPGROUPID} like @${this.FieldNames.SHOPGROUPID}`;
                query.params.push({ name: this.FieldNames.SHOPGROUPID, value: (`${params.sg}%`) });
            }
        }
        if (params.sc) {
            query.sql += ` and ${this.FieldNames.SHOPCODE} like @${this.FieldNames.SHOPCODE}`;
            query.params.push({ name: this.FieldNames.SHOPCODE, value: (`${params.sc}%`) });
        }
        if (params.sn) {
            query.sql += ` and ${this.FieldNames.SHOPNAME} like @${this.FieldNames.SHOPNAME}`;
            query.params.push({ name: this.FieldNames.SHOPNAME, value: (`${params.sn}%`) });
        }
        if (params.sa) {
            query.sql += ` and ${this.FieldNames.SHOPADDRESS} like @${this.FieldNames.SHOPADDRESS}`;
            query.params.push({ name: this.FieldNames.SHOPADDRESS, value: (`${params.sa}%`) });
        }
        if (params.ss) {
            query.sql += ` and ${this.FieldNames.STATUS} = @${this.FieldNames.STATUS}`;
            query.params.push({ name: this.FieldNames.STATUS, value: params.ss });
        }
        if (params.ttcfg) {
            query.sql += ` and ${this.FieldNames.TRANTYPECONFIGID} = @${this.FieldNames.TRANTYPECONFIGID}`;
            query.params.push({ name: this.FieldNames.TRANTYPECONFIGID, value: params.ttcfg });
        }
        if (params.ddcfg) {
            query.sql += ` and ${this.FieldNames.DEPMAPCONFIGID} = @${this.FieldNames.DEPMAPCONFIGID}`;
            query.params.push({ name: this.FieldNames.DEPMAPCONFIGID, value: params.ddcfg });
        }
        if (params.txcfg) {
            query.sql += ` and ${this.FieldNames.TAXMAPCONFIGID} = @${this.FieldNames.TAXMAPCONFIGID}`;
            query.params.push({ name: this.FieldNames.TAXMAPCONFIGID, value: params.txcfg });
        }
        if (params.order) {
            query.sql += ` order by ${params.order}`;   
        } else {
            query.sql += ` order by ${this.FieldNames.SHOPCODE}`;
        }
        await super.select(query);
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: this.FieldNames.SHOPID, value: id }] };
        query.sql = `select  s.*, g.groupCode, g.groupName
                     from    ${this.type} s
                     left outer join ${_cx_schema.cx_shop_group.TBL_NAME} g
                     on      s.${this.FieldNames.SHOPGROUPID} = g.${_cx_schema.cx_shop_group.SHOPGROUPID}
                     where   s.${this.FieldNames.SHOPID} in ${this.cx.shopList}
                     and     s.${this.FieldNames.SHOPID} = @${this.FieldNames.SHOPID}`;
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist, was deleted or you do not have permission!`); }

        return super.populate(rawRecord);
    }

    async isActive(id) {
        var query = { sql: '', params: [{ name: this.FieldNames.SHOPID, value: id }] };
        query.sql = `select  status
                     from    ${this.type}
                     where   ${this.FieldNames.SHOPID} = @${this.FieldNames.SHOPID}`;
        query.noResult = 'null';
        query.returnFirst = true;
        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return false; }
        return rawRecord.status == 1;
    }

    async selectColors() {
        var query = { sql: '', params: [] };
        //query.sql = `select * from ${this.type} where shopId in ${this.cx.shopList}`;
        query.sql = `select  s.shopId, s.shopColor
                    from    ${this.type} s
                    where   s.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;
        var resp = await this.cx.exec(query);
        return resp.rows;
    }
    

}
//
//
//
class cx_shop extends _persistentTable.Record {
    #groupName = '';
    #groupCode = '';
    #check = false;
    constructor(table, defaults) {
        super(table, defaults);
        if (defaults) {
            this.#groupName = defaults['groupName'] || '';
            this.#groupCode = defaults['groupCode'] || '';
        }
    };

    get groupName() { return this.#groupName; }
    get groupCode() { return this.#groupCode; }
    get groupInfo() {
        if (this.groupName) {
            return `${this.groupName} [${this.groupCode}]`;
        } else {
            return this.groupCode;
        }
    }
    get check() {
        return this.#check;
    } set check(value) {
        this.#check = value
    }

    get shopInfo() {
        return `[${this.shopCode}]${this.shopName}`;
    }
   
    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        if (!this.status) { this.status = 0; }      
        if (!this.shopGroupId) { this.shopGroupId = null; }
        await super.save()
    }
}

//
module.exports = {
    Table: cx_shop_Collection,
    Record: cx_shop,
}


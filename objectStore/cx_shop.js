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

    async selectByUser(userId) {
        var query = {
            sql: `
                    select  s.*, g.groupCode, g.groupName
                    from    cx_shop s
                    inner   join cx_login_shop l on l.shopId = s.shopId
                    left    outer join cx_shop_group g on g.shopGroupId = s.shopGroupId
                    where   l.loginId = @loginId
                    order by g.groupCode, s.shopCode
                `,
            params: [
                { name: 'loginId', value: userId }
            ]
        }
        return await super.select(query);
        
    }

    async selectByUserNot(userId) {
        var query = {
            sql: `
                    select  s.*, g.groupCode, g.groupName
                    from    cx_shop s
                    left    outer join cx_shop_group g on g.shopGroupId = s.shopGroupId
                    where   s.shopId not in (select shopId from cx_login_shop where loginId = @loginId)
                    order by g.groupCode, s.shopCode
                `,
            params: [
                { name: 'loginId', value: userId }
            ]
        }
        return await super.select(query);

    }

    async select(params) {
        var _this = this;
        this.query = {
            build: function () {
                var query = { sql: '', params: [] };
                //query.sql = `select * from ${_this.type} where shopId in ${_this.cx.shopList}`;
                query.sql = `
                    select  s.*, g.groupCode, g.groupName
                    from    ${_this.type} s
                    left outer join ${_cx_schema.cx_shop_group.TBL_NAME} g
                    on      s.${_this.FieldNames.SHOPGROUPID} = g.${_cx_schema.cx_shop_group.SHOPGROUPID}
                    where   s.${_this.FieldNames.SHOPID} in ${_this.cx.shopList}
                `
                
                if (params) {
                    if (params.sg) {
                        if (params.sg == '@NULL@') {
                            query.sql += ` and s.${_this.FieldNames.SHOPGROUPID} is null`;   
                        } else {
                            query.sql += ` and s.${_this.FieldNames.SHOPGROUPID} like @${_this.FieldNames.SHOPGROUPID}`;
                            query.params.push({ name: _this.FieldNames.SHOPGROUPID, value: (`${params.sg}%`) });
                        }
                    }
                    if (params.sc) {
                        query.sql += ` and ${_this.FieldNames.SHOPCODE} like @${_this.FieldNames.SHOPCODE}`;
                        query.params.push({ name: _this.FieldNames.SHOPCODE, value: (`${params.sc}%`) });
                    }
                    if (params.sn) {
                        query.sql += ` and ${_this.FieldNames.SHOPNAME} like @${_this.FieldNames.SHOPNAME}`;
                        query.params.push({ name: _this.FieldNames.SHOPNAME, value: (`${params.sn}%`) });
                    }
                    if (params.sa) {
                        query.sql += ` and ${_this.FieldNames.SHOPADDRESS} like @${_this.FieldNames.SHOPADDRESS}`;
                        query.params.push({ name: _this.FieldNames.SHOPADDRESS, value: (`${params.sa}%`) });
                    }
                    if (params.ss) {
                        query.sql += ` and ${_this.FieldNames.STATUS} = @${_this.FieldNames.STATUS}`;
                        query.params.push({ name: _this.FieldNames.STATUS, value: params.ss });
                    }
                }
                query.sql += ` order by ${_this.FieldNames.SHOPCODE}`;
                return query;
            }
        }
        await super.select();
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: this.FieldNames.SHOPID, value: id }] };
        query.sql = `
                    select  s.*, g.groupCode, g.groupName
                    from    ${this.type} s
                    left outer join ${_cx_schema.cx_shop_group.TBL_NAME} g
                    on      s.${this.FieldNames.SHOPGROUPID} = g.${_cx_schema.cx_shop_group.SHOPGROUPID}
                    where   s.${this.FieldNames.SHOPID} in ${this.cx.shopList}
                    and     s.${this.FieldNames.SHOPID} = @${this.FieldNames.SHOPID}
                `
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist, was deleted or you do not have permission!`); }

        return super.populate(rawRecord);
    }
}



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


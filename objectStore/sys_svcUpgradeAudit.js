'use strict'
//
const _cxCont = require('../cx-client-declarations');
const _cxSchema = require('../cx-client-schema');
const _persistentTable = require('./persistent/p-sys_svcUpgradeAudit');
//
class sys_svcUpgradeAudit_Collection extends _persistentTable.Table {
    createNew(defaults) {
        if (!defaults) { defaults = {} }
        if (defaults[this.FieldNames.STATUS] == undefined) {
            defaults[this.FieldNames.STATUS] = _cxCont.SYS_SVC_UPGRADE_AUDIT.STATUS.PENDING;
        }
        return new sys_svcUpgradeAudit(this, defaults);
    }

    async fetchByTransmission(transmissionId) {
        var query = { sql: '', params: [{ name: this.FieldNames.TRANSMISSIONID, value: transmissionId }] };
        query.sql = `
                    select  *
                    from    ${this.type}
                    where   ${this.FieldNames.TRANSMISSIONID} = @${this.FieldNames.TRANSMISSIONID}
                `
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: this.FieldNames.UPGRADEAUDITID, value: id }] };
        query.sql = `
                    select  u.*, s.shopCode, s.shopName
                    from    ${this.type} u
                    inner join ${_cxSchema.cx_shop.TBL_NAME} s on s.${_cxSchema.cx_shop.SHOPID} = u.${this.FieldNames.SHOPID}
                    where   u.${this.FieldNames.UPGRADEAUDITID} = @${this.FieldNames.UPGRADEAUDITID}
                `
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }

    async getPending(shopId) {
        var query = { sql: '', params: [{ name: this.FieldNames.SHOPID, value: shopId }] };
        query.sql = `
                    select  *
                    from    ${this.type}
                    where   ${this.FieldNames.SHOPID} = @${this.FieldNames.SHOPID}
                    and     ${this.FieldNames.STATUS} = ${_cxCont.SYS_SVC_UPGRADE_AUDIT.STATUS.PENDING}
                    order by ${this.FieldNames.UPGRADEAUDITID} 
                `
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }

    async hasRunning(shopId) {
        var query = { sql: '', params: [{ name: this.FieldNames.SHOPID, value: shopId }] };
        query.sql = `
                    select  *
                    from    ${this.type}
                    where   ${this.FieldNames.SHOPID} = @${this.FieldNames.SHOPID}
                    and     ${this.FieldNames.STATUS} > ${_cxCont.SYS_SVC_UPGRADE_AUDIT.STATUS.PENDING}
                    and     ${this.FieldNames.STATUS} < ${_cxCont.SYS_SVC_UPGRADE_AUDIT.STATUS.ABORTED}
                    order by ${this.FieldNames.UPGRADEAUDITID} 
                `
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (rawRecord) { return true; }
        return false;
    }

    async select(params) {
        if (this.cx.cxSvc == true) { return await super.select(); }

        if (!params) { params = {}; }
        var query = { sql: '', params: [] };
        query.sql = `
                    select  top 1000 l.*, s.shopCode, s.shopName
                    from    ${this.type} l, cx_shop s
                    where   l.shopId = s.shopId
                    and     l.${this.FieldNames.SHOPID} in ${this.cx.shopList}
                `
        if (params.s) {
            if (params.s == '@NULL@') {
                query.sql += ` and l.shopId is null`;
            } else {
                query.sql += ' and l.shopId = @shopId';
                query.params.push({ name: 'shopId', value: params.s });
            }
        }
        if (params.tr) {
            query.sql += ' and l.transmissionId like @transmissionId';
            query.params.push({ name: 'transmissionId', value: ('%' + params.tr + '%') });
        }
        if (params.df) {
            query.sql += ' and l.created >= @from';
            query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
        }
        if (params.dt) {
            query.sql += ' and l.created <= @to';
            query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
        }
        if (params.st) {
            query.sql += ' and l.status = @status';
            query.params.push({ name: 'status', value: params.st });
        }

        query.sql += ' order by l.created desc';
        await super.select(query);
    }


}
//
// ----------------------------------------------------------------------------------------
//
class sys_svcUpgradeAudit extends _persistentTable.Record {
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
    get displayName() {
        return this.shopInfo;
    }

    async abort(message) {
        if (this.status >= _cxCont.SYS_SVC_UPGRADE_AUDIT.STATUS.ABORTED) {
            throw new Error(`upgrade request cannot be aborted as the current status is ${this.status}`)
        }
        this.status = _cxCont.SYS_SVC_UPGRADE_AUDIT.STATUS.ABORTED;
        this.message = message || ('upgrade request manually aborted by: ' + this.cx.userName);

        await this.save();
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
    Table: sys_svcUpgradeAudit_Collection,
    Record: sys_svcUpgradeAudit,
}


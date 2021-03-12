'use strict'
//
const _cxCont = require('../cx-client-declarations');
const _cxSchema = require('../cx-client-schema');
const _persistentTable = require('./persistent/p-epos_dtfs_upgradeAudit');
//
class epos_dtfs_upgradeAudit_Collection extends _persistentTable.Table {
    createNew(defaults) {
        if (!defaults) { defaults = {} }
        if (defaults[this.FieldNames.STATUS] == undefined) {
            defaults[this.FieldNames.STATUS] = _cxCont.EPOS_DTFS_UPGRADE_AUDIT.STATUS.PENDING;
        }
        return new epos_dtfs_upgradeAudit(this, defaults);
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
                    select  u.*, s.dtfsSettingName
                    from    ${this.type} u
                    inner join ${_cxSchema.epos_dtfs_setting.TBL_NAME} s on s.${_cxSchema.epos_dtfs_setting.DTFSSETTINGID} = u.${this.FieldNames.DTFSSETTINGID}
                    where   u.${this.FieldNames.UPGRADEAUDITID} = @${this.FieldNames.UPGRADEAUDITID}
                `
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }

    async getPending(dtfsSettingId) {
        var query = { sql: '', params: [{ name: this.FieldNames.DTFSSETTINGID, value: dtfsSettingId }] };
        query.sql = `
                    select  *
                    from    ${this.type}
                    where   ${this.FieldNames.DTFSSETTINGID} = @${this.FieldNames.DTFSSETTINGID}
                    and     ${this.FieldNames.STATUS} = ${_cxCont.EPOS_DTFS_UPGRADE_AUDIT.STATUS.PENDING}
                    order by ${this.FieldNames.UPGRADEAUDITID} 
                `
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { return null; }

        return super.populate(rawRecord);
    }

    async hasRunning(dtfsSettingId) {
        var query = { sql: '', params: [{ name: this.FieldNames.DTFSSETTINGID, value: dtfsSettingId }] };
        query.sql = `
                    select  *
                    from    ${this.type}
                    where   ${this.FieldNames.DTFSSETTINGID} = @${this.FieldNames.DTFSSETTINGID}
                    and     ${this.FieldNames.STATUS} > ${_cxCont.EPOS_DTFS_UPGRADE_AUDIT.STATUS.PENDING}
                    and     ${this.FieldNames.STATUS} < ${_cxCont.EPOS_DTFS_UPGRADE_AUDIT.STATUS.ABORTED}
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

        var shopFilter = 'in';
        var shopFilterValue = this.cx.shopList;
        if (params.s) {
            shopFilter = '=';
            shopFilterValue = '@shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }

        query.sql = `select	top 1000 p.*, s.dtfsSettingName, s.dtfsPairedMachineName
                    from	epos_dtfs_upgradeAudit p
                    inner join epos_dtfs_setting s on s.dtfsSettingId = p.dtfsSettingId
                    where	p.dtfsSettingId in (
                        select	dtfsSettingId 
                        from	epos_shop_setting ss 
                        where	ss.dtfsSettingId = s.dtfsSettingId
                        and		ss.shopId ${shopFilter} ${shopFilterValue}
                    )`;


        if (params.tr) {
            query.sql += ' and p.transmissionId like @transmissionId';
            query.params.push({ name: 'transmissionId', value: ('%' + params.tr + '%') });
        }
        if (params.df) {
            query.sql += ' and p.created >= @from';
            query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
        }
        if (params.dt) {
            query.sql += ' and p.created <= @to';
            query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
        }
        if (params.st) {
            query.sql += ' and p.status = @status';
            query.params.push({ name: 'status', value: params.st });
        }

        query.sql += ' order by p.created desc';
        await super.select(query);
    }


}
//
// ----------------------------------------------------------------------------------------
//
class epos_dtfs_upgradeAudit extends _persistentTable.Record {
    #dtfsInfo = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#dtfsInfo = defaults['dtfsSettingName'] || defaults['dtfsInfo'] || '';
    };

    get dtfsInfo() { return this.#dtfsInfo; }
    get displayName() {
        return this.shopInfo;
    }

    async abort(message) {
        if (this.status >= _cxCont.EPOS_DTFS_UPGRADE_AUDIT.STATUS.ABORTED) {
            throw new Error(`upgrade request cannot be aborted as the current status is ${this.status}`)
        }
        this.status = _cxCont.EPOS_DTFS_UPGRADE_AUDIT.STATUS.ABORTED;
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
    Table: epos_dtfs_upgradeAudit_Collection,
    Record: epos_dtfs_upgradeAudit,
}


'use strict'
//
const _cxCont = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-sys_svcUpgradeAudit');
//
class sys_svcUpgradeAudit_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_svcUpgradeAudit(this, defaults);
    }

    async fetch(transmissionId) {
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
                    and     ${this.FieldNames.STATUS} < ${_cxCont.SYS_SVC_UPGRADE_AUDIT.STATUS.COMPLETE}
                    order by ${this.FieldNames.UPGRADEAUDITID} 
                `
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (rawRecord) { return true; }
        return false;
    }
}
//
// ----------------------------------------------------------------------------------------
//
class sys_svcUpgradeAudit extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

   

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


'use strict'
//
const _persistentTable = require('./persistent/p-cr_cb_transactionAudit');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
//
class cr_cb_transactionAudit_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_cb_transactionAudit(this, defaults);
    }

    async logInfo(id, message) {
        await this.log(id, _declarations.CX_LOG_TYPE.INFO, message);
    }
    async logWarning(id, message) {
        await this.log(id, _declarations.CX_LOG_TYPE.WARN, message);
    }
    async logError(id, error) {
        await this.log(id, _declarations.CX_LOG_TYPE.ERROR, error.message || error);
    }
    async logCritical(id, error) {
        await this.log(id, _declarations.CX_LOG_TYPE.CRITICAL, error.message || error);
    }
    async log(id, type, message) {
        try {
            var newLog = await this.cx.table(_schema.cr_cb_transactionAudit).createNew();
            newLog.cbTranId = id;
            newLog.logType = type || _declarations.CX_LOG_TYPE.INFO;
            newLog.logMessage = message || 'no message provided';
            newLog.logMessage = newLog.logMessage.substring(0, 255);
            await newLog.save();
        } catch (error) {
            // ignore we could not log
            if (process.env.DEV) { console.log(error.message); }
        }
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cr_cb_transactionAudit extends _persistentTable.Record {
    constructor(table, defaults) {
        super(table, defaults);
    };

   

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        return await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cr_cb_transactionAudit_Collection,
    Record: cr_cb_transactionAudit,
}


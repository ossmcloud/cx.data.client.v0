'use strict'
//
const _core = require('cx-core');
const _persistentTable = require('./persistent/p-cr_cb_transaction');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');
const _cx_render = require('../cx-client-render');
//
class cr_cb_transaction_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_cb_transaction(this, defaults);
    }

    async getTranTypeConfigCols() {
        var query = { sql: '', params: [] };
        query.sql = `
            select	        tt.tranTypeConfigId, ('<span class="label_smaller">' + tt.cbHeading + '</span><span class="label_small">' + tt.description + '</span>') as title, tt.sortIndex
            from	        cr_tran_type_config tt
            inner   join    cx_shop s ON s.tranTypeConfigId = tt.mapConfigId	
            where	s.shopId in ${this.cx.shopList}
            and		tt.showInCashBookList = 1
            group by tt.tranTypeConfigId, tt.cbHeading, tt.description, tt.sortIndex
            order by tt.sortIndex
        `;
        return await this.db.exec(query);
    }


    async select(params) {

        if (!params) { params = {}; }

        if (params.sql) {
            return await super.select(params);

        } else {

            var query = { sql: '', params: [] };

            query.sql = ` select  l.*, s.shopCode, s.shopName  `;
            if (params.expanded == 'true') {
                var additionalColumns = [];
                //query.sql += `, ('[' + s.shopCode + '] ' + s.shopName) as shopInfo `;
                query.sql += `, '[' + s.shopCode + '] ' + s.shopName as shopInfo, case isnull(l.userNotes, '') when '' then '' else '&#x1F6C8;' end as userNotesIcon, (select sum(isnull(cbt.valueTax, 0)) from cr_transaction cbt where cbt.cbTranId = l.cbTranId and voided = 0) as totalTax`;
                var cols = await this.getTranTypeConfigCols();
                cols.each(function (c, idx) {
                    query.sql += `, (select sum(cbt.valueGross) from cr_transaction cbt where cbt.cbTranId = l.cbTranId and voided = 0 and cbt.tranTypeConfigId = ${c.tranTypeConfigId}) as [AC_${c.tranTypeConfigId}] `;
                    additionalColumns.push({
                        id: c.tranTypeConfigId,
                        title: c.title,
                    });
                });
                this.additionalColumns = additionalColumns;
            }
            query.sql += `
                from ${this.type} l, cx_shop s
                where   l.${this.FieldNames.SHOPID} = s.shopId
                and     l.${this.FieldNames.SHOPID} in ${this.cx.shopList}
            `;

            if (params.s) {
                query.sql += ' and l.shopId = @shopId';
                query.params.push({ name: 'shopId', value: params.s });
            }
            if (params.tr) {
                query.sql += ' and l.transmissionId like @transmissionId';
                query.params.push({ name: 'transmissionId', value: ('%' + params.tr + '%') });
            }
            if (params.df) {
                query.sql += ' and l.date >= @from';
                query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
            }
            if (params.dt) {
                query.sql += ' and l.date <= @to';
                query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
            }
            if (params.batch == 'T') {
                var allowedStatuses = [-1];
                if (params.tst == _declarations.CR_CASH_BOOK.STATUS.Refresh || params.tst == _declarations.CR_CASH_BOOK.STATUS.PostingPrep || params.tst == _declarations.CR_CASH_BOOK.STATUS.PostingPrepAndPost) {
                    allowedStatuses.push(_declarations.CR_CASH_BOOK.STATUS.New);
                    allowedStatuses.push(_declarations.CR_CASH_BOOK.STATUS.Pending);
                    if (params.tst == _declarations.CR_CASH_BOOK.STATUS.Refresh) { allowedStatuses.push(_declarations.CR_CASH_BOOK.STATUS.Error); }

                } else if (params.tst == _declarations.CR_CASH_BOOK.STATUS.Posting || params.tst == _declarations.CR_CASH_BOOK.STATUS.Pending) {
                    allowedStatuses.push(_declarations.CR_CASH_BOOK.STATUS.PostingReady);
                    
                    
                }
                query.sql += ' and l.status in (' + allowedStatuses.join(',') + ')';
            } else {
                if (params.st) {
                    query.sql += ' and l.status = @status';
                    query.params.push({ name: 'status', value: params.st });
                }
                if (params.sta) {
                    query.sql += ' and l.status in (' + params.sta + ')';
                    //query.params.push({ name: 'statuses', value: [1,2] });
                }
            }
            if (params.expanded == 'true') {
                query.sql += ` group by  l.cbTranId, l.shopId, l.date, l.status, l.statusMessage, l.totalSales, l.totalLodgement, l.tillDifference, l.totalAccountSales, l.totalAccountLodgement,
                                        l.erpTransmissionId, l.transmissionId, l.warnLevel, l.warnMessage, l.created, l.createdBy, l.modified, l.modifiedBy, l.rowver, l.userNotes, l.userNotesBy, l.userNotesDate, s.shopCode, s.shopName`;
            }
            query.sql += ' order by l.date desc';

            query.paging = {
                page: params.page || 1,
                pageSize: _declarations.SQL.PAGE_SIZE
            }

            if (params.expanded == 'true') {
                var resp = await this.db.exec(query);
                this.setRecords(resp.rows);
                return resp.count > 0;
            } else {
                return await super.select(query);
            }
        }
    }


    async fetch(id) {
        if (this.cx.cxSvc == true) { return await super.fetch(id); }

        var query = { sql: '', params: [{ name: 'cbTranId', value: id }] };
        query.sql = ` select  l.*, s.shopCode, s.shopName
                      from    ${this.type} l, cx_shop s
                      where   l.${this.FieldNames.SHOPID} = s.shopId
                      and     l.${this.FieldNames.SHOPID}  in ${this.cx.shopList}
                      and     l.${this.FieldNames.CBTRANID} = @cbTranId`;
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist, was deleted or you do not have permission!`); }

        return super.populate(rawRecord);
    }

    async fetchByDate(shopId, date) {
        if (this.cx.cxSvc == true) { return await super.fetch(id); }

        var query = { sql: '', params: [{ name: 'shopId', value: shopId }] };

        query.sql = ` select  top 1 l.*, s.shopCode, s.shopName
                      from    ${this.type} l, cx_shop s
                      where   l.${this.FieldNames.SHOPID} = s.shopId
                      and     l.${this.FieldNames.SHOPID}  in ${this.cx.shopList}
                      and     l.${this.FieldNames.SHOPID} = @shopId`;

        if (date) {
            query.params.push({ name: 'date', value: date });
            query.sql += `\nand     l.${this.FieldNames.DATE} <= @date`;
        }
        query.sql += `\norder by l.date desc`;

        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} no cash-book found for this shop [${shopId}]!`); }

        return super.populate(rawRecord);
    }



}
//
// ----------------------------------------------------------------------------------------
//
class cr_cb_transaction extends _persistentTable.Record {
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
    get transmissionIdText() { return this.transmissionId.toString(); }
    get dateStr() { return _core.date.format({ date: this.date }) }

    get warnLevelIcon() {
        if (!this.warnLevel) { return ''; }
        if (this.warnLevel == 1) { return '&#9888;'; }              // warning
        if (this.warnLevel == 2) { return '&#10071;'; }             // needs attention
        if (this.warnLevel == 3) { return '&#10060;'; }             // error
        if (this.warnLevel == 9) { return '&#10071;&#10060;'; }     // critical

        return this.warnLevel;
    }

    get userNotesIcon() {
        if (this.userNotes) {
            return `&#x1F6C8;`;
        }
        return '';
    }

    
    get canEdit() {
        return (this.status == _declarations.CR_CASH_BOOK.STATUS.New || this.status == _declarations.CR_CASH_BOOK.STATUS.Pending || this.status == _declarations.CR_CASH_BOOK.STATUS.Error)
    }

    async refreshTotals(save) {
        if (this.status != _declarations.CR_CASH_BOOK.STATUS.New && this.status != _declarations.CR_CASH_BOOK.STATUS.Pending && this.status != _declarations.CR_CASH_BOOK.STATUS.Error) {
            throw new Error('Cannot refresh cash book totals as status is: ' + this.status);
        }
        // IMPORTANT-NOTE: the query to calculate till cash bok totals must be the same as cx.svc.task.v1\Workers\DtfsCRWorker.TransformData_CashBookTotals
        var query = {
            sql: `
                declare @sales money; declare @sales_acc money; declare @lodg money; declare @lodg_acc money; declare @other money;

                select	@sales                          = SUM(case isnull(crTran.customerAccount, '') when '' then crTran.valueGross else 0 end),
                        @sales_acc                      = SUM(case isnull(crTran.customerAccount, '') when '' then 0 else crTran.valueGross end)

                from	cr_transaction crTran
                inner   join cr_tran_type_config tranType 
                            ON tranType.tranTypeConfigId = crTran.tranTypeConfigId
                inner   join cr_cb_tran_type cbTranType  
                            ON tranType.cbTranTypeId = cbTranType.cbTranTypeId

                where	cbTranId                        = @cbTranId
                and		cbTranType.tillDiffImpact       > 0
                and     crTran.voided                   = 0
                and     crTran.ignored                  = 0
                
                select	@lodg                           = SUM(case isnull(crTran.customerAccount, '') when '' then crTran.valueGross else 0 end),
                        @lodg_acc                       = SUM(case isnull(crTran.customerAccount, '') when '' then 0 else crTran.valueGross end)
                from	cr_transaction crTran
                inner   join cr_tran_type_config tranType 
                            ON tranType.tranTypeConfigId = crTran.tranTypeConfigId
                inner   join cr_cb_tran_type cbTranType 
                            ON tranType.cbTranTypeId = cbTranType.cbTranTypeId

                where	cbTranId                        = @cbTranId
                and		cbTranType.tillDiffImpact       < 0
                and     crTran.voided                   = 0
                and     crTran.ignored                  = 0
                
                select  @sales as totalSales, @sales_acc as totalAccountSales, @lodg as totalLodgement, @lodg_acc as totalAccountLodgement, (@lodg - @sales) as tillDifference
            `
        }
        query.params = [{ name: 'cbTranId', value: this.id }];
        query.returnFirst = true;

        var result = await this.cx.exec(query);

        if (save) {
            if (this.totalSales != result.totalSales) { this.logInfo(`total sales changed from ${this.totalSales} to ${result.totalSales}`); }
            if (this.totalAccountSales != result.totalAccountSales) { this.logInfo(`total a/c sales changed from ${this.totalAccountSales} to ${result.totalAccountSales}`); }
            if (this.totalLodgement != result.totalLodgement) { this.logInfo(`total lodgment changed from ${this.totalLodgement} to ${result.totalLodgement}`); }
            if (this.totalAccountLodgement != result.totalAccountLodgement) { this.logInfo(`total a/c lodgment changed from ${this.totalAccountLodgement} to ${result.totalAccountLodgement}`); }
            if (this.tillDifference != result.tillDifference) { this.logInfo(`till difference changed from ${this.tillDifference} to ${result.tillDifference}`); }
        }
            
        this.totalSales = result.totalSales;
        this.totalAccountSales = result.totalAccountSales;
        this.totalLodgement = result.totalLodgement;
        this.totalAccountLodgement = result.totalAccountLodgement;
        this.tillDifference = result.tillDifference;
        if (save) { await this.save(); }
    }

    async logInfo(message) {
        await this.log(_declarations.CX_LOG_TYPE.INFO, message);
    }
    async logWarning(message) {
        await this.log(_declarations.CX_LOG_TYPE.WARN, message);
    }
    async logError(error) {
        await this.log(_declarations.CX_LOG_TYPE.ERROR, error.message || error);
    }
    async logCritical(error) {
        await this.log(_declarations.CX_LOG_TYPE.CRITICAL, error.message || error);
    }
    async log(type, message) {
        try {
            var newLog = await this.cx.table(_schema.cr_cb_transactionAudit).createNew();
            newLog.cbTranId = this.cbTranId;
            newLog.logType = type || _declarations.CX_LOG_TYPE.INFO;
            newLog.logMessage = message || 'no message provided';
            newLog.logMessage = newLog.logMessage.substring(0, 255);
            await newLog.save();
        } catch (error) {
            // ignore we could not log
            if (process.env.DEV) { console.log(error.message); }
        }
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
    Table: cr_cb_transaction_Collection,
    Record: cr_cb_transaction,
}


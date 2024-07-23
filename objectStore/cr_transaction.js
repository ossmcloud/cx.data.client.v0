'use strict'
//
const _cored = require('cx-core/core/cx-core-date');
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cr_transaction');
//
class cr_transaction_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_transaction(this, defaults);
    }

    async select(params) {

        if (!params) { params = {}; }

        var query = { sql: '', params: [] };
        query.sql = ` select    t.*, s.shopCode, s.shopName, cust.traderName as customerName,
                                dep.eposDescription as departmentDescription,
                                gl.code as erpGLSegment1, gl.costCentre as erpGLSegment2, gl.department as erpGLSegment3, gl.description as erpGLDescription,
                                glTax.code as erpTaxCode, glTax.rate as erpTaxRate, glTax.description as erpTaxDescription,
                                cbTranType.code as cbTranType, tranType.cbHeading, tranType.description as cbDescription
                                

                      from            ${this.type} t
                      inner      join cx_shop               s           ON s.shopId = t.shopId
                      left outer join cr_tran_type_config   tranType    ON tranType.tranTypeConfigId = t.tranTypeConfigId
                      left outer join cr_cb_tran_type       cbTranType  ON cbTranType.cbTranTypeId = tranType.cbTranTypeId
                      left outer join cx_traderAccount      cust        ON cust.shopId = t.shopId AND cust.traderCode = t.customerAccount AND cust.traderType = 'C' 
                      left outer join cx_map_config_dep     dep         ON dep.depMapConfigId = t.depMapConfigId 
                      left outer join erp_gl_account        gl          ON gl.erpGLAccountId = dep.saleAccountId

                      left outer join cx_map_config_tax     tax         ON tax.taxMapConfigId = t.taxMapConfigId 
                      left outer join erp_tax_account       glTax       ON glTax.erpTaxAccountId = tax.taxAccountId

                      where   t.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

        if (params.cb) {
            query.sql += ' and t.cbTranId = @cbTranId';
            query.params.push({ name: 'cbTranId', value: params.cb });
        } else if (params.s) {
            query.sql += ' and t.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }

        if (params.cb_h) {
            query.sql += ' and tranType.cbHeading = @cbHeading';
            if (params.cb_h.indexOf('A/C') == 0) {
                query.sql += " and isnull(t.customerAccount, '') != '' ";
                query.params.push({ name: 'cbHeading', value: params.cb_h.substring(4) });
            } else {
                query.sql += " and isnull(t.customerAccount, '') = '' ";
                query.params.push({ name: 'cbHeading', value: params.cb_h });
            }
        }

        if (params.tt) {
            query.sql += ' and tranType.cbTranTypeId = @cbTranTypeId';
            query.params.push({ name: 'cbTranTypeId', value: params.tt });
        }

        if (params.ttt) {
            query.sql += ' and tranType.tranTypeConfigId = @tranTypeConfigId';
            query.params.push({ name: 'tranTypeConfigId', value: params.ttt });
        }
        if (params.df) {
            query.sql += ' and t.transactionDate >= @from';
            query.params.push({ name: 'from', value: params.df + ' 00:00:00' });
        }
        if (params.dt) {
            query.sql += ' and t.transactionDate <= @to';
            query.params.push({ name: 'to', value: params.dt + ' 23:59:59' });
        }
        if (params.e_tn) {
            query.sql += ` and t.${this.FieldNames.EPOSTRANSACTIONNO} like @${this.FieldNames.EPOSTRANSACTIONNO}`;
            query.params.push({ name: this.FieldNames.EPOSTRANSACTIONNO, value: params.e_tn + '%' });
        }
        if (params.e_tt) {
            query.sql += ` and t.${this.FieldNames.TRANSACTIONTYPE} like @${this.FieldNames.TRANSACTIONTYPE}`;
            query.params.push({ name: this.FieldNames.TRANSACTIONTYPE, value: params.e_tt + '%' });
        }
        if (params.e_ts) {
            query.sql += ` and t.${this.FieldNames.TRANSACTIONSUBTYPE} like @${this.FieldNames.TRANSACTIONSUBTYPE}`;
            query.params.push({ name: this.FieldNames.TRANSACTIONSUBTYPE, value: params.e_ts + '%' });
        }
        if (params.e_tid) {
            //eposTransactionId
            query.sql += ` and t.${this.FieldNames.EPOSTRANSACTIONID} = @${this.FieldNames.EPOSTRANSACTIONID}`;
            query.params.push({ name: this.FieldNames.EPOSTRANSACTIONID, value: params.e_tid });
        }

        if (params.cust) {
            if (params.cust == '*') {
                query.sql += ` and isnull(t.${this.FieldNames.CUSTOMERACCOUNT}, '') != ''`;
                
            } else {
                query.sql += ` and t.${this.FieldNames.CUSTOMERACCOUNT} = @${this.FieldNames.CUSTOMERACCOUNT}`;
                query.params.push({ name: this.FieldNames.CUSTOMERACCOUNT, value: params.cust });
            }
        }

        if (params.manual) {
            query.sql += ` and isnull(t.${this.FieldNames.ISMANUAL}, 0) = @${this.FieldNames.ISMANUAL}`;
            query.params.push({ name: this.FieldNames.ISMANUAL, value: (params.manual == 'T' || params.manual == 'true') ? 1 : 0 });
        }
        if (params.ignored) {
            query.sql += ` and isnull(t.${this.FieldNames.IGNORED}, 0) = @${this.FieldNames.IGNORED}`;
            query.params.push({ name: this.FieldNames.IGNORED, value: (params.ignored == 'T' || params.ignored   == 'true') ? 1 : 0 });
        }
        if (params.voided) {
            query.sql += ` and isnull(t.${this.FieldNames.VOIDED}, 0) = @${this.FieldNames.VOIDED}`;
            query.params.push({ name: this.FieldNames.VOIDED, value: (params.voided == 'T' || params.voided == 'true') ? 1 : 0 });
        }
        if (params.duplicate) {
            query.sql += ` and isnull(t.${this.FieldNames.ISDUPLICATE}, 0) = @${this.FieldNames.ISDUPLICATE}`;
            query.params.push({ name: this.FieldNames.ISDUPLICATE, value: (params.duplicate == 'T' || params.duplicate == 'true') ? 1 : 0 });
        }
        if (params.edited) {
            query.sql += ` and isnull(t.${this.FieldNames.ISEDITED}, 0) = @${this.FieldNames.ISEDITED}`;
            query.params.push({ name: this.FieldNames.ISEDITED, value: (params.edited == 'T' || params.edited == 'true') ? 1 : 0 });
        }

        if (params.ref1) {
            query.sql += ` and t.${this.FieldNames.REFERENCE1} like @${this.FieldNames.REFERENCE1}`;
            query.params.push({ name: this.FieldNames.REFERENCE1, value: params.ref1 + '%' });
        }
        if (params.ref2) {
            query.sql += ` and t.${this.FieldNames.REFERENCE2} like @${this.FieldNames.REFERENCE2}`;
            query.params.push({ name: this.FieldNames.REFERENCE2, value: params.ref2 + '%' });
        }
        if (params.barcode) {
            query.sql += ` and t.${this.FieldNames.ITEMBARCODE} like @${this.FieldNames.ITEMBARCODE}`;
            query.params.push({ name: this.FieldNames.ITEMBARCODE, value: params.barcode + '%' });
        }
        if (params.descr) {
            query.sql += ` and t.${this.FieldNames.ITEMDESCRIPTION} like @${this.FieldNames.ITEMDESCRIPTION}`;
            query.params.push({ name: this.FieldNames.ITEMDESCRIPTION, value: params.descr + '%' });
        }

        if (params.decla) {
            query.sql += ` and t.${this.FieldNames.ISMANUAL} = 1`;
            query.sql += ` and tranType.requiresDeclaration > 0`;

        }

        if (params.epos_dep) {
            query.sql += ` and t.${this.FieldNames.DEPARTMENT} = @${this.FieldNames.DEPARTMENT}`;
            query.params.push({ name: this.FieldNames.DEPARTMENT, value: params.epos_dep });
        }
        if (params.epos_sdep) {
            query.sql += ` and t.${this.FieldNames.SUBDEPARTMENT} = @${this.FieldNames.SUBDEPARTMENT}`;
            query.params.push({ name: this.FieldNames.SUBDEPARTMENT, value: params.epos_sdep });
        }
        if (params.epos_depd) {
            query.sql += ` and dep.eposDescription like @eposDescription`;
            query.params.push({ name: 'eposDescription', value: params.epos_depd + '%' });
        }
        if (params.epos_tax) {
            query.sql += ` and t.${this.FieldNames.TAXCODE} = @${this.FieldNames.TAXCODE}`;
            query.params.push({ name: this.FieldNames.TAXCODE, value: params.epos_tax });
        }
        

        if (params.erp_code) {
            query.sql += ` and gl.code = @glCode`;
            query.params.push({ name: 'glCode', value: params.erp_code });
        }
        if (params.erp_scode) {
            query.sql += ` and gl.costCentre = @glSedg2`;
            query.params.push({ name: 'glSedg2', value: params.erp_scode });
        }
        if (params.erp_coded) {
            query.sql += ` and gl.description like @erpDescription`;
            query.params.push({ name: 'erpDescription', value: params.erp_coded + '%' });
        }
        if (params.erp_tax) {
            query.sql += ` and glTax.code = @erpTaxCode`;
            query.params.push({ name: 'erpTaxCode', value: params.erp_tax });
        }

        if (params.a123) {
            query.sql += ` and (t.analysis1 like @analysisCode or t.analysis2 like @analysisCode or t.analysis3 like @analysisCode)`;
            query.params.push({ name: 'analysisCode', value: `%${params.a123}%` });
        }

        query.sql += ' order by ' + this.FieldNames.TRANSACTIONDATETIME;

        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }


        return await super.select(query);
    }


    async fetch(id) {
        if (this.cx.cxSvc == true) { return await super.fetch(id); }

        var query = { sql: '', params: [{ name: this.FieldNames.TRANID, value: id }] };
        query.sql = ` select  t.*, s.shopCode, s.shopName
                      from    ${this.type} t, cx_shop s
                      where   t.${this.FieldNames.SHOPID} = s.shopId
                      and     t.${this.FieldNames.TRANID} = @tranId`;
        query.noResult = 'null';
        query.returnFirst = true;

        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist or was deleted!`); }

        return super.populate(rawRecord);
    }

    async selectGroup(params) {
        var query = { sql: '', params: [] };
        query.sql = ` select  MIN(t.transactionDateTime) as transactionDateTime, cust.traderCode, cust.traderName, t.eposTransactionNo, t.eposTransactionId, 
                        SUM(case t.voided when 1 then 0 else t.valueGross end) as valueGross, 
                        SUM(case t.voided when 1 then 0 else t.valueTax end) as valueTax, 
                        SUM(case t.voided when 1 then 0 else t.valueNet end) as valueNet
                      from    ${this.type} t
                      inner join cx_shop s ON s.shopId = t.shopId
                      left outer join cr_tran_type_config tranType ON tranType.tranTypeConfigId = t.tranTypeConfigId
                      left outer join cx_traderAccount cust ON t.shopId = cust.shopId and t.customerAccount = cust.traderCode and cust.traderType = 'C'
                      where   t.${this.FieldNames.SHOPID} in ${this.cx.shopList}`;

        query.sql += ' and t.cbTranId = @cbTranId';
        query.params.push({ name: 'cbTranId', value: params.cb });

        query.sql += ` and t.${this.FieldNames.CUSTOMERACCOUNT} = @${this.FieldNames.CUSTOMERACCOUNT}`;
        query.params.push({ name: this.FieldNames.CUSTOMERACCOUNT, value: params.cust });

        query.sql += ' and tranType.tranTypeConfigId = @tranTypeConfigId';
        query.params.push({ name: 'tranTypeConfigId', value: params.ttt });


        query.sql += ' group by cust.traderCode, cust.traderName, t.eposTransactionNo, t.eposTransactionId';
        query.sql += ' order by eposTransactionNo'
        return await this.cx.exec(query);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cr_transaction extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #customerName = '';
    #departmentDescription = '';
    #erpGLSegment1 = '';
    #erpGLSegment2 = '';
    #erpGLSegment3 = '';
    #erpGLDescription = '';
    #cbTranType = '';
    #cbHeading = '';
    #cbDescription = '';

    #erpTaxDescription = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';
        this.#customerName = defaults['customerName'] || '';
        this.#departmentDescription = defaults['departmentDescription'] || '';
        this.#erpGLSegment1 = defaults['erpGLSegment1'] || '';
        this.#erpGLSegment2 = defaults['erpGLSegment2'] || '';
        this.#erpGLSegment3 = defaults['erpGLSegment3'] || '';
        this.#erpGLDescription = defaults['erpGLDescription'] || '';
        this.#cbTranType = defaults['cbTranType'] || '';
        this.#cbHeading = defaults['cbHeading'] || '';
        this.#cbDescription = defaults['cbDescription'] || '';

        this.#erpTaxDescription = defaults['erpTaxDescription'] || '';
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get transactionTypeDisplay() {
        var info = this.transactionType;
        if (this.transactionSubType) { info += ` / ${this.transactionSubType}`; }
        return info;
    }

    get itemDescriptionDisplay() {
        if (!this.itemDescription) { return ''; }
        return this.itemDescription;
    }

    get transactionDateDisplay() {
        var dt = _cored.format({
            date: this.transactionDateTime,
            dateTimeSep: '<br />',
            inverted: true,
            showTime: true,
        })
        return dt;
    }

    get departmentInfo() {
        if (!this.depMapConfigId) { return ''; }
        var info = this.department;
        if (this.subDepartment) { info += ` / ${this.subDepartment}`; }
        info = `[${info}] ${this.#departmentDescription}`;
        return info
    }

    get erpGLInfo() {
        if (!this.#erpGLSegment1) { return ''; }
        var info = this.#erpGLSegment1;
        if (this.erpGLSegment2) { info += ` / ${this.#erpGLSegment2}`; }
        if (this.erpGLSegment3) { info += ` / ${this.#erpGLSegment3}`; }
        info = `[${info}] ${this.#erpGLDescription}`;
        return info
    }

    get customerAccountDisplay() {
        if (!this.customerAccount) { return `` }
        return `[${this.customerAccount}] ${this.#customerName}`;
    }

    get quantityDisplay() {
        if (this.quantity == null) { return ''; }
        return this.quantity;
    }

    get cbTranInfo() {
        var info = this.#cbTranType;
        if (this.#cbHeading) { info += ` / ${this.#cbHeading}`; }
        if (this.#cbDescription && this.#cbDescription != this.#cbHeading) { info += ` / ${this.#cbDescription}`; }
        return info;
    }

    get taxInfo() {
        if (this.taxCode == null) { return ''; }
        return `[${this.taxCode}] ${this.taxRate}%`;
    }

    get erpTaxInfo() {
        // if (!this.#erpGLSegment1) { return ''; }
        // var info = this.#erpGLSegment1;
        // if (this.erpGLSegment2) { info += ` / ${this.#erpGLSegment2}`; }
        // if (this.erpGLSegment3) { info += ` / ${this.#erpGLSegment3}`; }
        // info = `[${info}] ${this.#erpGLDescription}`;
        // return info
        return this.#erpTaxDescription;
    }

    get customerName() { return this.#customerName; }

    get editedIcon() {
        var icon = '';
        if (this.isManual) { icon += '&#x2699;'; }
        if (this.isEdited) { icon += '&#x270E;'; }
        return icon;
    }

    get voidedIcon() {
        var icon = '';
        if (this.voided) { icon += '&cross;'; }
        if (this.ignored) { icon += '&#x1F6AB;'; }
        return icon;
    }

    get isDuplicateIcon() {
        var icon = '';
        if (this.isDuplicate) { icon += '&#x29C9;'; }
        return icon;
    }

    get analysisInfo() {
        var info = this.analysis1;
        if (this.analysis2) { info += ` / ${this.analysis2}`; }
        if (this.analysis3) { info += ` / ${this.analysis3}`; }
        return info || '';
    }



    async save() {
        if (this.isManual) {
            // we must have a value gross provided, zero will do (not sure why) but it has to be passed
            if (this.valueGross == null || this.valueGross == undefined) {
                this.brokenRules.push({
                    field: this.getField(this.FieldNames.VALUEGROSS),
                    message: 'null value not allowed'
                });
            }

            // NOTE: if there is no customer associated with the transaction the system wants a null
            if (this.customerAccount == '') { this.customerAccount = null; }

            // populate tax and net if not passed
            if (!this.valueTax) { this.valueTax = 0; }
            if (!this.valueNet) { this.valueNet = parseFloat(this.valueGross) - parseFloat(this.valueTax); }
        }

        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cr_transaction_Collection,
    Record: cr_transaction,
}


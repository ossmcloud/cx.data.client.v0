'use strict'
//
const _persistentTable = require('./persistent/p-cx_map_config_dep');
const _declarations = require('../cx-client-declarations');
//
class cx_map_config_dep_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_map_config_dep(this, defaults);
    }

    async select(params) {
        if (!params) { params = {}; }
        var query = { sql: '', params: [] };
        // query.sql = `select	dep.* from cx_map_config_dep dep`;

        query.sql = `
            select		dep.*,
                        glSales.code as sales_code,     glSales.costCentre as sales_cc,     glSales.department as sales_dep,     glSales.description as sales_desc,
                        glPurch.code as purch_code,     glPurch.costCentre as purch_cc,     glPurch.department as purch_dep,     glPurch.description as purch_desc,
                        glWaste.code as waste_code,     glWaste.costCentre as waste_cc,     glWaste.department as waste_dep,     glWaste.description as waste_desc,
                        glAccrual.code as accrual_code, glAccrual.costCentre as accrual_cc, glAccrual.department as accrual_dep, glAccrual.description as accrual_desc,
                        glCogs.code as cogs_code,       glCogs.costCentre as cogs_cc,       glCogs.department as cogs_dep,       glCogs.description as cogs_desc
                        --s.shopId, s.shopCode, s.shopName 
                        
            from		cx_map_config_dep dep
            --inner join  cx_map_config map on map.mapConfigId = dep.mapConfigId
            --inner join  cx_shop s on s.shopId = map.mapMasterShop
            left outer join erp_gl_account glSales ON glSales.erpGLAccountId = dep.saleAccountId
            left outer join erp_gl_account glPurch ON glPurch.erpGLAccountId = dep.purchaseAccountId
            left outer join erp_gl_account glWaste ON glWaste.erpGLAccountId = dep.wasteAccountId
            left outer join erp_gl_account glAccrual ON glAccrual.erpGLAccountId = dep.accrualAccountId
            left outer join erp_gl_account glCogs ON glAccrual.erpGLAccountId = dep.cogsAccountId

            --where		s.shopId in ${this.cx.shopList}
        `;


        if (params.s) {
            query.sql += ' inner join  cx_shop s on s.depMapConfigId = dep.mapConfigId';
            query.sql += ' where s.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        } else {
            query.sql += ' where 1 = 1';
        }

        if (params.mid) {
            query.sql += ' and dep.mapConfigId = @mapConfigId';
            query.params.push({ name: 'mapConfigId', value: params.mid });
        }

        if (params.dep) {
            query.sql += ' and eposDepartment like @eposDepartment';
            query.params.push({ name: 'eposDepartment', value: params.dep + '%' });
        }
        if (params.sub) {
            query.sql += ' and eposSubDepartment like @eposSubDepartment';
            query.params.push({ name: 'eposSubDepartment', value: params.sub + '%' });
        }
        if (params.desc) {
            query.sql += ' and eposDescription like @eposDescription';
            query.params.push({ name: 'eposDescription', value: params.desc + '%' });
        }

        if (params.mapped) {
            var fieldName = '';
            var fieldFilter = (params.mapped.indexOf('not_') == 0) ? 'is null' : 'is not null';
            if (params.mapped.indexOf('_sales') > 0) { fieldName = 'saleAccountId'; }
            if (params.mapped.indexOf('_purchase') > 0) { fieldName = 'purchaseAccountId'; }
            if (params.mapped.indexOf('_waste') > 0) { fieldName = 'wasteAccountId'; }
            if (params.mapped.indexOf('_accrual') > 0) { fieldName = 'accrualAccountId'; }
            if (params.mapped.indexOf('_cogs') > 0) { fieldName = 'cogsAccountId'; }
            query.sql += ` and dep.${fieldName} ${fieldFilter}`;
        }

        if (params.manual) {
            query.sql += ` and isnull(${this.FieldNames.ISMANUAL}, 0) = @${this.FieldNames.ISMANUAL}`;
            query.params.push({ name: this.FieldNames.ISMANUAL, value: (params.manual == 'T' || params.manual == 'true') ? 1 : 0 });
        }

        query.sql += ' order by eposDepartment, eposSubDepartment';

        if (!params.noPaging) {
            query.paging = {
                page: params.page || 1,
                pageSize: _declarations.SQL.PAGE_SIZE
            }
        }

        await super.select(query);
    }

    async toLookupFullList(shopId) {
        var query = { sql: '', params: [{ name: 'shopId', value: shopId }] };
        query.sql = `
            select	    dep.depMapConfigId as value, eposDepartment + '/' + eposSubDepartment +  ' ['+ eposDescription + ']' as text
            from	    cx_map_config_dep dep
            inner join  cx_shop s on dep.mapConfigId = s.depMapConfigId
            where	    s.shopId = @shopId
            order by    eposDepartment, eposSubDepartment
        `;
        var lookUpValues = [{ value: '', text: '' }];
        var result = await this.db.exec(query);
        for (var rx = 0; rx < result.rows.length; rx++) {
            var row = result.rows[rx];
            lookUpValues.push({
                value: row.value,
                text: row.text,
            })
        }
        return lookUpValues;
    }

    async toLookUpList(shopId, department) {
        var query = { sql: '', params: [{ name: 'shopId', value: shopId }] };

        var valueFieldName = 'eposDepartment';
        var displayFieldName = 'eposDescription';
        if (department) {
            valueFieldName = 'eposSubDepartment';
            query.params.push({ name: 'eposDepartment', value: department });
            query.sql = `
            select	eposSubDepartment, 
                SUBSTRING((eposDescription), CHARINDEX('/', eposDescription + '/') + 1, 99) as eposDescription
                
            from	cx_map_config_dep dep
            inner join cx_shop s on dep.mapConfigId = s.depMapConfigId
            where	s.shopId = @shopId
            and		dep.eposDepartment = @eposDepartment

            order by eposSubDepartment`;

        } else {
            query.sql = `
            select	eposDepartment, 
                LEFT((eposDescription), CHARINDEX('/', eposDescription + '/') - 1) as eposDescription
                
            from	cx_map_config_dep dep
            inner join cx_shop s on dep.mapConfigId = s.depMapConfigId
            where	s.shopId = @shopId
            group by eposDepartment, 
                LEFT((eposDescription), CHARINDEX('/', eposDescription + '/') - 1)

            order by eposDepartment`;
        }

        var lookUpValues = [{ value: '', text: '' }];
        var result = await this.db.exec(query);
        for (var rx = 0; rx < result.rows.length; rx++) {
            var row = result.rows[rx];
            lookUpValues.push({
                value: row[valueFieldName],
                text: `${row[valueFieldName]} (${row[displayFieldName]})`,
            })
        }

        return lookUpValues;
    }

}
//
// ----------------------------------------------------------------------------------------
//
class cx_map_config_dep extends _persistentTable.Record {
    #shopId = null;
    #shopName = '';
    #shopCode = '';

    #sales_code = '';
    #sales_cc = '';
    #sales_dep = '';
    #sales_desc = '';

    #purch_code = '';
    #purch_cc = '';
    #purch_dep = '';
    #purch_desc = '';

    #waste_code = '';
    #waste_cc = '';
    #waste_dep = '';
    #waste_desc = '';

    #accrual_code = '';
    #accrual_cc = '';
    #accrual_dep = '';
    #accrual_desc = '';

    #cogs_code = '';
    #cogs_cc = '';
    #cogs_dep = '';
    #cogs_desc = '';

    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopId = defaults['shopId'] || null;
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';

        this.#sales_code = defaults['sales_code'] || '';
        this.#sales_cc = defaults['sales_cc'] || '';
        this.#sales_dep = defaults['sales_dep'] || '';
        this.#sales_desc = defaults['sales_desc'] || '';

        this.#purch_code = defaults['purch_code'] || '';
        this.#purch_cc = defaults['purch_cc'] || '';
        this.#purch_dep = defaults['purch_dep'] || '';
        this.#purch_desc = defaults['purch_desc'] || '';

        this.#waste_code = defaults['waste_code'] || '';
        this.#waste_cc = defaults['waste_cc'] || '';
        this.#waste_dep = defaults['waste_dep'] || '';
        this.#waste_desc = defaults['waste_desc'] || '';

        this.#accrual_code = defaults['accrual_code'] || '';
        this.#accrual_cc = defaults['accrual_cc'] || '';
        this.#accrual_dep = defaults['accrual_dep'] || '';
        this.#accrual_desc = defaults['accrual_desc'] || '';

        this.#cogs_code = defaults['cogs_code'] || '';
        this.#cogs_cc = defaults['cogs_cc'] || '';
        this.#cogs_dep = defaults['cogs_dep'] || '';
        this.#cogs_desc = defaults['cogs_desc'] || '';


    };

    get shopId() { return this.#shopId; }
    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get salesCode() { return this.#sales_code; }
    get salesCc() { return this.#sales_cc; }
    get salesDep() { return this.#sales_dep; }
    get salesDesc() { return this.#sales_desc; }
    get salesSpec() {
        var spec = this.salesCode;
        if (this.salesCc) { spec += `/${this.salesCc}`; }
        if (this.salesDep) { spec += `/${this.salesDep}`; }
        return spec;
    }

    get purchCode() { return this.#purch_code; }
    get purchCc() { return this.#purch_cc; }
    get purchDep() { return this.#purch_dep; }
    get purchDesc() { return this.#purch_desc; }
    get purchSpec() {
        var spec = this.purchCode;
        if (this.purchCc) { spec += `/${this.purchCc}`; }
        if (this.purchDep) { spec += `/${this.purchDep}`; }
        return spec;
    }

    get wasteCode() { return this.#waste_code; }
    get wasteCc() { return this.#waste_cc; }
    get wasteDep() { return this.#waste_dep; }
    get wasteDesc() { return this.#waste_desc; }
    get wasteSpec() {
        var spec = this.wasteCode;
        if (this.wasteCc) { spec += `/${this.wasteCc}`; }
        if (this.wasteDep) { spec += `/${this.wasteDep}`; }
        return spec;
    }

    get accrualCode() { return this.#accrual_code; }
    get accrualCc() { return this.#accrual_cc; }
    get accrualDep() { return this.#accrual_dep; }
    get accrualDesc() { return this.#accrual_desc; }
    get accrualSpec() {
        var spec = this.accrualCode;
        if (this.accrualCc) { spec += `/${this.accrualCc}`; }
        if (this.accrualDep) { spec += `/${this.accrualDep}`; }
        return spec;
    }

    get cogsCode() { return this.#cogs_code; }
    get cogsCc() { return this.#cogs_cc; }
    get cogsDep() { return this.#cogs_dep; }
    get cogsDesc() { return this.#cogs_desc; }
    get cogsSpec() {
        var spec = this.cogsCode;
        if (this.cogsCc) { spec += `/${this.cogsCc}`; }
        if (this.cogsDep) { spec += `/${this.cogsDep}`; }
        return spec;
    }



    async save() {
        if (this.isNew() && this.cx.tUserId > 0) { this.isManual = true; }
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cx_map_config_dep_Collection,
    Record: cx_map_config_dep,
}


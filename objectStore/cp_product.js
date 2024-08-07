'use strict'
//
const _persistentTable = require('./persistent/p-cp_product');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');

//
class cp_product_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_product(this, defaults);
    }

    buildQuery() {
        return `
            select          prod.*, s.shopCode, s.shopName, 
                            dep.eposDepartment, dep.eposSubDepartment, dep.eposDescription,
                            tax.eposTaxCode, tax.eposTaxRate, tax.eposDescription as eposTaxDescription,
                            supp.traderCode,
                            isnull(supp.traderName, isnull(supp2.traderName, isnull(supp3.traderName, case when suppName.traderName is null then null else '&#x2048;' + suppName.traderName end))) as traderName,
                            
                            alias.itemCode as aliasCode, alias.itemDescription as aliasDescription,
                            sgl.code as glSale, sgl.description glSaleDescr,
							pgl.code as glPurch, pgl.description glPurchDescr

            from            ${this.type} prod 
            inner join      cx_shop s                       ON s.shopId = prod.shopId
            left outer join cp_productAlias alias           ON alias.aliasId = prod.aliasId
            left outer join cx_map_config_dep dep           ON dep.depMapConfigId = prod.depMapConfigId
            left outer join cx_map_config_tax tax           ON tax.taxMapConfigId = prod.taxMapConfigId

            left outer join cx_traderAccount supp           ON supp.traderAccountId = prod.traderAccountId
            left outer join cx_traderAccount supp2          ON supp2.shopId = prod.shopId AND supp2.traderCode = prod.supplierCode AND supp2.traderType = 'S' 
            left outer join cx_traderAccount supp3          ON supp3.shopId = prod.shopId AND supp3.wholesalerCode = prod.supplierCode AND supp3.traderType = 'S' 
            left outer join cx_traderNameLookUp suppName    ON suppName.shopId = prod.shopId AND suppName.traderCode = prod.supplierCode AND suppName.traderType = 'S' 

            left outer join erp_gl_account sgl              ON sgl.erpGLAccountId = dep.saleAccountId
            left outer join erp_gl_account pgl              ON pgl.erpGLAccountId = dep.purchaseAccountId

            where           prod.${this.FieldNames.SHOPID} in ${this.cx.shopList}
        `;
    }

    async select(params) {

        var query = { sql: this.buildQuery(), params: [] };
        if (params.s) {
            query.sql += ' and prod.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }

        if (params.code) {
            query.sql += ` and (
                    prod.itemCode like @code OR prod.supplierItemCode like @code OR prod.raw_eposCode like @code OR
                    prod.itemBarcode like @code OR prod.raw_eposBarcode like @code OR 
                    prod.itemDescription like @code OR prod.supplierItemDescription like @code OR prod.raw_eposDescription like @code
                )`;
            query.params.push({ name: 'code', value: params.code + '%' });
        }
        if (params.ic) {
            query.sql += ' and (prod.itemCode like @itemCode OR prod.supplierItemCode like @itemCode OR prod.raw_eposCode like @itemCode)';
            query.params.push({ name: 'itemCode', value: params.ic + '%' });
        }
        if (params.id) {
            query.sql += ' and (prod.itemDescription like @itemDescription OR prod.supplierItemDescription like @itemDescription OR prod.raw_eposDescription like @itemDescription)';
            query.params.push({ name: 'itemDescription', value: params.id + '%' });
        }
        if (params.ibc) {
            query.sql += ' and (prod.itemBarcode like @itemBarcode OR prod.raw_eposBarcode like @itemBarcode)';
            query.params.push({ name: 'itemBarcode', value: params.ibc + '%' });
        }
        if (params.sup) {
            query.sql += ' and prod.supplierCode like @supplierCode';
            query.params.push({ name: 'supplierCode', value: params.sup + '%' });
        }
        if (params.dep) {
            query.sql += ' and (dep.eposDepartment like @dep OR dep.eposSubDepartment like @dep OR dep.eposDescription like @dep)';
            query.params.push({ name: 'dep', value: '%' + params.dep + '%' });
        }
        if (params.aid) {
            query.sql += ' and prod.aliasId = @aliasId';
            query.params.push({ name: 'aliasId', value: params.aid });
        }
        if (params.src) {
            query.sql += ' and prod.sourceId = @sourceId';
            query.params.push({ name: 'sourceId', value: params.src });
        }
        if (params.map) {
            if (params.map == _declarations.CP_PRODUCT.MAP_STATUS.NOT_MAPPED_DEP) {
                query.sql += ' and prod.depMapConfigId is null and prod.aliasId is null';
            } else if (params.map == _declarations.CP_PRODUCT.MAP_STATUS.NOT_MAPPED_TAX) {
                query.sql += ' and prod.taxMapConfigId is null and prod.aliasId is null';
            }
        }
        query.sql += ' order by prod.itemDescription';
        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }
        return await super.select(query);
    }

    async fetch(id) {
        var query = { sql: this.buildQuery(), params: [{ name: 'productId', value: id }] };
        query.sql += ` and prod.productId = @productId`;
        query.noResult = 'null';
        query.returnFirst = true;
        var rawRecord = await this.db.exec(query);
        if (!rawRecord) { throw new Error(`${this.type} record [${id}] does not exist, was deleted or you do not have permission!`); }
        return super.populate(rawRecord);
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cp_product extends _persistentTable.Record {
    #shopName = '';
    #shopCode = '';
    #eposDepartment = '';
    #eposSubDepartment = '';
    #eposDescription = '';
    #eposTaxCode = '';
    #eposTaxRate = null;
    #eposTaxDescription = '';
    #traderCode = '';
    #traderName = '';
    #aliasCode = '';
    #aliasDescription = '';
    #glSale = '';
    #glSaleDescr = '';
    #glPurch = '';
    #glPurchDescr = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }
        this.#shopName = defaults['shopName'] || '';
        this.#shopCode = defaults['shopCode'] || '';

        this.#eposDepartment = defaults['eposDepartment'] || '';
        this.#eposSubDepartment = defaults['eposSubDepartment'] || '';
        this.#eposDescription = defaults['eposDescription'] || '';

        this.#eposTaxCode = defaults['eposTaxCode'] || '';
        this.#eposTaxRate = defaults['eposTaxRate'] || null;
        this.#eposTaxDescription = defaults['eposTaxDescription'] || '';

        this.#traderCode = defaults['traderCode'];
        this.#traderName = defaults['traderName'];

        this.#aliasCode = defaults['aliasCode'];
        this.#aliasDescription = defaults['aliasDescription'];

        this.#glSale = defaults['glSale'];
        this.#glSaleDescr = defaults['glSaleDescr'];

        this.#glPurch = defaults['glPurch'];
        this.#glPurchDescr = defaults['glPurchDescr'];
    };

    get shopName() { return this.#shopName; }
    get shopCode() { return this.#shopCode; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get eposDepartment() { return this.#eposDepartment; }
    get eposSubDepartment() { return this.#eposSubDepartment; }
    get eposDescription() { return this.#eposDescription; }
    get depMapInfo() {
        if (this.depMapConfigId) {
            if (this.#eposSubDepartment) {
                return `[${this.eposDepartment}/${this.eposSubDepartment}] ${this.eposDescription}`;
            } else {
                return `[${this.eposDepartment}] ${this.eposDescription}`;
            }
        } else {
            return 'dep not mapped';
        }
    }

    get eposTaxCode() { return this.#eposTaxCode; }
    get eposTaxRate() { return this.#eposTaxRate; }
    get eposTaxDescription() { return this.#eposDescription; }
    get taxMapInfo() {
        if (this.taxMapConfigId) {
            return `[${this.eposTaxCode}] ${this.#eposTaxDescription} (${this.eposTaxRate} %)`;
        } else {
            return 'tax not mapped';
        }
    }

    get traderCode() { return this.#traderCode; }
    get traderName() { return this.#traderName; }
    get traderInfo() {
        if (this.traderAccountId) {
            return `[${this.#traderCode}] ${this.#traderName}`;
        } else {
            return 'trader not mapped';
        }
    }

    get aliasCode() { return this.#aliasCode; }
    get aliasDescription() { return this.#aliasDescription; }
    get aliasInfo() {
        if (this.aliasId) {
            return `[${this.#aliasCode}] ${this.#aliasDescription}`;
        } else {
            return null;
        }
    }
    // get aliasInfoNull() {
    //     if (this.aliasId) {
    //         return `[${this.#aliasCode}] ${this.#aliasDescription}`;
    //     } else {
    //         return null;
    //     }
    // }

    get glSale() { return this.#glSale; }
    get glSaleDescr() { return this.#glSaleDescr; }
  
    get glPurch() { return this.#glPurch; }
    get glPurchDescr() { return this.#glPurchDescr; }

    get glInfo() {
        var glInfo = '';
        if (this.glSale) { glInfo += `${this.glSale} [${this.glSaleDescr}]`; }
        if (glInfo) { glInfo += '<br />'; }
        if (this.glPurch) { glInfo += `${this.glPurch} [${this.glPurchDescr}]`; }

        if (!glInfo) { return 'not mapped'; }

        return glInfo;
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
    Table: cp_product_Collection,
    Record: cp_product,
}


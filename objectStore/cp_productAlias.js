'use strict'
//
const _persistentTable = require('./persistent/p-cp_productAlias');
const _declarations = require('../cx-client-declarations');
const _schema = require('../cx-client-schema');

//
class cp_productAlias_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cp_productAlias(this, defaults);
    }

    #buildQuery() {
        return `
            select          prod.*,
                            dep.eposDepartment, dep.eposSubDepartment, dep.eposDescription,
                            tax.eposTaxCode, tax.eposTaxRate, tax.eposDescription as eposTaxDescription
                            
            from            ${this.type} prod 
            left outer join cx_map_config_dep dep   ON dep.depMapConfigId = prod.depMapConfigId
            left outer join cx_map_config_tax tax   ON tax.taxMapConfigId = prod.taxMapConfigId
            
            where           1 = 1
        `;
    }

    async select(params) {
        var query = { sql: this.#buildQuery(), params: [] };
        if (params.ic) {
            query.sql += ' and prod.itemCode like @itemCode';
            query.params.push({ name: 'itemCode', value: params.ic + '%' });
        }
        if (params.id) {
            query.sql += ' and prod.itemDescription like @itemDescription';
            query.params.push({ name: 'itemDescription', value: params.id + '%' });
        }
        if (params.ibc) {
            query.sql += ' and prod.itemBarcode like @itemBarcode';
            query.params.push({ name: 'itemBarcode', value: params.ibc + '%' });
        }
        if (params.dep) {
            query.sql += ' and (dep.eposDepartment like @dep OR dep.eposSubDepartment like @dep OR dep.eposDescription like @dep)';
            query.params.push({ name: 'dep', value: '%' + params.dep + '%' });
        }
        query.sql += ' order by prod.itemDescription';
        query.paging = {
            page: params.page || 1,
            pageSize: _declarations.SQL.PAGE_SIZE
        }
        return await super.select(query);
    }

    async fetch(id) {
        var query = { sql: this.#buildQuery(), params: [{ name: 'aliasId', value: id }] };
        query.sql += ` and prod.aliasId = @aliasId`;
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
class cp_productAlias extends _persistentTable.Record {
    #eposDepartment = '';
    #eposSubDepartment = '';
    #eposDescription = '';
    #eposTaxCode = '';
    #eposTaxRate = null;
    #eposTaxDescription = '';
    constructor(table, defaults) {
        super(table, defaults);

        this.#eposDepartment = defaults['eposDepartment'] || '';
        this.#eposSubDepartment = defaults['eposSubDepartment'] || '';
        this.#eposDescription = defaults['eposDescription'] || '';

        this.#eposTaxCode = defaults['eposTaxCode'] || '';
        this.#eposTaxRate = defaults['eposTaxRate'] || null;
        this.#eposTaxDescription = defaults['eposTaxDescription'] || '';

    };

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

    
    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cp_productAlias_Collection,
    Record: cp_productAlias,
}


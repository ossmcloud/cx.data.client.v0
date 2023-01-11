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
        query.sql = `select	*
                    from	cx_map_config_dep
                    where   1 = 1`;

        if (params.mid) {
            query.sql += ' and mapConfigId = @mapConfigId';
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

        query.sql += ' order by eposDepartment, eposSubDepartment';

        if (!params.noPaging) {
            query.paging = {
                page: params.page || 1,
                pageSize: _declarations.SQL.PAGE_SIZE
            }
        }

        await super.select(query);
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
    constructor(table, defaults) {
        super(table, defaults);
    };

    async save() {

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


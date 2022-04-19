'use strict'
//
const _persistentTable = require('./persistent/p-cx_map_config');
//
class cx_map_config_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_map_config(this, defaults);
    }


    async select(params) {
        if (!params) { params = {}; }
        var query = { sql: '', params: [] };
        query.sql = `select	*
                    from	cx_map_config
                    where   1 = 1`;

        if (params.mt) {
            query.sql += ' and mapTypeId = @mapTypeId';
            query.params.push({ name: 'mapTypeId', value: params.mt });
        }
        if (params.mn) {
            query.sql += ' and [name] like @name';
            query.params.push({ name: 'name', value: params.mn + '%' });
        }
        
        query.sql += ' order by mapTypeId, name';
        await super.select(query);
    }

    
}
//
// ----------------------------------------------------------------------------------------
//
class cx_map_config extends _persistentTable.Record {
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
    Table: cx_map_config_Collection,
    Record: cx_map_config,
}


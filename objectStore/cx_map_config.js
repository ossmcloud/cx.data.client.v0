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


    async toLookUpList(type, addEmpty) {
        await this.select({ mt: type })
        
        var dropDownItems = [];
        if (addEmpty) { dropDownItems.push({ vale: '', text: '' }); }
        this.each(function (record) {
            dropDownItems.push({
                value: record.mapConfigId,
                text: '[' + record.mapTypeId + '] ' + record.name,
            });
        });
        return dropDownItems;
    }

    async fetch(id) {
        var query = { sql: '', params: [{ name: this.FieldNames.MAPCONFIGID, value: id }] };
        query.sql = `select  *
                     from    ${this.type}
                     where   ${this.FieldNames.MAPCONFIGID} = @${this.FieldNames.MAPCONFIGID}`;
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


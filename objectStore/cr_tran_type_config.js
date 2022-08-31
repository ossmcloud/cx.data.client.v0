'use strict'
//
const _persistentTable = require('./persistent/p-cr_tran_type_config');
//
class cr_tran_type_config_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_tran_type_config(this, defaults);
    }

    async select(params) {
        if (!params) { params = {}; }
        var query = { sql: '', params: [] };
        query.sql = `select	c.*, ct.code as cbTranType, et.tranName as erpTranType
                    from	cr_tran_type_config c
                    inner join      cx_shop             s   ON c.mapConfigId = s.tranTypeConfigId
                    left outer join cr_cb_tran_type     ct  ON c.cbTranTypeId = ct.cbTranTypeId
                    left outer join sys_erp_tran_type   et  ON c.erpTranTypeId = et.tranTypeId
                    where   1 = 1`;

        if (params.mid) {
            query.sql += ' and mapConfigId = @mapConfigId';
            query.params.push({ name: 'mapConfigId', value: params.mid });
        }

        if (params.s) {
            query.sql += ' and s.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }

        if (params.decla) {
            query.sql += ' and c.requiresDeclaration = @requiresDeclaration';
            query.params.push({ name: 'requiresDeclaration', value: (params.decla == 'T') ? 1 : 0 });
        }

        query.sql += ' order by eposTranType, eposTranSubType';
        await super.select(query);
    }


    async toLookUpList(shopId, tranType) {
        var query = { sql: '', params: [{ name: 'shopId', value: shopId }] };

        var valueFieldName = 'eposTranType';
        var displayFieldName = 'description';
        if (tranType) {
            valueFieldName = 'eposTranSubType';
            query.params.push({ name: 'eposTranType', value: tranType });
            query.sql = `
            select	    cbTranTypeId, eposTranSubType, [description]
            from	    [cr_tran_type_config] tt
            inner join  [cx_shop] s ON tt.mapConfigId = s.tranTypeConfigId
            where	    s.shopId = @shopId
            and		    tt.cbTranTypeId is not null
            and		    tt.eposTranType = @eposTranType
            and		    tt.allowEdit = 1
            group by    cbTranTypeId, eposTranSubType, [description]
            order by    cbTranTypeId, eposTranSubType`;

        } else {
            query.sql = `
            select	        cbTranTypeId, eposTranType, cbHeading
            from	        cr_tran_type_config tt
            inner join      cx_shop s ON tt.mapConfigId = s.tranTypeConfigId
            where	        s.shopId = @shopId
            and		        tt.cbTranTypeId is not null
            and		        tt.allowEdit = 1
            group by        cbTranTypeId, eposTranType, cbHeading
            order by        cbTranTypeId, eposTranType`;
        }

        var lookUpValues = [{ value: '', text: '' }];
        var result = await this.db.exec(query);
        for (var rx = 0; rx < result.rows.length; rx++) {
            var row = result.rows[rx];
            lookUpValues.push({
                value: row[valueFieldName],
                text: `${row[valueFieldName]} (${row.cbHeading || row.description})`,
            })
        }

        return lookUpValues;
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cr_tran_type_config extends _persistentTable.Record {
    #cbTranType = '';
    #erpTranType = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (defaults) {
            this.#cbTranType = defaults['cbTranType'] || '';
            this.#erpTranType = defaults['erpTranType'] || '';
        }
    };

    get cbTranType() { return this.#cbTranType; }
    get erpTranType() { return this.#erpTranType; }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cr_tran_type_config_Collection,
    Record: cr_tran_type_config,
}


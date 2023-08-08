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

        if (params.s) {
            query.sql = `select	c.*, ct.code as cbTranType, 
                            case when ett.tranName is null then et.tranName else et.tranName + ' / ' + ett.tranName end as erpTranType
                    from	cr_tran_type_config c
                    inner join      cx_shop             s   ON c.mapConfigId = s.tranTypeConfigId
                    left outer join cr_cb_tran_type     ct  ON c.cbTranTypeId = ct.cbTranTypeId
                    left outer join sys_erp_tran_type   et  ON c.erpTranTypeId = et.tranTypeId
                    left outer join sys_erp_tran_type   ett  ON c.erp2ndTranTypeId = ett.tranTypeId
                    where   1 = 1`;
        } else {
            query.sql = `select	c.*, ct.code as cbTranType,  
                            case when ett.tranName is null then et.tranName else et.tranName + ' / ' + ett.tranName end as erpTranType
                    from	cr_tran_type_config c
                    left outer join cr_cb_tran_type     ct  ON c.cbTranTypeId = ct.cbTranTypeId
                    left outer join sys_erp_tran_type   et  ON c.erpTranTypeId = et.tranTypeId
                    left outer join sys_erp_tran_type   ett  ON c.erp2ndTranTypeId = ett.tranTypeId
                    where   1 = 1`;
        }

        if (params.mid) {
            query.sql += ' and mapConfigId = @mapConfigId';
            query.params.push({ name: 'mapConfigId', value: params.mid });
        }

        if (params.s) {
            query.sql += ' and s.shopId = @shopId';
            query.params.push({ name: 'shopId', value: params.s });
        }

        if (params.e_tt) {
            query.sql += ' and c.eposTranType like @eposTranType';
            query.params.push({ name: 'eposTranType', value: params.e_tt + '%' });
        }

        if (params.e_st) {
            query.sql += ' and c.eposTranSubType like @eposTranSubType';
            query.params.push({ name: 'eposTranSubType', value: params.e_st + '%' });
        }

        if (params.desc) {
            query.sql += ' and c.description like @description';
            query.params.push({ name: 'description', value: params.desc + '%' });
        }

        if (params.e_cbt) {
            query.sql += ' and c.cbTranTypeId = @cbTranTypeId';
            query.params.push({ name: 'cbTranTypeId', value: params.e_cbt });
        }

        if (params.e_decla) {
            query.sql += ' and c.requiresDeclaration = @requiresDeclaration';
            query.params.push({ name: 'requiresDeclaration', value: params.e_decla });
        }

        if (params.e_erpt) {
            query.sql += ' and c.erpTranTypeId = @erpTranTypeId';
            query.params.push({ name: 'erpTranTypeId', value: params.e_erpt });
        }

        if (params.e_cbh) {
            query.sql += ' and c.cbHeading like @cbHeading';
            query.params.push({ name: 'cbHeading', value: params.e_cbh + '%' });
        }



        // NOTE: these are parameters set by  cashbook-svc processes
        if (params.manual == 'T') { query.sql += ' and c.allowEdit = 1'; }
        if (params.decla) {
            if (params.decla == 'T') {
                query.sql += ' and c.requiresDeclaration > 0';
            } else {
                query.sql += ' and c.requiresDeclaration = 0';
            }
        }

        query.sql += ' order by sortIndex, cbHeading, description';
        await super.select(query);
    }

    async toLookUpList(shopId, addEmpty, allowEditOnly) {
        await this.select({ s: shopId, manual: ((allowEditOnly) ? 'T' : 'F') });
        var lookUpValues = [];
        if (addEmpty) {
            if (addEmpty.constructor.name == 'String') {
                lookUpValues.push({ value: '', text: addEmpty });
            } else {
                lookUpValues.push({ value: '', text: '' });
            }
        };
        super.each(function (rec) {
            lookUpValues.push({
                value: rec.tranTypeConfigId,
                text: `[${rec.eposTranType}/${rec.eposTranSubType}] ${rec.description} (${rec.cbHeading})`
            })
        });
        return lookUpValues;
    }

    async toLookUpListByCfg(mapConfigId, addEmpty, allowEditOnly) {
        await this.select({ mid: mapConfigId, manual: ((allowEditOnly) ? 'T' : 'F') });
        var lookUpValues = [];
        if (addEmpty) {
            if (addEmpty.constructor.name == 'String') {
                lookUpValues.push({ value: '', text: addEmpty });   
            } else {
                lookUpValues.push({ value: '', text: '' });
            }
        };
        super.each(function (rec) {
            lookUpValues.push({
                value: rec.tranTypeConfigId,
                text: `[${rec.eposTranType}/${rec.eposTranSubType}] ${rec.description} (${rec.cbHeading})`
            })
        });
        return lookUpValues;
    }

    async toLookUpListByShop(shopId, tranType) {
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
            and		    (tt.allowEdit = 1 or tt.requiresDeclaration > 1)
            group by    cbTranTypeId, eposTranSubType, [description]
            order by    cbTranTypeId, eposTranSubType`;

        } else {
            query.sql = `
            select	        cbTranTypeId, eposTranType, cbHeading
            from	        cr_tran_type_config tt
            inner join      cx_shop s ON tt.mapConfigId = s.tranTypeConfigId
            where	        s.shopId = @shopId
            and		        tt.cbTranTypeId is not null
            and		        (tt.allowEdit = 1 or tt.requiresDeclaration > 1)
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


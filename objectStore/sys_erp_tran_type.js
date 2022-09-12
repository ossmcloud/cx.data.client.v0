'use strict'
//
const _persistentTable = require('./persistent/p-sys_erp_tran_type');
//
class sys_erp_tran_type_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new sys_erp_tran_type(this, defaults);
    }

    async toLookUpList(erpProvider, addEmpty) {
        // TODO: implement use of erpProvider
        await super.select();

        var lookUpValues = [];
        if (addEmpty) { lookUpValues.push({ value: '', text: '' }); };
        super.each(function (rec) {

            // TODO: currently not fully supported
            if (rec.tranTypeId == 7 || rec.tranTypeId == 8 || rec.tranTypeId == 9 || rec.tranTypeId == 10) {
                return;
            }

            lookUpValues.push({
                value: rec.tranTypeId,
                text: `[${rec.erpProvider} : ${rec.tranCode}] ${rec.tranName}`
            })
        });
        return lookUpValues;
    }

}
//
// ----------------------------------------------------------------------------------------
//
class sys_erp_tran_type extends _persistentTable.Record {
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
    Table: sys_erp_tran_type_Collection,
    Record: sys_erp_tran_type,
}


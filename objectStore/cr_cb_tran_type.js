'use strict'
//
const _persistentTable = require('./persistent/p-cr_cb_tran_type');
//
class cr_cb_tran_type_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cr_cb_tran_type(this, defaults);
    }


    async toLookUpList(addEmpty) {
        await super.select();

        var lookUpValues = [];
        if (addEmpty) { lookUpValues.push({ value: '', text: '' }); };
        super.each(function (rec) {
            lookUpValues.push({
                value: rec.cbTranTypeId,
                text: `${rec.code} (${rec.tillDiffImpact})`
            })
        });
        return lookUpValues;
    }
}
//
// ----------------------------------------------------------------------------------------
//
class cr_cb_tran_type extends _persistentTable.Record {
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
    Table: cr_cb_tran_type_Collection,
    Record: cr_cb_tran_type,
}


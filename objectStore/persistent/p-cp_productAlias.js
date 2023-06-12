'use strict'
//
//*****************************************************************************************
//                                                                                        *
//  IMPORTANT NOTE: THIS FILE IS AUTOMATICALLY CREATED BY [peppo.nodejs.objectBuilder]    *
//                  DO NOT EDIT OR ADD CODE IN ANY WAY AS IT WILL BE OVERWRITTEN WHEN     *
//                  [peppo.nodejs.objectBuilder] REGENERATES THE FILE                     *
//                                                                                        *
//*****************************************************************************************
// 
// CORE SDK REQUIRE
//
const _cx_data = require('cx-data');
// 
// TABLE NAME
//
const _tableName = 'cp_productAlias';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    ALIASID: 'aliasId',
    DEPMAPCONFIGID: 'depMapConfigId',
    TAXMAPCONFIGID: 'taxMapConfigId',
    ITEMCODE: 'itemCode',
    ITEMDESCRIPTION: 'itemDescription',
    ITEMBARCODE: 'itemBarcode',
    ITEMCOSTPRICE: 'itemCostPrice',
    ITEMSIZE: 'itemSize',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    aliasId: { name: 'aliasId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    depMapConfigId: { name: 'depMapConfigId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    taxMapConfigId: { name: 'taxMapConfigId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    itemCode: { name: 'itemCode', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    itemDescription: { name: 'itemDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    itemBarcode: { name: 'itemBarcode', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    itemCostPrice: { name: 'itemCostPrice', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    itemSize: { name: 'itemSize', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_productAlias_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_productAlias extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get aliasId() {
        return super.getValue(_fieldNames.ALIASID);
    }

    get depMapConfigId() {
        return super.getValue(_fieldNames.DEPMAPCONFIGID);
    } set depMapConfigId(val) {
        super.setValue(_fieldNames.DEPMAPCONFIGID, val);
    }

    get taxMapConfigId() {
        return super.getValue(_fieldNames.TAXMAPCONFIGID);
    } set taxMapConfigId(val) {
        super.setValue(_fieldNames.TAXMAPCONFIGID, val);
    }

    get itemCode() {
        return super.getValue(_fieldNames.ITEMCODE);
    } set itemCode(val) {
        super.setValue(_fieldNames.ITEMCODE, val);
    }

    get itemDescription() {
        return super.getValue(_fieldNames.ITEMDESCRIPTION);
    } set itemDescription(val) {
        super.setValue(_fieldNames.ITEMDESCRIPTION, val);
    }

    get itemBarcode() {
        return super.getValue(_fieldNames.ITEMBARCODE);
    } set itemBarcode(val) {
        super.setValue(_fieldNames.ITEMBARCODE, val);
    }

    get itemCostPrice() {
        return super.getValue(_fieldNames.ITEMCOSTPRICE);
    } set itemCostPrice(val) {
        super.setValue(_fieldNames.ITEMCOSTPRICE, val);
    }

    get itemSize() {
        return super.getValue(_fieldNames.ITEMSIZE);
    } set itemSize(val) {
        super.setValue(_fieldNames.ITEMSIZE, val);
    }

    get created() {
        return super.getValue(_fieldNames.CREATED);
    } set created(val) {
        super.setValue(_fieldNames.CREATED, val);
    }

    get createdBy() {
        return super.getValue(_fieldNames.CREATEDBY);
    } set createdBy(val) {
        super.setValue(_fieldNames.CREATEDBY, val);
    }

    get modified() {
        return super.getValue(_fieldNames.MODIFIED);
    } set modified(val) {
        super.setValue(_fieldNames.MODIFIED, val);
    }

    get modifiedBy() {
        return super.getValue(_fieldNames.MODIFIEDBY);
    } set modifiedBy(val) {
        super.setValue(_fieldNames.MODIFIEDBY, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cp_productAlias_Collection,
    Record: Persistent_cp_productAlias,
}
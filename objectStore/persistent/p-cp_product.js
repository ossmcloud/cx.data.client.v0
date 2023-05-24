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
const _tableName = 'cp_product';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    PRODUCTID: 'productId',
    SHOPID: 'shopId',
    SOURCEID: 'sourceId',
    ALIASID: 'aliasId',
    DEPMAPCONFIGID: 'depMapConfigId',
    TAXMAPCONFIGID: 'taxMapConfigId',
    TRADERACCOUNTID: 'traderAccountId',
    ITEMCODE: 'itemCode',
    ITEMDESCRIPTION: 'itemDescription',
    ITEMBARCODE: 'itemBarcode',
    ITEMCOSTPRICE: 'itemCostPrice',
    ITEMSIZE: 'itemSize',
    SUPPLIERCODE: 'supplierCode',
    SUPPLIERITEMCODE: 'supplierItemCode',
    SUPPLIERITEMDESCRIPTION: 'supplierItemDescription',
    RAW_SUPPLIERCODE: 'raw_supplierCode',
    RAW_EPOSCODE: 'raw_eposCode',
    RAW_EPOSDESCRIPTION: 'raw_eposDescription',
    RAW_EPOSBARCODE: 'raw_eposBarcode',
    RAW_EPOSDEPARTMENT: 'raw_eposDepartment',
    RAW_EPOSSUBDEPARTMENT: 'raw_eposSubDepartment',
    RAW_COSTPRICE: 'raw_costPrice',
    RAW_ITEMSIZE: 'raw_itemSize',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    productId: { name: 'productId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    sourceId: { name: 'sourceId', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: false },
    aliasId: { name: 'aliasId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    depMapConfigId: { name: 'depMapConfigId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    taxMapConfigId: { name: 'taxMapConfigId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    traderAccountId: { name: 'traderAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    itemCode: { name: 'itemCode', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    itemDescription: { name: 'itemDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    itemBarcode: { name: 'itemBarcode', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    itemCostPrice: { name: 'itemCostPrice', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    itemSize: { name: 'itemSize', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    supplierCode: { name: 'supplierCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    supplierItemCode: { name: 'supplierItemCode', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    supplierItemDescription: { name: 'supplierItemDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    raw_supplierCode: { name: 'raw_supplierCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    raw_eposCode: { name: 'raw_eposCode', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    raw_eposDescription: { name: 'raw_eposDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    raw_eposBarcode: { name: 'raw_eposBarcode', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    raw_eposDepartment: { name: 'raw_eposDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    raw_eposSubDepartment: { name: 'raw_eposSubDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    raw_costPrice: { name: 'raw_costPrice', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    raw_itemSize: { name: 'raw_itemSize', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_product_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_product extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get productId() {
        return super.getValue(_fieldNames.PRODUCTID);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get sourceId() {
        return super.getValue(_fieldNames.SOURCEID);
    } set sourceId(val) {
        super.setValue(_fieldNames.SOURCEID, val);
    }

    get aliasId() {
        return super.getValue(_fieldNames.ALIASID);
    } set aliasId(val) {
        super.setValue(_fieldNames.ALIASID, val);
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

    get traderAccountId() {
        return super.getValue(_fieldNames.TRADERACCOUNTID);
    } set traderAccountId(val) {
        super.setValue(_fieldNames.TRADERACCOUNTID, val);
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

    get supplierCode() {
        return super.getValue(_fieldNames.SUPPLIERCODE);
    } set supplierCode(val) {
        super.setValue(_fieldNames.SUPPLIERCODE, val);
    }

    get supplierItemCode() {
        return super.getValue(_fieldNames.SUPPLIERITEMCODE);
    } set supplierItemCode(val) {
        super.setValue(_fieldNames.SUPPLIERITEMCODE, val);
    }

    get supplierItemDescription() {
        return super.getValue(_fieldNames.SUPPLIERITEMDESCRIPTION);
    } set supplierItemDescription(val) {
        super.setValue(_fieldNames.SUPPLIERITEMDESCRIPTION, val);
    }

    get raw_supplierCode() {
        return super.getValue(_fieldNames.RAW_SUPPLIERCODE);
    } set raw_supplierCode(val) {
        super.setValue(_fieldNames.RAW_SUPPLIERCODE, val);
    }

    get raw_eposCode() {
        return super.getValue(_fieldNames.RAW_EPOSCODE);
    } set raw_eposCode(val) {
        super.setValue(_fieldNames.RAW_EPOSCODE, val);
    }

    get raw_eposDescription() {
        return super.getValue(_fieldNames.RAW_EPOSDESCRIPTION);
    } set raw_eposDescription(val) {
        super.setValue(_fieldNames.RAW_EPOSDESCRIPTION, val);
    }

    get raw_eposBarcode() {
        return super.getValue(_fieldNames.RAW_EPOSBARCODE);
    } set raw_eposBarcode(val) {
        super.setValue(_fieldNames.RAW_EPOSBARCODE, val);
    }

    get raw_eposDepartment() {
        return super.getValue(_fieldNames.RAW_EPOSDEPARTMENT);
    } set raw_eposDepartment(val) {
        super.setValue(_fieldNames.RAW_EPOSDEPARTMENT, val);
    }

    get raw_eposSubDepartment() {
        return super.getValue(_fieldNames.RAW_EPOSSUBDEPARTMENT);
    } set raw_eposSubDepartment(val) {
        super.setValue(_fieldNames.RAW_EPOSSUBDEPARTMENT, val);
    }

    get raw_costPrice() {
        return super.getValue(_fieldNames.RAW_COSTPRICE);
    } set raw_costPrice(val) {
        super.setValue(_fieldNames.RAW_COSTPRICE, val);
    }

    get raw_itemSize() {
        return super.getValue(_fieldNames.RAW_ITEMSIZE);
    } set raw_itemSize(val) {
        super.setValue(_fieldNames.RAW_ITEMSIZE, val);
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
    Table: Persistent_cp_product_Collection,
    Record: Persistent_cp_product,
}
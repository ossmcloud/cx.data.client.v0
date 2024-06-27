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
const _tableName = 'raw_cp_product';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RAWPRODUCTID: 'rawProductId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    SUPPLIERCODE: 'supplierCode',
    EPOSCODE: 'eposCode',
    EPOSDESCRIPTION: 'eposDescription',
    EPOSBARCODE: 'eposBarcode',
    EPOSDEPARTMENT: 'eposDepartment',
    EPOSSUBDEPARTMENT: 'eposSubDepartment',
    COSTPRICE: 'costPrice',
    ITEMSIZE: 'itemSize',
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    rawProductId: { name: 'rawProductId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    supplierCode: { name: 'supplierCode', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    eposCode: { name: 'eposCode', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    eposDescription: { name: 'eposDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    eposBarcode: { name: 'eposBarcode', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    eposDepartment: { name: 'eposDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 32, null: true },
    eposSubDepartment: { name: 'eposSubDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    costPrice: { name: 'costPrice', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    itemSize: { name: 'itemSize', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_cp_product_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_cp_product extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get rawProductId() {
        return super.getValue(_fieldNames.RAWPRODUCTID);
    }

    get transmissionID() {
        return super.getValue(_fieldNames.TRANSMISSIONID);
    } set transmissionID(val) {
        super.setValue(_fieldNames.TRANSMISSIONID, val);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get supplierCode() {
        return super.getValue(_fieldNames.SUPPLIERCODE);
    } set supplierCode(val) {
        super.setValue(_fieldNames.SUPPLIERCODE, val);
    }

    get eposCode() {
        return super.getValue(_fieldNames.EPOSCODE);
    } set eposCode(val) {
        super.setValue(_fieldNames.EPOSCODE, val);
    }

    get eposDescription() {
        return super.getValue(_fieldNames.EPOSDESCRIPTION);
    } set eposDescription(val) {
        super.setValue(_fieldNames.EPOSDESCRIPTION, val);
    }

    get eposBarcode() {
        return super.getValue(_fieldNames.EPOSBARCODE);
    } set eposBarcode(val) {
        super.setValue(_fieldNames.EPOSBARCODE, val);
    }

    get eposDepartment() {
        return super.getValue(_fieldNames.EPOSDEPARTMENT);
    } set eposDepartment(val) {
        super.setValue(_fieldNames.EPOSDEPARTMENT, val);
    }

    get eposSubDepartment() {
        return super.getValue(_fieldNames.EPOSSUBDEPARTMENT);
    } set eposSubDepartment(val) {
        super.setValue(_fieldNames.EPOSSUBDEPARTMENT, val);
    }

    get costPrice() {
        return super.getValue(_fieldNames.COSTPRICE);
    } set costPrice(val) {
        super.setValue(_fieldNames.COSTPRICE, val);
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


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_raw_cp_product_Collection,
    Record: Persistent_raw_cp_product,
}
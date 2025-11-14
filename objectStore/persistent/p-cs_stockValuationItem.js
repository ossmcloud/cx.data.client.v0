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
const _tableName = 'cs_stockValuationItem';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    STOCKVALUATIONITEMID: 'stockValuationItemId',
    STOCKVALUATIONID: 'stockValuationId',
    EPOSCODE: 'eposCode',
    EPOSDESCRIPTION: 'eposDescription',
    EPOSBARCODE: 'eposBarcode',
    EPOSDEPARTMENT: 'eposDepartment',
    EPOSDEPARTMENTDESCR: 'eposDepartmentDescr',
    EPOSSUBDEPARTMENT: 'eposSubDepartment',
    EPOSSUBDEPARTMENTDESCR: 'eposSubDepartmentDescr',
    OUTERCOST: 'outerCost',
    UNITSINOUTER: 'unitsInOuter',
    UNITSINSTOCK: 'unitsInStock',
    OUTERSINSTOCK: 'outersInStock',
    UNITSSOLD: 'unitsSold',
    UNITSDELIVERED: 'unitsDelivered',
    UNITSRETURNED: 'unitsReturned',
    UNITSADJUSTED: 'unitsAdjusted',
    UNITSWASTED: 'unitsWasted',
    COSTVALUE: 'costValue',
    RETAILVALUE: 'retailValue',
    RETAILPRICE: 'retailPrice',
    PRODUCTID: 'productId',
    DEPMAPCONFIGID: 'depMapConfigId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    stockValuationItemId: { name: 'stockValuationItemId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    stockValuationId: { name: 'stockValuationId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    eposCode: { name: 'eposCode', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    eposDescription: { name: 'eposDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    eposBarcode: { name: 'eposBarcode', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    eposDepartment: { name: 'eposDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    eposDepartmentDescr: { name: 'eposDepartmentDescr', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    eposSubDepartment: { name: 'eposSubDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    eposSubDepartmentDescr: { name: 'eposSubDepartmentDescr', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    outerCost: { name: 'outerCost', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    unitsInOuter: { name: 'unitsInOuter', dataType: 'float', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsInStock: { name: 'unitsInStock', dataType: 'float', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    outersInStock: { name: 'outersInStock', dataType: 'float', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsSold: { name: 'unitsSold', dataType: 'float', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsDelivered: { name: 'unitsDelivered', dataType: 'float', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsReturned: { name: 'unitsReturned', dataType: 'float', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsAdjusted: { name: 'unitsAdjusted', dataType: 'float', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsWasted: { name: 'unitsWasted', dataType: 'float', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    costValue: { name: 'costValue', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    retailValue: { name: 'retailValue', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    retailPrice: { name: 'retailPrice', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    productId: { name: 'productId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    depMapConfigId: { name: 'depMapConfigId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cs_stockValuationItem_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cs_stockValuationItem extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get stockValuationItemId() {
        return super.getValue(_fieldNames.STOCKVALUATIONITEMID);
    }

    get stockValuationId() {
        return super.getValue(_fieldNames.STOCKVALUATIONID);
    } set stockValuationId(val) {
        super.setValue(_fieldNames.STOCKVALUATIONID, val);
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

    get eposDepartmentDescr() {
        return super.getValue(_fieldNames.EPOSDEPARTMENTDESCR);
    } set eposDepartmentDescr(val) {
        super.setValue(_fieldNames.EPOSDEPARTMENTDESCR, val);
    }

    get eposSubDepartment() {
        return super.getValue(_fieldNames.EPOSSUBDEPARTMENT);
    } set eposSubDepartment(val) {
        super.setValue(_fieldNames.EPOSSUBDEPARTMENT, val);
    }

    get eposSubDepartmentDescr() {
        return super.getValue(_fieldNames.EPOSSUBDEPARTMENTDESCR);
    } set eposSubDepartmentDescr(val) {
        super.setValue(_fieldNames.EPOSSUBDEPARTMENTDESCR, val);
    }

    get outerCost() {
        return super.getValue(_fieldNames.OUTERCOST);
    } set outerCost(val) {
        super.setValue(_fieldNames.OUTERCOST, val);
    }

    get unitsInOuter() {
        return super.getValue(_fieldNames.UNITSINOUTER);
    } set unitsInOuter(val) {
        super.setValue(_fieldNames.UNITSINOUTER, val);
    }

    get unitsInStock() {
        return super.getValue(_fieldNames.UNITSINSTOCK);
    } set unitsInStock(val) {
        super.setValue(_fieldNames.UNITSINSTOCK, val);
    }

    get outersInStock() {
        return super.getValue(_fieldNames.OUTERSINSTOCK);
    } set outersInStock(val) {
        super.setValue(_fieldNames.OUTERSINSTOCK, val);
    }

    get unitsSold() {
        return super.getValue(_fieldNames.UNITSSOLD);
    } set unitsSold(val) {
        super.setValue(_fieldNames.UNITSSOLD, val);
    }

    get unitsDelivered() {
        return super.getValue(_fieldNames.UNITSDELIVERED);
    } set unitsDelivered(val) {
        super.setValue(_fieldNames.UNITSDELIVERED, val);
    }

    get unitsReturned() {
        return super.getValue(_fieldNames.UNITSRETURNED);
    } set unitsReturned(val) {
        super.setValue(_fieldNames.UNITSRETURNED, val);
    }

    get unitsAdjusted() {
        return super.getValue(_fieldNames.UNITSADJUSTED);
    } set unitsAdjusted(val) {
        super.setValue(_fieldNames.UNITSADJUSTED, val);
    }

    get unitsWasted() {
        return super.getValue(_fieldNames.UNITSWASTED);
    } set unitsWasted(val) {
        super.setValue(_fieldNames.UNITSWASTED, val);
    }

    get costValue() {
        return super.getValue(_fieldNames.COSTVALUE);
    } set costValue(val) {
        super.setValue(_fieldNames.COSTVALUE, val);
    }

    get retailValue() {
        return super.getValue(_fieldNames.RETAILVALUE);
    } set retailValue(val) {
        super.setValue(_fieldNames.RETAILVALUE, val);
    }

    get retailPrice() {
        return super.getValue(_fieldNames.RETAILPRICE);
    } set retailPrice(val) {
        super.setValue(_fieldNames.RETAILPRICE, val);
    }

    get productId() {
        return super.getValue(_fieldNames.PRODUCTID);
    } set productId(val) {
        super.setValue(_fieldNames.PRODUCTID, val);
    }

    get depMapConfigId() {
        return super.getValue(_fieldNames.DEPMAPCONFIGID);
    } set depMapConfigId(val) {
        super.setValue(_fieldNames.DEPMAPCONFIGID, val);
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
    Table: Persistent_cs_stockValuationItem_Collection,
    Record: Persistent_cs_stockValuationItem,
}
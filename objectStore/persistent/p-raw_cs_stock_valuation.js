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
const _tableName = 'raw_cs_stock_valuation';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RAWSTOCKVALUATIONID: 'rawStockValuationId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    DATE: 'date',
    REFERENCE: 'reference',
    NOTES: 'notes',
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
    CREATED: 'created',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    rawStockValuationId: { name: 'rawStockValuationId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    date: { name: 'date', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    reference: { name: 'reference', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    notes: { name: 'notes', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    eposCode: { name: 'eposCode', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    eposDescription: { name: 'eposDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    eposBarcode: { name: 'eposBarcode', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    eposDepartment: { name: 'eposDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    eposDepartmentDescr: { name: 'eposDepartmentDescr', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    eposSubDepartment: { name: 'eposSubDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    eposSubDepartmentDescr: { name: 'eposSubDepartmentDescr', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    outerCost: { name: 'outerCost', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    unitsInOuter: { name: 'unitsInOuter', dataType: '108', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsInStock: { name: 'unitsInStock', dataType: '108', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    outersInStock: { name: 'outersInStock', dataType: '108', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsSold: { name: 'unitsSold', dataType: '108', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsDelivered: { name: 'unitsDelivered', dataType: '108', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsReturned: { name: 'unitsReturned', dataType: '108', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsAdjusted: { name: 'unitsAdjusted', dataType: '108', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    unitsWasted: { name: 'unitsWasted', dataType: '108', pk: false, identity: false, maxLength: 5, null: false, default: '0' },
    costValue: { name: 'costValue', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    retailValue: { name: 'retailValue', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    retailPrice: { name: 'retailPrice', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_cs_stock_valuation_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_cs_stock_valuation extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get rawStockValuationId() {
        return super.getValue(_fieldNames.RAWSTOCKVALUATIONID);
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

    get date() {
        return super.getValue(_fieldNames.DATE);
    } set date(val) {
        super.setValue(_fieldNames.DATE, val);
    }

    get reference() {
        return super.getValue(_fieldNames.REFERENCE);
    } set reference(val) {
        super.setValue(_fieldNames.REFERENCE, val);
    }

    get notes() {
        return super.getValue(_fieldNames.NOTES);
    } set notes(val) {
        super.setValue(_fieldNames.NOTES, val);
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
    Table: Persistent_raw_cs_stock_valuation_Collection,
    Record: Persistent_raw_cs_stock_valuation,
}
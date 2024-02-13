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
const _tableName = 'raw_cp_delivery_line';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RAWDELIVERYLINEID: 'rawDeliveryLineId',
    TRANSMISSIONID: 'transmissionID',
    SHOPID: 'shopId',
    DOCUMENTID: 'documentId',
    LINENUMBER: 'lineNumber',
    EPOSCODE: 'eposCode',
    EPOSBARCODE: 'eposBarcode',
    EPOSDESCRIPTION: 'eposDescription',
    EPOSDEPARTMENT: 'eposDepartment',
    EPOSSUBDEPARTMENT: 'eposSubDepartment',
    LINEQUANTITY: 'lineQuantity',
    UNITCOST: 'unitCost',
    PACKSIZE: 'packSize',
    VATRATE: 'vatRate',
    VATCODE: 'vatCode',
    EPOSLINEDISCOUNT: 'eposLineDiscount',
    EPOSLINENET: 'eposLineNet',
    EPOSLINEVAT: 'eposLineVat',
    EPOSLINEGROSS: 'eposLineGross',
    SYSINFO: 'sysInfo',
    CREATED: 'created',
    LINEDRSUNITCHARGE: 'lineDRSUnitCharge',
    LINEDRSQUANTITY: 'lineDRSQuantity',
    LINEDRSAMOUNT: 'lineDRSAmount',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    rawDeliveryLineId: { name: 'rawDeliveryLineId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    transmissionID: { name: 'transmissionID', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    documentId: { name: 'documentId', dataType: 'varchar', pk: false, identity: false, maxLength: 200, null: false },
    lineNumber: { name: 'lineNumber', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    eposCode: { name: 'eposCode', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    eposBarcode: { name: 'eposBarcode', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false },
    eposDescription: { name: 'eposDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    eposDepartment: { name: 'eposDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    eposSubDepartment: { name: 'eposSubDepartment', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    lineQuantity: { name: 'lineQuantity', dataType: 'money', pk: false, identity: false, maxLength: 9, null: true },
    unitCost: { name: 'unitCost', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    packSize: { name: 'packSize', dataType: 'money', pk: false, identity: false, maxLength: 9, null: true },
    vatRate: { name: 'vatRate', dataType: 'money', pk: false, identity: false, maxLength: 5, null: true },
    vatCode: { name: 'vatCode', dataType: 'varchar', pk: false, identity: false, maxLength: 10, null: true },
    eposLineDiscount: { name: 'eposLineDiscount', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    eposLineNet: { name: 'eposLineNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    eposLineVat: { name: 'eposLineVat', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    eposLineGross: { name: 'eposLineGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    sysInfo: { name: 'sysInfo', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    lineDRSUnitCharge: { name: 'lineDRSUnitCharge', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    lineDRSQuantity: { name: 'lineDRSQuantity', dataType: 'money', pk: false, identity: false, maxLength: 9, null: true },
    lineDRSAmount: { name: 'lineDRSAmount', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_raw_cp_delivery_line_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_raw_cp_delivery_line extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get rawDeliveryLineId() {
        return super.getValue(_fieldNames.RAWDELIVERYLINEID);
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

    get documentId() {
        return super.getValue(_fieldNames.DOCUMENTID);
    } set documentId(val) {
        super.setValue(_fieldNames.DOCUMENTID, val);
    }

    get lineNumber() {
        return super.getValue(_fieldNames.LINENUMBER);
    } set lineNumber(val) {
        super.setValue(_fieldNames.LINENUMBER, val);
    }

    get eposCode() {
        return super.getValue(_fieldNames.EPOSCODE);
    } set eposCode(val) {
        super.setValue(_fieldNames.EPOSCODE, val);
    }

    get eposBarcode() {
        return super.getValue(_fieldNames.EPOSBARCODE);
    } set eposBarcode(val) {
        super.setValue(_fieldNames.EPOSBARCODE, val);
    }

    get eposDescription() {
        return super.getValue(_fieldNames.EPOSDESCRIPTION);
    } set eposDescription(val) {
        super.setValue(_fieldNames.EPOSDESCRIPTION, val);
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

    get lineQuantity() {
        return super.getValue(_fieldNames.LINEQUANTITY);
    } set lineQuantity(val) {
        super.setValue(_fieldNames.LINEQUANTITY, val);
    }

    get unitCost() {
        return super.getValue(_fieldNames.UNITCOST);
    } set unitCost(val) {
        super.setValue(_fieldNames.UNITCOST, val);
    }

    get packSize() {
        return super.getValue(_fieldNames.PACKSIZE);
    } set packSize(val) {
        super.setValue(_fieldNames.PACKSIZE, val);
    }

    get vatRate() {
        return super.getValue(_fieldNames.VATRATE);
    } set vatRate(val) {
        super.setValue(_fieldNames.VATRATE, val);
    }

    get vatCode() {
        return super.getValue(_fieldNames.VATCODE);
    } set vatCode(val) {
        super.setValue(_fieldNames.VATCODE, val);
    }

    get eposLineDiscount() {
        return super.getValue(_fieldNames.EPOSLINEDISCOUNT);
    } set eposLineDiscount(val) {
        super.setValue(_fieldNames.EPOSLINEDISCOUNT, val);
    }

    get eposLineNet() {
        return super.getValue(_fieldNames.EPOSLINENET);
    } set eposLineNet(val) {
        super.setValue(_fieldNames.EPOSLINENET, val);
    }

    get eposLineVat() {
        return super.getValue(_fieldNames.EPOSLINEVAT);
    } set eposLineVat(val) {
        super.setValue(_fieldNames.EPOSLINEVAT, val);
    }

    get eposLineGross() {
        return super.getValue(_fieldNames.EPOSLINEGROSS);
    } set eposLineGross(val) {
        super.setValue(_fieldNames.EPOSLINEGROSS, val);
    }

    get sysInfo() {
        return super.getValue(_fieldNames.SYSINFO);
    } set sysInfo(val) {
        super.setValue(_fieldNames.SYSINFO, val);
    }

    get created() {
        return super.getValue(_fieldNames.CREATED);
    } set created(val) {
        super.setValue(_fieldNames.CREATED, val);
    }

    get lineDRSUnitCharge() {
        return super.getValue(_fieldNames.LINEDRSUNITCHARGE);
    } set lineDRSUnitCharge(val) {
        super.setValue(_fieldNames.LINEDRSUNITCHARGE, val);
    }

    get lineDRSQuantity() {
        return super.getValue(_fieldNames.LINEDRSQUANTITY);
    } set lineDRSQuantity(val) {
        super.setValue(_fieldNames.LINEDRSQUANTITY, val);
    }

    get lineDRSAmount() {
        return super.getValue(_fieldNames.LINEDRSAMOUNT);
    } set lineDRSAmount(val) {
        super.setValue(_fieldNames.LINEDRSAMOUNT, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_raw_cp_delivery_line_Collection,
    Record: Persistent_raw_cp_delivery_line,
}
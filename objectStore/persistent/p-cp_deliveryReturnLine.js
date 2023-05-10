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
const _tableName = 'cp_deliveryReturnLine';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    DELRETLINEID: 'delRetLineId',
    DELRETID: 'delRetId',
    DOCUMENTID: 'documentId',
    LINESTATUS: 'lineStatus',
    LINESTATUSMESSAGE: 'lineStatusMessage',
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
    LINENET: 'lineNet',
    LINEVAT: 'lineVat',
    LINEGROSS: 'lineGross',
    SYSINFO: 'sysInfo',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    DEPMAPCONFIGID: 'depMapConfigId',
    TAXMAPCONFIGID: 'taxMapConfigId',
    ISUSEREDITED: 'isUserEdited',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    delRetLineId: { name: 'delRetLineId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    delRetId: { name: 'delRetId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    documentId: { name: 'documentId', dataType: 'varchar', pk: false, identity: false, maxLength: 200, null: false },
    lineStatus: { name: 'lineStatus', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    lineStatusMessage: { name: 'lineStatusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
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
    lineNet: { name: 'lineNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    lineVat: { name: 'lineVat', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    lineGross: { name: 'lineGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    sysInfo: { name: 'sysInfo', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    depMapConfigId: { name: 'depMapConfigId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    taxMapConfigId: { name: 'taxMapConfigId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    isUserEdited: { name: 'isUserEdited', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_deliveryReturnLine_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_deliveryReturnLine extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get delRetLineId() {
        return super.getValue(_fieldNames.DELRETLINEID);
    }

    get delRetId() {
        return super.getValue(_fieldNames.DELRETID);
    } set delRetId(val) {
        super.setValue(_fieldNames.DELRETID, val);
    }

    get documentId() {
        return super.getValue(_fieldNames.DOCUMENTID);
    } set documentId(val) {
        super.setValue(_fieldNames.DOCUMENTID, val);
    }

    get lineStatus() {
        return super.getValue(_fieldNames.LINESTATUS);
    } set lineStatus(val) {
        super.setValue(_fieldNames.LINESTATUS, val);
    }

    get lineStatusMessage() {
        return super.getValue(_fieldNames.LINESTATUSMESSAGE);
    } set lineStatusMessage(val) {
        super.setValue(_fieldNames.LINESTATUSMESSAGE, val);
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

    get lineNet() {
        return super.getValue(_fieldNames.LINENET);
    } set lineNet(val) {
        super.setValue(_fieldNames.LINENET, val);
    }

    get lineVat() {
        return super.getValue(_fieldNames.LINEVAT);
    } set lineVat(val) {
        super.setValue(_fieldNames.LINEVAT, val);
    }

    get lineGross() {
        return super.getValue(_fieldNames.LINEGROSS);
    } set lineGross(val) {
        super.setValue(_fieldNames.LINEGROSS, val);
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

    get isUserEdited() {
        return super.getValue(_fieldNames.ISUSEREDITED);
    } set isUserEdited(val) {
        super.setValue(_fieldNames.ISUSEREDITED, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cp_deliveryReturnLine_Collection,
    Record: Persistent_cp_deliveryReturnLine,
}
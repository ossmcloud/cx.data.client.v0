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
const _tableName = 'cp_erp_transaction_tax';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TAXTRANID: 'taxTranId',
    ERPTRANID: 'erpTranId',
    TAXACCOUNT: 'taxAccount',
    TAXRATE: 'taxRate',
    TAXDESCRIPTION: 'taxDescription',
    VALUENET: 'valueNet',
    VALUETAX: 'valueTax',
    VALUEGROSS: 'valueGross',
    NARRATIVE: 'narrative',
    STATUS: 'status',
    STATUSMESSAGE: 'statusMessage',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    taxTranId: { name: 'taxTranId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    erpTranId: { name: 'erpTranId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    taxAccount: { name: 'taxAccount', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    taxRate: { name: 'taxRate', dataType: 'money', pk: false, identity: false, maxLength: 5, null: true },
    taxDescription: { name: 'taxDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    valueNet: { name: 'valueNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    valueTax: { name: 'valueTax', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    valueGross: { name: 'valueGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    narrative: { name: 'narrative', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },
    status: { name: 'status', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    statusMessage: { name: 'statusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_erp_transaction_tax_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_erp_transaction_tax extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get taxTranId() {
        return super.getValue(_fieldNames.TAXTRANID);
    }

    get erpTranId() {
        return super.getValue(_fieldNames.ERPTRANID);
    } set erpTranId(val) {
        super.setValue(_fieldNames.ERPTRANID, val);
    }

    get taxAccount() {
        return super.getValue(_fieldNames.TAXACCOUNT);
    } set taxAccount(val) {
        super.setValue(_fieldNames.TAXACCOUNT, val);
    }

    get taxRate() {
        return super.getValue(_fieldNames.TAXRATE);
    } set taxRate(val) {
        super.setValue(_fieldNames.TAXRATE, val);
    }

    get taxDescription() {
        return super.getValue(_fieldNames.TAXDESCRIPTION);
    } set taxDescription(val) {
        super.setValue(_fieldNames.TAXDESCRIPTION, val);
    }

    get valueNet() {
        return super.getValue(_fieldNames.VALUENET);
    } set valueNet(val) {
        super.setValue(_fieldNames.VALUENET, val);
    }

    get valueTax() {
        return super.getValue(_fieldNames.VALUETAX);
    } set valueTax(val) {
        super.setValue(_fieldNames.VALUETAX, val);
    }

    get valueGross() {
        return super.getValue(_fieldNames.VALUEGROSS);
    } set valueGross(val) {
        super.setValue(_fieldNames.VALUEGROSS, val);
    }

    get narrative() {
        return super.getValue(_fieldNames.NARRATIVE);
    } set narrative(val) {
        super.setValue(_fieldNames.NARRATIVE, val);
    }

    get status() {
        return super.getValue(_fieldNames.STATUS);
    } set status(val) {
        super.setValue(_fieldNames.STATUS, val);
    }

    get statusMessage() {
        return super.getValue(_fieldNames.STATUSMESSAGE);
    } set statusMessage(val) {
        super.setValue(_fieldNames.STATUSMESSAGE, val);
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
    Table: Persistent_cp_erp_transaction_tax_Collection,
    Record: Persistent_cp_erp_transaction_tax,
}
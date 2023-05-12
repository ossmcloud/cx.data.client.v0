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
const _tableName = 'cr_cb_transaction';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    CBTRANID: 'cbTranId',
    SHOPID: 'shopId',
    DATE: 'date',
    STATUS: 'status',
    STATUSMESSAGE: 'statusMessage',
    TOTALSALES: 'totalSales',
    TOTALLODGEMENT: 'totalLodgement',
    TILLDIFFERENCE: 'tillDifference',
    TOTALACCOUNTSALES: 'totalAccountSales',
    TOTALACCOUNTLODGEMENT: 'totalAccountLodgement',
    TRANSMISSIONID: 'transmissionId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    ERPTRANSMISSIONID: 'erpTransmissionId',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    cbTranId: { name: 'cbTranId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    date: { name: 'date', dataType: 'date', pk: false, identity: false, maxLength: 3, null: false },
    status: { name: 'status', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false, default: '0' },
    statusMessage: { name: 'statusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    totalSales: { name: 'totalSales', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    totalLodgement: { name: 'totalLodgement', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    tillDifference: { name: 'tillDifference', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    totalAccountSales: { name: 'totalAccountSales', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    totalAccountLodgement: { name: 'totalAccountLodgement', dataType: 'money', pk: false, identity: false, maxLength: 8, null: true },
    transmissionId: { name: 'transmissionId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpTransmissionId: { name: 'erpTransmissionId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cr_cb_transaction_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cr_cb_transaction extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get cbTranId() {
        return super.getValue(_fieldNames.CBTRANID);
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

    get totalSales() {
        return super.getValue(_fieldNames.TOTALSALES);
    } set totalSales(val) {
        super.setValue(_fieldNames.TOTALSALES, val);
    }

    get totalLodgement() {
        return super.getValue(_fieldNames.TOTALLODGEMENT);
    } set totalLodgement(val) {
        super.setValue(_fieldNames.TOTALLODGEMENT, val);
    }

    get tillDifference() {
        return super.getValue(_fieldNames.TILLDIFFERENCE);
    } set tillDifference(val) {
        super.setValue(_fieldNames.TILLDIFFERENCE, val);
    }

    get totalAccountSales() {
        return super.getValue(_fieldNames.TOTALACCOUNTSALES);
    } set totalAccountSales(val) {
        super.setValue(_fieldNames.TOTALACCOUNTSALES, val);
    }

    get totalAccountLodgement() {
        return super.getValue(_fieldNames.TOTALACCOUNTLODGEMENT);
    } set totalAccountLodgement(val) {
        super.setValue(_fieldNames.TOTALACCOUNTLODGEMENT, val);
    }

    get transmissionId() {
        return super.getValue(_fieldNames.TRANSMISSIONID);
    } set transmissionId(val) {
        super.setValue(_fieldNames.TRANSMISSIONID, val);
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

    get erpTransmissionId() {
        return super.getValue(_fieldNames.ERPTRANSMISSIONID);
    } set erpTransmissionId(val) {
        super.setValue(_fieldNames.ERPTRANSMISSIONID, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cr_cb_transaction_Collection,
    Record: Persistent_cr_cb_transaction,
}
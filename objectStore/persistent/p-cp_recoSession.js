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
const _tableName = 'cp_recoSession';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    RECOSESSIONID: 'recoSessionId',
    SHOPID: 'shopId',
    RECOSOURCEID: 'recoSourceId',
    RECOSTATUSID: 'recoStatusId',
    RECOSTATUSMESSAGE: 'recoStatusMessage',
    RECOSCORE: 'recoScore',
    BALANCENET: 'balanceNet',
    BALANCEVAT: 'balanceVat',
    BALANCEGROSS: 'balanceGross',
    MATCHEDBYUSER: 'matchedByUser',
    NOTES: 'notes',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',
    MATCHEDALONE: 'matchedAlone',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    recoSessionId: { name: 'recoSessionId', dataType: 'bigint', pk: true, identity: true, maxLength: 8, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: false },
    recoSourceId: { name: 'recoSourceId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    recoStatusId: { name: 'recoStatusId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    recoStatusMessage: { name: 'recoStatusMessage', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    recoScore: { name: 'recoScore', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    balanceNet: { name: 'balanceNet', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    balanceVat: { name: 'balanceVat', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    balanceGross: { name: 'balanceGross', dataType: 'money', pk: false, identity: false, maxLength: 8, null: false },
    matchedByUser: { name: 'matchedByUser', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    notes: { name: 'notes', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    matchedAlone: { name: 'matchedAlone', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cp_recoSession_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cp_recoSession extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get recoSessionId() {
        return super.getValue(_fieldNames.RECOSESSIONID);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get recoSourceId() {
        return super.getValue(_fieldNames.RECOSOURCEID);
    } set recoSourceId(val) {
        super.setValue(_fieldNames.RECOSOURCEID, val);
    }

    get recoStatusId() {
        return super.getValue(_fieldNames.RECOSTATUSID);
    } set recoStatusId(val) {
        super.setValue(_fieldNames.RECOSTATUSID, val);
    }

    get recoStatusMessage() {
        return super.getValue(_fieldNames.RECOSTATUSMESSAGE);
    } set recoStatusMessage(val) {
        super.setValue(_fieldNames.RECOSTATUSMESSAGE, val);
    }

    get recoScore() {
        return super.getValue(_fieldNames.RECOSCORE);
    } set recoScore(val) {
        super.setValue(_fieldNames.RECOSCORE, val);
    }

    get balanceNet() {
        return super.getValue(_fieldNames.BALANCENET);
    } set balanceNet(val) {
        super.setValue(_fieldNames.BALANCENET, val);
    }

    get balanceVat() {
        return super.getValue(_fieldNames.BALANCEVAT);
    } set balanceVat(val) {
        super.setValue(_fieldNames.BALANCEVAT, val);
    }

    get balanceGross() {
        return super.getValue(_fieldNames.BALANCEGROSS);
    } set balanceGross(val) {
        super.setValue(_fieldNames.BALANCEGROSS, val);
    }

    get matchedByUser() {
        return super.getValue(_fieldNames.MATCHEDBYUSER);
    } set matchedByUser(val) {
        super.setValue(_fieldNames.MATCHEDBYUSER, val);
    }

    get notes() {
        return super.getValue(_fieldNames.NOTES);
    } set notes(val) {
        super.setValue(_fieldNames.NOTES, val);
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

    get matchedAlone() {
        return super.getValue(_fieldNames.MATCHEDALONE);
    } set matchedAlone(val) {
        super.setValue(_fieldNames.MATCHEDALONE, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cp_recoSession_Collection,
    Record: Persistent_cp_recoSession,
}
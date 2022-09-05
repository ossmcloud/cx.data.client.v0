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
const _tableName = 'cr_tran_type_config';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TRANTYPECONFIGID: 'tranTypeConfigId',
    MAPCONFIGID: 'mapConfigId',
    EPOSTRANTYPE: 'eposTranType',
    EPOSTRANSUBTYPE: 'eposTranSubType',
    CBTRANTYPEID: 'cbTranTypeId',
    ERPTRANTYPEID: 'erpTranTypeId',
    DESCRIPTION: 'description',
    CBHEADING: 'cbHeading',
    ALLOWNEW: 'allowNew',
    ALLOWEDIT: 'allowEdit',
    ALLOWDELETE: 'allowDelete',
    REQUIRESDECLARATION: 'requiresDeclaration',
    INVERTSIGN: 'invertSign',
    IGNORE: 'ignore',
    DUPLICATEAS: 'duplicateAs',
    TRADERACCOUNT: 'traderAccount',
    ERPGLACCOUNTID: 'erpGLAccountId',
    ERPCBACCOUNTID: 'erpCBAccountId',
    ERPTAXACCOUNTID: 'erpTaxAccountId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    tranTypeConfigId: { name: 'tranTypeConfigId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    mapConfigId: { name: 'mapConfigId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    eposTranType: { name: 'eposTranType', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    eposTranSubType: { name: 'eposTranSubType', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    cbTranTypeId: { name: 'cbTranTypeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    erpTranTypeId: { name: 'erpTranTypeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    description: { name: 'description', dataType: 'varchar', pk: false, identity: false, maxLength: 50, null: false },
    cbHeading: { name: 'cbHeading', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: true },
    allowNew: { name: 'allowNew', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    allowEdit: { name: 'allowEdit', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    allowDelete: { name: 'allowDelete', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    requiresDeclaration: { name: 'requiresDeclaration', dataType: 'int', pk: false, identity: false, maxLength: 1, null: true },
    invertSign: { name: 'invertSign', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    ignore: { name: 'ignore', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    duplicateAs: { name: 'duplicateAs', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    traderAccount: { name: 'traderAccount', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpGLAccountId: { name: 'erpGLAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpCBAccountId: { name: 'erpCBAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpTaxAccountId: { name: 'erpTaxAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cr_tran_type_config_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cr_tran_type_config extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get tranTypeConfigId() {
        return super.getValue(_fieldNames.TRANTYPECONFIGID);
    }

    get mapConfigId() {
        return super.getValue(_fieldNames.MAPCONFIGID);
    } set mapConfigId(val) {
        super.setValue(_fieldNames.MAPCONFIGID, val);
    }

    get eposTranType() {
        return super.getValue(_fieldNames.EPOSTRANTYPE);
    } set eposTranType(val) {
        super.setValue(_fieldNames.EPOSTRANTYPE, val);
    }

    get eposTranSubType() {
        return super.getValue(_fieldNames.EPOSTRANSUBTYPE);
    } set eposTranSubType(val) {
        super.setValue(_fieldNames.EPOSTRANSUBTYPE, val);
    }

    get cbTranTypeId() {
        return super.getValue(_fieldNames.CBTRANTYPEID);
    } set cbTranTypeId(val) {
        super.setValue(_fieldNames.CBTRANTYPEID, val);
    }

    get erpTranTypeId() {
        return super.getValue(_fieldNames.ERPTRANTYPEID);
    } set erpTranTypeId(val) {
        super.setValue(_fieldNames.ERPTRANTYPEID, val);
    }

    get description() {
        return super.getValue(_fieldNames.DESCRIPTION);
    } set description(val) {
        super.setValue(_fieldNames.DESCRIPTION, val);
    }

    get cbHeading() {
        return super.getValue(_fieldNames.CBHEADING);
    } set cbHeading(val) {
        super.setValue(_fieldNames.CBHEADING, val);
    }

    get allowNew() {
        return super.getValue(_fieldNames.ALLOWNEW);
    } set allowNew(val) {
        super.setValue(_fieldNames.ALLOWNEW, val);
    }

    get allowEdit() {
        return super.getValue(_fieldNames.ALLOWEDIT);
    } set allowEdit(val) {
        super.setValue(_fieldNames.ALLOWEDIT, val);
    }

    get allowDelete() {
        return super.getValue(_fieldNames.ALLOWDELETE);
    } set allowDelete(val) {
        super.setValue(_fieldNames.ALLOWDELETE, val);
    }

    get requiresDeclaration() {
        return super.getValue(_fieldNames.REQUIRESDECLARATION);
    } set requiresDeclaration(val) {
        super.setValue(_fieldNames.REQUIRESDECLARATION, val);
    }

    get invertSign() {
        return super.getValue(_fieldNames.INVERTSIGN);
    } set invertSign(val) {
        super.setValue(_fieldNames.INVERTSIGN, val);
    }

    get ignore() {
        return super.getValue(_fieldNames.IGNORE);
    } set ignore(val) {
        super.setValue(_fieldNames.IGNORE, val);
    }

    get duplicateAs() {
        return super.getValue(_fieldNames.DUPLICATEAS);
    } set duplicateAs(val) {
        super.setValue(_fieldNames.DUPLICATEAS, val);
    }

    get traderAccount() {
        return super.getValue(_fieldNames.TRADERACCOUNT);
    } set traderAccount(val) {
        super.setValue(_fieldNames.TRADERACCOUNT, val);
    }

    get erpGLAccountId() {
        return super.getValue(_fieldNames.ERPGLACCOUNTID);
    } set erpGLAccountId(val) {
        super.setValue(_fieldNames.ERPGLACCOUNTID, val);
    }

    get erpCBAccountId() {
        return super.getValue(_fieldNames.ERPCBACCOUNTID);
    } set erpCBAccountId(val) {
        super.setValue(_fieldNames.ERPCBACCOUNTID, val);
    }

    get erpTaxAccountId() {
        return super.getValue(_fieldNames.ERPTAXACCOUNTID);
    } set erpTaxAccountId(val) {
        super.setValue(_fieldNames.ERPTAXACCOUNTID, val);
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
    Table: Persistent_cr_tran_type_config_Collection,
    Record: Persistent_cr_tran_type_config,
}
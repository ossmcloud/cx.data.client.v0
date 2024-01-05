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
    ERPGLCONTRAACCOUNTID: 'erpGLContraAccountId',
    EXCONDITION: 'exCondition',
    ERP2NDTRANTYPEID: 'erp2ndTranTypeId',
    SORTINDEX: 'sortIndex',
    ERPSPLITBYREFERENCE: 'erpSplitByReference',
    ERPIGNORESTOREGLSEGMENTS: 'erpIgnoreStoreGLSegments',
    ERP2NDTRADERACCOUNT: 'erp2ndTraderAccount',
    ERP2NDGLACCOUNTID: 'erp2ndGLAccountId',
    ERP2NDCBACCOUNTID: 'erp2ndCBAccountId',
    ERP2NDTAXACCOUNTID: 'erp2ndTaxAccountId',
    ERP2NDGLCONTRAACCOUNTID: 'erp2ndGLContraAccountId',
    SHOWINCASHBOOKLIST: 'showInCashBookList',
    CBREFERENCE: 'cbReference',
    FORCETAXMAPCONFIGID: 'forceTaxMapConfigId',
    SKIPPOSTING: 'skipPosting',
    STOPPOSTING: 'stopPosting',
    NOTES: 'notes',

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
    requiresDeclaration: { name: 'requiresDeclaration', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    invertSign: { name: 'invertSign', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    ignore: { name: 'ignore', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    duplicateAs: { name: 'duplicateAs', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    traderAccount: { name: 'traderAccount', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpGLAccountId: { name: 'erpGLAccountId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    erpCBAccountId: { name: 'erpCBAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpTaxAccountId: { name: 'erpTaxAccountId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpGLContraAccountId: { name: 'erpGLContraAccountId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    exCondition: { name: 'exCondition', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    erp2ndTranTypeId: { name: 'erp2ndTranTypeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    sortIndex: { name: 'sortIndex', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    erpSplitByReference: { name: 'erpSplitByReference', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    erpIgnoreStoreGLSegments: { name: 'erpIgnoreStoreGLSegments', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    erp2ndTraderAccount: { name: 'erp2ndTraderAccount', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erp2ndGLAccountId: { name: 'erp2ndGLAccountId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    erp2ndCBAccountId: { name: 'erp2ndCBAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erp2ndTaxAccountId: { name: 'erp2ndTaxAccountId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    erp2ndGLContraAccountId: { name: 'erp2ndGLContraAccountId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    showInCashBookList: { name: 'showInCashBookList', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: true },
    cbReference: { name: 'cbReference', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: false, default: '' },
    forceTaxMapConfigId: { name: 'forceTaxMapConfigId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    skipPosting: { name: 'skipPosting', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    stopPosting: { name: 'stopPosting', dataType: 'bit', pk: false, identity: false, maxLength: 1, null: false, default: '0' },
    notes: { name: 'notes', dataType: 'varchar', pk: false, identity: false, maxLength: 60, null: true },

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

    get erpGLContraAccountId() {
        return super.getValue(_fieldNames.ERPGLCONTRAACCOUNTID);
    } set erpGLContraAccountId(val) {
        super.setValue(_fieldNames.ERPGLCONTRAACCOUNTID, val);
    }

    get exCondition() {
        return super.getValue(_fieldNames.EXCONDITION);
    } set exCondition(val) {
        super.setValue(_fieldNames.EXCONDITION, val);
    }

    get erp2ndTranTypeId() {
        return super.getValue(_fieldNames.ERP2NDTRANTYPEID);
    } set erp2ndTranTypeId(val) {
        super.setValue(_fieldNames.ERP2NDTRANTYPEID, val);
    }

    get sortIndex() {
        return super.getValue(_fieldNames.SORTINDEX);
    } set sortIndex(val) {
        super.setValue(_fieldNames.SORTINDEX, val);
    }

    get erpSplitByReference() {
        return super.getValue(_fieldNames.ERPSPLITBYREFERENCE);
    } set erpSplitByReference(val) {
        super.setValue(_fieldNames.ERPSPLITBYREFERENCE, val);
    }

    get erpIgnoreStoreGLSegments() {
        return super.getValue(_fieldNames.ERPIGNORESTOREGLSEGMENTS);
    } set erpIgnoreStoreGLSegments(val) {
        super.setValue(_fieldNames.ERPIGNORESTOREGLSEGMENTS, val);
    }

    get erp2ndTraderAccount() {
        return super.getValue(_fieldNames.ERP2NDTRADERACCOUNT);
    } set erp2ndTraderAccount(val) {
        super.setValue(_fieldNames.ERP2NDTRADERACCOUNT, val);
    }

    get erp2ndGLAccountId() {
        return super.getValue(_fieldNames.ERP2NDGLACCOUNTID);
    } set erp2ndGLAccountId(val) {
        super.setValue(_fieldNames.ERP2NDGLACCOUNTID, val);
    }

    get erp2ndCBAccountId() {
        return super.getValue(_fieldNames.ERP2NDCBACCOUNTID);
    } set erp2ndCBAccountId(val) {
        super.setValue(_fieldNames.ERP2NDCBACCOUNTID, val);
    }

    get erp2ndTaxAccountId() {
        return super.getValue(_fieldNames.ERP2NDTAXACCOUNTID);
    } set erp2ndTaxAccountId(val) {
        super.setValue(_fieldNames.ERP2NDTAXACCOUNTID, val);
    }

    get erp2ndGLContraAccountId() {
        return super.getValue(_fieldNames.ERP2NDGLCONTRAACCOUNTID);
    } set erp2ndGLContraAccountId(val) {
        super.setValue(_fieldNames.ERP2NDGLCONTRAACCOUNTID, val);
    }

    get showInCashBookList() {
        return super.getValue(_fieldNames.SHOWINCASHBOOKLIST);
    } set showInCashBookList(val) {
        super.setValue(_fieldNames.SHOWINCASHBOOKLIST, val);
    }

    get cbReference() {
        return super.getValue(_fieldNames.CBREFERENCE);
    } set cbReference(val) {
        super.setValue(_fieldNames.CBREFERENCE, val);
    }

    get forceTaxMapConfigId() {
        return super.getValue(_fieldNames.FORCETAXMAPCONFIGID);
    } set forceTaxMapConfigId(val) {
        super.setValue(_fieldNames.FORCETAXMAPCONFIGID, val);
    }

    get skipPosting() {
        return super.getValue(_fieldNames.SKIPPOSTING);
    } set skipPosting(val) {
        super.setValue(_fieldNames.SKIPPOSTING, val);
    }

    get stopPosting() {
        return super.getValue(_fieldNames.STOPPOSTING);
    } set stopPosting(val) {
        super.setValue(_fieldNames.STOPPOSTING, val);
    }

    get notes() {
        return super.getValue(_fieldNames.NOTES);
    } set notes(val) {
        super.setValue(_fieldNames.NOTES, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cr_tran_type_config_Collection,
    Record: Persistent_cr_tran_type_config,
}
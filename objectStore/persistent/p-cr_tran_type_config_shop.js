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
const _tableName = 'cr_tran_type_config_shop';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TRANTYPECONFIGID: 'tranTypeConfigId',
    SHOPID: 'shopId',
    ERPTRANTYPEID: 'erpTranTypeId',
    TRADERACCOUNT: 'traderAccount',
    ERPGLACCOUNTID: 'erpGLAccountId',
    ERPGLCONTRAACCOUNTID: 'erpGLContraAccountId',
    ERPCBACCOUNTID: 'erpCBAccountId',
    ERPTAXACCOUNTID: 'erpTaxAccountId',
    ERP2NDTRANTYPEID: 'erp2ndTranTypeId',
    ERP2NDTRADERACCOUNT: 'erp2ndTraderAccount',
    ERP2NDGLACCOUNTID: 'erp2ndGLAccountId',
    ERP2NDGLCONTRAACCOUNTID: 'erp2ndGLContraAccountId',
    ERP2NDCBACCOUNTID: 'erp2ndCBAccountId',
    ERP2NDTAXACCOUNTID: 'erp2ndTaxAccountId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    tranTypeConfigId: { name: 'tranTypeConfigId', dataType: 'int', pk: true, identity: false, maxLength: 4, null: false },
    shopId: { name: 'shopId', dataType: 'bigint', pk: true, identity: false, maxLength: 8, null: false },
    erpTranTypeId: { name: 'erpTranTypeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    traderAccount: { name: 'traderAccount', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpGLAccountId: { name: 'erpGLAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpGLContraAccountId: { name: 'erpGLContraAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpCBAccountId: { name: 'erpCBAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erpTaxAccountId: { name: 'erpTaxAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erp2ndTranTypeId: { name: 'erp2ndTranTypeId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    erp2ndTraderAccount: { name: 'erp2ndTraderAccount', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erp2ndGLAccountId: { name: 'erp2ndGLAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erp2ndGLContraAccountId: { name: 'erp2ndGLContraAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erp2ndCBAccountId: { name: 'erp2ndCBAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    erp2ndTaxAccountId: { name: 'erp2ndTaxAccountId', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cr_tran_type_config_shop_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cr_tran_type_config_shop extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }
    
    // DEFINE TABLE FIELDS AS PROPERTIES
    get tranTypeConfigId() {
        return super.getValue(_fieldNames.TRANTYPECONFIGID);
    } set tranTypeConfigId(val) {
        super.setValue(_fieldNames.TRANTYPECONFIGID, val);
    }

    get shopId() {
        return super.getValue(_fieldNames.SHOPID);
    } set shopId(val) {
        super.setValue(_fieldNames.SHOPID, val);
    }

    get erpTranTypeId() {
        return super.getValue(_fieldNames.ERPTRANTYPEID);
    } set erpTranTypeId(val) {
        super.setValue(_fieldNames.ERPTRANTYPEID, val);
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

    get erpGLContraAccountId() {
        return super.getValue(_fieldNames.ERPGLCONTRAACCOUNTID);
    } set erpGLContraAccountId(val) {
        super.setValue(_fieldNames.ERPGLCONTRAACCOUNTID, val);
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

    get erp2ndTranTypeId() {
        return super.getValue(_fieldNames.ERP2NDTRANTYPEID);
    } set erp2ndTranTypeId(val) {
        super.setValue(_fieldNames.ERP2NDTRANTYPEID, val);
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

    get erp2ndGLContraAccountId() {
        return super.getValue(_fieldNames.ERP2NDGLCONTRAACCOUNTID);
    } set erp2ndGLContraAccountId(val) {
        super.setValue(_fieldNames.ERP2NDGLCONTRAACCOUNTID, val);
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
    Table: Persistent_cr_tran_type_config_shop_Collection,
    Record: Persistent_cr_tran_type_config_shop,
}
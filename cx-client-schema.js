'use strict'

module.exports = {
    cr_cb_tran_type: {
        TBL_NAME: 'cr_cb_tran_type',
        CBTRANTYPEID: 'cbTranTypeId',
        CODE: 'code',
        TILLDIFFIMPACT: 'tillDiffImpact',
        CBSECTION: 'cbSection',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        MANDATORYFIELDS: 'mandatoryFields',
    },

    cr_cb_transaction: {
        TBL_NAME: 'cr_cb_transaction',
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
    },

    cr_erp_transaction: {
        TBL_NAME: 'cr_erp_transaction',
        TRANID: 'tranId',
        CBTRANID: 'cbTranId',
        SHOPID: 'shopId',
        ERPTRANTYPEID: 'erpTranTypeId',
        EPOSACCOUNTREFERENCE: 'eposAccountReference',
        TRANSACTIONDATE: 'transactionDate',
        TRANSACTIONREFERENCE: 'transactionReference',
        TRANSACTIONSECONDREFERENCE: 'transactionSecondReference',
        ACCOUNTREFERENCE: 'accountReference',
        ACCOUNTNAME: 'accountName',
        BANKREFERENCE: 'bankReference',
        BANKNAME: 'bankName',
        VALUENET: 'valueNet',
        VALUETAX: 'valueTax',
        VALUEGROSS: 'valueGross',
        POSTINGREFERENCE: 'postingReference',
        POSTINGURN: 'postingURN',
        STATUS: 'status',
        STATUSMESSAGE: 'statusMessage',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cr_erp_transaction_gl: {
        TBL_NAME: 'cr_erp_transaction_gl',
        GLTRANID: 'glTranId',
        ERPTRANID: 'erpTranId',
        GLACCOUNTSEG1: 'glAccountSeg1',
        GLACCOUNTSEG2: 'glAccountSeg2',
        GLACCOUNTSEG3: 'glAccountSeg3',
        GLACCOUNTDESCRIPTION: 'glAccountDescription',
        NARRATIVE: 'narrative',
        VALUENET: 'valueNet',
        TAXACCOUNT: 'taxAccount',
        TAXRATE: 'taxRate',
        TAXDESCRIPTION: 'taxDescription',
        VALUETAX: 'valueTax',
        VALUEGROSS: 'valueGross',
        STATUS: 'status',
        STATUSMESSAGE: 'statusMessage',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cr_erp_transaction_tax: {
        TBL_NAME: 'cr_erp_transaction_tax',
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
    },

    cr_preference: {
        TBL_NAME: 'cr_preference',
        PREFERENCEID: 'preferenceId',
        NAME: 'name',
        TYPE: 'type',
        DESCRIPTION: 'description',
        DEFAULTVALUE: 'defaultValue',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cr_preference_config: {
        TBL_NAME: 'cr_preference_config',
        PREFERENCEID: 'preferenceId',
        PREFERENCERECORDID: 'preferenceRecordId',
        RECORDID: 'recordId',
        VALUE: 'value',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cr_preference_record: {
        TBL_NAME: 'cr_preference_record',
        PREFERENCERECORDID: 'preferenceRecordId',
        PREFERENCEID: 'preferenceId',
        LEVELID: 'levelId',
        RECORDTYPE: 'recordType',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cr_preference_value: {
        TBL_NAME: 'cr_preference_value',
        PREFERENCEVALUEID: 'preferenceValueId',
        PREFERENCEID: 'preferenceId',
        TYPE: 'type',
        VALUE: 'value',
        LABEL: 'label',
        ISDEFAULT: 'isDefault',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cr_tran_type_config: {
        TBL_NAME: 'cr_tran_type_config',
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
    },

    cr_transaction: {
        TBL_NAME: 'cr_transaction',
        TRANID: 'tranId',
        CBTRANID: 'cbTranId',
        SHOPID: 'shopId',
        TRANTYPECONFIGID: 'tranTypeConfigId',
        DEPMAPCONFIGID: 'depMapConfigId',
        TAXMAPCONFIGID: 'taxMapConfigId',
        ERPCBACCOUNTID: 'erpCBAccountId',
        ISMANUAL: 'isManual',
        ISDUPLICATE: 'isDuplicate',
        VALUEGROSS: 'valueGross',
        VALUENET: 'valueNet',
        VALUEDISCOUNT: 'valueDiscount',
        VALUEDISCOUNTPROMO: 'valueDiscountPromo',
        VALUETAX: 'valueTax',
        IGNORED: 'ignored',
        EPOSTRANSACTIONID: 'eposTransactionId',
        EPOSTRANSACTIONNO: 'eposTransactionNo',
        TRANSACTIONDATE: 'transactionDate',
        TRANSACTIONDATETIME: 'transactionDateTime',
        TRANSACTIONTYPE: 'transactionType',
        TRANSACTIONSUBTYPE: 'transactionSubType',
        TILLID: 'tillId',
        CASHIERID: 'cashierId',
        REFERENCE1: 'reference1',
        REFERENCE2: 'reference2',
        LINENUMBER: 'lineNumber',
        PLUCODE: 'pluCode',
        ITEMBARCODE: 'itemBarCode',
        ITEMDESCRIPTION: 'itemDescription',
        DEPARTMENT: 'department',
        SUBDEPARTMENT: 'subDepartment',
        QUANTITY: 'quantity',
        UNITCOST: 'unitCost',
        UNITPRICE: 'unitPrice',
        RAW_VALUEGROSS: 'raw_valueGross',
        RAW_VALUENET: 'raw_valueNet',
        RAW_VALUEDISCOUNT: 'raw_valueDiscount',
        RAW_VALUEDISCOUNTPROMO: 'raw_valueDiscountPromo',
        RAW_VALUETAX: 'raw_valueTax',
        TAXCODE: 'taxCode',
        TAXRATE: 'taxRate',
        CHANGE: 'change',
        CASHBACK: 'cashBack',
        CUSTOMERACCOUNT: 'customerAccount',
        PUMPNUMBER: 'pumpNumber',
        CARDTYPE: 'cardType',
        CARDNAME: 'cardName',
        PAIDINOUTREASONID: 'paidInOutReasonId',
        PAIDINOUTREASONDESCRIPTION: 'paidInOutReasonDescription',
        VOIDED: 'voided',
        BUNKERED: 'bunkered',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cx_login: {
        TBL_NAME: 'cx_login',
        LOGINID: 'loginId',
        MASTERLOGINID: 'masterLoginId',
        EMAIL: 'email',
        FIRSTNAME: 'firstName',
        LASTNAME: 'lastName',
        JOBTITLE: 'jobTitle',
        THEME: 'theme',
        ROLEID: 'roleId',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cx_login_roles: {
        TBL_NAME: 'cx_login_roles',
        LOGINROLEID: 'loginRoleId',
        LOGINID: 'loginId',
        ROLEID: 'roleId',
    },

    cx_login_shop: {
        TBL_NAME: 'cx_login_shop',
        LOGINSHOPID: 'loginShopId',
        LOGINID: 'loginId',
        SHOPID: 'shopId',
    },

    cx_map_config: {
        TBL_NAME: 'cx_map_config',
        MAPCONFIGID: 'mapConfigId',
        MAPTYPEID: 'mapTypeId',
        EPOSPROVIDER: 'eposProvider',
        ERPPROVIDER: 'erpProvider',
        NAME: 'name',
        MAPMASTERSHOP: 'mapMasterShop',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cx_map_config_dep: {
        TBL_NAME: 'cx_map_config_dep',
        DEPMAPCONFIGID: 'depMapConfigId',
        MAPCONFIGID: 'mapConfigId',
        EPOSDEPARTMENT: 'eposDepartment',
        EPOSSUBDEPARTMENT: 'eposSubDepartment',
        EPOSDESCRIPTION: 'eposDescription',
        SALEACCOUNTID: 'saleAccountId',
        PURCHASEACCOUNTID: 'purchaseAccountId',
        ACCRUALACCOUNTID: 'accrualAccountId',
        COGSACCOUNTID: 'cogsAccountId',
        WASTEACCOUNTID: 'wasteAccountId',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cx_map_config_tax: {
        TBL_NAME: 'cx_map_config_tax',
        TAXMAPCONFIGID: 'taxMapConfigId',
        MAPCONFIGID: 'mapConfigId',
        EPOSCURRENCYCODE: 'eposCurrencyCode',
        EPOSTAXCODE: 'eposTaxCode',
        EPOSTAXRATE: 'eposTaxRate',
        EPOSDESCRIPTION: 'eposDescription',
        TAXACCOUNTID: 'taxAccountId',
        PURCHASETAXACCOUNTID: 'purchaseTaxAccountId',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cx_shop: {
        TBL_NAME: 'cx_shop',
        SHOPID: 'shopId',
        SHOPGROUPID: 'shopGroupId',
        SHOPCODE: 'shopCode',
        SHOPNAME: 'shopName',
        SHOPADDRESS: 'shopAddress',
        STATUS: 'status',
        SHOPPOSTCODE: 'shopPostCode',
        SHOPLATITUDE: 'shopLatitude',
        SHOPLONGITUDE: 'shopLongitude',
        TRANTYPECONFIGID: 'tranTypeConfigId',
        DEPMAPCONFIGID: 'depMapConfigId',
        TAXMAPCONFIGID: 'taxMapConfigId',
        CURRENCYCODE: 'currencyCode',
        SHOPCOLOR: 'shopColor',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cx_shop_group: {
        TBL_NAME: 'cx_shop_group',
        SHOPGROUPID: 'shopGroupId',
        GROUPCODE: 'groupCode',
        GROUPNAME: 'groupName',
        GROUPCOLOR: 'groupColor',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    cx_traderAccount: {
        TBL_NAME: 'cx_traderAccount',
        TRADERACCOUNTID: 'traderAccountId',
        SHOPID: 'shopId',
        TRADERTYPE: 'traderType',
        TRADERCODE: 'traderCode',
        TRADERNAME: 'traderName',
        COUNTRYCODE: 'countryCode',
        ADDRESS1: 'address1',
        ADDRESS2: 'address2',
        ADDRESS3: 'address3',
        ADDRESS4: 'address4',
        POSTCODE: 'postCode',
        CONTACT: 'contact',
        PHONE: 'phone',
        ISWHOLESALER: 'isWholesaler',
        WHOLESALERCODE: 'wholesalerCode',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        ERPTRADERACCOUNTID: 'erpTraderAccountId',
    },

    epos_dtfs_configs: {
        TBL_NAME: 'epos_dtfs_configs',
        CONFIGID: 'configId',
        SETTINGID: 'settingId',
        CONFIGNAME: 'configName',
        CONFIGVALUE: 'configValue',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
    },

    epos_dtfs_ping: {
        TBL_NAME: 'epos_dtfs_ping',
        PINGID: 'pingId',
        DTFSSETTINGID: 'dtfsSettingId',
        PINGIP: 'pingIP',
        RESPONSE: 'response',
        CREATED: 'created',
    },

    epos_dtfs_setting: {
        TBL_NAME: 'epos_dtfs_setting',
        DTFSSETTINGID: 'dtfsSettingId',
        DTFSSETTINGNAME: 'dtfsSettingName',
        DTFSPAIRINGSTATUS: 'dtfsPairingStatus',
        DTFSPAIRINGCODE: 'dtfsPairingCode',
        DTFSPAIREDMACHINENAME: 'dtfsPairedMachineName',
        DTFSPAIREDMACHINEOS: 'dtfsPairedMachineOS',
        DTFSPAIREDMACHINEIP: 'dtfsPairedMachineIP',
        DTFSPAIREDVERSION: 'dtfsPairedVersion',
        DTFSINFOLASTREFRESH: 'dtfsInfoLastRefresh',
        EPOSPROVIDER: 'eposProvider',
        STARTDATE: 'startDate',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
    },

    epos_dtfs_transmission: {
        TBL_NAME: 'epos_dtfs_transmission',
        TRANSMISSIONID: 'transmissionId',
        SHOPID: 'shopId',
        STATUS: 'status',
        ACTION: 'action',
        MESSAGE: 'message',
        CREATED: 'created',
        DTFSSETTINGID: 'dtfsSettingId',
    },

    epos_dtfs_upgradeAudit: {
        TBL_NAME: 'epos_dtfs_upgradeAudit',
        UPGRADEAUDITID: 'upgradeAuditId',
        DTFSSETTINGID: 'dtfsSettingId',
        STATUS: 'status',
        STATUSMESSAGE: 'statusMessage',
        UPGRADECONFIG: 'upgradeConfig',
        TRANSMISSIONID: 'transmissionId',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
    },

    epos_shop_configs: {
        TBL_NAME: 'epos_shop_configs',
        CONFIGID: 'configId',
        SHOPID: 'shopId',
        CONFIGNAME: 'configName',
        CONFIGVALUE: 'configValue',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
    },

    epos_shop_setting: {
        TBL_NAME: 'epos_shop_setting',
        SHOPID: 'shopId',
        EPOSPROVIDER: 'eposProvider',
        EPOSSHOPCODE: 'eposShopCode',
        EPOSSHOPNAME: 'eposShopName',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        DTFSSETTINGID: 'dtfsSettingId',
        STARTDATE: 'startDate',
        GETDELAYCR: 'getDelayCR',
        GETDELAYCP: 'getDelayCP',
    },

    erp_bank_account: {
        TBL_NAME: 'erp_bank_account',
        ERPBANKACCOUNTID: 'erpBankAccountId',
        SHOPID: 'shopId',
        CURRENCYCODE: 'currencyCode',
        CODE: 'code',
        DESCRIPTION: 'description',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        COUNTRYCODE: 'countryCode',
    },

    erp_dtfs_configs: {
        TBL_NAME: 'erp_dtfs_configs',
        CONFIGID: 'configId',
        SETTINGID: 'settingId',
        CONFIGNAME: 'configName',
        CONFIGVALUE: 'configValue',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
    },

    erp_dtfs_ping: {
        TBL_NAME: 'erp_dtfs_ping',
        PINGID: 'pingId',
        DTFSSETTINGID: 'dtfsSettingId',
        PINGIP: 'pingIP',
        RESPONSE: 'response',
        CREATED: 'created',
    },

    erp_dtfs_setting: {
        TBL_NAME: 'erp_dtfs_setting',
        DTFSSETTINGID: 'dtfsSettingId',
        DTFSSETTINGNAME: 'dtfsSettingName',
        DTFSPAIRINGSTATUS: 'dtfsPairingStatus',
        DTFSPAIRINGCODE: 'dtfsPairingCode',
        DTFSPAIREDMACHINENAME: 'dtfsPairedMachineName',
        DTFSPAIREDMACHINEOS: 'dtfsPairedMachineOS',
        DTFSPAIREDMACHINEIP: 'dtfsPairedMachineIP',
        DTFSPAIREDVERSION: 'dtfsPairedVersion',
        DTFSINFOLASTREFRESH: 'dtfsInfoLastRefresh',
        ERPPROVIDER: 'erpProvider',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
    },

    erp_dtfs_transmission: {
        TBL_NAME: 'erp_dtfs_transmission',
        TRANSMISSIONID: 'transmissionId',
        SHOPID: 'shopId',
        STATUS: 'status',
        ACTION: 'action',
        MESSAGE: 'message',
        CREATED: 'created',
        DTFSSETTINGID: 'dtfsSettingId',
    },

    erp_dtfs_upgradeAudit: {
        TBL_NAME: 'erp_dtfs_upgradeAudit',
        UPGRADEAUDITID: 'upgradeAuditId',
        DTFSSETTINGID: 'dtfsSettingId',
        STATUS: 'status',
        STATUSMESSAGE: 'statusMessage',
        UPGRADECONFIG: 'upgradeConfig',
        TRANSMISSIONID: 'transmissionId',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
    },

    erp_gl_account: {
        TBL_NAME: 'erp_gl_account',
        ERPGLACCOUNTID: 'erpGLAccountId',
        SHOPID: 'shopId',
        CODE: 'code',
        COSTCENTRE: 'costCentre',
        DEPARTMENT: 'department',
        DESCRIPTION: 'description',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    erp_shop_setting: {
        TBL_NAME: 'erp_shop_setting',
        SHOPID: 'shopId',
        ERPPROVIDER: 'erpProvider',
        ERPCOMPANYNAME: 'erpCompanyName',
        ERPCUSTOMERACCOUNT: 'erpCustomerAccount',
        ERPCUSTOMERACCOUNTNAME: 'erpCustomerAccountName',
        ERPCOSTCENTRE: 'erpCostCentre',
        ERPDEPARTMENT: 'erpDepartment',
        DTFSSETTINGID: 'dtfsSettingId',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
    },

    erp_tax_account: {
        TBL_NAME: 'erp_tax_account',
        ERPTAXACCOUNTID: 'erpTaxAccountId',
        SHOPID: 'shopId',
        CURRENCYCODE: 'currencyCode',
        CODE: 'code',
        RATE: 'rate',
        DESCRIPTION: 'description',
        ECTERMID: 'ecTermId',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        COUNTRYCODE: 'countryCode',
    },

    erp_traderAccount: {
        TBL_NAME: 'erp_traderAccount',
        TRADERACCOUNTID: 'traderAccountId',
        SHOPID: 'shopId',
        TRADERTYPE: 'traderType',
        TRADERCODE: 'traderCode',
        TRADERNAME: 'traderName',
        COUNTRYCODE: 'countryCode',
        CURRENCYCODE: 'currencyCode',
        ADDRESS1: 'address1',
        ADDRESS2: 'address2',
        ADDRESS3: 'address3',
        ADDRESS4: 'address4',
        POSTCODE: 'postCode',
        CONTACT: 'contact',
        PHONE: 'phone',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
    },

    raw_cr_transaction: {
        TBL_NAME: 'raw_cr_transaction',
        RAWTRANSACTIONID: 'rawTransactionId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        EPOSTRANSACTIONID: 'eposTransactionId',
        EPOSTRANSACTIONNO: 'eposTransactionNo',
        TRANSACTIONDATE: 'transactionDate',
        TRANSACTIONDATETIME: 'transactionDateTime',
        TRANSACTIONTYPE: 'transactionType',
        TRANSACTIONSUBTYPE: 'transactionSubType',
        TILLID: 'tillId',
        CASHIERID: 'cashierId',
        REFERENCE1: 'reference1',
        REFERENCE2: 'reference2',
        LINENUMBER: 'lineNumber',
        PLUCODE: 'pluCode',
        ITEMBARCODE: 'itemBarCode',
        ITEMDESCRIPTION: 'itemDescription',
        DEPARTMENT: 'department',
        SUBDEPARTMENT: 'subDepartment',
        QUANTITY: 'quantity',
        UNITCOST: 'unitCost',
        UNITPRICE: 'unitPrice',
        VALUEGROSS: 'valueGross',
        VALUENET: 'valueNet',
        VALUEDISCOUNT: 'valueDiscount',
        VALUEDISCOUNTPROMO: 'valueDiscountPromo',
        VALUETAX: 'valueTax',
        TAXCODE: 'taxCode',
        TAXRATE: 'taxRate',
        CHANGE: 'change',
        CASHBACK: 'cashBack',
        CUSTOMERACCOUNT: 'customerAccount',
        PUMPNUMBER: 'pumpNumber',
        CARDTYPE: 'cardType',
        CARDNAME: 'cardName',
        PAIDINOUTREASONID: 'paidInOutReasonId',
        PAIDINOUTREASONDESCRIPTION: 'paidInOutReasonDescription',
        VOIDED: 'voided',
        BUNKERED: 'bunkered',
        CREATED: 'created',
    },

    raw_cx_department: {
        TBL_NAME: 'raw_cx_department',
        DEPID: 'depId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        DEPARTMENT: 'department',
        DEPARTMENTNAME: 'departmentName',
    },

    raw_cx_pluCost: {
        TBL_NAME: 'raw_cx_pluCost',
        RAWPLUCOSTID: 'rawPLUCostId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        TRANSACTIONDATE: 'transactionDate',
        PLUCODE: 'pluCode',
        UNITCOST: 'unitCost',
        CREATED: 'created',
    },

    raw_cx_subDepartment: {
        TBL_NAME: 'raw_cx_subDepartment',
        SUBDEPID: 'subDepId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        DEPARTMENT: 'department',
        SUBDEPARTMENT: 'subDepartment',
        SUBDEPARTMENTNAME: 'subDepartmentName',
    },

    raw_cx_taxRate: {
        TBL_NAME: 'raw_cx_taxRate',
        TAXRATEID: 'taxRateId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        COUNTRYCODE: 'countryCode',
        TAXCODE: 'taxCode',
        TAXRATE: 'taxRate',
        TAXNAME: 'taxName',
    },

    raw_cx_traderAccount: {
        TBL_NAME: 'raw_cx_traderAccount',
        TRADERACCOUNTID: 'traderAccountId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        TRADERTYPE: 'traderType',
        TRADERCODE: 'traderCode',
        TRADERNAME: 'traderName',
        COUNTRYCODE: 'countryCode',
        ADDRESS1: 'address1',
        ADDRESS2: 'address2',
        ADDRESS3: 'address3',
        ADDRESS4: 'address4',
        POSTCODE: 'postCode',
        CONTACT: 'contact',
        PHONE: 'phone',
        ISWHOLESALER: 'isWholesaler',
        WHOLESALERCODE: 'wholesalerCode',
    },

    raw_erp_bankAccount: {
        TBL_NAME: 'raw_erp_bankAccount',
        RAWERPBANKACCOUNTID: 'rawErpBankAccountId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        COUNTRYCODE: 'countryCode',
        CURRENCYCODE: 'currencyCode',
        CODE: 'code',
        DESCRIPTION: 'description',
    },

    raw_erp_glAccount: {
        TBL_NAME: 'raw_erp_glAccount',
        RAWERPGLACCOUNTID: 'rawErpGLAccountId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        CODE: 'code',
        SUBCODE1: 'subCode1',
        SUBCODE2: 'subCode2',
        DESCRIPTION: 'description',
    },

    raw_erp_taxRate: {
        TBL_NAME: 'raw_erp_taxRate',
        TAXRATEID: 'taxRateId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        COUNTRYCODE: 'countryCode',
        CURRENCYCODE: 'currencyCode',
        TAXCODE: 'taxCode',
        TAXRATE: 'taxRate',
        TAXNAME: 'taxName',
        TAXTYPE: 'taxType',
    },

    raw_erp_traderAccount: {
        TBL_NAME: 'raw_erp_traderAccount',
        TRADERACCOUNTID: 'traderAccountId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        TRADERTYPE: 'traderType',
        TRADERCODE: 'traderCode',
        TRADERNAME: 'traderName',
        COUNTRYCODE: 'countryCode',
        ADDRESS1: 'address1',
        ADDRESS2: 'address2',
        ADDRESS3: 'address3',
        ADDRESS4: 'address4',
        POSTCODE: 'postCode',
        CONTACT: 'contact',
        PHONE: 'phone',
        CURRENCYCODE: 'currencyCode',
    },

    raw_getLog: {
        TBL_NAME: 'raw_getLog',
        GETLOGID: 'getLogId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        GETDATE: 'getDate',
        GETMODULE: 'getModule',
        GETREFERENCE: 'getReference',
        GETRESPONSE: 'getResponse',
        GETSUCCESS: 'getSuccess',
        CREATED: 'created',
        TRANSFERRED: 'transferred',
        SVCNAME: 'svcName',
    },

    raw_getRequest: {
        TBL_NAME: 'raw_getRequest',
        GETREQUESTID: 'getRequestId',
        TRANSMISSIONID: 'transmissionID',
        SHOPID: 'shopId',
        GETDATE: 'getDate',
        GETMODULE: 'getModule',
        GETREFERENCE: 'getReference',
        STATUS: 'status',
        CREATEDBY: 'createdBy',
        CREATED: 'created',
        SVCNAME: 'svcName',
    },

    sys_dbInfo: {
        TBL_NAME: 'sys_dbInfo',
        DBVERSION: 'dbVersion',
        DBCREATEDON: 'dbCreatedOn',
        DBLASTUPDATE: 'dbLastUpdate',
    },

    sys_erp_tran_type: {
        TBL_NAME: 'sys_erp_tran_type',
        TRANTYPEID: 'tranTypeId',
        ERPPROVIDER: 'erpProvider',
        TRANCODE: 'tranCode',
        TRANNAME: 'tranName',
        TRANLEDGER: 'tranLedger',
        OPPOSITETRANID: 'oppositeTranId',
    },

    sys_provider: {
        TBL_NAME: 'sys_provider',
        TYPE: 'type',
        CODE: 'code',
        NAME: 'name',
    }

}
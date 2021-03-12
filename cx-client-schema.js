'use strict'

module.exports = {
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

    cx_shop: {
        TBL_NAME: 'cx_shop',
        SHOPID: 'shopId',
        SHOPGROUPID: 'shopGroupId',
        SHOPCODE: 'shopCode',
        SHOPNAME: 'shopName',
        SHOPADDRESS: 'shopAddress',
        STATUS: 'status',
        CREATED: 'created',
        CREATEDBY: 'createdBy',
        MODIFIED: 'modified',
        MODIFIEDBY: 'modifiedBy',
        SHOPPOSTCODE: 'shopPostCode',
        SHOPLATITUDE: 'shopLatitude',
        SHOPLONGITUDE: 'shopLongitude',
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
    },

    sys_dbInfo: {
        TBL_NAME: 'sys_dbInfo',
        DBVERSION: 'dbVersion',
        DBCREATEDON: 'dbCreatedOn',
        DBLASTUPDATE: 'dbLastUpdate',
    }

}
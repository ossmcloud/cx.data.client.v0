'use strict'

module.exports = {
    cp_shop_setting: {
        TBL_NAME: 'cp_shop_setting',
        SHOPID: 'shopId',
        WHOLESALERPROVIDER: 'wholesalerProvider',
        WHOLESALERSHOPCODE: 'wholesalerShopCode',
        WHOLESALERSHOPNAME: 'wholesalerShopName',
        CREATED: 'created',
    },

    cr_shop_configs: {
        TBL_NAME: 'cr_shop_configs',
        CONFIGID: 'configId',
        SHOPID: 'shopId',
        CONFIGNAME: 'configName',
        CONFIGVALUE: 'configValue',
        CREATED: 'created',
    },

    cx_shop_ping: {
        TBL_NAME: 'cx_shop_ping',
        PINGID: 'pingId',
        SHOPID: 'shopId',
        PINGIP: 'pingIP',
        RESPONSE: 'response',
        CREATED: 'created',
    },

    cr_shop_setting: {
        TBL_NAME: 'cr_shop_setting',
        SHOPID: 'shopId',
        EPOSPROVIDER: 'eposProvider',
        EPOSSHOPCODE: 'eposShopCode',
        EPOSSHOPNAME: 'eposShopName',
        DTFSPAIRINGCODE: 'dtfsPairingCode',
        DTFSPAIRINGSTATUS: 'dtfsPairingStatus',
        DTFSPAIREDMACHINENAME: 'dtfsPairedMachineName',
        DTFSPAIREDMACHINEOS: 'dtfsPairedMachineOS',
        DTFSPAIREDMACHINEIP: 'dtfsPairedMachineIP',
        CREATED: 'created',
    },

    cr_shop_transmission: {
        TBL_NAME: 'cr_shop_transmission',
        TRANSMISSIONID: 'transmissionId',
        SHOPID: 'shopId',
        STATUS: 'status',
        ACTION: 'action',
        MESSAGE: 'message',
        CREATED: 'created',
    },

    cx_login: {
        TBL_NAME: 'cx_login',
        LOGINID: 'loginId',
        MASTERLOGINID: 'masterLoginId',
        EMAIL: 'email',
        FIRSTNAME: 'firstName',
        LASTNAME: 'lastName',
        JOBTITLE: 'jobTitle',
        CREATED: 'created',
    },

    cx_shop: {
        TBL_NAME: 'cx_shop',
        SHOPID: 'shopId',
        SHOPCODE: 'shopCode',
        SHOPNAME: 'shopName',
        SHOPADDRESS: 'shopAddress',
        STATUS: 'status',
        CREATED: 'created',
    },

    cx_tradingAccount: {
        TBL_NAME: 'cx_tradingAccount',
        TRADINGACCOUNTID: 'tradingAccountId',
        ACCOUNTTYPE: 'accountType',
        ACCOUNTCODE: 'accountCode',
        ACCOUNTNAME: 'accountName',
        CREATED: 'created',
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

}
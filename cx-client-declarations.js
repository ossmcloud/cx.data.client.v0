'use strict'

const _core = require('cx-core');

function enumToList(obj, addEmpty, aliases, dataObjects) {
    if (!aliases) { aliases = {}; }

    var enums = [];
    if (addEmpty) { enums.push({ value: '', text: (addEmpty == true) ? '' : addEmpty }); }
    for (var key in obj) {
        // @CLEAN-UP: use a better way to do this, the 1st three below are functions
        if (key == 'toList') { continue; }
        if (key == 'toEncrypt') { continue; }
        if (key == 'getName') { continue; }
        if (key == 'getStyle') { continue; }
        if (key == 'getStyleInverted') { continue; }
        if (key == 'listOptions') { continue; }

        if (key == 'CX_ADMIN') { continue; }
        if (key == 'CX_SUPPORT') { continue; }
        if (key == '_NAME') { continue; }

        if (key[0] == '_') { continue; }


        var dataObject = (dataObjects) ? dataObjects[key] : null;
        enums.push({
            value: obj[key],
            text: (aliases[key]) ? aliases[key] : key.toLowerCase(),
            object: (dataObject) ? _core.text.toBase64(JSON.stringify(dataObject)) : '',
        });
    }
    return enums;
}
function enumGetName(obj, value, aliases) {
    if (!aliases) { aliases = {}; }
    for (var key in obj) {
        if (key == 'toList') { continue; }
        if (key == 'getName') { continue; }
        if (obj[key] == value) {
            if (aliases[key]) { return aliases[key] }
            return key.toLowerCase();
        }
    }
    return '';
}
function enumToListRenderOptions(obj, showId, showCheckBox) {
    var listOptions = { id: obj._NAME, type: 'table', primaryKey: 'value', columns: [] }
    if (showCheckBox) { listOptions.columns.push({ name: 'check', title: '', width: '30px', type: 'check', }); }
    if (showId) { listOptions.columns.push({ name: 'value', title: 'id', width: '30px' }); }
    if (obj._NAME) {
        // @CLEAN-UP: use a clean up routine this is used somewhere else
        listOptions.columns.push({ name: 'text', title: obj._NAME.replace('cx_', '') });
        listOptions.records = obj.toList();
    }
    return listOptions;
}

const CX_ROLE = {
    _NAME: 'cx_role',
    //
    CASHBOOK: 0,        // cash book only
    USER: 1,            // data entry and little more
    SUPERVISOR: 3,       // allow posting, handle dtfs, add/remove stores from logins
    MANAGER: 5,          // handle store groups, stores, logins
    ADMIN: 7,           // full access
    //
    CX_SUPPORT: 8,     // ossm support login role
    CX_ADMIN: 9,       // web master access


    toList: function (addEmpty) { return enumToList(this, addEmpty); },
    getName: function (value) {
        if (value == 9) { return 'cx admin'; }
        if (value == 8) { return 'cx support'; }
        return enumGetName(this, value);
    },
    listOptions: function (showId, showCheckBox) { return enumToListRenderOptions(this, showId, showCheckBox); }
}

const CX_LOGIN_STATUS = {
    NOT_VERIFIED: -1,
    VERIFIED: 0,
    ACTIVE: 1,
    LOCKED: 9,
    DELETED: 99,

    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); }
}
const CX_LOGIN_TOKEN_STATUS = {
    INVALID: -1,
    EXPIRED: 0,
    ACTIVE: 1,

    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); }
}
const CX_LOGIN_TOKEN_TYPE = {
    ERP: 'erp',
    EPOS: 'epos',
    ONE: 'one',
    THEREFORE: 'there',

    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); }
}
const CX_LOGIN_CACHE_TYPE = {
    URL_QUERY: 1
}


const CX_MODULE = {
    STATIC: 'static',
    RETAIL: 'retail',
    PURCHASE: 'purchase',
    THEREFORE: 'therefore',

    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); }
}


const CX_SERVICES = {
    DTFS: 'dtfs',
    ERPS: 'erps',
    ERP: 'erp',
    MMS: 'mms',
    SVR: 'server',
    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); }
}

const CX_LOG_TYPE = {
    INFO: 'info',
    WARN: 'warning',
    ERROR: 'ERROR',
    CRITICAL: 'IMPORTANT'
}



const EPOS_DTFS_SETTING = {
    PAIRING_STATUS: {
        NOT_PAIRED: 0,
        PAIRED: 1,
        INACTIVE: 9,
        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); }
    }
}

const EPOS_DTFS_CONFIGS = {
    FUELCARD_TENDER: 'FuelCardTender',
    DTFS_PING_FREQ: 'DTFSPingFrequency',
    DTFS_DATASOURCE_CONFIG: 'DTFSDataSourceConfig',
    DTFS_FTP_CONFIG: 'DTFSFTPConfig',
    DTFS_AUTO_MAP: 'DTFSAutoMap',
    DTFS_IMPORT_OPTIONS: 'DTFSImportOptions',
    THE_SVC_CONFIG: 'ThereforeConfig',
    EMAIL_CONFIG: 'EmailConfig',
    API_AUTH_CONFIG: 'EPOSApiAuthConfig',
    API_CONFIG: 'EPOSApiConfig',
    ONE_DRIVE_CONFIG: 'OneDriveConfig',
    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); },
    toEncrypt: function (configName) {
        if (configName == this.API_AUTH_CONFIG) { return true; }
        if (configName == this.API_CONFIG) { return true; }
        return false;
    }
}

const ERP_DTFS_SETTING = {
    PAIRING_STATUS: {
        NOT_PAIRED: 0,
        PAIRED: 1,
        INACTIVE: 9,
        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); }
    }
}

const ERP_DTFS_CONFIGS = {
    ERP_DATASOURCE_CONFIG: 'ERPDataSourceConfig',
    ERP_CP_POST_PREFIX: "ERPCpPostPrefix",
    ERP_CP_POST_POSTFIX: "ERPCpPostPostfix",
    ERP_CP_DRS_CONFIG: "ERPCpDRSConfig",
    ERP_CP_ACCRUAL_CONFIG: "ERPCpAccrualConfig",

    API_AUTH_CONFIG: 'ERPApiAuthConfig',
    API_CONFIG: 'ERPApiConfig',
    DTFS_PING_FREQ: 'DTFSPingFrequency',

    //API_TOKEN: 'ERPApiToken',
    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); },
    toEncrypt: function (configName) {
        if (configName == this.API_AUTH_CONFIG) { return true; }
        if (configName == this.API_CONFIG) { return true; }
        return false;
    }
}

// @@TODO: this should come from sys_provider table
const CX_WHS_PROVIDER = {
    BWG: 'bwg',
    SCP: 'scp',
    NISA: 'nisa',
    MUS: 'mus',
    VAL: 'val',
    BAR: 'bar',
    BUNZL: 'bunzl',
    SYSCO: 'sysco',
    GBI: 'gbi',
    toList: function (addEmpty) {
        return enumToList(this, addEmpty, {
            BWG: 'BWG Foods', SCP: 'Southern Co-OP', NISA: 'NISA', MUS: 'Musgraves', VAL: 'Valero', BAR: 'James A Barry & Co Ltd', BUNZL: 'Bunzl Ireland', SYSCO: 'Sysco Ireland', GBI: 'Gala Retail'
        });
    },
    getName: function (value) {
        return enumGetName(this, value, { BWG: 'BWG Foods', SCP: 'Southern Co-OP', NISA: 'NISA', MUS: 'Musgraves', VAL: 'Valero', BAR: 'James A Barry & Co Ltd', BUNZL: 'Bunzl Ireland', SYSCO: 'Sysco Ireland', GBI: 'Gala Retail' });
    },
}
// @@TODO: this should come from sys_provider table
const CX_ERP_PROVIDER = {
    SG200: 'sage200',
    SG200STD: 'sage200std',
    SAGE50: 'sage50',
    SAGEINT: 'sageIntacct',
    SAGEACC: 'sageAccount',
    XERO: 'xero',
    toList: function (addEmpty) {
        return enumToList(this, addEmpty, {
            SG200: 'Sage 200 Professional', SG200STD: 'Sage 200 Standard', SAGE50: 'Sage 50 Accounts', SAGEINT: 'Sage Intacct', SAGEACC: 'Sage Accounting', XERO: 'Xero'
        });
    }
}
// @@TODO: this should come from sys_provider table
const CX_EPOS_PROVIDER = {
    CBE: 'CBE',
    RS: 'RS',
    EDGE: 'EDGE',
    MRDN: 'MRDN',
    VME: 'VME',
    EVOPOS: 'EVOPOS',
    LEADERS: 'LEADERS',
    CAPTIVA: 'CAPTIVA',
    EDATA: 'EDATA',
    ZAMBR: 'ZAMBR',
    PRISM: 'PRISM',

    THERE: 'THERE',
    //
    toList: function (addEmpty) {
        return enumToList(this, addEmpty, {
            CBE: 'CBE',
            RS: 'Retail Solution',
            EDGE: 'EdgePos',
            MRDN: 'Meridian',
            VME: 'VME Retail',
            EVOPOS: 'EvoPos Retail',
            LEADERS: 'Leaders',
            CAPTIVA: 'Captiva',
            EDATA: 'Euro Data',
            ZAMBR: 'Zambrero',
            PRISM: 'PRISM',
            THERE: 'Therefore'
        });
    }
}


const CX_EPOS_PROVIDERS = {
    supported: [
        {
            type: CX_EPOS_PROVIDER.CBE,
            configDefaults: [
                { name: EPOS_DTFS_CONFIGS.FUELCARD_TENDER, value: 'TENDER-8' },
                { name: EPOS_DTFS_CONFIGS.DTFS_PING_FREQ, value: '600' },
                { name: EPOS_DTFS_CONFIGS.DTFS_DATASOURCE_CONFIG, value: '{   "type": "MSSQL",   "serverName": "",   "databaseName": "cbewrdb",   "user": "sa",   "pass": "cbe"  }' },
            ]
        },
        {
            type: CX_EPOS_PROVIDER.RS,
            configDefaults: [
                { name: EPOS_DTFS_CONFIGS.DTFS_PING_FREQ, value: '600' },
                { name: EPOS_DTFS_CONFIGS.DTFS_DATASOURCE_CONFIG, value: '{   "type": "OLEDB",   "connString": ""  }' },
            ]
        },
        {
            type: CX_EPOS_PROVIDER.EDGE,
            configDefaults: [
                { name: EPOS_DTFS_CONFIGS.DTFS_PING_FREQ, value: '600' },
                { name: EPOS_DTFS_CONFIGS.DTFS_DATASOURCE_CONFIG, value: '{   "type": "CXDLL",   "connString": "dll-name;conn-string"  }' },
            ]
        },
        {
            type: CX_EPOS_PROVIDER.MRDN,
            configDefaults: [
                { name: EPOS_DTFS_CONFIGS.DTFS_PING_FREQ, value: '600' },
                { name: EPOS_DTFS_CONFIGS.DTFS_DATASOURCE_CONFIG, value: '{   "type": "MSSQL",   "serverName": "",   "databaseName": "",   "user": "sa",   "pass": ""  }' },
            ]
        },
        {
            type: CX_EPOS_PROVIDER.VME,
            configDefaults: [
                { name: EPOS_DTFS_CONFIGS.DTFS_PING_FREQ, value: '600' },
                { name: EPOS_DTFS_CONFIGS.DTFS_DATASOURCE_CONFIG, value: '{   "type": "MSSQL",   "serverName": "",   "databaseName": "",   "user": "sa",   "pass": ""  }' },
            ]
        },
        {
            type: CX_EPOS_PROVIDER.LEADERS,
            configDefaults: [
                { name: EPOS_DTFS_CONFIGS.DTFS_PING_FREQ, value: '600' },
                { name: EPOS_DTFS_CONFIGS.DTFS_DATASOURCE_CONFIG, value: '{   "type": "MSSQL",   "serverName": "",   "databaseName": "sam4windb001",   "user": "sa",   "pass": ""  }' },
            ]
        },
        {
            type: CX_EPOS_PROVIDER.EVOPOS,
            configDefaults: [
                { name: EPOS_DTFS_CONFIGS.DTFS_DATASOURCE_CONFIG, value: '{   "type": "API",    "endPoint": "",   "company": ""  }' },
            ]
        },
        {
            type: CX_EPOS_PROVIDER.CAPTIVA,
            configDefaults: [
                { name: EPOS_DTFS_CONFIGS.DTFS_DATASOURCE_CONFIG, value: '{   "type": "API",    "endPoint": "",   "company": ""  }' },
            ]
        },
        {
            type: CX_EPOS_PROVIDER.EDATA,
            configDefaults: []
        },
        {
            type: CX_EPOS_PROVIDER.ZAMBR,
            configDefaults: []
        },
        {
            type: CX_EPOS_PROVIDER.PRISM,
            configDefaults: [
                {
                    name: EPOS_DTFS_CONFIGS.DTFS_IMPORT_OPTIONS, value: JSON.stringify({
                        rules: [
                            {
                                contains: 'Adj',
                                tranType: 'ADJ',
                                subType: ''
                            },
                            {
                                contains: 'C.O.S',
                                tranType: 'STOCK',
                                subType: ''
                            },
                            {
                                range: '1200-1251',
                                tranType: 'T-$GL',
                                subType: '$GLDescr'
                            },
                            {
                                range: '4000-4999',
                                tranType: 'SALE',
                                subType: ''
                            }
                        ]
                    })
                },
            ]
        },
        {
            type: CX_EPOS_PROVIDER.THERE,
            configDefaults: [
                { name: EPOS_DTFS_CONFIGS.DTFS_PING_FREQ, value: '600' },
                { name: EPOS_DTFS_CONFIGS.DTFS_DATASOURCE_CONFIG, value: '{   "type": "MSSQL",   "serverName": "",   "databaseName": "Therefore",   "user": "sa",   "pass": ""  }' },
            ]
        },
    ],
    get: function (eposCode) {
        for (var px = 0; px < this.supported.length; px++) {
            if (this.supported[px].type == eposCode) {
                return this.supported[px];
            }
        }
        throw new Error(`EPoS Provider ${eposCode} is not supported!`);
    },
    getConfigDefaults: function (eposCode) {
        return this.get(eposCode).configDefaults;
    }
}


const CX_SYS_USERS = {
    SYSTEM: -1,
    DTFS: -2,
    ERPS: -3,
    MMS: -4,
    SVR: -5,
}

const CX_SHOP = {
    STATUS: {
        INACTIVE: 0,
        ACTIVE: 1,
        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); }
    }
}

const CX_TRADER_TYPE = {
    CUSTOMER: 'C',
    SUPPLIER: 'S',
    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); }
}

const CX_MAP_CONFIG_TYPE = {
    TRAN_TYPE: 1,
    GL_MAP: 2,
    TAX_MAP: 3,
    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); }
}

const CR_CASH_BOOK = {
    REQUIRE_DECLARATION: {
        NO: 0,
        YES: 1,
        FORCE: 2,
        EPOS: 3,
        toList: function (addEmpty) {
            return enumToList(this, addEmpty);
        }
    },
    STATE: {
        Pending: [1, 2],
        Processing: [0, 3, 4, 41, 99, 100],
        PendingPost: [5],
        ProcessingPost: [6, 7, 9],
        Posted: [8],
        Error: [97, 98],
        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                PendingPost: 'pending posting',
                ProcessingPost: 'posting running',
            });
        },
    },
    STATUS: {
        Transferring: 0,           // task is transferring/transforming data from the raw tables
        New: 1,                    // data is ready but never seen/saved by user
        Pending: 2,                // user saved but did not submit
        Refresh: 3,                // user requested dtfs refresh

        PostingPrep: 4,            // user sent this for posting preparation
        PostingPrepAndPost: 41,    // user sent this for posting preparation and posting
        PostingReady: 5,           //
        Posting: 6,                // erps.exe has to  pick up the stuff to post
        PostingRunning: 7,         // erps.exe has picked up the stuff to post
        Posted: 8,                 // posted successfully
        PostingUndo: 9,            // reset to pending

        Error: 97,                 // something went wrong while transferring or during user stuff
        PostingError: 98,          // error while posting
        DeleteAndPull: 99,         // cash book to be deleted and re-gathered
        Delete: 100,               // cash book to be deleted

        //
        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                PostingPrep: 'preparing for posting',
                PostingPrepAndPost: 'preparing and send posting',
                PostingReady: 'ready for posting',
                DeleteAndPull: 'delete and pull again',
                PostingError: 'posting errors',
                PostingRunning: 'posting running',
                PostingUndo: 'reset posting running',
            });
        },
        getName: function (value) {
            return enumGetName(this, value, {
                PostingPrep: 'preparing for posting',
                PostingPrepAndPost: 'preparing and send for posting',
                PostingReady: 'ready for posting',
                DeleteAndPull: 'delete and pull again',
                PostingError: 'posting errors',
                PostingRunning: 'posting running',
            });
        },
        getStyle: function (status, returnObject) {
            var color = 'var(--main-color)'; var bkgColor = '';

            if (status == this.Transferring || status == this.Refresh || status == this.PostingPrep || status == this.PostingPrepAndPost || status == this.Posting || status == this.PostingRunning || status == this.PostingUndo) {
                color = '128,128,128';
                bkgColor = '';
            } else if (status == this.New) {
                color = '255,202,58';
            } else if (status == this.Pending) {
                color = '246,71,146';
                //bkgColor = 'var(--element-bg-color)';
            } else if (status == this.PostingReady) {
                color = '25,130,196';
            } else if (status == this.Posted) {
                color = '138,201,38';
            } else if (status == this.PostingError) {
                color = '234,30,37';
                bkgColor = 'var(--element-bg-color)';
            } else if (status == this.Error) {
                color = '234,30,37';
                bkgColor = 'var(--element-bg-color)';
            } else if (status == this.Delete) {
                color = '83,49,138';
            } else if (status == this.DeleteAndPull) {
                color = '83,49,138';
            }

            var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
            if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
            if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }

            if (returnObject) { return styles; }

            var style = 'color: ' + styles.color + '; ';
            if (bkgColor) { style += ('background-color: ' + styles.bkgColor + '; '); }
            return style;
        },

        getStyleInverted: function (status, returnObject) {
            var color = 'var(--main-color)'; var bkgColor = '';

            if (status == this.Transferring || status == this.Refresh || status == this.PostingPrep || status == this.PostingPrepAndPost || status == this.Posting || status == this.PostingRunning || status == this.PostingUndo) {
                color = '255,255,255';
                bkgColor = '128,128,128';
            } else if (status == this.New) {
                color = '0,0,0';
                bkgColor = '255,202,58';
            } else if (status == this.Pending) {
                color = '255,255,255';
                bkgColor = '246,71,146';
            } else if (status == this.PostingReady) {
                color = '255,255,255';
                bkgColor = '25,130,196';
            } else if (status == this.Posted) {
                color = '0,100,0';
                bkgColor = '138,201,38';
            } else if (status == this.PostingError) {
                color = '255,255,255';
                bkgColor = '234,30,37';
            } else if (status == this.Error) {
                color = '255,255,255';
                bkgColor = '234,30,37';
            } else if (status == this.Delete) {
                color = '255,255,255';
                bkgColor = '83,49,138';
            } else if (status == this.DeleteAndPull) {
                color = '255,255,255';
                bkgColor = '83,49,138';
            }

            var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
            if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
            if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
            if (returnObject) { return styles; }


            return `color: ${styles.color}; background-color: ${styles.bkgColor};`;
        }
    }
}

const EPOS_DTFS_TRANSMISSION = {
    STATUS: {
        PENDING: 0,
        TRANSMITTING: 1,
        FINALIZING: 7,
        COMPLETE: 8,
        ERROR: 9,
        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); }
    },

    ACTION: {
        NONE: 0,
        GET_DATA: 1,
        GET_DATA_RC: 2,
        GET_DATA_FC: 3,
        GET_LOGS: 4,
        UPGRADE: 9,
        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); }
    }
}



const RAW_GET_REQUEST = {
    STATUS: {
        PENDING: 0,
        PROCESSING: 1,
        COMPLETE: 8,
        ERROR: 9,
        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); }
    }
}

const EPOS_DTFS_UPGRADE_AUDIT = {
    STATUS: {
        PENDING: 0,
        WAIT_START: 1,
        UPGRADING: 2,
        ABORTED: 7,
        COMPLETE: 8,
        ERROR: 9,

        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); }
    },

    SERVICES: {
        DTFS: 'dtfs',
        ERPS: 'erps',
        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); }
    }
}

const RENDER = {
    TYPE: {
        LIST: 'list',
        RECORD: 'record',
        DROP_DOWN: 'dropdown'
    },
    // NOTE: this MUST match:
    //  ..\cx.sdk.v0\cx.core.ui.v0\cx-core-ui-declarations.js(ControlType)
    CTRL_TYPE: {
        TEXT: 'inputText',
        TEXT_AREA: 'inputTextArea',
        DATE: 'inputDate',
        NUMERIC: 'inputNumeric',
        CHECK: 'inputCheckBox',
        SELECT: 'inputSelect',
        DROP_DOWN: 'inputDropDown',
        TABLE: 'table',
        FORM: 'form',
        GROUP: 'controlGroup',
        HIDDEN: 'inputHidden',
        PASSWORD: 'password',
    }
}

const SQL = {
    MAX_ROWS: 1000,
    MAX_QUERY_RESULTS: 4000,
    PAGE_SIZE: 200,
}


const CR_PREFERENCE = {
    USER_LANDING_PAGE: 10,
    CB_SKIP_READY_FOR_POST: 100,
    CB_CAN_EDIT_SALES_ACCOUNT: 101,
    CB_CASHBOOK_CAN_POST: 110,
    CB_SHOW_DELETE: 111,
    CB_SHOW_REFRESH: 112,
    CB_SHOW_ADD: 113,
    CB_SHOW_EXPAND: 114,
    CB_SALES_VALIDATION: 200    // NOTE: this is really only available for CBE, but we maybe able to implement it for some other EPoS
}

const CP_PREFERENCE = {
    USER_LANDING_PAGE: 10,
    INV_REQUIRES_REVIEW: 100,
    DEL_GENERATE_INVOICE_ON_TRANSFER: 110,
    INVOICE_EDIT_MODE: {
        ID: 200,
        VALUES: {
            BOTH: 0,
            GL_ONLY: 1,
            ITEM_ONLY: 2
        }
    },
    GRP_INVOICE_EDIT_MODE: {
        ID: 210,
        VALUES: {
            NONE: 0,
            GRP: 1,             // only group invoice GL list
            DOCS: 2,            // only individual documents
            GRP_AND_DOCS: 3,    // both
        }
    },
    MAP_PROD_DO_NOT_USE_MASTER: 300,

}

const CP_PRODUCT = {
    MAP_STATUS: {
        ANY: 0,
        MAPPED: 1,
        //NOT_MAPPED: 2,
        NOT_MAPPED_DEP: 2,
        NOT_MAPPED_TAX: 3,
        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                ANY: ' - any -',
                MAPPED: 'Mapped',
                //NOT_MAPPED: 'Not Mapped',
                NOT_MAPPED_DEP: 'Not Mapped (dep)',
                NOT_MAPPED_TAX: 'Not Mapped (tax)',
            });
        }
    },
}

const CP_DOCUMENT = {
    // PROVIDER: {
    //     BWG: 1,

    //     toList: function (addEmpty) { return enumToList(this, addEmpty); },
    //     getName: function (value) { return enumGetName(this, value); },
    // },

    BATCH_ACTIONS: {
        REFRESH: 1,
        POST: 2,
        RESET: 3,
        UNPOST: 9,
        _GENERATE: 10,
        toList: function (addEmpty) {

            return enumToList(this, addEmpty);
        },
        getName: function (value) { return enumGetName(this, value); },
    },

    TYPE_DR: {
        Delivery: 0,
        Return: 1,
        toList: function (addEmpty) { return enumToList(this, addEmpty); },
        getName: function (value) { return enumGetName(this, value); },
    },
    TYPE_IC: {
        Invoice: 2,
        Credit: 3,
        toList: function (addEmpty) { return enumToList(this, addEmpty); },
        getName: function (value) { return enumGetName(this, value); },
    },
    TYPE: {
        Delivery: 0,
        Return: 1,
        Invoice: 2,
        CreditNote: 3,

        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                CreditNote: 'credit note',
            });
        },
        getName: function (value) {
            return enumGetName(this, value, {
                CreditNote: 'credit note',
            });
        },

        getStyleInverted: function (type, returnObject) {
            var color = 'var(--main-color)'; var bkgColor = '';

            if (type == this.Delivery) {
                color = '0,100,0';
                bkgColor = '138,201,38';
            } else if (type == this.Return) {
                color = '0,0,0';
                bkgColor = '255,202,58';
            } else if (type == this.Invoice) {
                color = '0,100,0';
                bkgColor = '38,201,76';
            } else if (type == this.CreditNote) {
                color = '0,0,0';
                bkgColor = '255,120,58';
            } else {
                color = '255,255,255';
                bkgColor = '128,128,128';
            }

            var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
            if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
            if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
            if (returnObject) { return styles; }
            return `color: ${styles.color} !important; background-color: ${styles.bkgColor} !important;`;
        }

    },
    STATE_INV: {
        Pending: [-1, 0, 3, 4],
        Processing: [1, 2, 99, 100],
        PendingPost: [5],
        ProcessingPost: [6, 7],
        Posted: [8],
        Error: [97, 98],
        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                PendingPost: 'pending posting',
                ProcessingPost: 'posting running',
            });
        },
    },
    STATE_DEL: {
        Pending: [-1, 0, 3, 4],
        Processing: [1, 2, 99, 100],
        Error: [97, 98],
        toList: function (addEmpty) {
            return enumToList(this, addEmpty);
        },
    },
    STATUS: {
        New: -1,
        Ready: 0,
        Generating: 1,
        REFRESH: 2,
        NEED_ATTENTION: 3,         // can't post to ERP
        PendingReview: 4,
        PostingReady: 5,           //
        Posting: 6,                // erps.exe is to pick up the stuff to post
        PostingRunning: 7,         // erps.exe has picked up the stuff to post
        Posted: 8,                 // posted successfully
        ERROR9: 9,
        ERROR: 97,
        PostingError: 98,
        DeleteAndPull: 99,
        Delete: 100,

        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                REFRESH: 'refreshing erp info',
                NEED_ATTENTION: 'mapping issue',
                PendingReview: 'pending review',
                PostingReady: 'ready for posting',
                DeleteAndPull: 'delete and pull again',
                PostingError: 'posting errors',
                PostingRunning: 'posting running',
                ERROR9: 'error',
                //PostingUndo: 'reset posting running',
            });
        },
        getName: function (value) {
            return enumGetName(this, value, {
                REFRESH: 'refreshing erp info',
                NEED_ATTENTION: 'mapping issue',
                PendingReview: 'pending review',
                PostingReady: 'ready for posting',
                DeleteAndPull: 'delete and pull again',
                PostingError: 'posting errors',
                PostingRunning: 'posting running',
                ERROR9: 'error',
                //PostingUndo: 'reset posting running',
            });
        },

        getStyleInverted: function (status, returnObject) {
            var color = 'var(--main-color)'; var bkgColor = '';

            if (status == this.REFRESH || status == this.PostingPrep || status == this.PostingPrepAndPost || status == this.Posting || status == this.PostingRunning) {
                color = '255,255,255';
                bkgColor = '128,128,128';
            } else if (status == this.Ready) {
                color = '255,255,255';
                // bkgColor = '246,71,146';
                bkgColor = '25,130,196';
            } else if (status == this.PostingReady) {
                color = '255,255,255';
                bkgColor = '25,130,196';
            } else if (status == this.Posted) {
                color = '0,100,0';
                bkgColor = '138,201,38';
            } else if (status == this.PostingError) {
                color = '255,255,255';
                bkgColor = '234,30,37';
            } else if (status == this.NEED_ATTENTION) {
                color = '175,0,0';
                bkgColor = '230,230,0';
            } else if (status == this.PendingReview) {
                color = '255,255,255';
                bkgColor = '246,71,146';
            } else if (status == this.ERROR || status == this.ERROR9) {
                color = '255,255,255';
                bkgColor = '234,30,37';
            } else if (status == this.Delete) {
                color = '255,255,255';
                bkgColor = '83,49,138';
            } else if (status == this.DeleteAndPull) {
                color = '255,255,255';
                bkgColor = '83,49,138';
            } else {
                color = '255,255,255';
                bkgColor = '128,128,128';
            }

            var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
            if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
            if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
            if (returnObject) { return styles; }

            return `color: ${styles.color}; background-color: ${styles.bkgColor};`;
        }
    },

    RECO_STATUS: {
        NotAnalyzed: 0,
        NotReconciled: 1,
        PartReconciled: 5,
        Pending: 6,
        Reconciled: 7,
        NeverReconcile: 8,
        ERROR: 9,
        Processing: 99,

        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                NotAnalyzed: 'not analyzed',
                NotReconciled: 'not matched',
                PartReconciled: 'part matched',
                Pending: 'validate match',
                Reconciled: 'matched',
                NeverReconcile: 'ignore matching',
            });
        },
        getName: function (value) {
            return enumGetName(this, (value || this.NotAnalyzed), {
                NotAnalyzed: 'not analyzed',
                NotReconciled: 'not matched',
                PartReconciled: 'part matched',
                Pending: 'validate match',
                Reconciled: 'matched',
                NeverReconcile: 'ignore matching',

            });
        },

        getStyleInverted: function (status, returnObject) {
            var color = 'var(--main-color)'; var bkgColor = '';
            if (!status) { status == this.NotAnalyzed; }
            if (status == this.NotAnalyzed || status == this.NotReconciled) {
                color = 'var(--main-color)';
                bkgColor = 'var(--main-bg-color)';
            } else if (status == this.Pending) {
                color = '175,0,0';
                bkgColor = '230,230,0';
            } else if (status == this.PartReconciled) {
                color = '255,255,255';
                bkgColor = '25,130,196';
            } else if (status == this.Reconciled || status == this.NeverReconcile) {
                color = '0,100,0';
                bkgColor = '138,201,38';
            } else if (status == this.ERROR) {
                color = '255,255,255';
                bkgColor = '234,30,37';
            } else {
                color = '255,255,255';
                bkgColor = '128,128,128';
            }

            var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
            if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
            if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
            if (returnObject) { return styles; }

            return `color: ${styles.color}; background-color: ${styles.bkgColor};`;
        }
    },

    IMPORT_STATUS: {
        Pending: 0,
        Running: 1,
        Cancel: 6,
        Cancelled: 7,
        Completed: 8,
        ERROR: 9,
        Deleting: 98,
        Deleted: 99,

        toList: function (addEmpty) {
            return enumToList(this, addEmpty);
        },
        getName: function (value) {
            return enumGetName(this, value);
        },

        getStyleInverted: function (status, returnObject) {
            var color = 'var(--main-color)'; var bkgColor = '';

            if (status == this.Pending) {
                color = '255,255,255';
                bkgColor = '25,130,196';
            } else if (status == this.Running) {
                color = '0,0,0';
                bkgColor = '255,202,58';
            } else if (status == this.Completed) {
                color = '0,100,0';
                bkgColor = '138,201,38';
            } else if (status == this.Cancel) {
                color = '255,255,255';
                bkgColor = '83,49,138';
            } else if (status == this.Cancelled) {
                color = '255,255,255';
                bkgColor = '128,128,128';
            } else if (status == this.ERROR) {
                color = '255,255,255';
                bkgColor = '234,30,37';
            } else {
                color = '255,255,255';
                bkgColor = '128,128,128';
            }

            var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
            if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
            if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
            if (returnObject) { return styles; }


            return `color: ${styles.color}; background-color: ${styles.bkgColor};`;
        }

    }
}

const CP_DOCUMENT_LINE = {
    STATUS: {
        New: 0,
        Ready: 1,
        NotDelivered: 2,
        FreeStock: 3,
        REFRESH: 8,
        ERROR: 9,
        // Reconciled_None: 10,
        // Reconciled_Part: 11,
        // Reconciled_Full: 12,

        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                NotDelivered: 'not delivered',
                FreeStock: 'free stock',
            });
        },
        getName: function (value) {
            return enumGetName(this, value, {
                NotDelivered: 'not delivered',
                FreeStock: 'free stock',
            });
        },

        getStyleInverted: function (status, returnObject) {
            var color = 'var(--main-color)'; var bkgColor = '';

            if (status == this.New) {
                color = '0,0,0';
                bkgColor = '255,202,58';
            } else if (status == this.Ready) {
                color = '255,255,255';
                bkgColor = '25,130,196';
            } else if (status == this.NotDelivered) {
                color = '255,255,255';
                bkgColor = '128,128,128';
            } else if (status == this.FreeStock) {
                color = '0,100,0';
                bkgColor = '138,201,38';
            } else if (status == this.REFRESH) {
                color = '255,255,255';
                bkgColor = '128,128,128';
            } else if (status == this.ERROR) {
                color = '255,255,255';
                bkgColor = '234,30,37';
            } else {
                color = '255,255,255';
                bkgColor = '128,128,128';
            }

            var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
            if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
            if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
            if (returnObject) { return styles; }


            return `color: ${styles.color}; background-color: ${styles.bkgColor};`;
        }
    }
}

const CP_QUERY_TYPE_REQ_DISPUTED = {
    NO: 0,
    MANUAL: 1,
    FULL: 2,

    toList: function (addEmpty) { return enumToList(this, addEmpty); },
    getName: function (value) {
        return enumGetName(this, value, { IN_PROGRESS: 'in progress' });
    },
    getStyleInverted: function (status, returnObject) {
        var color = 'var(--main-color)'; var bkgColor = '';

        if (status == this.MANUAL) {
            color = '255,255,255';
            bkgColor = '246,71,146';
        } else if (status == this.FULL) {
            color = '255,255,255';
            bkgColor = '25,130,196';
        } else {
            color = '255,255,255';
            bkgColor = '77,77,77';
        }

        var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
        if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
        if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
        if (returnObject) { return styles; }

        return `color: ${styles.color}; background-color: ${styles.bkgColor};`;
    }
}

const CP_QUERY_STATUS = {
    PENDING: 0,
    SUBMITTED: 1,
    WAITING_INFO: 2,
    IN_PROGRESS: 3,
    RESOLVED_PENDING: 7,
    RESOLVED: 8,
    CLOSED: 10,
    ERROR: 9,

    toList: function (addEmpty) {
        return enumToList(this, addEmpty, {
            WAITING_INFO: 'waiting info from you',
            IN_PROGRESS: 'in progress',
            RESOLVED_PENDING: 'resolved, pending review',
        });
    },
    getName: function (value) {
        return enumGetName(this, value, {
            WAITING_INFO: 'waiting info from you',
            IN_PROGRESS: 'in progress',
            RESOLVED_PENDING: 'resolved, pending review',
        });
    },
    getStyleInverted: function (status, returnObject) {
        var color = 'var(--main-color)'; var bkgColor = '';

        if (status == this.PENDING) {
            color = '255,255,255';
            bkgColor = '246,71,146';
        } else if (status == this.SUBMITTED) {
            color = '255,255,255';
            bkgColor = '25,130,196';
        } else if (status == this.WAITING_INFO) {
            color = '255,0,0';
            bkgColor = '230,230,0';
        } else if (status == this.IN_PROGRESS) {
            color = '175,0,0';
            bkgColor = '230,230,0';
        } else if (status == this.ERROR) {
            color = '255,255,255';
            bkgColor = '234,30,37';
        } else if (status == this.RESOLVED_PENDING) {
            color = '25,42,196';
            bkgColor = '30,201,133';
        } else if (status == this.RESOLVED) {
            color = '0,100,0';
            bkgColor = '138,201,38';
        } else if (status == this.CLOSED) {
            color = '100,0,0';
            bkgColor = '128,128,128';
        } else {
            color = '255,255,255';
            bkgColor = '128,128,128';
        }

        var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
        if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
        if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
        if (returnObject) { return styles; }

        return `color: ${styles.color}; background-color: ${styles.bkgColor};`;
    }
}


const CP_WHS_CONFIG = {
    BWG_CRM_CONFIG: 'BWGCRMConfig',
    WHS_API_CONFIG: 'WhsAPIConfig',
    ONE_DRIVE_CONFIG: 'OneDriveConfig',
    EMAIL_CONFIG: 'EmailConfig',

    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); },
    toEncrypt: function (configName) {
        return true;
    }
}
const CP_WHS_SHOP_CONFIG = {
    BWG_CRM_CONFIG: 'BWGCRMConfig',
    WHS_API_CONFIG: 'WhsAPIConfig',
    ONE_DRIVE_CONFIG: 'OneDriveConfig',
    EMAIL_CONFIG: 'EmailConfig',
    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); },
    toEncrypt: function (configName) {
        return true;
    }
}

const CP_DOCUMENT_LOG = {
    STATUS: {
        INFO: 'INFO',
        WARNING: 'WARNING',
        ERROR: 'ERROR',
        toList: function (addEmpty) { return enumToList(this); }
    }
}

const CX_CURRENCY = {
    EUR: 'EUR',
    GBP: 'GBP',
    //
    toList: function (addEmpty) { return enumToList(this, addEmpty, { EUR: 'EUR', GBP: 'GBP' }); },
    getName: function (value) { return enumGetName(this, value); },
}


const ERP_TRAN_STATUS = {
    Ready: 0,
    Posted: 1,
    Error: 9,


    getStyleInverted: function (status, returnObject) {
        var color = 'var(--main-color)'; var bkgColor = '';

        if (status == this.Ready) {
            color = '255,255,255';
            bkgColor = '25,130,196';
        } else if (status == this.Posted) {
            color = '0,100,0';
            bkgColor = '138,201,38';
        } else if (status == this.Error) {
            color = '255,255,255';
            bkgColor = '234,30,37';
        } else {
            color = '255,255,255';
            bkgColor = '128,128,128';
        }

        var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
        if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
        if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
        if (returnObject) { return styles; }

        return `color: ${styles.color}; background-color: ${styles.bkgColor};`;
    }
}

const SYS_CUSTOM_SCRIPT = {
    STAGE: {
        BEFORE: 'before',
        AFTER: 'after',
        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); },
        getName: function (value) { return enumGetName(this, value); },
    },

    PROCESS: {
        TRANSFORM: 'transform',
        POST: 'post',
        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); },
        getName: function (value) { return enumGetName(this, value); },
    }
}

const SYS_SERVER_TASK = {
    TASK_TYPE: {
        Server: 0,
        Task: 1,

        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                Server: 'Server Task',
                Task: 'Worker Task'
            });
        },
        getName: function (value) {
            return enumGetName(this, value, {
                Server: 'Server Task',
                Task: 'Worker Task'
            });
        },
        getStyleInverted: function (status, returnObject) {
            var color = 'var(--main-color)'; var bkgColor = '';

            if (status == this.Server) {
                color = '255,255,255';
                bkgColor = '138,175,78';
            } else if (status == this.Task) {
                color = '0,100,0';
                bkgColor = '138,201,38';
            } else {
                color = '255,255,255';
                bkgColor = '128,128,128';
            }

            var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
            if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
            if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
            if (returnObject) { return styles; }

            return `color: ${styles.color}; background-color: ${styles.bkgColor};`;
        }

    },
    TASK_STATUS: {
        Disabled: 0,
        NotScheduled: 1,
        Scheduled: 2,

        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                Disabled: 'Disabled',
                NotScheduled: 'Not Scheduled',
                Scheduled: 'Scheduled',
            });
        },
        getName: function (value) {
            return enumGetName(this, value, {
                Disabled: 'Disabled',
                NotScheduled: 'Not Scheduled',
                Scheduled: 'Scheduled',
            });
        },

        getStyleInverted: function (status, returnObject) {
            var color = 'var(--main-color)'; var bkgColor = '';

            if (status == this.NotScheduled) {
                color = '255,255,255';
                bkgColor = '146,71,146';
            } else if (status == this.Scheduled) {
                color = '0,100,0';
                bkgColor = '138,201,38';
            } else {
                color = '255,255,255';
                bkgColor = '128,128,128';
            }

            var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
            if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
            if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
            if (returnObject) { return styles; }

            return `color: ${styles.color}; background-color: ${styles.bkgColor};`;
        }
    },
    RUN_STATUS: {
        Idle: 0,
        ManualStart: 1,
        Pending: 3,
        Deferred: 5,
        Running: 7,
        Completed: 8,
        ERROR: 9,

        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                Idle: 'Idle',
                ManualStart: 'Manual Start',
                Pending: 'Pending',
                Deferred: 'Deferred',
                Running: 'Running',
                Completed: 'Completed',
                ERROR: 'ERROR',
            });
        },
        getName: function (value) {
            return enumGetName(this, value, {
                Idle: 'Idle',
                ManualStart: 'Manual Start',
                Pending: 'Pending',
                Deferred: 'Deferred',
                Running: 'Running',
                Completed: 'Completed',
                ERROR: 'ERROR',
            });
        },

        getStyleInverted: function (status, returnObject) {
            var color = 'var(--main-color)'; var bkgColor = '';

            if (status == this.Pending || status == this.ManualStart) {
                color = '255,255,255';
                bkgColor = '246,71,146';
            } else if (status == this.Deferred) {
                color = '255,255,255';
                bkgColor = '25,130,196';
            } else if (status == this.Running) {
                color = '175,0,0';
                bkgColor = '230,230,0';
            } else if (status == this.ERROR) {
                color = '255,255,255';
                bkgColor = '234,30,37';
            } else if (status == this.Completed) {
                color = '0,100,0';
                bkgColor = '138,201,38';
            } else if (status == this.Idle) {
                color = '100,0,0';
                bkgColor = '128,128,128';
            } else {
                color = '255,255,255';
                bkgColor = '128,128,128';
            }

            var styles = { color: color, bkgColor: bkgColor, colorRgb: color, bkgColorRgb: bkgColor };
            if (styles.color && styles.color.indexOf('var') < 0) { styles.color = 'rgb(' + styles.color + ')'; }
            if (styles.bkgColor && styles.bkgColor.indexOf('var') < 0) { styles.bkgColor = 'rgb(' + styles.bkgColor + ')'; }
            if (returnObject) { return styles; }

            return `color: ${styles.color}; background-color: ${styles.bkgColor};`;
        }
    },
    LOG_TYPE: {
        INFO: 'info',
        WARN: 'warning',
        ERROR: 'ERROR',
        CRITICAL: 'IMPORTANT'
    },
    TASK_WORKER: {
        Cx_Log_CleanUp: 1,
        Cx_RawData_CleanUp: 2,
        Whs_Document_Import: 100,
        Drive_Document_Import: 101,
        Dtfs_Get_Request: 200,
        EPoS_Api_Service: 201,
        EPoS_Cashbook_Import: 202,
        Therefore_Service: 300,
        BWG_Service: 310,
        toList: function (addEmpty) {
            return enumToList(this, addEmpty, null, {
                Cx_Log_CleanUp: { name: 'System Logs Clean-up', desc: 'deletes system logs older than the days specified.\n\nAllowed parameters:\ndays_old=N;\n\nwhere N must be greater than 180 and less than 999\ndefault is 365 days', params: '' },
                Cx_RawData_CleanUp: { name: 'Raw data left-overs', desc: 'deletes raw data leftover by failed transmissions.', params: '' },
                Whs_Document_Import: { name: 'Wholesaler Document Import (API)', desc: 'imports documents from wholesalers that provide an API.\n\nRequired parameters:\nprovider=providerId;\n\nOptional Parameters:\nshops=[shop1,shop2];\nfrom=yyyy-MM-dd;\nto=yyyy-MM-dd;', params: 'provider=' },
                Drive_Document_Import: { name: 'Cloud Storage Document Import (API)', desc: 'imports wholesaler flat files from cloud storage providers (i.e.: one-drive, google-drive).\n\nRequired parameters:\nprovider=providerId;\n\nOptional parameters:\nshops=[shop1,shop2];', params: 'provider=' },
                Dtfs_Get_Request: { name: 'DTFS Get Request', desc: 'generates get requests for dtfs/erps.\n\nRequired parameters:\nsvc=[dtfs|erps];\nmodule=[static|purchase];\n\nOptional parameters:\nshops=[shop1,shop2];\nday_offset=[n]', params: 'svc=;module=;' },
                EPoS_Api_Service: { name: 'EPoS API Service', desc: 'cloud EPoS Service.\n\nOptional parameters:\nshops=[shop1,shop2];', params: '' },
                EPoS_Cashbook_Import: { name: 'EPoS Cashbook Import', desc: 'EPoS CashBook Import Service (One Drive).\n\nOptional parameters:\nprovider=[eposProvider];\nshops=[shop1,shop2];', params: '' },
                Therefore_Service: { name: 'Therefore service', desc: 'gets scanned documents information from therefore.\n\nOptional parameters:\nshops=[shop1,shop2];', params: '' },
                BWG_Service: { name: 'BWG Query Status Service', desc: 'check status of pending BWG queries.\n\nOptional parameters:\nshops=[shop1,shop2];\ncreated_from=yyyy-MM-dd;\nquery=[query-reference];', params: '' },
            });
        },
        getName: function (value) {
            return enumGetName(this, value);
        },
    },

}

const CX_ATTACHMENT = {
    TYPE: {
        None: 0,
        Scanned: 10,
        File: 20,
        PDF: 21,
        CVS: 32,

        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                None: 'Unknown',
                Scanned: 'Scanned',
                File: 'File',
                PDF: 'PDF',
                CSV: 'CSV'
            });
        },
        getName: function (value) {
            return enumGetName(this, value, {
                None: 'Unknown',
                Scanned: 'Scanned',
                File: 'File',
                PDF: 'PDF',
                CSV: 'CSV'
            });
        },
    },

    SOURCE: {
        Therefore: 'there',
        OneDrive: 'one',
        toList: function (addEmpty) {
            return enumToList(this, addEmpty, {
                Therefore: 'Therefore',
                OneDrive: 'One Drive',
            });
        },
        getName: function (value) {
            return enumGetName(this, value, {
                Therefore: 'Therefore',
                OneDrive: 'One Drive',
            });
        },
    }
}


module.exports = {
    CX_CURRENCY: CX_CURRENCY,
    CX_SYS_USERS: CX_SYS_USERS,
    CX_LOGIN_STATUS: CX_LOGIN_STATUS,
    CX_LOGIN_TOKEN_STATUS: CX_LOGIN_TOKEN_STATUS,
    CX_LOGIN_TOKEN_TYPE: CX_LOGIN_TOKEN_TYPE,
    CX_LOGIN_CACHE_TYPE: CX_LOGIN_CACHE_TYPE,
    CX_ROLE: CX_ROLE,
    CX_MODULE: CX_MODULE,
    CX_SERVICES: CX_SERVICES,
    CX_LOG_TYPE: CX_LOG_TYPE,
    CX_WHS_PROVIDER: CX_WHS_PROVIDER,
    CX_ERP_PROVIDER: CX_ERP_PROVIDER,
    CX_EPOS_PROVIDER: CX_EPOS_PROVIDER,
    CX_EPOS_PROVIDERS: CX_EPOS_PROVIDERS,
    CX_SHOP: CX_SHOP,
    CX_MAP_CONFIG_TYPE: CX_MAP_CONFIG_TYPE,
    CX_TRADER_TYPE: CX_TRADER_TYPE,
    CX_ATTACHMENT: CX_ATTACHMENT,
    CR_CASH_BOOK: CR_CASH_BOOK,
    CR_PREFERENCE: CR_PREFERENCE,
    CP_PREFERENCE: CP_PREFERENCE,
    CP_DOCUMENT: CP_DOCUMENT,
    CP_DOCUMENT_LINE: CP_DOCUMENT_LINE,
    CP_DOCUMENT_LOG: CP_DOCUMENT_LOG,
    CP_PRODUCT: CP_PRODUCT,
    CP_WHS_CONFIG: CP_WHS_CONFIG,
    CP_WHS_SHOP_CONFIG: CP_WHS_SHOP_CONFIG,
    CP_QUERY_STATUS: CP_QUERY_STATUS,
    CP_QUERY_TYPE_REQ_DISPUTED: CP_QUERY_TYPE_REQ_DISPUTED,
    EPOS_DTFS_CONFIGS: EPOS_DTFS_CONFIGS,
    EPOS_DTFS_SETTING: EPOS_DTFS_SETTING,
    EPOS_DTFS_TRANSMISSION: EPOS_DTFS_TRANSMISSION,
    EPOS_DTFS_UPGRADE_AUDIT: EPOS_DTFS_UPGRADE_AUDIT,
    ERP_DTFS_SETTING: ERP_DTFS_SETTING,
    ERP_DTFS_CONFIGS: ERP_DTFS_CONFIGS,
    ERP_TRAN_STATUS, ERP_TRAN_STATUS,
    RAW_GET_REQUEST: RAW_GET_REQUEST,
    SYS_CUSTOM_SCRIPT: SYS_CUSTOM_SCRIPT,
    SYS_SERVER_TASK: SYS_SERVER_TASK,
    RENDER: RENDER,
    SQL: SQL,
}
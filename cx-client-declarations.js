'use strict'

// TODO: move to core sdk
function enumToList(obj, addEmpty, aliases) {
    if (!aliases) { aliases = {}; }

    var enums = [];
    if (addEmpty) { enums.push({ value: '', text: (addEmpty == true) ? '' : addEmpty }); }
    for (var key in obj) {
        // @CLEAN-UP: use a better way to do this, the 1st three below are functions
        if (key == 'toList') { continue; }
        if (key == 'getName') { continue; }
        if (key == 'getStyle') { continue; }
        if (key == 'listOptions') { continue; }

        if (key == 'CX_ADMIN') { continue; }
        if (key == 'CX_SUPPORT') { continue; }
        if (key == '_NAME') { continue; }


        enums.push({
            value: obj[key],
            text: (aliases[key]) ? aliases[key] : key.toLowerCase(),
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
    getName: function (value) { return enumGetName(this, value); },
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

const CX_MODULE = {
    STATIC: 'static',
    RETAIL: 'retail',
    PURCHASE: 'purchase',

    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); }
}


const CX_SERVICES = {
    DTFS: 'dtfs',
    ERPS: 'erps',
    ERP: 'erp',

    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); }
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
    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); }
}

const CX_EPOS_PROVIDER = {
    CBE: 'CBE',
    //RS: 'RetailSolution',
    //
    toList: function (addEmpty) { return enumToList(this, addEmpty); }
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
        }
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
        toList: function () {
            return enumToList(this);
        }
    },
    STATE: {
        Pending: [1, 2],
        Processing: [0, 3, 4, 99, 100],
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

        PostingPrep: 4,            // user sent this for poosting
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
                PostingReady: 'ready for posting',
                DeleteAndPull: 'delete and pull again',
                PostingError: 'posting errors',
                PostingRunning: 'posting running',
            });
        },
        getName: function (value) {
            return enumGetName(this, value, {
                PostingPrep: 'preparing for posting',
                PostingReady: 'ready for posting',
                DeleteAndPull: 'delete and pull again',
                PostingError: 'posting errors',
                PostingRunning: 'posting running',
            });
        },
        getStyle: function (status, returnObject) {
            var color = 'var(--main-color)';
            var colorRgb = 'var(--main-color)';
            var bkgColor = '';

            if (status == this.Transferring) {
                color = 'gray';
                colorRgb = '128,128,128';
            } else if (status == this.New) {
                color = '#ffca3a';
                colorRgb = '255,202,58';
            } else if (status == this.Pending) {
                color = '#ffca3a';
                colorRgb = '255,202,58';
                bkgColor = 'var(--element-bg-color)';
            } else if (status == this.Refresh) {
                color = 'gray';
                colorRgb = '128,128,128';
            } else if (status == this.PostingPrep) {
                color = 'gray';
                colorRgb = '128,128,128';
            } else if (status == this.PostingReady) {
                color = '#1982c4';
                colorRgb = '25,130,196';
            } else if (status == this.Posting) {
                color = 'gray';
                colorRgb = '128,128,128';
            } else if (status == this.PostingRunning) {
                color = 'gray';
                colorRgb = '128,128,128';
            } else if (status == this.Posted) {
                color = '#8ac926';
                colorRgb = '138,201,38';
            } else if (status == this.PostingError) {
                color = '#ea1e25';
                colorRgb = '234,30,37';
                bkgColor = 'var(--element-bg-color)';
            } else if (status == this.Error) {
                color = '#ea1e25';
                colorRgb = '234,30,37';
                bkgColor = 'var(--element-bg-color)';
            } else if (status == this.Delete) {
                color = '#53318a';
                colorRgb = '83,49,138';
            } else if (status == this.DeleteAndPull) {
                color = '#53318a';
                colorRgb = '83,49,138';
            }

            if (returnObject) {
                return {
                    color: color,
                    colorRgb: colorRgb,
                    bkgColor: bkgColor
                }
            }

            var style = 'color: ' + color + '; ';
            if (bkgColor) { style += ('background-color: ' + bkgColor + '; '); }
            return style;
        },

        getStyleInverted: function (status) {
            var color = 'var(--main-color)';
            var bkgColor = '';

            if (status == this.Transferring || status == this.Refresh || status == this.PostingPrep || status == this.Posting || status == this.PostingRunning) {
                color = 'white';
                bkgColor = 'gray';
            } else if (status == this.New) {
                color = 'black';
                bkgColor = '#Ffe4a0';
            } else if (status == this.Pending) {
                color = 'black';
                bkgColor = '#ffca3a';
            } else if (status == this.PostingReady) {
                color = 'white';
                bkgColor = '#1982c4';
            } else if (status == this.Posted) {
                color = 'darkgreen';
                bkgColor = '#8ac926';
            } else if (status == this.PostingError) {
                color = 'white';
                bkgColor = '#ea1e25';
            } else if (status == this.Error) {
                color = 'white';
                bkgColor = '#ea1e25';
            } else if (status == this.Delete) {
                color = 'white';
                bkgColor = '#53318a';
            } else if (status == this.DeleteAndPull) {
                color = 'white';
                bkgColor = '#53318a';
            }

            return `color: ${color}; background-color: ${bkgColor};`;
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

    // TODO: move to own enum
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
        SELECT: 'inputSelect',
        DROP_DOWN: 'inputDropDown',
        NUMERIC: 'inputNumeric',
    }
}

const SQL = {
    MAX_ROWS: 1000,
    MAX_QUERY_RESULTS: 4000,
}

module.exports = {
    CX_SYS_USERS: CX_SYS_USERS,
    CX_LOGIN_STATUS: CX_LOGIN_STATUS,
    CX_ROLE: CX_ROLE,
    CX_MODULE: CX_MODULE,
    CX_SERVICES: CX_SERVICES,
    CX_EPOS_PROVIDER: CX_EPOS_PROVIDER,
    CX_EPOS_PROVIDERS: CX_EPOS_PROVIDERS,
    CX_SHOP: CX_SHOP,
    CX_MAP_CONFIG_TYPE: CX_MAP_CONFIG_TYPE,
    CX_TRADER_TYPE: CX_TRADER_TYPE,
    CR_CASH_BOOK: CR_CASH_BOOK,
    EPOS_DTFS_CONFIGS: EPOS_DTFS_CONFIGS,
    EPOS_DTFS_SETTING: EPOS_DTFS_SETTING,
    EPOS_DTFS_TRANSMISSION: EPOS_DTFS_TRANSMISSION,
    EPOS_DTFS_UPGRADE_AUDIT: EPOS_DTFS_UPGRADE_AUDIT,
    RAW_GET_REQUEST: RAW_GET_REQUEST,
    RENDER: RENDER,
    SQL: SQL,
}
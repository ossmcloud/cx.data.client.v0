'use strict'
// TODO: move to core sdk
function enumToList(obj, addEmpty) {
    var enums = [];
    if (addEmpty) { enums.push({ value: '', text: (addEmpty == true) ? '' : addEmpty }); }
    for (var key in obj) {
        // @CLEAN-UP: use a better way to do this, the 1st three below are functions
        if (key == 'toList') { continue; }
        if (key == 'getName') { continue; }
        if (key == 'listOptions') { continue; }

        if (key == 'CX_ADMIN') { continue; }
        if (key == 'CX_SUPPORT') { continue; }
        if (key == '_NAME') { continue; }
        enums.push({
            value: obj[key],
            text: key.toLowerCase(),
        });
    }
    return enums;
}
function enumGetName(obj, value) {
    for (var key in obj) {
        if (key == 'toList') { continue; }
        if (key == 'getName') { continue; }
        if (obj[key] == value) { return key.toLowerCase(); }
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
    SUPERVISOR: 3,       // allow posting, handle dtfs, add/remove shops from logins
    MANAGER: 5,          // handle shop groups, shops, logins
    ADMIN: 7,           // full access
    //
    CX_SUPPORT: 8,     // ossm support login role
    CX_ADMIN: 9,       // web master access


    toList: function (addEmpty) { return enumToList(this, addEmpty); },
    getName: function (value) { return enumGetName(this, value); },
    listOptions: function (showId, showCheckBox) { return enumToListRenderOptions(this, showId, showCheckBox); }
}

const CX_MODULE = {
    RETAIL: 'retail',
    PURCHASE: 'purchase',
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




const CX_SHOP = {
    STATUS: {
        INACTIVE: 0,
        ACTIVE: 1,
        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); }
    }
}

const CR_CASH_BOOK = {
    STATUS: {
        Transferring: 0,           // task is transferring/transforming data from the raw tables
        New: 1,                    // data is ready but never seen/saved by user
        Pending: 2,                // user saved but did not submit
        Refresh: 3,                // user requested dtfs refresh
        Submitted: 4,              // user sent this for poosting
        Posting: 5,                // erps.exe has picked up the stuff to post
        Posted: 6,                 // posted successfully
        Error: 7,                  // something went wrong while transferring or during user stuff
        PostingError: 8,           // error while posting
        DeleteAndPull: 9,                 // cash book to be deleted
        Delete: 10,                 // cash book to be deleted

        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); },
        getName: function (value) { return enumGetName(this, value); },
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
    CX_ROLE: CX_ROLE,
    CX_MODULE: CX_MODULE,
    CX_EPOS_PROVIDER: CX_EPOS_PROVIDER,
    CX_EPOS_PROVIDERS: CX_EPOS_PROVIDERS,
    CX_SHOP: CX_SHOP,
    CR_CASH_BOOK: CR_CASH_BOOK,
    EPOS_DTFS_CONFIGS: EPOS_DTFS_CONFIGS,
    EPOS_DTFS_SETTING: EPOS_DTFS_SETTING,
    EPOS_DTFS_TRANSMISSION: EPOS_DTFS_TRANSMISSION,
    RAW_GET_REQUEST: RAW_GET_REQUEST,
    EPOS_DTFS_UPGRADE_AUDIT: EPOS_DTFS_UPGRADE_AUDIT,
    RENDER: RENDER,
    SQL: SQL,
}
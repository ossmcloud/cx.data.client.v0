'use strict'

function enumToList(obj, addEmpty) {
    var enums = [];
    if (addEmpty) { enums.push({ value: '', text: (addEmpty == true) ? '' : addEmpty }); }
    for (var key in obj) {
        if (key == 'toList') { continue; }
        if (key == 'getName') { continue; }
        if (key == 'CX_ADMIN') { continue; }
        if (key == 'CX_SUPPORT') { continue; }
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

const CX_ROLE = {
    CX_ADMIN: -9,       // web master access
    CX_SUPPORT: -7,     // ossm support login role
    
    CASHBOOK: 0,        // cash book only
    USER: 1,            // data entry and little more
    SUPERVISOR: 3,       // allow posting, handle dtfs, add/remove shops from logins
    MANAGER: 5,          // handle shop groups, shops, logins

    ADMIN: 7,           // full access
    

    toList: function (addEmpty) { return enumToList(this, addEmpty); },
    getName: function (value) { return enumGetName(this, value); },
}

const CR_SHOP_CONFIGS = {
    FUELCARD_TENDER: 'FuelCardTender',
    DTFS_PING_FREQ: 'DTFSPingFrequency',
    DTFS_DATASOURCE_CONFIG: 'DTFSDataSourceConfig',
}

const CX_SHOP = {
    STATUS: {
        INACTIVE: 0,
        ACTIVE: 1,

        //
        toList: function (addEmpty) { return enumToList(this, addEmpty); }
    }
    
}

const CR_SHOP_TRANSMISSION = {
    STATUS: {
        PENDING: 0,
        TRANSMITTING: 1,
        //
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
        DATE: 'inputDate',
        // DATE_TIME: 'inputDateTime',
        SELECT: 'inputSelect',
        DROP_DOWN: 'inputDropDown',
    }
}

const SQL = {
    MAX_ROWS: 1000
}

module.exports = {
    CX_ROLE: CX_ROLE,
    CX_SHOP: CX_SHOP,
    CR_SHOP_CONFIGS: CR_SHOP_CONFIGS,
    CR_SHOP_TRANSMISSION: CR_SHOP_TRANSMISSION,
    RAW_GET_REQUEST: RAW_GET_REQUEST,
    RENDER: RENDER,
    SQL: SQL,
}
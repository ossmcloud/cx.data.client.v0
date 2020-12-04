'use strict'

function enumToList(obj, addEmpty) {
    var enums = [];
    if (addEmpty) { enums.push({ value: '', text: (addEmpty == true) ? '' : addEmpty }); }
    for (var key in obj) {
        if (key == 'toList') { continue; }
        enums.push({
            value: obj[key],
            text: key.toLowerCase(),
        });
    }
    return enums;
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
        SELECT: 'inputSelect',
        DROP_DOWN: 'inputDropDown',
    }
}

const SQL = {
    MAX_ROWS: 1000
}

module.exports = {
    CX_SHOP: CX_SHOP,
    CR_SHOP_CONFIGS: CR_SHOP_CONFIGS,
    CR_SHOP_TRANSMISSION: CR_SHOP_TRANSMISSION,
    RAW_GET_REQUEST: RAW_GET_REQUEST,
    RENDER: RENDER,
    SQL: SQL,
}
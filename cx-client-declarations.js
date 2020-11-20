'use strict'

const CR_SHOP_CONFIGS = {
    FUELCARD_TENDER: 'FuelCardTender',
    DTFS_PING_FREQ: 'DTFSPingFrequency',
    DTFS_DATASOURCE_CONFIG: 'DTFSDataSourceConfig',
}

const CR_SHOP_TRANSMISSION = {
    STATUS: {
        PENDING: 0,
        TRANSMITTING: 1,
        //
        FINALIZING: 7,
        COMPLETE: 8,
        ERROR: 9,
    },

    ACTION: {
        NONE: 0,
        GET_DATA: 1,
        GET_DATA_RC: 2,
        GET_DATA_FC: 3,
        GET_LOGS: 4,
        UPGRADE: 9,
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

module.exports = {
    CR_SHOP_CONFIGS: CR_SHOP_CONFIGS,
    CR_SHOP_TRANSMISSION: CR_SHOP_TRANSMISSION,
    RAW_GET_REQUEST: RAW_GET_REQUEST,
}
'use strict';

const _path = require('path');
const _cx_data = require('cx-data');
const _cx_client_schema = require('./cx-client-schema');
const _cx_client_declarations = require('./cx-client-declarations');

const DTFSUtils = require('./svc.dtfs/cx-dtfs-utils');

class CXClientContext extends _cx_data.DBContext {
    constructor(pool) {
        // TODO: get proper path like relative to or something
        super(pool, _path.join(__dirname, 'business'));
    }

    


    // generateTransmissionID(svcName, shopId) {
    //     // transmission session can be generated by a number of processes, we assign a simple ID for each one
    //     var svcId = '-10';
    //     if (svcName == 'dtfs') { svcId = '10'; }
    //     if (svcName == 'sage200') { svcId = '20'; }
    //     if (svcName == 'sage50') { svcId = '30'; }
    //     // also, each transmission relates to a single shop, so we append the shop id
    //     var transmissionId = svcId + shopId.toString();
    //     // we also use the system ticks we should make it unique
    //     transmissionId += (new Date()).getTime().toString();
    //     return transmissionId;
    // }
}




module.exports = {
    builder: _cx_data.builder,
    //
    CXClientContext: CXClientContext,
    DTFSUtils: DTFSUtils,
    //
    Schema: _cx_client_schema,
    Const: _cx_client_declarations,
    //
    get: async function (config) {
        var db_pool = await _cx_data.getPool(config);
        return new CXClientContext(db_pool);
    },
    
}
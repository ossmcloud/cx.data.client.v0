'use strict';

const _cx = require('../cx-client-declarations');
const _cx_schema = require('../cx-client-schema');

async function _getDSConfig(cx, shopId, module, staticData) {
    // get configuration to connect to local EPoS data source
    var dsConfigJson = await cx.table(_cx_schema.cr_shop_configs).getConfigValue(shopId, _cx.CR_SHOP_CONFIGS.DTFS_DATASOURCE_CONFIG);
    if (!dsConfigJson) { throw new Error('No DBConfig for shop ID: ' + shopId); }
    var dsConfig = JSON.parse(dsConfigJson);
    // load required scripts
    dsConfig.scripts = await _getScripts(module, staticData);
    return dsConfig;
}

class DTFSUtils {
    #cx = null;
    constructor(cx) {
        this.#cx = cx;
    }

    

    get cx() { return this.#cx }

    async getPendingRequest(shopInfo) {

        var requests = cx.table(_cx_schema.raw_getRequest);
        // get pending requests for current shop sorted by oldest 
        requests.query.addFilter({ name: _cx_schema.raw_getRequest.SHOPID, value: shopInfo.shopId });
        requests.query.addFilter({ name: _cx_schema.raw_getRequest.STATUS, value: _cx.RAW_GET_REQUEST.STATUS.PENDING });
        requests.query.addOrderBy(_cx_schema.raw_getRequest.CREATED);
        await requests.select();
        var req = requests.first();
        if (!req) { return null; }

        req.getDate.setHours(0, 0, 0, 0);
        req.status = _cx.RAW_GET_REQUEST.STATUS.PROCESSING;
        req.getReference = 'request has been picked up!';
        await req.save();

        var requireDataOptions = {
            req: req,
            fromDate: _cored.formatEx({ date: req.getDate, showTime: false }),
            toDate: _cored.formatEx({ date: req.getDate, showTime: false }),
            action: 'data',
            module: req.getModule,
            shop: shopInfo.shopCode,
            staticData: (req.getReference == 'static data'),
        }

        // get data source configuration plus the scripts to run
        requireDataOptions.dsConfig = await _getDSConfig(this.cx, shopInfo.shopId, requireDataOptions.module, requireDataOptions.staticData);

        return requireDataOptions;
    }

}


module.exports = DTFSUtils
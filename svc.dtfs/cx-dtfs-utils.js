// 'use strict';

// const _core = require('cx-core');
// const _cx = require('../cx-client-declarations');
// const _cx_schema = require('../cx-client-schema');

// async function _getEPoSDataExtractCustomScripts(cx, shopId, module) {
//     // @LATER: we can have custom scripts by customer
//     return [];
// }

// async function _getEPoSDataSourceConfig(cx, shopId, requireDataOptions) {
//     // get configuration to connect to local EPoS data source, then load custom scripts (if any)
//     var dsConfig = await cx.table(_cx_schema.epos_shop_configs).getConfigValue(shopId, _cx.EPOS_SHOP_CONFIGS.DTFS_DATASOURCE_CONFIG, true);
//     if (!dsConfig) { throw new Error('No EPoS Data Source Config for shop ID: ' + shopId); }
//     dsConfig.scripts = [];
//     dsConfig.customScripts = await _getEPoSDataExtractCustomScripts(cx, shopId, requireDataOptions.module);
//     return dsConfig;
// }

// async function _getReceivedDates(cx, shopId, module, sinceDate) {
//     // select what we have in log

//     // TODO: we do not need this SQL anymore
//     var sql = 'SELECT getDate from raw_getLog where shopId = @shopId and getModule = @module and getDate >= @sinceDate group by getDate order by getDate';
//     var dateSet = await cx.exec({
//         sql: sql,
//         params: [
//             { name: 'shopId', value: shopId },
//             { name: 'module', value: module },
//             { name: 'sinceDate', value: sinceDate.addDays(-1) }
//         ]
//     });

//     dateSet.sql = 'SELECT getDate, SUM(case getSuccess when 1 then 1 else 0 end) as successCount, SUM(case getSuccess when 1 then 0 else 1 end) as errorCount';
//     dataSet.sql += ' from raw_getLog where shopId = @shopId and getModule = @module and getDate >= @sinceDate group by getDate order by getDate';

//     if (dateSet.count == 0) {
//         // @REVIEW: NOT SURE THIS SHOULD BE DONE, i think it is here for initial data transfer, but that can be handled with data request
//         dateSet = await cx.exec({
//             sql: 'SELECT MAX(getDate) as getDate from raw_getLog where shopId = @shopId and getModule = @module',
//             params: [
//                 { name: 'shopId', value: shopId },
//                 { name: 'module', value: module },
//             ]
//         });
//     }

//     var dates = [];
//     dateSet.each(function (row, idx) {
//         if (row.getDate) {
//             row.getDate.setHours(0, 0, 0);
//             //dates.push(row.getDate);
//             datews.push({
//                 date: row.getDate,
//                 successCount: row.successCount,
//                 errorCount: row.errorCount,
//             })
//         }
//     });

//     return dates;
// }


// async function _getStartDate(cx, shopId, module) {
//     if (module != 'retail') { throw new Error('function getStartDate not implemented for module: ' + module); }
//     var sql = 'SELECT startDate from epos_shop_setting where shopId = @shopId';
//     var dataSet = await cx.exec({
//         sql: sql,
//         params: [{ name: 'shopId', value: shopId }]
//     });
//     var d = dataSet.first().startDate.addDays(-1);
//     d.setHours(0, 0, 0, 0);
//     return d;
// }

// async function _needStaticData(cx, shopId) {
//     // TODO: load log from yesterday for static data
//     //          if not found then return true
//     return false;

// }

// async function _needTransactionData(cx, shopId, module) {
//     // DEPLOY: fer dev only
//     var today = (process.env.DEV === "true") ? new Date(2020, 4, 26) : Date.today();
//     // NOTE: before 5 AM we assume it is still yesterday
//     var n = new Date();

//     //
//     var startAtHour = process.env.DTFS_GET_DAILY_START_HOUR || 3;
//     if (n.getHours() < startAtHour) { today = today.addDays(-1); }
//     //
//     //

//     today.dropTime();
//     // go back 2 weeks in case we missed something for some reason
//     var sinceDate = today.addDays(-7);   // TODO: the number of days to subtract should come from a config maybe??
//     var lastDates = await _getReceivedDates(cx, shopId, module, sinceDate);
//     // if nothing in the database get start date from params table
//     if (lastDates.length == 0) {
//         sinceDate = await _getStartDate(cx, shopId, module);
//         lastDates.push({ date: sinceDate });
//     } else {
//         // !IMPORTANT: if the 1st date returned is earlier than [sinceDate] then reset the [sinceDate] to the earliest date
//         //             this is to handle the 1st transmission
//         if (lastDates[0].date < sinceDate) { sinceDate = lastDates[0].date; }
//     }
//     sinceDate.dropTime();
//     // loop dates and return request at first gap
//     for (var i = 0; i < lastDates.length; i++) {
//         // if the current array date is greater than current since data then we have a gap
//         if (lastDates[i].date > sinceDate) {
//             return {
//                 fromDate: _core.date.formatEx({ date: sinceDate, showTime: false }),
//                 toDate: _core.date.formatEx({ date: sinceDate, showTime: false }),
//             }
//         }
        
//         // if we do not have a gap but never a success and less than 3 failures then try again
//         if (lastDates[i].successCount == 0 && lastDates[i].errorCount < 3) {
//             return {
//                 fromDate: _core.date.formatEx({ date: sinceDate, showTime: false }),
//                 toDate: _core.date.formatEx({ date: sinceDate, showTime: false }),
//             }
//         }

//         // add one day, return null if greater than today
//         sinceDate = sinceDate.addDays(1);
//         if (sinceDate >= today) { return null; }
//     }
//     // this should happen if all is good till yesterday
//     return {
//         fromDate: _core.date.formatEx({ date: sinceDate, showTime: false }),
//         toDate: _core.date.formatEx({ date: sinceDate, showTime: false }),
//     };
// }




// class DTFSUtils {
//     #cx = null;
//     constructor(cx) {
//         this.#cx = cx;
//     }

//     get cx() { return this.#cx }

//     async getDaily(shopInfo, module) {
//         // check if we need daily data
//         var requireDataOptions = await _needTransactionData(this.cx, shopInfo.shopId, module);
        
//         // add shop code and get scripts to run
//         if (requireDataOptions) {
//             // check if we need static data too
//             var staticData = await _needStaticData(module);
//             requireDataOptions.staticData = ((staticData) ? 'include' : null);
//             requireDataOptions.action = 'data';
//             requireDataOptions.module = module;
//             requireDataOptions.shop = shopInfo.eposShopCode;
//             requireDataOptions.dsConfig = await _getEPoSDataSourceConfig(this.cx, shopInfo.shopId, requireDataOptions);
//         }

//         return requireDataOptions;
//     }


//     async getPendingRequest(shopInfo) {

//         var requests = await this.cx.table(_cx_schema.raw_getRequest);
//         // get pending requests for current shop sorted by oldest 
//         requests.query.addFilter({ name: _cx_schema.raw_getRequest.SHOPID, value: shopInfo.shopId });
//         requests.query.addFilter({ name: _cx_schema.raw_getRequest.STATUS, value: _cx.RAW_GET_REQUEST.STATUS.PENDING });
//         requests.query.addOrderBy(_cx_schema.raw_getRequest.CREATED);
//         await requests.select();
//         var req = requests.first();
//         if (!req) { return null; }
//         //
//         var staticData = (req.getReference == 'static data');
//         // we drop the time just in case
//         req.getDate.dropTime();
//         // set status and reference
//         req.status = _cx.RAW_GET_REQUEST.STATUS.PROCESSING;
//         req.getReference = (((staticData) ? 'static data: ' : '') + ' request has been picked up!');
        
//         // TOTO: IMPORTANT: WHY IS CREATED BY NOT PROPERLY POPULATED WHE RUNNING FROM SVC???
//         req.createdBy = 1;
        
//         await req.save();
//         // package what we need to send back
//         var requireDataOptions = {
//             req: req,
//             fromDate: _core.date.formatEx({ date: req.getDate, showTime: false }),
//             toDate: _core.date.formatEx({ date: req.getDate, showTime: false }),
//             action: 'data',
//             module: req.getModule,
//             shop: shopInfo.eposShopCode,
//             staticData: staticData,
//         }

//         // get data source configuration plus the scripts to run
//         requireDataOptions.dsConfig = await _getEPoSDataSourceConfig(this.cx, shopInfo.shopId, requireDataOptions);

//         return requireDataOptions;
//     }

// }


// module.exports = DTFSUtils
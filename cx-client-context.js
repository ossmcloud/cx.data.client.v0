'use strict';

const _path = require('path');
const _cx_data = require('cx-data');
const _cx_render = require('./cx-client-render');
const _cxSchema = require('./cx-client-schema');
const _cxConst = require('./cx-client-declarations');
const _cxEmail = require('./core/cx-email');
const _crPrefEngine = require('./cr/cr-preference-engine');

//const DTFSUtils = require('./svc.dtfs/cx-dtfs-utils');

class CXClientContext extends _cx_data.DBContext {
    #shops = null;
    #shopList = null;
    #role = null;
    #user = null;
    #theme = null;
    #cxSvc = false;
    #cxSvcInfo = null;
    #accountId = null;
    #crPrefEngine = null;
    #dbInfo = null;
    constructor(pool, credentials) {
        super(pool, _path.join(__dirname, 'objectStore'), credentials);
    }

    get accountId() { return this.#accountId; }
    get theme() { return this.#theme; }
    get shops() { return this.#shops };
    get shopList() { return this.#shopList; }
    get dbInfo() { return this.#dbInfo; }

    get user() {
        return this.#user;
    }
    get userName() {
        if (!this.#user) { return null; }
        return `${this.#user.firstName} ${this.#user.lastName}`;
    }
    get tUserId() {
        if (!this.#user) { return null; }
        return this.#user.loginId;
    }

    get role() {
        if (!this.#role) { return null; }
        return this.#role;
    } 
    get roleId() {
        if (!this.#role) { return 0; }
        return this.#role.id;
    } 
    get roleName() {
        if (!this.#role) { return ''    ; }
        return this.#role.name;
    }
    get cxSvc() {
        return this.#cxSvc;
    }
    get cxSvcInfo() {
        return this.#cxSvcInfo;
    }
    get crPref() {
        return this.#crPrefEngine;
    }

    
    async init(options) {
        try {
            //
            if (!options.accountId) { throw new Error('No Account ID provided!'); }
            this.#accountId = options.accountId;

            var queryDbInfo = { sql: 'select * from sys_dbInfo', returnFirst: true };
            var dbInfo = await this.exec(queryDbInfo);
            if (!dbInfo.modules) { dbInfo.modules = ''; }
            this.#dbInfo = {
                modules: dbInfo.modules.split(','),
                shopCount: dbInfo.shopCount,
                version: dbInfo.dbVersion
            }
            
            // NOTE: IMPORTANT: check if this is called by cx.svc (we have no user info here)
            if (options.cxSvc) {
                this.#cxSvc = true;
                if (options.dtfsSettingId) {
                    this.#cxSvcInfo = {
                        dtfsSettingId: options.dtfsSettingId,
                        dtfsInactive: options.dtfsInactive,
                        shops: options.shops,

                        shopId: options.shopId,
                        shopCode: options.shopCode,
                        epos: options.epos,
                        eposShopCode: options.eposShopCode,
                    }
                }
            } else {
                // @CLEAN-UP: use schema constants in query below
                var query = {
                    sql: `  select * from cx_login where masterLoginId = @masterLoginId

                    select  s.*
                    from    cx_login_shop s
                    left outer join cx_login l on l.loginId = s.loginId
                    where   l.masterLoginId = @masterLoginId`,
                    params: [
                        { name: _cxSchema.cx_login.MASTERLOGINID, value: this.userId }
                    ]
                }

                var response = await this.exec(query);
                if (response.first() == null) { throw new Error('Not Authorised'); }

                this.#user = response.first();
                this.#role = { id: response.first().roleId || 0 }
                this.#role.name = _cxConst.CX_ROLE.getName(this.#role.id);
                this.#theme = this.#user.theme;

                var shops = [];
                response.subResults[0].each(function (record, idx) {
                    shops.push(record.shopId);
                });
                this.#shops = shops;
                this.#shopList = '(0)';
                if (shops.length > 0) {
                    this.#shopList = `(${this.#shops.toString()})`;
                }

                this.#crPrefEngine = new _crPrefEngine.CRPreferenceEngine(this);

            }
        } catch (error) {
            throw new Error('cx-context::init ERROR: ' + error.message);
        }
    }
}




module.exports = {
    // 
    builder: _cx_data.builder,
    //
    Schema: _cxSchema,
    Const: _cxConst,
    Render: _cx_render,
    
    //
    //DTFSUtils: DTFSUtils,
    CXClientContext: CXClientContext,
    //
    get: async function (options) {
        // NOTE: cx.app will call this with an object with options.dbConfig property
        //       cx.svc will call this with an object that is the dbConfig
        var dbConfig = options.dbConfig || options;

        // @@CLEAN-UP: SHOULD NOT BE HERE BUT ON .ENV FILE ???

        // @@CLEAN-UP: should I use pool management by user ???
        dbConfig.noPullManager = false;
        dbConfig.config.connectionTimeout = 60000;
        dbConfig.config.requestTimeout = 180000;
        dbConfig.config.pool = {
            max: 20,
            min: 0,
            idleTimeoutMillis: 60000
        }
        
        var credentials = (options.dbConfig) ? options : null;
        var db_pool = await _cx_data.getPool(dbConfig);
        var cx = new CXClientContext(db_pool, credentials);
        // pass the options to init function as well
        await cx.init(options);
        return cx;
    },
    
    generateTransmissionID(svcName, accountId, shopId) {
        // transmission session can be generated by a number of processes, we assign a simple ID for each one
        var svcId = '-10';
        if (svcName == 'dtfs') { svcId = '10'; }
        if (svcName == 'sage200') { svcId = '20'; }
        if (svcName == 'sage50') { svcId = '30'; }
        // also, each transmission relates to a single store, so we append the store id
        var transmissionId = svcId + accountId.toString() + shopId.toString();
        // we also use the system ticks we should make it unique

        // @@REVIEW: NOTE:
        //      the tran id has a tick time stamp, 13 digits
        //      plus we add an identifier for the type of service, the account id and store id
        //      in addition the accountId and shopId are SQL index fields so could easily be larger than 19 digits long which is the max for big int
        //      SOLUTIONS:
        //          change the transmissionId field in SQL to varchar
        //              check implications for indexing and stuff
        //              benefit is that I could go like: 10-6-1-TIMETICKS or similar
        //          change the transmissionId field in SQL to 
        //              DECIMAL(38,0) (https://dba.stackexchange.com/questions/51536/datatype-bigger-than-bigint)

        // 2021.02.19 - this will reduce the number of unique digits
        //transmissionId += (new Date()).getTime().toString();
        transmissionId += ((new Date()).getTime() - 1613757500000).toString();

        return transmissionId;
    }
}
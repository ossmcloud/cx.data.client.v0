'use strict'

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const _core = require('cx-core');
const _cored = require('cx-core/core/cx-core-date');

async function getPrefConfigs(cx, prefId) {
    var query = {
        sql: `  select	        p.preferenceId, p.name, p.type, pr.recordType, pr.levelId, pc.recordId, pc.value
                from	        cr_preference p
                inner join      cr_preference_record pr ON pr.preferenceId = p.preferenceId
                inner join      cr_preference_config pc ON pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId

                where	        p.preferenceId = @preferenceId
                
                order by pr.levelId desc
        `,
        params: [{ name: 'preferenceId', value: prefId }]
    }

    return await cx.exec(query);
}

class CRPreferenceEngine {
    #cx = null;
    constructor(cx) {
        this.#cx = cx;
    }


    async get(context) {

        var options = {
            preference: context.preference || context.pref,
            records: context.records || []
        }

        if (!options.preference) { return null; }

        if (!_core.list.findInArray(options.records, 'recordType', 'cx_login')) {
            options.records.push({
                recordType: _cxSchema.cx_login.TBL_NAME,
                recordId: this.#cx.userId
            })
        }
        
        var pref = await this.#cx.table(_cxSchema.cr_preference).fetch(options.preference, true);
        if (!pref) { return null; }

        var prefValue = null;
        
        // TODO: check for others
        if (options.records.length > 0) {
            var configs = await getPrefConfigs(this.#cx, options.preference);
            configs.each(function (cfg, idx) {
                _core.list.each(options.records, function (rec) {
                    if (cfg.recordType == rec.recordType && cfg.recordId.toString() == rec.recordId.toString()) {
                        prefValue = cfg.value;
                        return false;
                    }
                });
                if (prefValue) { return false; }
            });
        }

        //
        if (!prefValue) { prefValue = pref.defaultValue }

        var prefValueType = pref.type;
        if (prefValueType == 'value') {
            prefValue = await this.#cx.table(_cxSchema.cr_preference_value).fetch(prefValue, true);
            // TODO: should we get the default value if not found???
            if (!prefValue) { return null; }
            prefValueType = prefValue.type;
            prefValue = prefValue.value;
        }

        if (prefValueType == 'bool' || prefValueType == 'boolean') {
            prefValue = prefValue.toLowerCase().trim();
            return (prefValue == 'true' || prefValue == 't' || prefValue == '1' || prefValue == 'on' || prefValue == 'yes' || prefValue == 'y')
        }

        if (prefValueType == 'float' || prefValueType == 'decimal' || prefValueType == 'double') {
            prefValue = parseFloat(prefValue);
            return isNaN(prefValue) ? null : prefValue;
        }

        if (prefValueType == 'number' || prefValueType == 'int' || prefValueType == 'integer' || prefValueType == 'bigint' || prefValueType == 'long') {
            prefValue = parseInt(prefValue, 10);
            return isNaN(prefValue) ? null : prefValue;
        }

        if (prefValueType == 'string' || prefValueType == 'text') {
            return (prefValue || prefValue == '') ? prefValue.toString() : null;
        }

        if (prefValueType == 'object' || prefValueType == 'json') {
            return JSON.parse(prefValue);
        }

        if (prefValueType == 'date') {
            return _cored.parseEx(prefValue);
        }




        return prefValue;
    }



}


module.exports = {
    CRPreferenceEngine: CRPreferenceEngine
}
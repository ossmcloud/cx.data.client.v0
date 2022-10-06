'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxLoginRole extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }


    async _record() {
        var preferenceLookUp = await this.dataSource.cx.table(_cxSchema.cr_preference).toLookUpList();
        var preferenceRecLookUp = await this.dataSource.cx.table(_cxSchema.cr_preference_record).toLookUpList(this.dataSource.preferenceId, true);


        this.options.fields = [
            { name: _cxSchema.cr_preference_config.PREFERENCEID, label: 'preference', column: 1, lookUps: preferenceLookUp, readOnly: true },
            {
                group: 'recordInfo', title: '', inLine: true, columnCount: 2, fields: [
                    
                    { name: _cxSchema.cr_preference_config.PREFERENCERECORDID, label: 'preference record', column: 1, lookUps: preferenceRecLookUp, validation: '{ "mandatory": true }' },
                    { name: _cxSchema.cr_preference_config.RECORDID, label: 'record id', column: 2, validation: '{ "mandatory": true }' },

                ],
            },
            
        ]
    }
}

module.exports = CxLoginRole;
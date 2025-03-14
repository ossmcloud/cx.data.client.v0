'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');


class EposDtfsConfig extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        this.options.fields = [];
        this.options.fields.push({ group: 'main', title: '', fields: [] });
        if (this.options.dialog) {
            this.options.fields[0].style = 'display: block';
            this.options.fields[0].fields.push({ name: _cxSchema.epos_dtfs_configs.SETTINGID, hidden: true });
        } else {
            this.options.fields[0].fields.push(await this.fieldDropDownOptions(_cxSchema.epos_dtfs_setting, { id: 'epos_settings_id', name: _cxSchema.epos_dtfs_setting.DTFSSETTINGID, column: 1 }));
        }
        this.options.fields[0].fields.push({ name: 'configName', label: 'config name', width: '250px', readOnly: !this.dataSource.isNew(), lookUps: _cxConst.EPOS_DTFS_CONFIGS.toList(true), validation: '{ "mandatory": true }' });
        this.options.fields[0].fields.push({ name: 'configValue', label: 'config value', validation: '{ "mandatory": true, "max": 4000 }' });
    }

    async _list() {
        if (!this.options.path) {
            this.options.path = '../epos/dtfsConfigs';
        }
        this.options.columns = [
            { name: _cxSchema.epos_dtfs_configs.CONFIGID, title: 'id', align: 'left' },
            { name: _cxSchema.epos_dtfs_configs.CONFIGNAME, title: 'name', align: 'left' },
            { name: _cxSchema.epos_dtfs_configs.CONFIGVALUE + 'Display', title: 'value', align: 'left' },
        ];
    }

}

module.exports = EposDtfsConfig;
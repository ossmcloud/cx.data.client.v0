'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');


class WholesalerConfig extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        this.options.fields = [];
        this.options.fields.push({ group: 'main', title: '', fields: [] });
        if (this.options.dialog) {
            this.options.fields[0].style = 'display: block';
            this.options.fields[0].fields.push({ name: _cxSchema.cp_wholesalerConfig.WHOLESALERID, hidden: true });
        } else {
            this.options.fields[0].fields.push(await this.fieldDropDownOptions(_cxSchema.cp_wholesaler, { id: 'cp_wholesaler_id', name: _cxSchema.cp_wholesaler.WHOLESALERID, column: 1 }));
        }
        this.options.fields[0].fields.push({ name: 'configName', label: 'config name', width: '250px', readOnly: !this.dataSource.isNew(), lookUps: _cxConst.CP_WHS_CONFIG.toList(true), validation: '{ "mandatory": true }' });
        this.options.fields[0].fields.push({ name: 'configValue', label: 'config value', validation: '{ "mandatory": true, "max": 2000 }' });
    }

    async _list() {
        if (!this.options.path) {
            this.options.path = '../cp/config/wholesalers';
        }
        this.options.columns = [
            { name: _cxSchema.cp_wholesalerConfig.CONFIGID, title: 'id', align: 'left' },
            { name: _cxSchema.cp_wholesalerConfig.CONFIGNAME, title: 'name', align: 'left' },
            { name: _cxSchema.cp_wholesalerConfig.CONFIGVALUE + 'Display', title: 'value', align: 'left' },
        ];
    }

}

module.exports = WholesalerConfig;
'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CrShopConfig extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }


    async _list() {
        if (!this.options.path) {
            this.options.path='../cx/shopConfigs'
        }
        this.options.columns = [
            { name: _cxSchema.cr_shop_configs.CONFIGID, title: 'id', align: 'left' },
            { name: _cxSchema.cr_shop_configs.CONFIGNAME, title: 'name', align: 'left' },
            { name: _cxSchema.cr_shop_configs.CONFIGVALUE, title: 'value', align: 'left' },
        ];
    }

}

module.exports = CrShopConfig;
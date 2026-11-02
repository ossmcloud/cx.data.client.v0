'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPRecoSettingRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'matching settings';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.ca_settingApproverShop.SETTINGID] = null;
        this.autoLoadFields[_cxSchema.cx_shop.SHOPCODE] = null;
        this.autoLoadFields[_cxSchema.cx_shop.SHOPNAME] = null;
        if (!options.listView) {
            this.autoLoadFields[_cxSchema.ca_settingApproverShop.CREATED] = null;
            this.autoLoadFields[_cxSchema.ca_settingApproverShop.MODIFIED] = null;
        }
    }



    async initColumn(field, column) {
        if (field.name == _cxSchema.ca_settingApproverShop.CREATED || field.name == _cxSchema.ca_settingApproverShop.MODIFIED) {
            column.width = '150px';
        } else if (field.name == _cxSchema.cx_shop.SHOPCODE) {
            column.width = '150px';
        }
    }
    async initFilter(field, filter) {
        filter.hide = true;
    }

    async _list() {

    }


    async _record() {
        var form = { group: 'all', title: '', columnCount: 2, styles: ['min-width: 500px;', 'min-width: 400px; max-width: 400px'], fields: [] }
        form.fields.push({
            group: 'main', title: 'main info', column: 1, columnCount: 2, styles: ['width: 250px', 'min-width: 500px;'], fields: [
                await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId', column: 1, width: '250px' }),
            ]
        });
        this.options.fields = [form];
    }


}


module.exports = CPRecoSettingRender;





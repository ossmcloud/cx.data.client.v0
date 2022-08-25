'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxMapConfigRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }


    async _list() {

        this.options.filters = [
            { label: 'tax code', fieldName: 'tt', name: _cxSchema.cx_map_config_tax.EPOSTAXCODE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'description', fieldName: 'ts', name: _cxSchema.cx_map_config_tax.EPOSDESCRIPTION, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            
        ];
        this.options.columns = [
            { title: ' ', name: _cxSchema.cx_map_config_tax.TAXMAPCONFIGID },
            { title: 'map id', name: _cxSchema.cx_map_config_tax.MAPCONFIGID },
            { title: 'tax code', name: _cxSchema.cx_map_config_tax.EPOSTAXCODE },
            { title: 'tax name', name: _cxSchema.cx_map_config_tax.EPOSDESCRIPTION },
            { title: 'tax rate', name: _cxSchema.cx_map_config_tax.EPOSTAXRATE },
            { title: 'currency', name: _cxSchema.cx_map_config_tax.EPOSCURRENCYCODE },

            { title: 'erp tax code', name: 'taxAccount' },
            
            { title: 'created', name: _cxSchema.cr_tran_type_config.CREATED },
            { title: 'by', name: _cxSchema.cr_tran_type_config.CREATEDBY },
            { title: 'modified', name: _cxSchema.cr_tran_type_config.MODIFIED },
            { title: 'by', name: _cxSchema.cr_tran_type_config.MODIFIEDBY },
        ];

    }


}

module.exports = CxMapConfigRender;
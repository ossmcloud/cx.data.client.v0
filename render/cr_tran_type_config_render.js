'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CrTranTypeConfigRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }


    async _list() {

        this.options.filters = [
            { label: 'tran type', fieldName: 'tt', name: _cxSchema.cr_tran_type_config.EPOSTRANTYPE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'tran sub-type', fieldName: 'ts', name: _cxSchema.cr_tran_type_config.EPOSTRANSUBTYPE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'description', fieldName: 'desc', name: _cxSchema.cr_tran_type_config.DESCRIPTION, type: _cxConst.RENDER.CTRL_TYPE.TEXT },

        ];
        this.options.columns = [
            { title: ' ', name: _cxSchema.cr_tran_type_config.TRANTYPECONFIGID },
            { title: 'map id', name: _cxSchema.cr_tran_type_config.MAPCONFIGID },
            { title: 'department', name: _cxSchema.cr_tran_type_config.EPOSTRANTYPE },
            { title: 'sub-department', name: _cxSchema.cr_tran_type_config.EPOSTRANSUBTYPE },
            { title: 'description', name: _cxSchema.cr_tran_type_config.DESCRIPTION },

            { title: 'c/b tran. type', name: 'cbTranType' },
            { title: 'c/b heading', name: _cxSchema.cr_tran_type_config.CBHEADING },
            { title: 'allow new', name: _cxSchema.cr_tran_type_config.ALLOWNEW },
            { title: 'allow edit', name: _cxSchema.cr_tran_type_config.ALLOWEDIT },
            { title: 'allow delete', name: _cxSchema.cr_tran_type_config.ALLOWDELETE },

            { title: 'erp tran. type', name: 'erpTranType' },

            { title: 'created', name: _cxSchema.cr_tran_type_config.CREATED },
            { title: 'by', name: _cxSchema.cr_tran_type_config.CREATEDBY },
            { title: 'modified', name: _cxSchema.cr_tran_type_config.MODIFIED },
            { title: 'by', name: _cxSchema.cr_tran_type_config.MODIFIEDBY },
        ];

    }


}

module.exports = CrTranTypeConfigRender;
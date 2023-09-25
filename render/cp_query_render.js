'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPQueryRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'document query';
        this.autoLoad = true;

        
    }

    async initColumn(field, column) {

    }
    async initFilter(field, filter) {

    }



    async _record() {

    }

    async _list() {



    }
}


module.exports = CPQueryRender;

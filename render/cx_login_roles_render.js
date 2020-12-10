'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxLoginRole extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }


    async _list() {
        this.options.columns = [
            { name: _cxSchema.cx_login_roles.ROLEID, title: 'id', align: 'left' },
            { name: 'roleName', title: 'role name', align: 'left' },
        ];
    }

}

module.exports = CxLoginRole;
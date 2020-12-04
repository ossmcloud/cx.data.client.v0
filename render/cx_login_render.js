'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class RawGetLog extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async record() {
        this.options.groups = [
            { name: 'main', title: 'main info', columnCount: 3 },
            { name: 'audit', title: 'audit info', columnCount: 3 },
        ];
        this.options.fields = [
            { group: 'main', name: _cxSchema.cx_login.EMAIL, label: 'email', column: 1, readOnly: true },
            { group: 'main', name: _cxSchema.cx_login.FIRSTNAME, label: 'first name', width: '150px', column: 2 },
            { group: 'main', name: _cxSchema.cx_login.LASTNAME, label: 'last name', width: '150px', column: 2 },
            { group: 'main', name: _cxSchema.cx_login.JOBTITLE, label: 'job title', width: '150px', column: 3 },
            { group: 'audit', name: _cxSchema.cx_login.CREATED, label: 'created', readOnly: true, column: 1 },
            { group: 'audit', name: _cxSchema.cx_login.MASTERLOGINID, label: 'id (master)', readOnly: true, column: 2 },
            { group: 'audit', name: _cxSchema.cx_login.LOGINID, label: 'id (tenant)', readOnly: true, column: 2 },
        ];
    }

    async list() {
        this.options.columns = [
            { name: _cxSchema.cx_login.LOGINID, title: '', align: 'center' },
            { name: _cxSchema.cx_login.MASTERLOGINID, title: 'id', align: 'center' },
            { name: _cxSchema.cx_login.EMAIL, title: 'email' },
            { name: _cxSchema.cx_login.FIRSTNAME, title: 'first name', width: '200px' },
            { name: _cxSchema.cx_login.LASTNAME, title: 'last name', width: '200px' },
            { name: _cxSchema.cx_login.JOBTITLE, title: 'job title', width: '200px' },
           { name: _cxSchema.cx_login.CREATED, title: 'created', width: '200px' },
            
        ];
    }
}

module.exports = RawGetLog;




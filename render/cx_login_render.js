'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class RawGetLog extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        this.options.fields = [
            {
                group: 'main', title: 'main info', columnCount: 3, inline: true, fields: [
                    { name: _cxSchema.cx_login.EMAIL, label: 'email', column: 1, readOnly: true },
                    { name: _cxSchema.cx_login.FIRSTNAME, label: 'first name', width: '150px', column: 2 },
                    { name: _cxSchema.cx_login.LASTNAME, label: 'last name', width: '150px', column: 2 },
                    { name: _cxSchema.cx_login.JOBTITLE, label: 'job title', width: '150px', column: 3 },

                ]
            },
            {
                group: 'audit', title: 'audit info', columnCount: 3, fields: [
                    {
                        group: 'audit0', title: '', column: 1, columnCount: 2, inline: true, fields: [
                            { name: _cxSchema.cx_login.MASTERLOGINID, label: 'id (master)', column: 1, readOnly: true },
                            { name: _cxSchema.cx_login.LOGINID, label: 'id (tenant)', column: 2, readOnly: true },
                        ]
                    },
                    {
                        group: 'audit1', title: '', column: 2, columnCount: 2, inline: true, fields: [
                            { name: 'created', label: 'created', column: 1, readOnly: true },
                            //{ name: 'createdBy', label: 'created by', column: 2, readOnly: true },
                        ]
                    },
                    // {
                    //     group: 'audit2', title: '', column: 3, columnCount: 2, inline: true, fields: [
                    //         { name: 'modified', label: 'modified', column: 1, readOnly: true },
                    //         { name: 'modifiedBy', label: 'modified by', column: 2, readOnly: true },
                    //     ]
                    // }
                ]
            }
        ];
    }

    async _list() {
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




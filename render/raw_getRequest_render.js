'use script';

const _core = require('cx-core');
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class RawGetRequest extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'get request';

    }

    async _record() {

        var svcReadOnly = false; 
        var modules = _cxConst.CX_MODULE.toList(true);
        if (this.options.query.svc == 'erps') {
            modules = modules.slice(1, 2);
            //svcReadOnly = true;
            
        } else {
            //svcReadOnly = (this.options.query.svc);
            var params = {};
            params[_cxSchema.epos_dtfs_setting.EPOSPROVIDER] = _cxConst.CX_EPOS_PROVIDER.THERE;
            var eposSett = this.cx.table(_cxSchema.epos_dtfs_setting);
            var hasThereforeLegacy = await eposSett.select(params);

            if (!hasThereforeLegacy) { modules.pop(); }
        }


        if (!this.hasModule('cr')) {
            for (var mx = 0; mx < modules.length; mx++) {
                if (modules[mx].value == 'retail') {
                    modules.splice(mx, 1);
                    break;
                }
            }
        }
        if (!this.hasModule('cp')) {
            for (var mx = 0; mx < modules.length; mx++) {
                if (modules[mx].value == 'purchase') {
                    modules.splice(mx, 1);
                    break;
                }
            }
        }



        this.options.fields = [
            {
                group: 'main', title: 'main info', columnCount: 4, fields: [
                    //{ name: 'shopInfo', label: 'store', column: 2 },
                    await this.fieldDropDownOptions(_cxSchema.cx_shop, {
                        id: 'shopId', name: 'shopId', column: 1, validation: '{ "mandatory": true }'
                    }),
                    { name: 'transmissionID', label: 'transmission ID', column: 2, readOnly: true },
                ]
            },
            {
                group: 'get', title: 'get info', columnCount: 4, fields: [
                    { name: 'getDate', label: 'date', align: 'center', type: 'inputDate', column: 1, validation: '{ "mandatory": true }' },
                    { name: 'getModule', label: 'module', align: 'center', column: 1, validation: '{ "mandatory": true }', lookUps: modules },
                    { name: 'svcName', label: 'service', align: 'center', column: 1, validation: '{ "mandatory": true }', lookUps: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.SERVICES.toList(true), readOnly: svcReadOnly },
                    { name: 'getReference', label: 'message', column: 2, readOnly: true },
                    { name: 'status', label: 'status', column: 2, lookUps: _cxConst.RAW_GET_REQUEST.STATUS.toList(), readOnly: true },
                ]
            },
            {
                group: 'audit', title: 'audit info', columnCount: 4, fields: [
                    { name: 'created', label: 'created', readOnly: true },
                    { name: 'createdBy', label: 'by', readOnly: true },
                    { name: 'getRequestId', label: 'id', readOnly: true, column: 2 },
                ]
            }
        ];

        if (this.dataSource.status == _cxConst.RAW_GET_REQUEST.STATUS.PENDING && this.options.allowNew && !this.dataSource.isNew()) {
            this.options.buttons.push({ id: 'cr_rawGetRequest_delete', text: 'Delete', function: 'deleteRecord' });
        }
    }

    async _list() {
        this.options.paging = true;
        this.options.pageNo = (this.options.query) ? (this.options.query.page || 1) : 1;

        this.options.recordTitle = 'get request';
        //var users = await this.dataSource.cx.table(_cxSchema.cx_login).selectList();
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { id: 'cx_transmission', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'tr', label: 'transmission' },
            { id: 'cx_date_from', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'df', label: 'from' },
            { id: 'cx_date_to', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'dt', label: 'to' },
            { id: 'cx_status', inputType: _cxConst.RENDER.CTRL_TYPE.SELECT, fieldName: 'st', label: 'status', width: '100px', items: _cxConst.RAW_GET_REQUEST.STATUS.toList('- all -') },
        ];
        this.options.columns = [
            { name: 'getRequestId', title: ' ', align: 'center' },
            { name: 'shopInfo', title: 'store', width: '200px' },
            { name: 'transmissionID', title: 'transmission ID', align: 'center', width: '150px' },
            { name: 'getDate', title: 'date', align: 'center', width: '130px' },
            { name: 'svcName', title: 'service', align: 'center', width: '9px' },
            { name: 'getModule', title: 'module', align: 'center', width: '70px' },
            { name: 'getReference', title: 'message' },
            { name: 'status', title: 'status', lookUps: _cxConst.RAW_GET_REQUEST.STATUS.toList() },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
        ];
        this.options.highlights = [
            { column: _cxSchema.raw_getRequest.STATUS, op: '=', value: _cxConst.RAW_GET_REQUEST.STATUS.ERROR, style: 'color: red;' },
            { column: _cxSchema.raw_getRequest.STATUS, op: '=', value: _cxConst.RAW_GET_REQUEST.STATUS.PROCESSING, style: 'color: #FFCD00;' },
            { column: _cxSchema.raw_getRequest.STATUS, op: '=', value: _cxConst.RAW_GET_REQUEST.STATUS.PENDING, style: 'color: blue;' },
        ];

    }
}

module.exports = RawGetRequest;




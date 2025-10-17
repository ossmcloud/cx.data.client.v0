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
        var params = {};
        params[_cxSchema.epos_dtfs_setting.EPOSPROVIDER] = _cxConst.CX_EPOS_PROVIDER.THERE;
        var eposSett = this.cx.table(_cxSchema.epos_dtfs_setting);
        var hasThereforeLegacy = await eposSett.select(params);

        var modules = _cxConst.CX_MODULE.toList(true);
        var removeModule = function (modules, mod) {
            for (var mx = 0; mx < modules.length; mx++) {
                if (modules[mx].value === mod) {
                    modules.splice(mx, 1);
                    return;
                }
            }
            return;
        }
        if (this.options.query.svc == 'erps') {
            removeModule(modules, "");
            removeModule(modules, _cxConst.CX_MODULE.RETAIL);
            removeModule(modules, _cxConst.CX_MODULE.PURCHASE);
            removeModule(modules, _cxConst.CX_MODULE.THEREFORE);
            removeModule(modules, _cxConst.CX_MODULE.STOCK_TAKE);
            removeModule(modules, _cxConst.CX_MODULE.STOCK_VALU);

        } else if (this.options.query.svc == 'dtfs') {

            if (!hasThereforeLegacy) { removeModule(modules, _cxConst.CX_MODULE.THEREFORE); }
            if (this.hasModule('cs')) {
                if (this.options.query.mod == 'stock') {
                    removeModule(modules, _cxConst.CX_MODULE.STATIC);
                    removeModule(modules, _cxConst.CX_MODULE.RETAIL);
                    removeModule(modules, _cxConst.CX_MODULE.PURCHASE);
                    removeModule(modules, _cxConst.CX_MODULE.THEREFORE);
                }
            } else {
                removeModule(modules, _cxConst.CX_MODULE.STOCK_TAKE);
                removeModule(modules, _cxConst.CX_MODULE.STOCK_VALU);
            }

        } else {
            modules = [];
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

        var svcReadOnly = this.options.query.ro == 'T';
        var moduleReadOnly = this.options.query.svc == 'erps' ? this.options.query.ro == 'T' : false;

        this.options.title = 'get data request';

        this.dataSource.hasStockModule = this.hasModule('cs');
        this.dataSource.hasThereforeLegacy = hasThereforeLegacy;
        this.dataSource.onlyStockModule = this.options.query.mod == 'stock';

        this.options.fields = [
            {
                group: 'main', title: 'main info', columnCount: 4, fields: [
                    //{ name: 'shopInfo', label: 'store', column: 2 },
                    await this.fieldDropDownOptions(_cxSchema.cx_shop, {
                        id: 'shopId', name: 'shopId', column: 1, validation: '{ "mandatory": true }'
                    }),
                    { name: 'transmissionID', label: 'transmission ID', column: 2, readOnly: true },
                    { name: 'hasThereforeLegacy', hidden: true },
                    { name: 'hasStockModule', hidden: true },
                    { name: 'onlyStockModule', hidden: true }
                ]
            },
            {
                group: 'get', title: 'get info', columnCount: 4, fields: [
                    { name: 'getDate', label: 'date', align: 'center', type: 'inputDate', column: 1, validation: '{ "mandatory": true }' },
                    { name: 'svcName', label: 'service', align: 'center', column: 1, validation: '{ "mandatory": true }', lookUps: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.SERVICES.toList(true), disabled: svcReadOnly },
                    { name: 'getModule', label: 'module', align: 'center', column: 1, validation: '{ "mandatory": true }', lookUps: modules, disabled: moduleReadOnly },
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
            { id: 'cx_svcName', inputType: _cxConst.RENDER.CTRL_TYPE.SELECT, fieldName: 'svc', label: 'service', width: '100px', items: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.SERVICES.toList('- all -') },
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




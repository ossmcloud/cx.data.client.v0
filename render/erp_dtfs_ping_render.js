'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class ErpDtfsPing extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options, true);
        this.autoLoad = true;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.erp_dtfs_setting.DTFSSETTINGID) {
            column.name = 'dtfsInfo';
            column.title = 'dtfs info';
            column.addTotals = false;
            column.align = 'left';
            column.width = '125px';
        } else if (field.name == _cxSchema.erp_dtfs_setting.PINGIP) {
            column.width = '125px';
        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.erp_dtfs_setting.DTFSSETTINGID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.erp_dtfs_setting, { fieldName: 'dtfsSettingId' });
        } else if (field.name == _cxSchema.erp_dtfs_setting.RESPONSE) {
            filter.width = '250px';
        }
    }

    async _list() {
        this.options.cellHighlights.push({
            column: _cxSchema.epos_dtfs_ping.RESPONSE,
            customStyle: function (obj, val, h) {
                if (val.indexOf('ERROR') >= 0) {
                    return 'background-color: rgba(230,0,0,0.25); color: white; padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden;';
                } else if (val.indexOf('action: get, status: ok') >= 0) {
                    return 'background-color: rgba(0,150,0,0.25); color: white; padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden;';
                }
            }
        })
    }



    async _record() {
        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 3, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 1, fields: [
                            { name: 'pingId', label: 'id', readOnly: true, column: 1 },
                            { name: 'dtfsInfo', label: 'store', column: 1 }
                        ]
                    },
                    {
                        group: 'ping', title: 'ping info', column: 2, columnCount: 1, fields: [
                            { name: 'pingIP', label: 'ping IP', width: '150px', column: 1 },
                            { name: 'response', label: 'ping response', width: '150px', column: 1 },
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 3, columnCount: 1, fields: [
                            { name: 'created', label: 'created', readOnly: true }
                        ]
                    }
                ]
            }
        ];
    }

    // async _list() {
    //     this.options.paging = true;
    //     this.options.pageNo = (this.options.query) ? (this.options.query.page || 1) : 1;

    //     this.options.filters = [
    //         await this.filterDropDownOptions(_cxSchema.erp_dtfs_setting, { fieldName: 'ss' }),
    //         { id: 'cx_ping_ip', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'ip', label: 'ping IP', width: '70px' },
    //         { id: 'cx_date_from', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'df', label: 'from', width: '130px' },
    //         { id: 'cx_date_to', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'dt', label: 'to', width: '130px' },
    //     ];
    //     this.options.columns = [
    //         { name: 'pingId', title: 'actions', align: 'center' },
    //         { name: 'dtfsInfo', title: 'dtfs info' },
    //         { name: 'pingIP', title: 'ping IP', align: 'center', width: '100px' },
    //         { name: 'response', title: 'response' },
    //         { name: 'created', title: 'created', align: 'center', width: '130px' },
    //     ];
    // }
}

module.exports = ErpDtfsPing;




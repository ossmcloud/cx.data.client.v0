'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class EposDtfsPing extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options, true);
        this.autoLoad = true;
    }
    
    async initColumn(field, column) {
        if (field.name == _cxSchema.epos_dtfs_ping.DTFSSETTINGID) {
            column.name = 'dtfsInfo';
            column.title = 'dtfs info';
            column.addTotals = false;
            column.align = 'left';
            column.width = '125px';
        } else if (field.name == _cxSchema.epos_dtfs_ping.PINGIP) {
            column.width = '125px';
        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.epos_dtfs_ping.DTFSSETTINGID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.epos_dtfs_setting, { fieldName: 'dtfsSettingId' });
        } else if (field.name == _cxSchema.epos_dtfs_ping.RESPONSE) {
            filter.width = '250px';
        }
    }

    async _list() {
        // this.setPaging();
        // await this.initColumnsAndFilters();
        // this.setFilter('dtfsSettingId', await this.filterDropDownOptions(_cxSchema.epos_dtfs_setting, { fieldName: 'dtfsSettingId' }))
        // this.options.filters = this.dataSourceFilters;
        // this.options.columns = this.dataSourceColumns;

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
                            { name: 'response', label: 'ping response', width: '100%', column: 1 },
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

    

   
}

module.exports = EposDtfsPing;




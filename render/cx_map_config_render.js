'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxMapConfig extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'map configuration';
    }

    async _record() {
        var newRecord = (this.options.mode == 'new');
        this.options.fields = [
            {
                group: 'outerInfo', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                            { name: 'name', label: 'Name', column: 1 },
                            { name: 'mapTypeId', label: 'map type', column: 2, lookUps: _cxConst.CX_MAP_CONFIG_TYPE.toList(), readOnly: !newRecord },
                            { name: 'eposProvider', label: 'EPoS', column: 1, readOnly: !newRecord },
                            { name: 'erpProvider', label: 'ERP', column: 2, readOnly: !newRecord },
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 2, columnCount: 2, fields: [
                            {
                                group: 'audit1', title: '', column: 1, columnCount: 2, inline: true, fields: [
                                    { name: 'created', label: 'created', column: 1, readOnly: true },
                                    { name: 'createdBy', label: 'created by', column: 2, readOnly: true },
                                ]
                            },
                            {
                                group: 'audit2', title: '', column: 2, columnCount: 2, inline: true, fields: [
                                    { name: 'modified', label: 'modified', column: 1, readOnly: true },
                                    { name: 'modifiedBy', label: 'modified by', column: 2, readOnly: true },
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

    }

    async _list() {
        this.options.recordTitle = 'map configuration';
        this.options.filters = [
            {
                label: 'map type', fieldName: 'mt', width: '100px', type: _cxConst.RENDER.CTRL_TYPE.SELECT,
                items: _cxConst.CX_MAP_CONFIG_TYPE.toList('- all -'),
            },
            { id: 'cx_map_name', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'mn', label: 'map config name' },
        ];
        this.options.columns = [
            { name: 'mapConfigId', title: '', align: 'center' },
            { name: 'name', title: 'name' },
            { name: 'mapTypeId', title: 'map type', width: '200px', lookUps: _cxConst.CX_MAP_CONFIG_TYPE.toList() },
            { name: 'eposProvider', title: 'epos provider' },
            { name: 'erpProvider', title: 'erp provider' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
        ];

        this.options.actions = [
            { label: 'configs', link: '/cr/config/tran-type-mapping?id=', target: '_blank' },
            //{ label: 'epos', link: '/epos/transmissions?s=', target: '_blank' },
        ]


    }

    async dropDown(options) {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a map config'; }
        if (this.options.label == undefined) { this.options.label = 'cr map config'; }

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(options); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.mapConfigId,
                text: '[' + record.mapTypeId + '] ' + record.name,
            });
        });
        this.options.items = dropDownItems;
    }


}

module.exports = CxMapConfig;


'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxMapConfigRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        // this.options.fields = [
        //     {
        //         group: 'main', title: 'main info', columnCount: 3, fields: [
        //             {
        //                 group: 'main1', title: '', column: 1, columnCount: 2, inline: true, fields: [
        //                     { name: 'shopCode', label: 'code', column: 1, validation: '{ "mandatory": true, "max": 6  }', readOnly: (this.dataSource.id > 0) },
        //                     await this.fieldDropDownOptions(_cxSchema.cx_shop_group, { id: 'shopGroupId', name: 'shopGroupId', column: 2, }),
        //                 ]
        //             },

        //             {
        //                 group: 'main1', title: '', column: 1, columnCount: 2, inline: true, fields: [
        //                     { name: 'shopName', label: 'name', column: 1, validation: '{ "mandatory": true, "max": 60  }' },
        //                     { name: 'shopColor', label: 'color', column: 2 },
        //                 ]
        //             },

        //             { name: 'shopAddress', label: 'address', column: 2, validation: '{ "max": 255 }' },
        //             { name: 'shopPostCode', label: 'post code', column: 2, validation: '{ "max": 50 }' },

        //             { name: 'shopLatitude', label: 'latitude', column: 3, type: _cxConst.RENDER.CTRL_TYPE.NUMERIC },
        //             { name: 'shopLongitude', label: 'longitude', column: 3, type: _cxConst.RENDER.CTRL_TYPE.NUMERIC },


        //         ],
        //     },
        //     {
        //         group: 'audit', title: 'audit info', columnCount: 3, fields: [
        //             { name: 'status', label: 'status', column: 1, readOnly: true, lookUps: _cxConst.CX_SHOP.STATUS.toList() },
        //             {
        //                 group: 'audit1', title: '', column: 2, columnCount: 2, inline: true, fields: [
        //                     { name: 'created', label: 'created', column: 1, readOnly: true },
        //                     { name: 'createdBy', label: 'created by', column: 2, readOnly: true },
        //                 ]
        //             },
        //             {
        //                 group: 'audit2', title: '', column: 3, columnCount: 2, inline: true, fields: [
        //                     { name: 'modified', label: 'modified', column: 1, readOnly: true },
        //                     { name: 'modifiedBy', label: 'modified by', column: 2, readOnly: true },
        //                 ]
        //             }
        //         ]
        //     }
        // ]
    }

    async _list() {

        this.options.filters = [
            //await this.filterDropDownOptions(_cxSchema.cx_map_config, { fieldName: 'map' }),
            { label: 'department', fieldName: 'dep', name: _cxSchema.cx_map_config_dep.EPOSDEPARTMENT, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'sub-department', fieldName: 'sub', name: _cxSchema.cx_map_config_dep.EPOSSUBDEPARTMENT, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'description', fieldName: 'desc', name: _cxSchema.cx_map_config_dep.EPOSDESCRIPTION, type: _cxConst.RENDER.CTRL_TYPE.TEXT },

        ];
        this.options.columns = [
            { title: ' ', name: _cxSchema.cx_map_config_dep.DEPMAPCONFIGID },
            { title: 'map id', name: _cxSchema.cx_map_config_dep.MAPCONFIGID },
            { title: 'department', name: _cxSchema.cx_map_config_dep.EPOSDEPARTMENT },
            { title: 'sub-department', name: _cxSchema.cx_map_config_dep.EPOSSUBDEPARTMENT },
            { title: 'description', name: _cxSchema.cx_map_config_dep.EPOSDESCRIPTION },
            
            { title: 'created', name: _cxSchema.cx_map_config_dep.CREATED },
            { title: 'by', name: _cxSchema.cx_map_config_dep.CREATEDBY },
            { title: 'modified', name: _cxSchema.cx_map_config_dep.MODIFIED },
            { title: 'by', name: _cxSchema.cx_map_config_dep.MODIFIEDBY },
        ];
        
    }

    // async dropDown() {
    //     if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a dep/sub-dep'; }
    //     if (this.options.label == undefined) { this.options.label = 'epos dep/sub-dep'; }

    //     // load collection if required
    //     if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(); }
    //     // populate drop down items
    //     var dropDownItems = [];
    //     this.dataSource.each(function (record) {
    //         dropDownItems.push({
    //             value: record.shopId,
    //             text: record.shopName + ' [' + record.shopCode + ']',
    //         });
    //     });
    //     this.options.items = dropDownItems;
    // }

}

module.exports = CxMapConfigRender;
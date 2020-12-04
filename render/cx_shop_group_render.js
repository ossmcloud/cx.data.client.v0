'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxShopGroupRender extends RenderBase {
    
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async record() {
        this.options.groups = [
            { name: 'main', title: 'main info', columnCount: 2 },
            { name: 'audit', title: 'audit info', columnCount: 2 },
        ];
        this.options.fields = [
            { group: 'main', name: _cxSchema.cx_shop_group.GROUPCODE, label: 'code', column: 1, width: '200px', validation: '{ "mandatory": true, "max": 20  }' },
            { group: 'main', name: _cxSchema.cx_shop_group.GROUPNAME, label: 'name', column: 1, width: '300px', validation: '{ "mandatory": true, "max": 60  }' },
            { group: 'main', name: _cxSchema.cx_shop_group.GROUPCOLOR, label: 'color', column: 2, width: '100px' },
            { group: 'audit', name: 'created', label: 'created', column: 1, readOnly: true },
            { group: 'audit', name: 'createdBy', label: 'created by', column: 1, readOnly: true },
            { group: 'audit', name: 'modified', label: 'modified', column: 2, readOnly: true },
            { group: 'audit', name: 'modifiedBy', label: 'modified by', column: 2, readOnly: true },
        ];
    }

    async list() {
        this.options.columns = [
            { title: '', name: _cxSchema.cx_shop_group.SHOPGROUPID },
            { title: 'code', name: _cxSchema.cx_shop_group.GROUPCODE },
            { title: 'name', name: _cxSchema.cx_shop_group.GROUPNAME },
            { title: 'color', name: _cxSchema.cx_shop_group.GROUPCOLOR },
        ];
    }

    async dropDown() {
        if (this.options.placeHolder == undefined) { this.options.placeHolder = 'select a group'; }
        if (this.options.label == undefined) { this.options.label = 'shop group'; }

        // load collection if required
        if (this.dataSource.count() == 0 && !this.options.noLoad) { await this.dataSource.select(); }
        // populate drop down items
        var dropDownItems = [];
        this.dataSource.each(function (record) {
            dropDownItems.push({
                value: record.shopGroupId,
                text: record.displayName,
            });
        });
        this.options.items = dropDownItems;
    }
    
}
    
module.exports = CxShopGroupRender;

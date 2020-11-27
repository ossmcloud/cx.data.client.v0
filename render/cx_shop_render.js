'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');

async function dropDown(table, options) {
    if (!options) { options = {}; }
    var dropDownOptions = {
        recordName: table.type,
        recordTitle: 'shop',
        id: options.id || (table.type + '_dropDown'),
        placeHolder: options.placeHolder || 'select a shop',
        value: options.value,
        width: options.width,
        inline: options.inline,
        fieldName: options.fieldName || table.primaryKeys[0].name,
        label: (options.label == undefined) ? 'shop' : options.label,
        items: [],
    };
    // load collection if required
    if (table.count() == 0 && !options.noLoad) { await table.select(); }
    // populate drop down items
    table.each(function (record) {
        dropDownOptions.items.push({
            value: record.shopId,
            text: record.shopName + ' [' + record.shopCode + ']',
        });
    });
    //
    return dropDownOptions;
}

function list(table, options) {
    if (!options) { options = {}; }
    
    return {
        recordName: table.type,
        recordTitle: 'shop',
        accountId: options.accountId,
        path: options.path,
        id: options.id || table.type,
        title: options.title || 'shops',
        primaryKey: table.primaryKeys[0].name,
        //
        fixHeader: options.fixHeader || false,
        allowNew: options.allowNew || false,
        allowEdit: options.allowEdit || false,
        quickSearch: options.quickSearch || true,
        //
        filters: options.filters || null,
        buttons: options.buttons || [],
        columns: options.columns || [
            { name: 'shopId', title: 'shop id' },
            { name: 'shopCode', title: 'code' },
            { name: 'shopName', title: 'name' },
            { name: 'shopAddress', title: 'address' },
            { name: 'status', title: 'status', lookUps: _cxConst.CX_SHOP.STATUS.toList() },
        ],
        highlights: [
            { column: 'status', op: '=', value: _cxConst.CX_SHOP.STATUS.INACTIVE, style: 'color: orange;' },            
        ],
    }
}

function record(record, options) {
    if (!options) { options = {}; }
   
    var renderOptions = {
        recordName: record.type,
        recordTitle: 'shop',
        accountId: options.accountId,
        path: options.path,
        listPath: options.listPath,
        id: options.id || record.type,
        title: options.title || 'shop form',
        primaryKey: record.table.primaryKeys[0].name,
        //
        editMode: options.editMode || false,
        allowEdit: options.allowEdit || false,
        
        buttons: options.buttons || [],
        groups: options.groups || [
            { name: 'main', title: 'main info' },
            { name: 'audit', title: 'audit info' },
        ],
        fields: options.fields || [
            { group: 'main', name: 'shopCode', label: 'code', column: 1, validation: '{ "mandatory": true, "max": 6  }', readOnly: (record.id) },
            { group: 'main', name: 'shopName', label: 'name', column: 1, validation: '{ "mandatory": true, "max": 60  }' },
            { group: 'main', name: 'shopAddress', label: 'address', column: 1, width: '300px', validation: '{ "max": 255 }' },
            { group: 'audit', name: 'created', label: 'created', readOnly: true },
        ]
    }
    //
    //if (process.env.DEV) { renderOptions.buttons.push({ id: 'test', text: 'TEST', function: 'tesFunc' }); }
    // //
    // if (record.status == _cxConst.CR_SHOP_TRANSMISSION.STATUS.TRANSMITTING) {
    //     renderOptions.buttons.push({ id: 'cr_shop_transmission_abort', text: 'Abort Transmission', function: 'abort' });
    // }
    //
    return renderOptions;
}

module.exports = {
    list: list,
    record: record,
    dropDown: dropDown,
    options: function (type, object, options) {
        if (type == 'list') { return list(object, options); }
        if (type == 'record') { return record(object, options); }
        if (type == 'dropdown') { return dropDown(object, options); }
        return null;
    }
}
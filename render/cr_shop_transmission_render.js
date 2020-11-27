'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');

function list(table, options) {
    if (!options) { options = {}; }
    return {
        recordName: table.type,
        accountId: options.accountId,
        path: options.path,
        id: options.id || table.type,
        title: options.title || 'shop transmissions history',
        primaryKey: _cxSchema.cr_shop_transmission.TRANSMISSIONID,
        //
        fixHeader: options.fixHeader || false,
        allowNew: options.allowNew || false,
        allowEdit: options.allowEdit || false,
        quickSearch: options.quickSearch || true,
        //
        filters: options.filters || null,
        buttons: options.buttons || [],
        columns: options.columns || [
            { name: 'transmissionId', title: '', align: 'center' },
            { name: 'transmissionIdText', title: 'transmission ID', align: 'center', width: '150px' },
            { name: 'shopInfo', title: 'shop', width: '200px' },
            { name: 'status', title: 'status', align: 'center', width: '130px', lookUps: _cxConst.CR_SHOP_TRANSMISSION.STATUS.toList(), },
            { name: 'action', title: 'action', align: 'center', width: '70px', lookUps: _cxConst.CR_SHOP_TRANSMISSION.ACTION.toList() },
            { name: 'message', title: 'message' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
        ],
        highlights: [
            { column: 'status', op: '=', value: _cxConst.CR_SHOP_TRANSMISSION.STATUS.ERROR, style: 'color: #DF0101; background-color: black' },
            { column: 'status', op: '=', value: _cxConst.CR_SHOP_TRANSMISSION.STATUS.TRANSMITTING, style: 'color: yellow; background-color: black' }
        ],
    }
}

function record(table, options) {
    if (!options) { options = {}; }
    
    var renderOptions = {
        recordName: table.type,
        accountId: options.accountId,
        path: options.path,
        listPath: options.listPath,
        id: options.id || table.type,

        title: options.title || 'dtfs transmission form',
        //formTitle: options.formTitle || 'dtfs transmission form',
        
        primaryKey: 'transmissionId',
        
        editMode: false,
        allowEdit: options.allowEdit || false,
        //edit: false,    // !IMPORTANT: these records cannot be edited

        buttons: options.buttons || [],
        groups: options.groups || [
            { name: 'main', title: 'main info' },
            { name: 'audit', title: 'audit info' },
        ],
        fields: options.fields || [
            { group: 'main', name: 'transmissionId', label: 'transmission ID', width: '150px', readOnly: true, column: 1 },
            { group: 'main', name: 'status', label: 'status', width: '100px', column: 1 },
            { group: 'main', name: 'action', label: 'action', width: '100px', column: 1 },
            { group: 'main', name: 'shopInfo', label: 'shop', column: 2 },
            { group: 'main', name: 'message', label: 'message', column: 2 },
            { group: 'audit', name: 'created', label: 'created', readOnly: true },
        ]
    }
    //
    //if (process.env.DEV) { renderOptions.buttons.push({ id: 'test', text: 'TEST', function: 'tesFunc' }); }
    //
    if (table.status == _cxConst.CR_SHOP_TRANSMISSION.STATUS.TRANSMITTING) {
        renderOptions.buttons.push({ id: 'cr_shop_transmission_abort', text: 'Abort Transmission', function: 'abort' });
    }
    //
    return renderOptions;
}

module.exports = {
    list: list,
    record: record,
    options: function (type, table, options) {
        if (type == 'list') { return list(table, options); }
        if (type == 'record') { return record(table, options); }
        return null;
    }
}
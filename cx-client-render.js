'use strict'

const _cxConst = require('./cx-client-declarations');
const _cxSchema = require('./cx-client-schema');

async function getCustomOptions(renderType, table) {
    // TODO: CX-DATA-CLIENT: check if we have custom options for this render type (list, record)
    //      use table.cx
    return null;
}

async function getDefaultOptions(renderType, table, options) {
    var renderOptions = require(`./render/${table.type}_render`);
    return renderOptions.options(renderType, table, options);
}


module.exports = {
    getOptions: async function (renderType, object, options) {
        if (!options) { options = {}; }
        // get from database if any custom one
        var renderOptions = await getCustomOptions(renderType, object, options);
        // if not get defaults
        if (!renderOptions) { renderOptions = await getDefaultOptions(renderType, object, options); }
        // if not too bad !!!!!
        if (!renderOptions) { throw new Error(`no default options for record: ${object.type}`); }
        return renderOptions;
    },

    getDropDownOptions: async function (table, options) {
        var renderOptions = await this.getOptions('dropdown', table, options);
        return renderOptions;
    },

    getListOptions: async function (table, options) {
        var renderOptions = await  this.getOptions('list', table, options);
        return renderOptions;
    },

    getRecordOptions: async function (table, options) {
        var renderOptions = await  this.getOptions('record', table, options);
        return renderOptions;
    }
}

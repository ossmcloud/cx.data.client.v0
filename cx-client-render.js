'use strict'

const _cxConst = require('./cx-client-declarations');
const _cxSchema = require('./cx-client-schema');


async function getCustomOptions(renderType, table) {
    // @LATER: for the future we can use this to allow for custom searches or stuff
    return null;
}

async function getDefaultOptions(renderType, table, options) {
    var renderer = require(`./render/${table.type}_render`);
    var renderOptions = new renderer(table, options);
    return renderOptions.get(renderType);
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
        var renderOptions = await this.getOptions('list', table, options);
        if (options.listView) {
            renderOptions.filters = [];
            renderOptions.title = '';
            renderOptions.allowNew = false;
            renderOptions.allowEdit = false;
            renderOptions.quickSearch = false;
        }
        return renderOptions;
    },

    getRecordOptions: async function (record, options) {
        var renderOptions = await this.getOptions('record', record, options);
        return renderOptions;
    }
}

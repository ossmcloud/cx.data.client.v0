'use strict'

const _cxConst = require('./cx-client-declarations');
const { cp_shop_setting } = require('./cx-client-schema');
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

async function setLoginLookUpColumns(dataSource, options) {
    if (options.columns) {
        var users = await dataSource.cx.table(_cxSchema.cx_login).selectList();
        options.columns.forEach(col => {
            if (col.name == 'createdBy' || col.name == 'modifiedBy') {
                col.lookUps = users;
            }
        });
    }
}

async function setLoginLookUpFields(dataSource, fields, users) {
    if (!users) { users = await dataSource.cx.table(_cxSchema.cx_login).selectList(); }

    if (fields) {
        fields.forEach(field => {
            if (field.name == 'createdBy' || field.name == 'modifiedBy') {
                field.lookUps = users;
                field.readOnly = true;
            }

            if (field.name == 'createdBy' || field.name == 'modifiedBy') { field.readOnly = true; }

            if (field.fields) { setLoginLookUpFields(dataSource, field.fields, users); }
        });
    }
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
        await setLoginLookUpColumns(table, renderOptions);
        return renderOptions;
    },

    getRecordOptions: async function (record, options) {
        var renderOptions = await this.getOptions('record', record, options);
        await setLoginLookUpFields(record, options.fields);
        return renderOptions;
    }
}

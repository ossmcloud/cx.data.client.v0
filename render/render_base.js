'use strict';

const _cx = require('cx-core');
const _ex = require('cx-core/errors/cx-errors');
const _cxConst = require('../cx-client-declarations');
const _cx_render = require('../cx-client-render');
const _permission = require('../core/cx-permission-manager');

class RenderBase {
    #title = null;
    #options = null;
    #dataSource = null;
    #dataSourceType = null;
    constructor(dataSource, options) {
        if (!dataSource) { throw new _ex.CxNullArgError('dataSource'); }
        if (!options) { options = {}; }
        this.#dataSource = dataSource;
        this.#dataSourceType = ((dataSource.table) ? dataSource.table.type : dataSource.type);
        this.#options = options;
        this.formatOptions();
    }

    get options() {
        return this.#options;
    }
    get dataSource() {
        return this.#dataSource;
    }
    get dataSourceType() {
        return this.#dataSourceType;
    }
    get title() {
        return this.#title
    } set title(value) {
        this.#title = value;
    }

    formatOptions() {
        // get data source title
        this.#title = this.options.title || this.dataSourceType.replace('cx_', '').replace('cr_', '').replace('cp_', '').replaceAll('_', ' ');

        this.options.recordTitle = this.#title;
        this.options.recordName = this.dataSourceType;
        if (this.dataSource.table) {
            // this if the data source is a record
            this.options.primaryKey = this.dataSource.table.primaryKeys[0].name;
        } else if (this.dataSource.primaryKeys) {
            // this if the data source is a table
            this.options.primaryKey = this.dataSource.primaryKeys[0].name;
        }

        if (!this.options.buttons) { this.options.buttons = []; }
        if (!this.options.id) { this.options.id = this.dataSourceType; }
        if (this.options.quickSearch != false) { this.options.quickSearch = true; }

        this.options.editMode = (this.options.query) ? this.options.query.e == 'T' : false;

        if (this.options.editMode) {
            if (this.options.query.id) {
                this.options.mode = 'edit';
            } else {
                this.options.mode = 'new';
            }
        } else {
            if (this.dataSource.isNew && this.dataSource.isNew()) {
                throw new Error('Cannot display new records in view mode!');
            }
            this.options.mode = 'view';
        }
    }

    async get(renderType, options) {
        if (renderType == _cxConst.RENDER.TYPE.LIST) {
            if (this.options.title == undefined) {
                this.options.title = `${this.#title} list`;
            }
            await this.list(options);
        }
        if (renderType == _cxConst.RENDER.TYPE.RECORD) {
            await this.record(options);

            if (this.options.editMode && !this.options.allowEdit && !this.options.allowNew) {
                this.options.editMode = false;
            }

            if (this.options.title == undefined) {
                if (this.options.editMode) {
                    this.options.title = (this.options.query.id ? 'edit ' : 'new ') + this.#title;
                } else {
                    this.options.title = `view ${this.#title}`;
                }
            }
        }
        if (renderType == _cxConst.RENDER.TYPE.DROP_DOWN) {
            await this.dropDown(options);
        }
        return this.#options;
    }

    async setPermission() {
        var permissions = await _permission.get(this.dataSourceType, this.dataSource.cx.roleId);
        this.options.allowEdit = permissions.allowEdit;
        this.options.allowNew = permissions.allowNew;
        this.options.allowView = permissions.allowView;
        this.options.allowDelete = permissions.allowDelete;
    }

    async record(request, h) {
        await this.setPermission();
        await this._record(request, h);
    }
    async _record(request, h) {
        throw new Error('RenderBase._record not overwritten')
    }

    async list(request, h) {
        await this.setPermission();
        await this._list(request, h);

    }
    async _list(request, h) {
        throw new Error('RenderBase._list not overwritten')
    }


    async filterDropDownOptions(tableName, options) {
        if (!options.credentials) { options.credentials = this.options.credentials; }
        var table = this.dataSource.cx.table(tableName);
        if (!options.dropDown) { options.dropDown = {}; }
        options.dropDown = {
            allowAll: true,
            allowNone: true,
        }
        return await _cx_render.getDropDownOptions(table, options);
    }

    async fieldDropDownOptions(tableName, options) {
        if (!options.credentials) { options.credentials = this.options.credentials; }
        var table = this.dataSource.cx.table(tableName);
        if (!options.dropDown) { options.dropDown = {}; }
        options.dropDown = {
            allowAll: false,
            allowNone: false,
            allowEmpty: true,
        }
        return await _cx_render.getDropDownOptions(table, options);
    }

    async listOptions(table, options) {
        if (!options) { options = {}; }
        if (!options.credentials) { options.credentials = this.options.credentials; }
        var listOptions = await _cx_render.getListOptions(table, options);
        listOptions.records = table.records;

        return listOptions;
    }


    async getPreferenceListOptions() {
        return await this.dataSource.cx.table('cr_preference').getPreferenceListOptions(this.dataSourceType, this.dataSource.id, (this.options.mode == 'view'));
    }


}


module.exports = RenderBase;
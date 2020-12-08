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
    constructor(dataSource, options) {
        if (!dataSource) { throw new _ex.CxNullArgError('dataSource'); }
        
        this.#dataSource = dataSource;
        // TODO: get data source title
        this.#title = dataSource.type.replace('cx_', '').replace('cr_', '').replace('cp_', '').replaceAll('_', ' ');
        this.#options = options || {};

        this.formatOptions();
        
    }

    get options() {
        return this.#options;
    }
    get dataSource() {
        return this.#dataSource;
    }

    formatOptions() {
        if (!this.options.id) { this.options.id = this.dataSource.type; }
        this.options.recordTitle = this.#title;
        this.options.recordName = this.dataSource.type;
        if (this.dataSource.table) {
            // this if the data source is a record
            this.options.primaryKey = this.dataSource.table.primaryKeys[0].name;     
        } else if (this.dataSource.primaryKeys) {
            // this if the data source is a table
            this.options.primaryKey = this.dataSource.primaryKeys[0].name;     
        }

        if (this.options.quickSearch != false) { this.options.quickSearch = true; }
        if (!this.options.buttons) { this.options.buttons = []; }

        this.options.editMode = (this.options.query) ? this.options.query.e == 'T' : false;
        
        if (this.options.editMode) {
            if (this.options.query.id) {
                this.options.mode = 'edit';
            } else {
                this.options.mode = 'new';
            }
        } else {
            this.options.mode = 'view';
        }
        
    }

    async get(renderType) {
        if (renderType == _cxConst.RENDER.TYPE.LIST) {
            this.options.title = `${this.#title} list`;
            //this.options.tabTitle = `cx::${this.#title} list`;
            await this.list();
        }
        if (renderType == _cxConst.RENDER.TYPE.RECORD) {
            await this.record();

            if (this.options.editMode && !this.options.allowEdit) {
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
        if (renderType == _cxConst.RENDER.TYPE.DROP_DOWN) { await this.dropDown(); }
        return this.#options;
    }

    async setPermission(role) {
        var permissions = await _permission.get(this.dataSource.type, this.options.credentials.roleId);
        this.options.allowEdit = permissions.allowEdit;
        this.options.allowNew = permissions.allowNew;
        this.options.allowView = permissions.allowView;
    }

    async record(request, h) {
        await this.setPermission(null);
        await this._record(request, h);
    }
    async _record(request, h) {
        throw new Error('RenderBase._record not overwritten')
    }

    async list(request, h) {
        await this.setPermission(null);
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

        //options.allowEmpty = '- all -';
        return await _cx_render.getDropDownOptions(table, options);
    }

    async listOptions(table, options) {
        if (!options.credentials) { options.credentials = this.options.credentials; }
        var listOptions = await _cx_render.getListOptions(table, options);
        listOptions.records = table.records;
        return listOptions;
    }

}


module.exports = RenderBase;
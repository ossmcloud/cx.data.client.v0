'use strict';

const _cx = require('cx-core');
const _ex = require('cx-core/errors/cx-errors');
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const _cx_render = require('../cx-client-render');
const _permission = require('../core/cx-permission-manager');

class RenderBase {
    #title = null;
    #options = null;
    #dataSource = null;
    #dataSourceType = null;
    #dataSourceColumns = [];
    #dataSourceFilters = [];
    #autoLoad = false;
    constructor(dataSource, options, paging) {
        if (!dataSource) { throw new _ex.CxNullArgError('dataSource'); }
        if (!options) { options = {}; }
        this.#dataSource = dataSource;
        this.#dataSourceType = ((dataSource.table) ? dataSource.table.type : dataSource.type);
        this.#options = options;
        this.formatOptions();
        if (paging === true) { this.setPaging(); }
    }

    get autoLoad() {
        return this.#autoLoad;
    } set autoLoad(val) {
        this.#autoLoad = val;
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
    get dataSourceColumns() { return this.#dataSourceColumns; }
    get dataSourceFilters() { return this.#dataSourceFilters; }

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

        this.options.pageSize = _cxConst.SQL.PAGE_SIZE;

        if (!this.options.cellHighlights) {
            this.options.cellHighlights = [];
        }
    }

    async getUserListOptions() {
        var options = {};

        options.copyColumn = function (fieldName, column) {
            var option = this[fieldName];
            if (option === undefined) { return; }
            if (option.column) {
                for (var optionProp in option.column) {
                    column[optionProp] = option.column[optionProp];
                }
            }
        }
        options.copyFilter = function (fieldName, filter) {
            var option = this[fieldName];
            if (option === undefined) { return; }
            if (option.filter) {
                for (var optionProp in option.filter) {
                    filter[optionProp] = option.filter[optionProp];
                }
            }
        }

        return options;
    }

    async initColumnsAndFilters() {
        var sortIdx = 0; var sortIdxFilter = 0;
        var dataSource = this.dataSource;
        var userListOptions = await this.getUserListOptions();
        

        for (var f in dataSource.fields) {
            var field = dataSource.fields[f];

            var column = { name: f, title: f.fromCamelCase() };
            var filter = { id: 'cx_' + f, label: f.fromCamelCase(), fieldName: f, inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '130px' };
            if (field.pk) {
                column.align = 'center';
                column.title = ' ';
            }
            if (field.dataType == 'datetime') {
                column.align = 'center';
                column.width = '130px';
                filter.label += ' (from)';
                filter.inputType = _cxConst.RENDER.CTRL_TYPE.DATE;
            }
            if (!field.pk && (field.dataType == 'bigint' || field.dataType == 'int')) {
                //if (f.substring(f.length - 2).toLowerCase() == 'id') { continue; }
                column.align = 'right';
                column.formatNumber = 'N0';
                column.addTotals = true;
            }
            if (field.dataType == 'money') {
                column.align = 'right';
                column.formatMoney = 'N0';
                column.addTotals = true;
            }

            if (field.name == 'createdBy' || field.name == 'modifiedBy') {
                column.addTotals = false;
                column.width = '90px';
            }

            userListOptions.copyColumn(field.name, column);
            userListOptions.copyFilter(field.name, filter);

            if (await this.initColumn(field, column) !== false) {
                if (column.hide !== true) {
                    if (column.sortIdx) {
                        sortIdx = column.sortIdx + 1;
                    } else {
                        column.sortIdx = (sortIdx * 10);
                        sortIdx++;
                    }
                    this.dataSourceColumns.push(column);
                }
            }

            if (field.name != 'createdBy' && field.name != 'modifiedBy') {
                if (field.pk) { filter.hide = true; }
                if (await this.initFilter(field, filter) !== false) {
                    if (filter.hide !== true) {
                        if (filter.sortIdx) {
                            sortIdxFilter = filter.sortIdx + 1;
                        } else {
                            filter.sortIdx = (sortIdxFilter * 10);
                            sortIdxFilter++;
                        }

                        if (filter.replace) {
                            filter.replace.sortIdx = filter.sortIdx;
                            this.#dataSourceFilters.push(filter.replace);
                        } else {
                            this.#dataSourceFilters.push(filter);
                            if (field.dataType == 'datetime') {
                                var filter2 = {};
                                for (var fk in filter) { filter2[fk] = filter[fk]; }
                                filter2.id += '_2';
                                filter2.fieldName += 'To';
                                filter2.label = filter.label.replace('from', 'to');
                                this.#dataSourceFilters.push(filter2);
                            }
                        }
                    }
                }
            }

        }

        _cx.list.sortArray(this.#dataSourceColumns, 'sortIdx');
        _cx.list.sortArray(this.#dataSourceFilters, 'sortIdx');

        this.options.filters = this.dataSourceFilters;
        this.options.columns = this.dataSourceColumns;


    }

    async initColumn(field, column) { }
    async initFilter(field, column) { }



    getColumn(fieldName) {
        for (var dsx = 0; dsx < this.dataSourceColumns.length; dsx++) {
            if (this.dataSourceColumns[dsx].name == fieldName) { return this.dataSourceColumns[dsx]; }
        }
        return null;
    }
    setColumn(fieldName, column) {
        for (var dsx = 0; dsx < this.dataSourceColumns.length; dsx++) {
            if (this.dataSourceColumns[dsx].name == fieldName) {
                this.dataSourceColumns[dsx] = column;
                break;
            }
        }
        return column;
    }

    getFilter(fieldName) {
        for (var dsx = 0; dsx < this.#dataSourceFilters.length; dsx++) {
            if (this.dataSourceFilters[dsx].fieldName == fieldName) { return this.dataSourceFilters[dsx]; }
        }
        return null;
    }
    setFilter(fieldName, filter) {
        for (var dsx = 0; dsx < this.#dataSourceFilters.length; dsx++) {
            if (this.dataSourceFilters[dsx].fieldName == fieldName) {
                this.dataSourceFilters[dsx] = filter;
                break;
            }
        }
        return filter;
    }

    setPaging() {
        if (!this.options) { this.options = {}; }
        this.options.paging = true;
        this.options.pageNo = (this.options.query) ? (this.options.query.page || 1) : 1;
    }

    async validateErpToken() {
        var warningMessage = '';

        var erpSettingsInfo = await this.dataSource.cx.exec({
            sql: `
                select	    erpSett.dtfsSettingId, prv.isCloud
                from	    erp_shop_setting erpSett
                inner join  sys_provider prv ON prv.code = erpSett.erpProvider
                where	    erpSett.shopId = @shopId
            `,
            params: [{ name: 'shopId', value: this.dataSource.shopId }],
            returnFirst: true,
        });
        if (erpSettingsInfo && erpSettingsInfo.isCloud) {
            var erpToken = await this.dataSource.cx.table(_cxSchema.cx_login_token).fetch(['erp', this.dataSource.cx.tUserId, erpSettingsInfo.dtfsSettingId], true);
            if (erpToken) {
                if (erpToken.status != 1) {
                    warningMessage = '&#9888; your oauth-token is not valid';
                } else if (erpToken.isExpired) {
                    warningMessage = '&#9888; your oauth-token is expired';
                }
            } else {
                warningMessage = '&#9888; there is no oauth-token for this store';
            }
            if (warningMessage) {
                warningMessage += ' <a href="#" onclick="window.open(\'../oauth?type=erp&s=' + this.dataSource.shopId + '\'); return false;" >click here to get a token</a>';
                warningMessage = `<div style="color: var(--warn-color);">${warningMessage}</div>`;
            }

        }

        return warningMessage;
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
        if (this.autoLoad === true) { await this.initColumnsAndFilters(); }
        await this._list(request, h);

    }
    async _list(request, h) {
        //throw new Error('RenderBase._list not overwritten')
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
        return await this.dataSource.cx.table('cr_preference').getPreferenceListOptions(this.dataSourceType, this.dataSource.id, (this.options.mode == 'view' && this.options.allowEdit));
    }


}


module.exports = RenderBase;
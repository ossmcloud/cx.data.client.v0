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
        if (!options) { options = {}; }
        this.#dataSource = dataSource;
        this.#options = options;
        this.formatOptions();
    }

    get options() {
        return this.#options;
    }
    get dataSource() {
        return this.#dataSource;
    }
    get title() {
        return this.#title
    } set title(value) {
        this.#title = value;
    }

    formatOptions() {
        // get data source title
        this.#title = this.options.title || this.dataSource.type.replace('cx_', '').replace('cr_', '').replace('cp_', '').replaceAll('_', ' ');
        
        this.options.recordTitle = this.#title;
        this.options.recordName = this.dataSource.type;
        if (this.dataSource.table) {
            // this if the data source is a record
            this.options.primaryKey = this.dataSource.table.primaryKeys[0].name;
        } else if (this.dataSource.primaryKeys) {
            // this if the data source is a table
            this.options.primaryKey = this.dataSource.primaryKeys[0].name;
        }

        if (!this.options.buttons) { this.options.buttons = []; }
        if (!this.options.id) { this.options.id = this.dataSource.type; }
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
        var permissions = await _permission.get(this.dataSource.type, this.dataSource.cx.roleId);
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


    async getPreferenceListOptions(recordType, recordId) {
        return await this.dataSource.cx.table('cr_preference').getPreferenceListOptions(recordType, recordId, (this.options.mode == 'view'));
        // var query = {
        //     sql: `select	p.preferenceId, p.name, p.type, pr.recordType, pr.levelId, 
        //                 (select pc.recordId from cr_preference_config pc where pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId and pc.recordId = @recordId) as recordId,
        //                 (case p.type 
        //                     when 'value' then
        //                         (select pv.label from cr_preference_value pv where pv.preferenceValueId = (select pc.value from cr_preference_config pc where pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId and pc.recordId = @recordId) ) 
        //                     else
        //                         (select pc.value from cr_preference_config pc where pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId and pc.recordId = @recordId) 
        //                 end ) as [value]

        //         from	cr_preference p
        //         inner join cr_preference_record pr ON pr.preferenceId = p.preferenceId
        //         left outer join cr_preference_config pc ON pc.preferenceId = p.preferenceId and pc.preferenceRecordId = pr.preferenceRecordId
        //         where	pr.recordType = @recordType
        //         order by p.name desc`,
        //     params: [
        //         { name: 'recordId', value: recordId },
        //         { name: 'recordType', value: recordType },
        //     ]
        // }

        // var preferences = await this.dataSource.cx.exec(query);

        // var listOptions = {
        //     title: '',
        //     listView: true,
        //     records: preferences.rows,
        //     columns: [
        //         { name: 'name', title: 'preference' },
        //         { name: 'type', title: 'type', width: '75px', align: 'center' },
        //         { name: 'value', title: 'value', width: '250px' },
        //     ],

        // }

        // if (this.options.mode == 'view') {
        //     listOptions.showButtons = [
        //         { id: 'cr_pref_edit', text: 'Edit Preferences', function: 'editPreferences' }
        //     ]
        // }

        // return listOptions;
        
    }


}


module.exports = RenderBase;
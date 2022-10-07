'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

var prefValueTypes = [
    { value: 'string', text: 'text value' },
    { value: 'number', text: 'numeric value' },
    { value: 'bool', text: 'check-box value' },
    { value: 'object', text: 'JSON object (advanced)' },
    { value: 'value', text: 'drop down list' },
]

class CRPreferenceRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }


    async _loadPreferenceRecords(allowEdit) {
        var prefRecords = this.dataSource.cx.table(_cxSchema.cr_preference_record);
        await prefRecords.select({ pref: this.dataSource.id });
        var listOptions = {
            listView: true,
            records: prefRecords.records,
            columns: [
                { name: 'levelId', title: 'level', width: '50px' },
                { name: 'recordType', title: 'type' },
                { name: 'preferenceRecordId', dataHidden: 'preference-record-id' },

            ],
            highlights: [{
                column: _cxSchema.cr_preference_record.DISABLED, op: '=', value: true,
                //   columns: [_cxSchema.cr_preference_record.RECORDTYPE, _cxSchema.cr_preference_record.LEVELID],
                style: 'color: var(--element-color-disabled); font-style: italic;'
            }],

        }

        if (allowEdit) {
            listOptions.actions = [
                { label: 'disable', funcName: 'disablePrefRecord' },
                { label: 'enable', funcName: 'enablePrefRecord' }
            ];
            listOptions.allowActionCondition = function (action, object) {
                if (action.label == 'disable') {
                    if (!object.disabled) { return true }

                } else if (action.label == 'enable') {
                    if (object.disabled) { return true }

                }
            }
        }
        return listOptions;
    }

    async _loadPreferenceConfigs(allowEdit) {

        var valueSql = 'pc.value';
        if (this.dataSource.type == 'value') {
            valueSql = '(select pv.label from cr_preference_value pv where pv.preferenceValueId = pc.value) as [value]'
        }

        var query = {
            sql: `  select      pc.preferenceId, pc.preferenceRecordId, pr.levelId, pr.disabled, pr.recordType, pc.recordId, ${valueSql},

                    case        pr.recordType
                        when    'cx_login'          then (select l.firstName + ', ' + l.lastName from cx_login l where l.loginId = pc.recordId)
                        when    'cx_shop_group'     then (select '[' + l.groupCode + '] ' + l.groupName from cx_shop_group l where l.shopGroupId = pc.recordId)
                        when    'erp_dtfs_setting'  then (select l.dtfsSettingName from erp_dtfs_setting l where l.dtfsSettingId = pc.recordId)
                        when    'erp_shop_setting'  then (select l.erpCustomerAccount from erp_shop_setting l where l.shopId = pc.recordId)
                        when    'cx_role'           then 
                                case pc.recordId    when 0 then 'cash-book'
                                                    when 1 then 'user'
                                                    when 3 then 'supervisor'
                                                    when 5 then 'manager'
                                                    when 7 then 'admin'
                                                    when 8 then 'cx support'
                                                    when 9 then 'cx admin'
                                                    else 'unknown role, id: ' + convert(varchar, pc.recordId)
                                end 
                        else    ''
                    end as [recordName]
                                
                    from        ${_cxSchema.cr_preference_config.TBL_NAME} pc
                    inner join  ${_cxSchema.cr_preference_record.TBL_NAME} pr ON pr.preferenceRecordId = pc.preferenceRecordId
                    where       pc.${_cxSchema.cr_preference_config.PREFERENCEID} = @${_cxSchema.cr_preference_config.PREFERENCEID}
                    order by    pr.levelId, recordName`,
            params: [
                { name: _cxSchema.cr_preference_config.PREFERENCEID, value: this.dataSource.id }
            ]
        };


        var prefConfigs = await this.dataSource.cx.exec(query);
        var listOptions = {
            listView: true,
            quickSearch: true,
            records: prefConfigs.rows,
            columns: [
                { name: 'levelId', title: 'level', width: '50px' },
                { name: 'recordId', title: 'record id', width: '50px' },
                { name: 'recordType', title: 'record type', width: '250px' },
                { name: 'recordName', title: 'record name', width: '250px' },
                { name: 'value', title: 'value' },
                { name: 'preferenceId', dataHidden: 'preference-id' },
                { name: 'preferenceRecordId', dataHidden: 'preference-record-id' },
                { name: 'recordId', dataHidden: 'record-id' },
            ],
            highlights: [{
                column: 'disabled', op: '=', value: true,
                style: 'color: var(--element-color-disabled); font-style: italic;'
            }],
        }
        if (allowEdit) {
            listOptions.actions = [
                { label: 'edit', funcName: 'editPreference' },
                { label: 'delete', funcName: 'deletePreference' }
            ];
        }
        return listOptions;
    }




    async _record() {

        this.options.allowNew = false;

        var allowEdit = ((this.options.mode == 'view') && this.dataSource.cx.roleId >= _cxConst.CX_ROLE.ADMIN);
        var prefRecordListOptions = await this._loadPreferenceRecords(allowEdit);

        var prefConfigListOptions = null;
        if (this.options.mode == 'view') {
            // load config records only in view mode
            prefConfigListOptions = await this._loadPreferenceConfigs(allowEdit);
            // only allow admins to add permissions and only if we have associated records (which we have unless this is a global only preference)
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.ADMIN && prefRecordListOptions.records.length > 0) {
                this.options.buttons.push({ id: 'cr_permission_add', text: 'Add Permission', function: 'addPermission' });
            }
        }

        var controlType = '';
        var valuesLookUp = null;
        if (this.dataSource.type == 'value') {
            controlType = _cxConst.RENDER.CTRL_TYPE.SELECT;
            var prefValues = this.dataSource.cx.table(_cxSchema.cr_preference_value);
            await prefValues.select({ pref: this.dataSource.id });
            valuesLookUp = [];
            prefValues.each(function (prefVal) {
                valuesLookUp.push({ value: prefVal.id, text: prefVal.label });
            });

        } else if (this.dataSource.type == 'bool' || this.dataSource.type == 'boolean') {
            controlType = _cxConst.RENDER.CTRL_TYPE.CHECK;
        } else if (this.dataSource.type == 'float' || this.dataSource.type == 'decimal' || this.dataSource.type == 'double') {
            controlType = _cxConst.RENDER.CTRL_TYPE.NUMERIC;
        } else if (this.dataSource.type == 'number' || this.dataSource.type == 'int' || this.dataSource.type == 'integer' || this.dataSource.type == 'bigint' || this.dataSource.type == 'long') {
            controlType = _cxConst.RENDER.CTRL_TYPE.NUMERIC;
        } else if (this.dataSource.type == 'object' || this.dataSource.type == 'json') {
            controlType = _cxConst.RENDER.CTRL_TYPE.TEXT_AREA;
        } else if (this.dataSource.type == 'date') {
            controlType = _cxConst.RENDER.CTRL_TYPE.DATE;
        }

        this.options.fields = [
            {
                group: 'outer', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', columnCount: 1, inline: true, fields: [
                            {
                                group: 'main', columnCount: 2, inline: true, fields: [
                                    { name: _cxSchema.cr_preference.NAME, label: 'name', column: 1 },
                                    { name: _cxSchema.cr_preference.TYPE, label: 'type', column: 2, readOnly: true, lookUps: prefValueTypes },
                                ]
                            },
                            { name: _cxSchema.cr_preference.DESCRIPTION, type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, label: 'description', validation: '{ "mandatory": true, "max": 255  }' },
                            { name: _cxSchema.cr_preference.DEFAULTVALUE, label: 'global default', type: controlType, lookUps: valuesLookUp },

                        ]
                    },
                    {
                        group: 'audit', title: 'apply to records', width: '100%', column: 2, fields: [prefRecordListOptions]
                    }
                ]
            }
        ];

        if (prefConfigListOptions) {
            this.options.fields[0].fields.push({
                group: 'audit', title: 'current configurations', width: '100%', column: 2, fields: [prefConfigListOptions]
            });
        }
    }



    async _list() {
        this.options.columns = [
            { name: _cxSchema.cr_preference.PREFERENCEID, title: ' ', align: 'center' },
            { name: _cxSchema.cr_preference.NAME, title: 'preference name' },
            { name: _cxSchema.cr_preference.TYPE, title: 'value type', lookUps: prefValueTypes },
            { name: _cxSchema.cr_preference.DEFAULTVALUE, title: 'global default' },

        ];
    }
}

module.exports = CRPreferenceRender;




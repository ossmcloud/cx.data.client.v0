'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

// NOTE: text fields use the escaped getters (nameHtml, descriptionHtml, promptHtml) wherever they are rendered read-only
class SysAiPromptRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'ai prompt';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.sys_aiPrompt.AIPROMPTID] = null;
        this.autoLoadFields[_cxSchema.sys_aiPrompt.EXECSEQUENCE] = null;
        this.autoLoadFields[_cxSchema.sys_aiPrompt.NAME] = null;
        this.autoLoadFields[_cxSchema.sys_aiPrompt.DESCRIPTION] = null;
        this.autoLoadFields[_cxSchema.sys_aiPrompt.INACTIVE] = null;
        this.autoLoadFields[_cxSchema.sys_aiPrompt.CREATED] = null;
        this.autoLoadFields[_cxSchema.sys_aiPrompt.MODIFIED] = null;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.sys_aiPrompt.AIPROMPTID) {
            column.addTotals = false;
        } else if (field.name == _cxSchema.sys_aiPrompt.EXECSEQUENCE) {
            column.addTotals = false;
            column.title = 'sequence';
            column.width = '70px';
        } else if (field.name == _cxSchema.sys_aiPrompt.NAME) {
            column.name = 'nameHtml';
        } else if (field.name == _cxSchema.sys_aiPrompt.DESCRIPTION) {
            column.name = 'descriptionHtml';
            column.nullText = '';
        } else if (field.name == _cxSchema.sys_aiPrompt.INACTIVE) {
            column.align = 'center';
            column.width = '50px';
        }
    }

    async initFilter(field, filter) {
        if (field.name != _cxSchema.sys_aiPrompt.NAME) { filter.hide = true; }
    }

    async _list() {
        this.options.title = 'ai prompts';
        this.options.highlights = [
            { column: 'inactive', op: '=', value: true, style: 'color: var(--element-color-faint);' },
        ];
    }

    async _record() {
        var readOnly = (this.options.mode == 'view');

        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 2, styles: ['width: calc(100% - 400px);', 'min-width: 400px; max-width: 400px'], fields: [
                    {
                        group: 'main', title: 'prompt info', column: 1, columnCount: 1, fields: [
                            {
                                group: 'name_seq', title: '', column: 1, columnCount: 3, styles: ['width: calc(100% - 250px)', 'width: 125px', 'width: 125px'], fields: [
                                    (readOnly)
                                        ? { name: 'nameHtml', label: 'name', column: 1, readOnly: true }
                                        : { name: _cxSchema.sys_aiPrompt.NAME, label: 'name', column: 1, validation: '{ "mandatory": true, "max": 100 }' },
                                    { name: _cxSchema.sys_aiPrompt.EXECSEQUENCE, label: 'sequence', column: 2, validation: '{ "mandatory": true }' },
                                    { name: _cxSchema.sys_aiPrompt.INACTIVE, label: 'is inactive', column: 3 },
                                ]
                            },
                            (readOnly)
                                ? { name: 'descriptionHtml', label: 'description (internal notes, not sent to the assistant)', column: 1, readOnly: true }
                                : { name: _cxSchema.sys_aiPrompt.DESCRIPTION, label: 'description (internal notes, not sent to the assistant)', column: 1, type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 3, validation: '{ "max": 1000 }' },
                            (readOnly)
                                ? { name: 'promptHtml', label: 'prompt (added to the instructions of every new ai chat)', column: 1, readOnly: true }
                                : { name: _cxSchema.sys_aiPrompt.PROMPT, label: 'prompt (added to the instructions of every new ai chat)', column: 1, type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 25, validation: '{ "mandatory": true }' },
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 2, columnCount: 1, fields: [
                            {
                                group: 'audit1', title: '', column: 1, columnCount: 2, inline: true, fields: [
                                    { name: _cxSchema.sys_aiPrompt.CREATED, label: 'created', column: 1, readOnly: true },
                                    { name: _cxSchema.sys_aiPrompt.CREATEDBY, label: 'created by', column: 2, readOnly: true },
                                ]
                            },
                            {
                                group: 'audit2', title: '', column: 1, columnCount: 2, inline: true, fields: [
                                    { name: _cxSchema.sys_aiPrompt.MODIFIED, label: 'modified', column: 1, readOnly: true },
                                    { name: _cxSchema.sys_aiPrompt.MODIFIEDBY, label: 'modified by', column: 2, readOnly: true },
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }
}


module.exports = SysAiPromptRender;

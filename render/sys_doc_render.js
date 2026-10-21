'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class SysDocRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'system doc';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.sys_doc.DOCID] = null;
        this.autoLoadFields[_cxSchema.sys_doc.NAME] = null;
        this.autoLoadFields[_cxSchema.sys_doc.DESCRIPTION] = null;
        this.autoLoadFields[_cxSchema.sys_doc.CREATED] = null;
        this.autoLoadFields[_cxSchema.sys_doc.CREATEDBY] = null;
        this.autoLoadFields[_cxSchema.sys_doc.MODIFIED] = null;
        this.autoLoadFields[_cxSchema.sys_doc.MODIFIEDBY] = null;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.sys_doc.DOCID) {
            column.addTotals = false;
        }
    }

    async _list() {
        this.options.title = 'system docs';
    }

    async getAttachmentListOptions() {
        var attachments = this.dataSource.cx.table(_cxSchema.cx_attachment);
        await attachments.select({ recordType: this.dataSource.type, recordId: this.dataSource.docId });

        var attachListOptions = {
            listView: true,
            columns: [
                { name: 'attachmentId', dataHidden: 'attachment-id' },
                { name: 'externalLink', title: '&#128279;', width: '30px', align: 'center', link: { url: '{externalLink}', text: '&#128279;' } },
                { name: 'name', title: 'file name' },
                { name: 'description', title: 'description' },
                { name: 'created', title: 'uploaded on', width: '150px' },
            ],
            records: attachments.records
        }

        if (this.options.mode == 'view' && this.options.allowEdit) {
            attachListOptions.actions = [{ label: 'remove', funcName: 'removeAttachment' }];
            attachListOptions.showButtons = [{ id: 'sys_doc_attach_add', text: 'Attach File', function: 'addAttachment' }];
        }

        attachListOptions.quickSearch = true;
        return attachListOptions;
    }

    async _record() {
        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 2, styles: ['width: calc(100% - 400px);', 'min-width: 400px; max-width: 400px'], fields: [
                    {
                        group: 'main', title: 'document info', column: 1, columnCount: 1, fields: [
                            { name: _cxSchema.sys_doc.NAME, label: 'name', column: 1, validation: '{ "mandatory": true, "max": 255 }' },
                            { name: _cxSchema.sys_doc.DESCRIPTION, label: 'description', column: 1, type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 3, validation: '{ "mandatory": true, "max": 1000 }' },
                            { name: _cxSchema.sys_doc.CONTENT, label: 'content (supports MD format)', column: 1, type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 30, validation: '{ "mandatory": true, "max": 4000 }' },
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 2, columnCount: 1, fields: [
                            {
                                group: 'audit1', title: '', column: 1, columnCount: 2, inline: true, fields: [
                                    { name: _cxSchema.sys_doc.CREATED, label: 'created', column: 1, readOnly: true },
                                    { name: _cxSchema.sys_doc.CREATEDBY, label: 'created by', column: 2, readOnly: true },
                                ]
                            },
                            {
                                group: 'audit2', title: '', column: 1, columnCount: 2, inline: true, fields: [
                                    { name: _cxSchema.sys_doc.MODIFIED, label: 'modified', column: 1, readOnly: true },
                                    { name: _cxSchema.sys_doc.MODIFIEDBY, label: 'modified by', column: 2, readOnly: true },
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        if (!this.dataSource.isNew()) {
            var attachListOptions = await this.getAttachmentListOptions();
            this.options.fields.push({ group: 'attachments', title: 'attachments', column: 1, fields: [attachListOptions] });
        }
    }
}


module.exports = SysDocRender;

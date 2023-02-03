'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');
const _cx_ui = require('cx-core')

class CPDocumentImportRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        // this.options.title = `${this.dataSource.documentTypeName.toUpperCase()} [${this.dataSource.documentId}]`;
        if (this.options.mode == 'new') {
            this.options.buttons.push({ id: 'cp_documentImport_pick_file', text: 'Pick File', function: 'pickFile' });
        }
        this.options.fields = [
            {
                group: 'main', title: 'document import info', columnCount: 1, fields: [
                    {
                        group: 'main1', title: '', columnCount: 2, fields: [
                            await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId', width: '250px' }),
                            { name: _cxSchema.cp_documentImport.PROVIDERID, label: 'provider', width: '167px', column: 2, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.PROVIDER.toList() },
                        ]
                    },
                    {
                        group: 'main3', title: '', columnCount: 1, fields: [
                            { name: _cxSchema.cp_documentImport.FILENAME, label: 'file name', width: '425px', column: 1 },
                        ]
                    },
                    {
                        group: 'main2', title: '', columnCount: 2, fields: [
                            { name: _cxSchema.cp_documentImport.FILETYPE + 'View', label: 'file type', column: 1, width: '70px', disabled: true },
                            { name: _cxSchema.cp_documentImport.OPTIONS, label: 'options', column: 2, width: '350px', disabled: true },
                        ]
                    },
                    { name: 'fileContent', hidden: true },
                    { name: _cxSchema.cp_documentImport.FILETYPE, hidden: true },
                ]
            }
        ];
    }


    async _list() {
        try {
            if (this.options.query) {
                this.options.paging = true;
                this.options.pageNo = (this.options.query.page || 1);
            }

            this.options.filters = [
                await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
                { label: 'status', fieldName: 'st', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.IMPORT_STATUS.toList('- all -') },
                { label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE },
                { label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            ];
            this.options.columns = [
                { name: _cxSchema.cp_documentImport.DOCUMENTIMPORTID, title: ' ', align: 'center' },

                { name: 'shopInfo', title: 'store', width: '200px' },
                { name: _cxSchema.cp_documentImport.IMPORTSTATUS, title: 'status', align: 'center', width: '70px', lookUps: _cxConst.CP_DOCUMENT.IMPORT_STATUS.toList() },
                { name: _cxSchema.cp_documentImport.PROVIDERNAME, title: 'provider' },
                { name: _cxSchema.cp_documentImport.FILETYPE, title: 'file type' },
                { name: _cxSchema.cp_documentImport.FILENAME, title: 'file name' },
                { name: _cxSchema.cp_documentImport.OPTIONS, title: 'options' },
                { name: _cxSchema.cp_documentImport.RECORDTYPE, title: 'record' },
                { name: _cxSchema.cp_documentImport.RECORDID, title: 'id' },

                { name: _cxSchema.cp_documentImport.CREATED, title: 'created', align: 'center', width: '130px' },
                { name: _cxSchema.cp_documentImport.CREATEDBY, title: 'created by', width: '130px' },

            ];

            
            var applyStyle = 'padding: 3px 7px 3px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
            var statuses = _cxConst.CP_DOCUMENT.IMPORT_STATUS.toList();
            for (let sx = 0; sx < statuses.length; sx++) {
                const s = statuses[sx];
                this.options.cellHighlights.push({
                    column: _cxSchema.cp_documentImport.IMPORTSTATUS,
                    op: '=',
                    value: s.value,
                    style: _cxConst.CP_DOCUMENT.IMPORT_STATUS.getStyleInverted(s.value) + applyStyle,
                    columns: [_cxSchema.cp_documentImport.IMPORTSTATUS]
                })
            }

        } catch (error) {
            throw error;
        }

    }


}

module.exports = CPDocumentImportRender;
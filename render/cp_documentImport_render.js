'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');
const _core = require('cx-core')

class CPDocumentImportRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async getDocumentListOptions() {
        var transactions = this.dataSource.cx.table(_cxSchema.cp_invoiceCredit);
        await transactions.select({ impid: this.options.query.id });

        var transactionsOptions = await this.listOptions(transactions, { listView: true, linkTarget: '_blank' });
        transactionsOptions.quickSearch = true;
        return transactionsOptions;
    }

    async _record() {

        var wholesalers = this.dataSource.cx.table(_cxSchema.cp_wholesaler);
        var wholesalerLookUps = await wholesalers.toLookUpList(this.dataSource.shopId, true);

        var providers = this.dataSource.cx.table(_cxSchema.cp_wholesalerProvider);
        var providerLookUps = await providers.toLookUpList(this.dataSource.wholesalerId, true);

        // this.options.title = `${this.dataSource.documentTypeName.toUpperCase()} [${this.dataSource.documentId}]`;

        var mainGroupColumnCount = (this.options.mode == 'view') ? 2 : 1;



        this.options.fields = [
            //
            {
                group: 'main', title: '', columnCount: mainGroupColumnCount, fields: [
                    {
                        group: 'main1', title: 'document import info', columnCount: 1, fields: [
                            {
                                group: 'main1_1', title: '', columnCount: 2, fields: [
                                    await this.fieldDropDownOptions(_cxSchema.cx_shop, { id: 'shopId', name: 'shopId', width: '250px', validation: (this.options.mode == 'new') ? '{ "mandatory": true }' : '' }),
                                ]
                            },
                            {
                                group: 'main1_2', title: '', columnCount: 2, fields: [
                                    { name: _cxSchema.cp_documentImport.WHOLESALERID, label: 'wholesaler', width: '250px', column: 1, lookUps: wholesalerLookUps, validation: '{ "mandatory": true }' },
                                    { name: _cxSchema.cp_documentImport.PROVIDERID, label: 'provider', width: '168px', column: 2, lookUps: providerLookUps, validation: '{ "mandatory": true }' },
                                ]
                            },
                            {
                                group: 'main1_3', title: '', columnCount: 1, fields: [
                                    { name: _cxSchema.cp_documentImport.FILENAME, label: 'file name', width: '425px', column: 1, placeHolder: 'click here tol pick a file from your computer', validation: '{ "mandatory": true }' },
                                ]
                            },

                        ]
                    }
                ]
            },

        ];

        if (this.options.mode == 'new') {
            this.options.fields[0].fields[0].fields.push({
                group: 'main1_5', title: '', columnCount: 2, fields: [
                    { name: 'documentNumber', label: 'document number', column: 1, width: '282px', validation: '{ "mandatory": true, "max": 60  }' },
                    { name: 'documentDate', label: 'document date', column: 2, validation: '{ "mandatory": true }' },
                ]
            })

            this.options.fields[0].fields[0].fields.push({
                group: 'main1_6', title: '', columnCount: 1, fields: [
                    { name: 'documentReference', label: 'document reference', column: 1, width: '425px', validation: '{ "max": 255  }' },
                    { name: 'documentMemo', label: 'document memo', column: 1, width: '425px', validation: '{ "max": 500  }' },
                ]
            })
            
            this.options.fields[0].fields[0].fields.push({
                group: 'main1_4', title: '', columnCount: 2, fields: [
                    { name: _cxSchema.cp_documentImport.FILETYPE + 'View', label: 'file type', column: 1, width: '69px', disabled: true },
                    { name: _cxSchema.cp_documentImport.OPTIONS + 'View', label: 'options', column: 2, width: '350px', disabled: true },
                ]
            })

            this.options.fields.unshift({ name: 'fileContent', hidden: true });
            this.options.fields.unshift({ name: _cxSchema.cp_documentImport.OPTIONS, hidden: true })
            this.options.fields.unshift({ name: _cxSchema.cp_documentImport.PROVIDERNAME, hidden: true });
            this.options.fields.unshift({ name: _cxSchema.cp_documentImport.FILETYPE, hidden: true });

            this.options.buttons.push({ id: 'cp_documentImport_pick_file', text: 'Pick File', function: 'pickFile' });
        
        } else if (this.options.mode == 'view') {
            this.options.fields[0].fields[0].fields.push({
                group: 'main1_4', title: '', columnCount: 2, fields: [
                    { name: _cxSchema.cp_documentImport.FILETYPE, label: 'file type', column: 1, width: '69px', disabled: true },
                    { name: _cxSchema.cp_documentImport.OPTIONS, label: 'options', column: 2, width: '350px', disabled: true },
                ]
            })

            this.options.fields[0].fields.push({
                group: 'audit', title: 'audit info', column: 2, columnCount: 2, fields: [
                    { name: _cxSchema.cp_documentImport.IMPORTSTATUS, label: 'status', column: 1, width: '70px', lookUps: _cxConst.CP_DOCUMENT.IMPORT_STATUS.toList() },
                    { name: _cxSchema.cp_documentImport.IMPORTSTATUSMESSAGE, label: 'status message', column: 1, width: '350px' },
                    {
                        group: 'audit1', title: '', column: 2, columnCount: 2, inline: true, fields: [
                            { name: 'created', label: 'created', column: 1, readOnly: true },
                            { name: 'createdBy', label: 'created by', column: 2, readOnly: true },
                        ]
                    },
                    {
                        group: 'audit2', title: '', column: 2, columnCount: 2, inline: true, fields: [
                            { name: 'modified', label: 'modified', column: 1, readOnly: true },
                            { name: 'modifiedBy', label: 'modified by', column: 2, readOnly: true },
                        ]
                    }
                ]
            })

            var transactionOptions = await this.getDocumentListOptions();
            var subListsGroup = { group: 'sublists', columnCount: 1, fields: [] };
            subListsGroup.fields.push({ group: 'documents', title: 'imported documents', column: 1, fields: [transactionOptions] })
            this.options.fields.push(subListsGroup);


            if (this.dataSource.importStatus == _cxConst.CP_DOCUMENT.IMPORT_STATUS.Pending) {
                this.options.buttons.push({ id: 'cp_documentImport_cancel', text: 'Cancel Import', function: 'cancelImport' });
            } else if (this.dataSource.importStatus == _cxConst.CP_DOCUMENT.IMPORT_STATUS.Running) {
                var elapsedMinutes = _core.date.toNow(this.dataSource.modified).minutes;
                if (elapsedMinutes > process.env.CP_ALLOW_ABORT_AFTER_MINS && this.dataSource.cx.roleId >= _cxConst.CX_ROLE.ADMIN) {
                    this.options.buttons.push({ id: 'cp_documentImport_cancel', text: 'Abort Import', function: 'abortImport' });
                }
            }
            
        } 
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
                { name: _cxSchema.cp_documentImport.IMPORTSTATUSMESSAGE, title: 'status message' },
                { name: _cxSchema.cp_documentImport.PROVIDERNAME, title: 'provider' },
                { name: _cxSchema.cp_documentImport.FILETYPE, title: 'file type' },
                { name: _cxSchema.cp_documentImport.FILENAME, title: 'file name' },
                { name: _cxSchema.cp_documentImport.OPTIONS, title: 'options' },
                { name: _cxSchema.cp_documentImport.RECORDTYPE, title: 'record' },
                { name: _cxSchema.cp_documentImport.RECORDID, title: 'id' },

                { name: _cxSchema.cp_documentImport.CREATED, title: 'created', align: 'center', width: '130px' },
                { name: _cxSchema.cp_documentImport.CREATEDBY, title: 'created by', width: '130px' },

            ];


            var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
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

            this.options.highlights = [
                { column: _cxSchema.cp_documentImport.IMPORTSTATUS, op: '=', value: _cxConst.CP_DOCUMENT.IMPORT_STATUS.Cancelled, style: 'color: gray; font-style: italic;' },
            ]

            var applyStoreColorStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: auto; display: block; overflow: hidden; text-align: left;';
            var shopColors = await this.dataSource.cx.table(_cxSchema.cx_shop).selectColors();
            for (var cx = 0; cx < shopColors.length; cx++) {
                if (!shopColors[cx].shopColor) { continue; }
                this.options.cellHighlights.push({
                    column: 'shopId', op: '=', value: shopColors[cx].shopId, style: 'background-color: rgba(' + shopColors[cx].shopColor + ', 0.5); ' + applyStoreColorStyle, columns: ['shopInfo']
                })
            }


        } catch (error) {
            throw error;
        }

    }


}

module.exports = CPDocumentImportRender;
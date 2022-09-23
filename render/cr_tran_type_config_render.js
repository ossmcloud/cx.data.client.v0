'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CrTranTypeConfigRender extends RenderBase {

    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _record() {
        var mapConfig = this.dataSource.cx.table(_cxSchema.cx_map_config);
        mapConfig = await mapConfig.fetch(this.dataSource.mapConfigId)
        var shopId = mapConfig.mapMasterShop;

        var cbTranTypeLookUps = this.dataSource.cx.table(_cxSchema.cr_cb_tran_type);
        cbTranTypeLookUps = await cbTranTypeLookUps.toLookUpList(true);

        var duplicateAsLookUps = this.dataSource.cx.table(_cxSchema.cr_tran_type_config);
        duplicateAsLookUps = await duplicateAsLookUps.toLookUpListByCfg(this.dataSource.mapConfigId, true);

        var erpTranTypeLookUps = this.dataSource.cx.table(_cxSchema.sys_erp_tran_type);
        erpTranTypeLookUps = await erpTranTypeLookUps.toLookUpList('', true);

        var readOnlyIfNotNew = !this.dataSource.isNew();

        this.options.fields = [
            {
                group: 'mainOuter', title: '', columnCount: 4, fields: [
                    {
                        group: 'epos', title: 'epos info', column: 1, columnCount: 1, inline: true, fields: [
                            { name: _cxSchema.cr_tran_type_config.EPOSTRANTYPE, label: 'Type', readOnly: readOnlyIfNotNew, column: 1 },
                            { name: _cxSchema.cr_tran_type_config.EPOSTRANSUBTYPE, label: 'Sub Type', readOnly: readOnlyIfNotNew, column: 1 },
                            { name: _cxSchema.cr_tran_type_config.DESCRIPTION, label: 'Description', column: 1 },
                            { name: _cxSchema.cr_tran_type_config.MAPCONFIGID, label: 'MapConfig', hidden: true, column: 1 },
                        ]
                    },

                    {
                        group: 'cb', title: 'cash-book configurations', column: 2, columnCount: 2, inline: true, fields: [
                            { name: _cxSchema.cr_tran_type_config.CBTRANTYPEID, label: 'CB Type', column: 1, lookUps: cbTranTypeLookUps },
                            { name: _cxSchema.cr_tran_type_config.CBHEADING, label: 'CB Heading', column: 2 },
                            { name: _cxSchema.cr_tran_type_config.DUPLICATEAS, label: 'Duplicate As', column: 1, lookUps: duplicateAsLookUps },
                            { name: _cxSchema.cr_tran_type_config.REQUIRESDECLARATION, label: 'Declarations', lookUps: _cxConst.CR_CASH_BOOK.REQUIRE_DECLARATION.toList(), column: 2 },
                            {
                                group: 'cb1', column: 1, columnCount: 3, inline: true, fields: [
                                    { name: _cxSchema.cr_tran_type_config.IGNORE, label: 'Ignore', column: 1 },
                                    { name: _cxSchema.cr_tran_type_config.INVERTSIGN, label: 'Invert Sign', column: 2 },
                                    { name: _cxSchema.cr_tran_type_config.ALLOWEDIT, label: 'Allow Edit', column: 3 },
                                ]
                            },


                        ]
                    },

                    {
                        group: 'erp', title: 'erp configurations', column: 3, columnCount: 1, inline: true, fields: [
                            { name: _cxSchema.cr_tran_type_config.ERPTRANTYPEID, label: 'ERP Type', column: 1, lookUps: erpTranTypeLookUps },
                            await this.fieldDropDownOptions(_cxSchema.cx_traderAccount, {
                                id: _cxSchema.cr_tran_type_config.TRADERACCOUNT, name: _cxSchema.cr_tran_type_config.TRADERACCOUNT, column: 1, dropDownSelectOptions: { s: shopId, tt: 'C' }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                id: _cxSchema.cr_tran_type_config.ERPGLACCOUNTID, name: _cxSchema.cr_tran_type_config.ERPGLACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_gl_account, {
                                label: 'erp CONTRA GL account', id: _cxSchema.cr_tran_type_config.ERPGLCONTRAACCOUNTID, name: _cxSchema.cr_tran_type_config.ERPGLCONTRAACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_bank_account, {
                                id: _cxSchema.cr_tran_type_config.ERPCBACCOUNTID, name: _cxSchema.cr_tran_type_config.ERPCBACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                            await this.fieldDropDownOptions(_cxSchema.erp_tax_account, {
                                id: _cxSchema.cr_tran_type_config.ERPTAXACCOUNTID, name: _cxSchema.cr_tran_type_config.ERPTAXACCOUNTID, column: 1, dropDownSelectOptions: { s: shopId }
                            }),
                        ]
                    },

                    {
                        group: 'audit', title: 'audit info', column: 4, columnCount: 1, fields: [
                            { name: _cxSchema.cr_tran_type_config.CREATEDBY, label: 'created by', column: 1, readOnly: true },
                            { name: _cxSchema.cr_tran_type_config.CREATED, label: 'created on', column: 1, readOnly: true },
                            { name: _cxSchema.cr_tran_type_config.MODIFIEDBY, label: 'modified by', column: 1, readOnly: true },
                            { name: _cxSchema.cr_tran_type_config.MODIFIED, label: 'modified on', column: 1, readOnly: true },
                        ]
                    }
                ]
            }
        ]

    }

    async _list() {

        this.options.filters = [
            { label: 'tran type', fieldName: 'tt', name: _cxSchema.cr_tran_type_config.EPOSTRANTYPE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'tran sub-type', fieldName: 'ts', name: _cxSchema.cr_tran_type_config.EPOSTRANSUBTYPE, type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'description', fieldName: 'desc', name: _cxSchema.cr_tran_type_config.DESCRIPTION, type: _cxConst.RENDER.CTRL_TYPE.TEXT },

        ];
        this.options.columns = [
            { title: ' ', name: _cxSchema.cr_tran_type_config.TRANTYPECONFIGID },
            //{ title: 'map id', name: _cxSchema.cr_tran_type_config.MAPCONFIGID },
            //{ title: 'r', name: 's', unbound: true, align: 'center', width: '15px' },
            { title: 'epos tran. type', name: _cxSchema.cr_tran_type_config.EPOSTRANTYPE },
            { title: 'epos tran. sub-type', name: _cxSchema.cr_tran_type_config.EPOSTRANSUBTYPE },
            { title: 'description', name: _cxSchema.cr_tran_type_config.DESCRIPTION },

            { title: 'c/b tran. type', name: 'cbTranType' },
            { title: 'c/b heading', name: _cxSchema.cr_tran_type_config.CBHEADING },
            { title: 'declarations', name: _cxSchema.cr_tran_type_config.REQUIRESDECLARATION, lookUps: _cxConst.CR_CASH_BOOK.REQUIRE_DECLARATION.toList() },
            { title: 'allow edit', name: _cxSchema.cr_tran_type_config.ALLOWEDIT },
            { title: 'invert sign', name: _cxSchema.cr_tran_type_config.INVERTSIGN },
            { title: 'ignore', name: _cxSchema.cr_tran_type_config.IGNORE },
            // 

            { title: 'erp tran. type', name: 'erpTranType' },

            { title: 'created', name: _cxSchema.cr_tran_type_config.CREATED },
            { title: 'by', name: _cxSchema.cr_tran_type_config.CREATEDBY },
            { title: 'modified', name: _cxSchema.cr_tran_type_config.MODIFIED },
            { title: 'by', name: _cxSchema.cr_tran_type_config.MODIFIEDBY },
        ];

        this.options.highlights = [
            { column: _cxSchema.cr_tran_type_config.IGNORE, op: '=', value: true, style: 'color: gray; font-style: italic;' },
            { column: _cxSchema.cr_tran_type_config.CBTRANTYPEID, op: '<', value: 0, style: 'color: teal; font-style: italic;' }
        ];

        var appendStyle = 'padding: 3px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        this.options.cellHighlights = [];
        this.options.cellHighlights.push({
            column: 'cbTranTypeId',
            columns: ['cbTranType'],
            customStyle: function (object, value, highlight) {
                if (value == null) {
                    return 'height: 15px; border: 1px dotted gray; color: white; ' + appendStyle;
                } else if (value == 1) {
                    return 'background-color: green; color: white; ' + appendStyle;
                } else if (value == 2) {
                    return 'background-color: #1982c4; color: white; ' + appendStyle;
                } else if (value == 3) {
                    return 'background-color: rgb(83,49,138); color: white; ' + appendStyle;
                } else if (value == 9) {
                    return 'background-color: #FFCD00; color: black; ' + appendStyle;
                } else if (value < 0) {
                    return 'background-color: orange; color: white; ' + appendStyle;
                } else {
                    return 'background-color: gray; color: white; ' + appendStyle;
                }
            }
        })

        this.options.cellHighlights.push({
            column: _cxSchema.cr_tran_type_config.REQUIRESDECLARATION,
            columns: [_cxSchema.cr_tran_type_config.REQUIRESDECLARATION],
            op: '=',
            value: _cxConst.CR_CASH_BOOK.REQUIRE_DECLARATION.FORCE,
            style: 'background-color: indianred; color: whitesmoke; font-weight: bold; ' + appendStyle,
        })
        this.options.cellHighlights.push({
            column: _cxSchema.cr_tran_type_config.REQUIRESDECLARATION,
            columns: [_cxSchema.cr_tran_type_config.REQUIRESDECLARATION],
            op: '=',
            value: _cxConst.CR_CASH_BOOK.REQUIRE_DECLARATION.YES,
            style: 'background-color: #FFCD00; color: black; ' + appendStyle,
        })
        this.options.cellHighlights.push({
            column: _cxSchema.cr_tran_type_config.REQUIRESDECLARATION,
            columns: [_cxSchema.cr_tran_type_config.REQUIRESDECLARATION],
            op: '=',
            value: _cxConst.CR_CASH_BOOK.REQUIRE_DECLARATION.NO,
            style: 'border: 1px dotted gray; color: silver; ' + appendStyle,
        })

    }


}

module.exports = CrTranTypeConfigRender;
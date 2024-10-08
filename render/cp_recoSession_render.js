'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPRecoSessionRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'matching session';
        this.autoLoad = true;

        this.autoLoadFields = {};
        //this.autoLoadFields[_cxSchema.cp_recoSession.RECOSESSIONID] = null;
        this.autoLoadFields['action'] = { name: 'action', title: ' ', align: 'center', link: { valueField: _cxSchema.cp_recoSession.RECOSESSIONID, text: '&#x25B6;', onclick: 'openSession' } };
        this.autoLoadFields['recoMatchLevel'] = { name: 'recoMatchLevel', title: ' ', toolTip: { valueField: 'recoMatchLevel', suppressText: true } };


        this.autoLoadFields[_cxSchema.cp_recoSession.SHOPID] = null;
        this.autoLoadFields[_cxSchema.cp_recoSession.RECOSOURCEID] = null;
        this.autoLoadFields[_cxSchema.cp_recoSession.RECOSTATUSID] = null;
        this.autoLoadFields['matchByUserDisplay'] = { name: 'matchByUserDisplay', title: ' ', width: '30px' };


        this.autoLoadFields['documentType'] = { name: 'documentType', title: 'type', lookUps: _cxConst.CP_DOCUMENT.TYPE.toList(), align: 'center', width: '70px' };
        var queryIcon = `<img src="/public/images/query_dark.png" style="width: 20px" />`;
        this.autoLoadFields['queryCount'] = { name: 'queryCount', title: queryIcon, nullText: '', align: 'center', width: '10px', headerToolTip: 'query count', toolTip: { valueField: 'queryCountDisplay', suppressText: true } }


        this.autoLoadFields['documentDate'] = { name: 'documentDate', fieldName: 'SKIP_documentDate', dataType: 'datetime' };
        this.autoLoadFields['weekNumber'] = { name: 'weekNumber', fieldName: 'SKIP_weekNumber', align: 'center' };
        this.autoLoadFields['documentNumber'] = { name: 'documentNumber', fieldName: 'SKIP_documentNumber', link: { url: '/cp/invoice?id={documentNumber}', paramName: 'documentNumber', valueField: 'invCreId' } };
        
        this.autoLoadFields['docketNumber'] = { name: 'docketNumber', fieldName: 'SKIP_docketNumber' };
        this.autoLoadFields['groupInvoice'] = { name: 'groupInvoice', fieldName: 'SKIP_groupInvoice' };

        this.autoLoadFields['supplierCode'] = { name: 'supplierCode' };
        this.autoLoadFields['supplierName'] = { name: 'supplierName', nullText: 'not found' };

        this.autoLoadFields[_cxSchema.cp_recoSession.RECOSCORE] = null;
        this.autoLoadFields[_cxSchema.cp_recoSession.BALANCENET] = null;
        this.autoLoadFields[_cxSchema.cp_recoSession.BALANCEVAT] = null;
        this.autoLoadFields[_cxSchema.cp_recoSession.BALANCEGROSS] = null;

        this.autoLoadFields['notesDisplay'] = { name: 'notesDisplay' };



        // this.autoLoadFields[_cxSchema.cp_recoSession.CREATED] = null;
        // this.autoLoadFields[_cxSchema.cp_recoSession.MODIFIED] = null;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.cp_recoSession.RECOSTATUSID) {
            column.name = 'recoStatusName';
            column.title = 'status';
            column.addTotals = false;
            column.align = 'center';
            column.width = '125px';
        } else if (field.name == _cxSchema.cp_recoSession.RECOSOURCEID) {
            column.name = 'recoSourceName';
            column.title = 'source';
            column.addTotals = false;
            column.align = 'center';
            column.width = '75px';
        } else if (field.name == _cxSchema.cp_recoSession.SHOPID) {
            column.name = 'shopInfo';
            column.title = 'store';
            column.addTotals = false;
            column.align = 'left';
        } else if (field.name == _cxSchema.cp_recoSession.RECOSCORE) {
            column.name = 'recoScoreDisplay';
            column.formatNumber = 'N2';
            column.addTotals = false;
            column.align = 'center';
            column.nullText = 'N/A';

        } else if (field.name == 'notesDisplay') {
            column.nullText = '';
            column.title = 'notes';
        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_recoSession.SHOPID) {
            filter.replace = await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 'shopId' });
            filter.hide = false;
        } else if (field.name == _cxSchema.cp_recoSession.RECOSTATUSID) {
            filter.replace = { label: 'status', fieldName: 'reco.' + _cxSchema.cp_recoSession.RECOSTATUSID, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.RECO_STATUS.toList('- all -') }
            filter.hide = false;
        } else if (field.name == 'documentType') {
            filter.replace = { label: 'type', fieldName: 'doc.documentType', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.TYPE_IC.toList('- all -') };

        } else if (field.name == 'documentDate') {
            filter.label = 'date (from)';

        } else if (field.name == _cxSchema.cp_recoSession.MODIFIED || field.name == _cxSchema.cp_recoSession.CREATED
            || field.name == _cxSchema.cp_recoSession.RECOSOURCEID || field.name == _cxSchema.cp_recoSession.RECOSCORE
            || field.name == _cxSchema.cp_recoSession.BALANCENET || field.name == _cxSchema.cp_recoSession.BALANCEVAT || field.name == _cxSchema.cp_recoSession.BALANCEGROSS) {
            return false;
        } else if (field.name == 'recoMatchLevel' || field.name == 'notesDisplay' || field.name == 'matchByUserDisplay' || field.name == 'action' || field.name == 'supplierName' || field.name == 'queryCount') {
            filter.hide = true;
        }
    }



    async _record() {

    }

    async _list() {
        if (this.options.query) {
            this.options.paging = true;
            this.options.pageNo = (this.options.query.page || 1);
        }


        if (this.options.query['reco.recoStatusId'] == _cxConst.CP_DOCUMENT.RECO_STATUS.NotReconciled) {
            this.options.title = 'unmatched documents';
        } else if (this.options.query['reco.recoStatusId'] == _cxConst.CP_DOCUMENT.RECO_STATUS.Pending) {
            this.options.title = 'matched documents for user validations';
        } else {
            this.options.title = 'document matching sessions';
        }

        this.options.cellHighlights.push({ column: _cxSchema.cp_recoSession.BALANCENET, op: '=', value: '0', style: 'color: gray;' });
        this.options.cellHighlights.push({ column: _cxSchema.cp_recoSession.BALANCEVAT, op: '=', value: '0', style: 'color: gray;' });
        this.options.cellHighlights.push({ column: _cxSchema.cp_recoSession.BALANCEGROSS, op: '=', value: '0', style: 'color: gray;' });
        this.options.cellHighlights.push({ column: _cxSchema.cp_recoSession.BALANCENET, op: '<', value: '0', style: 'color: red;' });
        this.options.cellHighlights.push({ column: _cxSchema.cp_recoSession.BALANCEVAT, op: '<', value: '0', style: 'color: red;' });
        this.options.cellHighlights.push({ column: _cxSchema.cp_recoSession.BALANCEGROSS, op: '<', value: '0', style: 'color: red;' });

        this.options.cellHighlights.push({ column: 'recoScoreDisplay', op: '<', value: '25', style: 'color: rgb(255,0,0);', stop: true });
        this.options.cellHighlights.push({ column: 'recoScoreDisplay', op: '<', value: '50', style: 'color: rgb(200,0,0);', stop: true });
        this.options.cellHighlights.push({ column: 'recoScoreDisplay', op: '<', value: '75', style: 'color: rgb(155,0,0);', stop: true });
        this.options.cellHighlights.push({ column: 'recoScoreDisplay', op: '<', value: '95', style: 'color: rgb(0,255,0);', stop: true });
        this.options.cellHighlights.push({ column: 'recoScoreDisplay', op: '<', value: '100', style: 'color: rgb(0,200,0);', stop: true });
        this.options.cellHighlights.push({ column: 'recoScoreDisplay', op: '=', value: '100', style: 'color: rgb(0,150,0);;', stop: true });

        var applyStyle = 'padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;';
        this.options.cellHighlights.push({ column: 'recoMatchLevel', op: '=', value: -1, style: `background-color: red; color: white;` + applyStyle, columns: 'recoMatchLevel' });
        this.options.cellHighlights.push({ column: 'recoMatchLevel', op: '=', value: 0, style: `background-color: rgb(0,255,0);` + applyStyle, columns: 'recoMatchLevel' });
        this.options.cellHighlights.push({ column: 'recoMatchLevel', op: '=', value: 1, style: `background-color: rgb(0,200,0);` + applyStyle, columns: 'recoMatchLevel' });
        this.options.cellHighlights.push({ column: 'recoMatchLevel', op: '=', value: 2, style: `background-color: rgb(0,150,0);` + applyStyle, columns: 'recoMatchLevel' });
        this.options.cellHighlights.push({ column: 'recoMatchLevel', op: '=', value: 3, style: `background-color: rgb(250,250,0);` + applyStyle, columns: 'recoMatchLevel' });
        this.options.cellHighlights.push({ column: 'recoMatchLevel', op: '=', value: 4, style: `background-color: rgb(200,200,0);` + applyStyle, columns: 'recoMatchLevel' });
        this.options.cellHighlights.push({ column: 'recoMatchLevel', op: '=', value: 5, style: `background-color: rgb(150,150,0);` + applyStyle, columns: 'recoMatchLevel' });
        this.options.cellHighlights.push({ column: 'recoMatchLevel', op: '=', value: 6, style: `background-color: orange;` + applyStyle, columns: 'recoMatchLevel' });
        this.options.cellHighlights.push({ column: 'recoMatchLevel', op: '=', value: 7, style: `background-color: rgb(200,0,0);` + applyStyle, columns: 'recoMatchLevel' });
        this.options.cellHighlights.push({ column: 'recoMatchLevel', op: '=', value: 8, style: `background-color: rgb(255,0,0);` + applyStyle, columns: 'recoMatchLevel' });
        this.options.cellHighlights.push({ column: 'recoMatchLevel', op: '=', value: 9, style: `background-color: purple;` + applyStyle, columns: 'recoMatchLevel' });

        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        //var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; display: block; overflow: hidden; text-align: center;';
        var recoStatuses = _cxConst.CP_DOCUMENT.RECO_STATUS.toList();
        for (let sx = 0; sx < recoStatuses.length; sx++) {
            const s = recoStatuses[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.cp_recoSession.RECOSTATUSID,
                op: '=',
                value: s.value,
                style: _cxConst.CP_DOCUMENT.RECO_STATUS.getStyleInverted(s.value) + applyStyle,
                columns: ['recoStatusName']
            })
        }

        var types = _cxConst.CP_DOCUMENT.TYPE.toList();
        for (let sx = 0; sx < types.length; sx++) {
            const s = types[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.cp_invoiceCredit.DOCUMENTTYPE,
                op: '=',
                value: s.value,
                style: _cxConst.CP_DOCUMENT.TYPE.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.cp_invoiceCredit.DOCUMENTTYPE]
            })
        }

        var applyStoreColorStyle = 'padding: 3px 7px 3px 7px; border-radius: 5px; width: auto; display: block; overflow: hidden; text-align: left;';
        var shopColors = await this.dataSource.cx.table(_cxSchema.cx_shop).selectColors();
        for (var cx = 0; cx < shopColors.length; cx++) {
            if (!shopColors[cx].shopColor) { continue; }
            this.options.cellHighlights.push({
                column: 'shopId', op: '=', value: shopColors[cx].shopId, style: 'background-color: rgba(' + shopColors[cx].shopColor + ', 0.5); ' + applyStoreColorStyle, columns: ['shopInfo']
            })
        }


        this.options.cellHighlights.push({
            column: 'queryCount',
            op: '>',
            value: 0,
            style: 'background-color: rgb(127,127,127); color: maroon; padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;',
            columns: ['queryCount']
        })
        this.options.cellHighlights.push({
            column: 'queryCountOpen',
            op: '>',
            value: 0,
            style: 'background-color: yellow; color: maroon; padding: 7px 1px 7px 1px; border-radius: 6px; width: 12px; display: block; overflow: hidden;',
            columns: ['queryCount']
        })


    }
}


module.exports = CPRecoSessionRender;

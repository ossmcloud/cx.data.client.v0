'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPInvoiceCreditLogRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _list() {
        // if (this.options.query) {
        //     this.options.paging = true;
        //     this.options.pageNo = (this.options.query.page || 1);
        // }

        // this.options.filters = [
        //     { label: 'supplier', fieldName: 'su', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
        // ];
        this.options.columns = [
            
            { name: _cxSchema.cp_invoiceCreditLog.CREATED, title: 'log date-time', align: 'center', width: '90px', },
            { name: _cxSchema.cp_invoiceCreditLog.LOGTYPE, title: 'type', width: '50px' },
            { name: _cxSchema.cp_invoiceCreditLog.LOGMESSAGE, title: 'log message' },
            { name: _cxSchema.cp_invoiceCreditLog.LOGINFO, title: 'log info', width: '120px' },
                       
        ];

        this.options.cellHighlights = [];
        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceCreditLog.LOGTYPE, op: '=', value: 'INFO', style: 'color: gray;'+applyStyle, columns: [_cxSchema.cp_invoiceCreditLog.LOGTYPE] });
        this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceCreditLog.LOGTYPE, op: '=', value: 'WARNING', style: 'color: yellow;' + applyStyle, columns: [_cxSchema.cp_invoiceCreditLog.LOGTYPE] });
        this.options.cellHighlights.push({ column: _cxSchema.cp_invoiceCreditLog.LOGTYPE, op: '=', value: 'ERROR', style: 'color: red;' + applyStyle, columns: [_cxSchema.cp_invoiceCreditLog.LOGTYPE] });


    }


}

module.exports = CPInvoiceCreditLogRender;
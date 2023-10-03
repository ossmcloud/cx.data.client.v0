'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPQueryLogRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _list() {
        this.options.columns = [

            { name: _cxSchema.cp_queryLog.CREATED, title: 'log date-time', align: 'center', width: '90px', },
            { name: _cxSchema.cp_queryLog.LOGTYPE, title: 'type', width: '50px' },
            { name: _cxSchema.cp_queryLog.LOGTITLE, title: 'title' },
            { name: _cxSchema.cp_queryLog.LOGMESSAGE, title: 'message', toolTip: true },
            { name: _cxSchema.cp_queryLog.LOGINFO, title: 'info', width: '120px', toolTip: true },

        ];

        this.options.cellHighlights = [];
        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        this.options.cellHighlights.push({ column: _cxSchema.cp_queryLog.LOGTYPE, op: '=', value: 'info', style: 'color: gray;' + applyStyle, columns: [_cxSchema.cp_queryLog.LOGTYPE] });
        this.options.cellHighlights.push({ column: _cxSchema.cp_queryLog.LOGTYPE, op: '=', value: 'warning', style: 'color: yellow;' + applyStyle, columns: [_cxSchema.cp_queryLog.LOGTYPE] });
        this.options.cellHighlights.push({ column: _cxSchema.cp_queryLog.LOGTYPE, op: '=', value: 'ERROR', style: 'color: red;' + applyStyle, columns: [_cxSchema.cp_queryLog.LOGTYPE] });
        this.options.cellHighlights.push({ column: _cxSchema.cp_queryLog.LOGTYPE, op: '=', value: 'IMPORTANT', style: 'background-color: red; color: white;' + applyStyle, columns: [_cxSchema.cp_queryLog.LOGTYPE] });


    }


}

module.exports = CPQueryLogRender;
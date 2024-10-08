'use script';
//
const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPAccrualLogRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
    }

    async _list() {
        this.options.columns = [
            { name: _cxSchema.cp_accrualLog.CREATED, title: 'log date-time', align: 'center', width: '90px', },
            { name: _cxSchema.cp_accrualLog.LOGTYPE, title: 'type', width: '50px' },
            { name: _cxSchema.cp_accrualLog.LOGMESSAGE, title: 'log message' },
            { name: _cxSchema.cp_accrualLog.LOGINFO, title: 'log info' },
            { name: _cxSchema.cp_accrualLog.CREATEDBY, title: 'user' },
        ];

        this.options.cellHighlights = [];
        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        this.options.cellHighlights.push({ column: _cxSchema.cp_accrualLog.LOGTYPE, op: '=', value: 'INFO', style: 'color: gray;' + applyStyle, columns: [_cxSchema.cp_accrualLog.LOGTYPE] });
        this.options.cellHighlights.push({ column: _cxSchema.cp_accrualLog.LOGTYPE, op: '=', value: 'WARNING', style: 'color: yellow;' + applyStyle, columns: [_cxSchema.cp_accrualLog.LOGTYPE] });
        this.options.cellHighlights.push({ column: _cxSchema.cp_accrualLog.LOGTYPE, op: '=', value: 'ERROR', style: 'color: red;' + applyStyle, columns: [_cxSchema.cp_accrualLog.LOGTYPE] });
    }


}

module.exports = CPAccrualLogRender;
'use strict'

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const _cx_render = require('../cx-client-render');

class CPDocumentQueryAgent {
    #cx = null;
    #resultSet = null;
    constructor(cx) { this.#cx = cx; }
    get cx() { return this.#cx; }
    get documents() { return this.#resultSet.rows; }

    buildSql(params) {
        if (!params) { params = {}; }

        return {
            sql: 'select top 10 * from cp_invoiceCredit',
            params: []
        }
    }

    async select(params) {
        this.#resultSet = await this.cx.exec(this.buildSql(params));
    }
    async filterDropDownOptions(tableName, options) {
        var table = this.cx.table(tableName);
        if (!options.dropDown) { options.dropDown = {}; }
        options.dropDown = {
            allowAll: true,
            allowNone: true,
        }
        return await _cx_render.getDropDownOptions(table, options);
    }

    async getRenderOptions(options) {
        var docTypes = _cxConst.CP_DOCUMENT.TYPE.toList('- all -');
        if (options.batch == 'T') { docTypes = _cxConst.CP_DOCUMENT.TYPE_IC.toList('- all -'); }

        options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
            { label: 'type', fieldName: 'tt', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: docTypes },
            { label: 'status', fieldName: 'st', type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.CP_DOCUMENT.STATUS.toList('- all -') },
            { label: 'supplier', fieldName: 'su', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'document no.', fieldName: 'tno', type: _cxConst.RENDER.CTRL_TYPE.TEXT },
            { label: 'from', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE },
            { label: 'to', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE },
        ]

        var signedCols = {
            Net: _cxSchema.cp_invoiceCredit.TOTALNET + 'Sign',
            Vat: _cxSchema.cp_invoiceCredit.TOTALVAT + 'Sign',
            Gross: _cxSchema.cp_invoiceCredit.TOTALGROSS + 'Sign',
            Discount: _cxSchema.cp_invoiceCredit.TOTALDISCOUNT + 'Sign',
        }

        options.columns = [
            { name: _cxSchema.cp_invoiceCredit.DOCUMENTTYPE, title: 'type', align: 'center', width: '70px', lookUps: _cxConst.CP_DOCUMENT.TYPE.toList() },
            { name: _cxSchema.cp_invoiceCredit.DOCUMENTDATE, title: 'date', align: 'center', width: '100px' },
            { name: _cxSchema.cp_invoiceCredit.SUPPLIERCODE, title: 'supplier' },
            { name: _cxSchema.cp_invoiceCredit.DOCUMENTNUMBER, title: 'document number' },
            { name: _cxSchema.cp_invoiceCredit.DOCUMENTREFERENCE, title: 'document reference' },

        ]
        return options;
    }


}


module.exports = {
    get: function (cx) {
        return new CPDocumentQueryAgent(cx);
    }
};
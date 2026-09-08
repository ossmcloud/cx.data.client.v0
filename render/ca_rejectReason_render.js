'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPRecoSettingRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'approval settings';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.ca_rejectReason.REJECTREASONID] = null;
        this.autoLoadFields[_cxSchema.ca_rejectReason.REASON] = null;
        this.autoLoadFields[_cxSchema.ca_rejectReason.NOTES] = null;
        this.autoLoadFields[_cxSchema.ca_rejectReason.FORCECOMMENT] = null;
        this.autoLoadFields[_cxSchema.ca_rejectReason.SORTINDEX] = null;
        this.autoLoadFields[_cxSchema.ca_rejectReason.CREATED] = null;
        this.autoLoadFields[_cxSchema.ca_rejectReason.CREATEDBY] = null;
        this.autoLoadFields[_cxSchema.ca_rejectReason.MODIFIED] = null;
        this.autoLoadFields[_cxSchema.ca_rejectReason.MODIFIEDBY] = null;
    }



    async initColumn(field, column) {
        if (field.name == _cxSchema.ca_rejectReason.SORTINDEX) {
            column.addTotals = false;
            column.nullText = '';
            column.width = '75px';
        } else if (field.name == _cxSchema.ca_rejectReason.FORCECOMMENT) {
            column.nullText = '';
            column.width = '75px';
            column.align = 'center';
        } else if (field.name == _cxSchema.ca_rejectReason.REASON) {
            column.width = '350px';
        }
    }
    async initFilter(field, filter) {
        filter.hide = true;
    }

    async _list() {

    }




    async _record() {
        var form = { group: 'all', title: '', columnCount: 2, styles: ['min-width: 500px;', 'min-width: 400px; max-width: 400px'], fields: [] }

        form.fields.push({
            group: 'main', title: 'main info', column: 1, columnCount: 4, styles: ['width: 350px', 'min-width: 250px', 'width: 110px', 'width: 75px'], fields: [
                { name: _cxSchema.ca_rejectReason.REASON, label: 'Reason', width: '100%', column: 1 },
                { name: _cxSchema.ca_rejectReason.NOTES, label: 'Notes', width: '100%', column: 2 },
                { name: _cxSchema.ca_rejectReason.FORCECOMMENT, label: 'Force Comment', width: '100%', cssInnerContainer: 'jx-input-container-center', column: 3 },
                { name: _cxSchema.ca_rejectReason.SORTINDEX, label: 'Sort Index', width: '100%', column: 4 }
            ]
        });
        form.fields.push({
            group: 'audit', title: 'audit info', column: 2, columnCount: 1, fields: [
                {
                    group: 'audit1', title: '', column: 1, columnCount: 2, inline: true, fields: [
                        { name: 'created', label: 'created', column: 1, readOnly: true },
                        { name: 'createdBy', label: 'created by', column: 2, readOnly: true },
                    ]
                },
                {
                    group: 'audit2', title: '', column: 1, columnCount: 2, inline: true, fields: [
                        { name: 'modified', label: 'modified', column: 1, readOnly: true },
                        { name: 'modifiedBy', label: 'modified by', column: 2, readOnly: true },
                    ]
                }
            ]
        });

        this.options.fields = [form];

    }


}


module.exports = CPRecoSettingRender;





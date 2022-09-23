'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class RawGetRequest extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'dtfs upgrade audit';

    }

    async _record() {
        this.options.fields = [
            {
                group: 'main', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'upgrade info', fields: [
                            //{ name: 'dtfsInfo', label: 'store', column: 2 },
                            await this.fieldDropDownOptions(_cxSchema.epos_dtfs_setting, {
                                id: _cxSchema.epos_dtfs_upgradeAudit.DTFSSETTINGID, name: 'dtfsSettingId', validation: '{ "mandatory": true }'
                            }),
                            { name: _cxSchema.epos_dtfs_upgradeAudit.UPGRADECONFIG, label: 'upgrade configuration blob (JSON)', type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 5, validation: '{ "mandatory": true }' },
                            { name: _cxSchema.epos_dtfs_upgradeAudit.TRANSMISSIONID, label: 'transmission ID', readOnly: true },

                    
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 2, fields: [
                            { name: _cxSchema.epos_dtfs_upgradeAudit.STATUS, label: 'status', lookUps: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.STATUS.toList(), readOnly: true },
                            { name: _cxSchema.epos_dtfs_upgradeAudit.STATUSMESSAGE, label: 'status message', readOnly: true },
                            { name: 'created', label: 'created', readOnly: true },
                            { name: 'createdBy', label: 'by', readOnly: true },
                            { name: _cxSchema.epos_dtfs_upgradeAudit.UPGRADEAUDITID, label: 'id', readOnly: true },
                        ]
                    }
                ]
            }
        ];

        if (this.dataSource.status < _cxConst.EPOS_DTFS_UPGRADE_AUDIT.STATUS.ABORTED) {
            if (this.options.allowNew && !this.dataSource.isNew()) {
                this.options.buttons.push({ id: 'epos_dtfs_upgradeAudit_abort', text: 'Abort', function: 'abort' });
            }
        }
    }



    async _list() {
        this.options.recordTitle = 'dtfs upgrade audit';
        
        const TBL = _cxSchema.epos_dtfs_upgradeAudit;
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.epos_dtfs_setting, { fieldName: 's' }),
            { id: 'cx_transmission', inputType: _cxConst.RENDER.CTRL_TYPE.TEXT, fieldName: 'tr', label: 'transmission' },
            { id: 'cx_date_from', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'df', label: 'from' },
            { id: 'cx_date_to', inputType: _cxConst.RENDER.CTRL_TYPE.DATE, fieldName: 'dt', label: 'to' },
            { id: 'cx_status', inputType: _cxConst.RENDER.CTRL_TYPE.SELECT, fieldName: 'st', label: 'status', width: '100px', items: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.STATUS.toList('- all -') },
        ];
        this.options.columns = [
            { name: TBL.UPGRADEAUDITID, title: ' ', align: 'center' },
            { name: 'dtfsInfo', title: 'dtfs info', width: '200px' },
            { name: TBL.TRANSMISSIONID, title: 'transmission ID', align: 'center', width: '150px' },
            { name: TBL.STATUS, title: 'status', lookUps: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.STATUS.toList() },
            { name: TBL.STATUSMESSAGE, title: 'status message' },
            { name: TBL.CREATED, title: 'created', align: 'center', width: '130px' },
            { name: TBL.CREATEDBY, title: 'by', align: 'left', width: '130px' },
        ];
        this.options.highlights = [
            { column: TBL.STATUS, op: '=', value: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.STATUS.PENDING, style: 'color: blue;' },
            { column: TBL.STATUS, op: '=', value: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.STATUS.WAIT_START, style: 'color: purple;' },
            { column: TBL.STATUS, op: '=', value: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.STATUS.UPGRADING, style: 'color: #FFCD00;' },
            //{ column: TBL.STATUS, op: '=', value: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.STATUS.COMPLETE, style: 'color: #FFCD00;' },
            { column: TBL.STATUS, op: '=', value: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.STATUS.ERROR, style: 'color: red;' },
            { column: TBL.STATUS, op: '=', value: _cxConst.EPOS_DTFS_UPGRADE_AUDIT.STATUS.ABORTED, style: 'color: orange;' },
            
            
        ];

    }
}

module.exports = RawGetRequest;




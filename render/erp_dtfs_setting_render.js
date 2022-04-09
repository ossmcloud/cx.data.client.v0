'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class ErpTraderAccount extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'erp dtfs setting';
    }

    async _record() {
        this.options.fields = [
            {
                group: 'settingOuter', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                            { name: 'erpProvider', label: 'erp provider', column: 2, readOnly: true },
                            { name: 'dtfsSettingName', label: 'settings name', column: 1, readOnly: false },
                            { name: 'dtfsPairingStatus', label: 'pairing status', column: 1, readOnly: true },
                            { name: 'dtfsPairingCode', label: 'erp EPoS account code', column: 2, readOnly: false },
                            { name: 'dtfsPairedMachineName', label: 'erp EPoS Account name', column: 1, readOnly: true },
                            { name: 'dtfsPairedMachineOS', label: 'force gl segment 2', column: 2, readOnly: true },
                            { name: 'dtfsPairedMachineIP', label: 'force gl segment 3', column: 1, readOnly: true },
                            { name: 'dtfsPairedVersion', label: 'ERPS Settings', column: 2, readOnly: true },
                            { name: 'dtfsInfoLastRefresh', label: 'ERPS Settings', column: 2, readOnly: true },

                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 2, columnCount: 2, fields: [
                            {
                                group: 'audit1', title: '', column: 1, columnCount: 2, inline: true, fields: [
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
                    }
                ]
            }
        ];

        // if (this.dataSource.status == _cxConst.RAW_GET_REQUEST.STATUS.PENDING && this.options.allowNew && !this.dataSource.isNew()) {
        //     this.options.buttons.push({ id: 'cr_rawGetRequest_delete', text: 'Delete', function: 'deleteRecord' });
        // }
    }

    async _list() {
        this.options.recordTitle = 'erp dtfs settings';
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
        ];
        this.options.columns = [
            { name: 'dtfsSettingId', title: '', align: 'center' },
            { name: 'dtfsSettingName', title: 'settings name' },
            { name: 'erpProvider', title: 'erp provider' },
            { name: 'dtfsPairingStatus', title: 'pairing status' },
            { name: 'dtfsPairedMachineName', title: 'paired machine name' },
            { name: 'dtfsPairedMachineOS', title: 'paired machine OS' },
            { name: 'dtfsPairedMachineIP', title: 'paired machine IP' },
            { name: 'dtfsPairedVersion', title: 'paired erps version' },
            { name: 'dtfsInfoLastRefresh', title: 'paired info last refreshed' },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
            { name: 'modified', title: 'modified', align: 'center', width: '130px' },
            { name: 'modifiedBy', title: 'by', align: 'left', width: '130px' },
        ];

    }


}

module.exports = ErpTraderAccount;



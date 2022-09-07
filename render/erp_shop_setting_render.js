'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class ErpTraderAccount extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'erp store setting';
    }

    async _record() {

        var dtfsSettingsLookUps = await this.dataSource.cx.table(_cxSchema.erp_dtfs_setting).toLookUpList(true);

        this.options.fields = [
            {
                group: 'settingOuter', title: '', columnCount: 2, fields: [
                    {
                        group: 'main', title: 'main info', column: 1, columnCount: 2, fields: [
                            { name: 'shopInfo', label: 'store', column: 1, readOnly: true },
                            { name: 'erpProvider', label: 'erp provider', column: 1, readOnly: true },
                            { name: 'erpCustomerAccount', label: 'erp EPoS account code', column: 1 },
                            { name: 'erpCustomerAccountName', label: 'erp EPoS Account name', column: 1 },
                            { name: 'erpCompanyName', label: 'erp company name', column: 2 },
                            { name: 'erpCostCentre', label: 'force gl segment 2', column: 2 },
                            { name: 'erpDepartment', label: 'force gl segment 3', column: 2 },
                            { name: 'dtfsSettingId', label: 'ERPS Settings', column: 2, lookUps: dtfsSettingsLookUps },
                            
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
        var dtfsSettingsLookUps = await this.dataSource.cx.table(_cxSchema.erp_dtfs_setting).toLookUpList(true);
        
        this.options.recordTitle = 'erp store settings';
        this.options.filters = [
            await this.filterDropDownOptions(_cxSchema.cx_shop, { fieldName: 's' }),
        ];
        this.options.columns = [
            { name: 'shopId', title: ' ', align: 'center' },
            { name: 'shopInfo', title: 'store', width: '200px' },
            { name: 'erpProvider', title: 'erp provider' },
            { name: 'erpCompanyName', title: 'erp company name' },
            { name: 'erpCustomerAccount', title: 'erp EPoS account code' },
            { name: 'erpCustomerAccountName', title: 'erp EPoS account name' },
            { name: 'erpCostCentre', title: 'gl segment 2' },
            { name: 'erpDepartment', title: 'gl segment 3' },
            { name: 'dtfsSettingId', title: 'ERPS Settings', lookUps: dtfsSettingsLookUps },
            { name: 'created', title: 'created', align: 'center', width: '130px' },
            { name: 'createdBy', title: 'by', align: 'left', width: '130px' },
            { name: 'modified', title: 'modified', align: 'center', width: '130px' },
            { name: 'modifiedBy', title: 'by', align: 'left', width: '130px' },
        ];
        
    }

    
}

module.exports = ErpTraderAccount;



'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CPRecoSettingSupplierRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'matching supplier settings';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.cp_recoSettingSupplier.RECOSETTINGID] = null;
        this.autoLoadFields[_cxSchema.cp_recoSettingSupplier.SUPPLIERCODE] = null;
        this.autoLoadFields[_cxSchema.cp_recoSettingSupplier.MATCHINGSUPPLIERCODES] = null;
        this.autoLoadFields[_cxSchema.cp_recoSettingSupplier.IGNOREVATMISMATCH] = null;
        this.autoLoadFields[_cxSchema.cp_recoSettingSupplier.IGNORELINETOLERANCE] = null;
        this.autoLoadFields[_cxSchema.cp_recoSettingSupplier.NODELIVERY] = null;
        this.autoLoadFields[_cxSchema.cp_recoSettingSupplier.NODELIVERYCOMMENT] = null;

    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.cp_recoSettingSupplier.RECOSETTINGID) {
            column.name = 'settingInfo';
            column.title = 'settings';
            column.addTotals = false;
            column.align = 'left';
        } else if (field.name == _cxSchema.cp_recoSettingSupplier.MATCHINGSUPPLIERCODES) {
            column.nullText = '';
        } else if (field.name == _cxSchema.cp_recoSettingSupplier.IGNOREVATMISMATCH || field.name == _cxSchema.cp_recoSettingSupplier.IGNORELINETOLERANCE || field.name == _cxSchema.cp_recoSettingSupplier.NODELIVERY) {
            column.align = 'center';
            column.width = '100px';
        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.cp_recoSettingSupplier.RECOSETTINGID) {
            filter.hide = true;
        }
    }

    async _list() { 
    }





    async _record() {


        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 3, fields: [
                    {
                        group: 'main1', title: 'main settings', column: 1, columnCount: 1, fields: [
                            //await this.fieldDropDownOptions(_cxSchema.cp_wholesaler, { id: 'wholesalerId', name: 'wholesalerId', column: 1 }),
                            { name: 'supplierCode', label: 'applies to wholesaler supplier code', width: '130px', column: 1 },
                            { name: 'matchingSupplierCodes', label: 'alternative supplier codes (csv)', width: '200px', column: 1 },
                            { name: 'ignoreVatMismatch', label: 'ignore vat differences (only match net)', column: 1 },
                            { name: 'ignoreLineTolerance', label: 'ignore lines out of tolerance if header is within tolerance', column: 1 },
                            
                        ]
                    },
                    {
                        group: 'main2', title: 'no delivery settings', column: 2, columnCount: 1, fields: [
                            { name: 'noDelivery', label: 'do not expect deliveries for this supplier (mark as matched alone)', column: 1 },
                            { name: 'noDeliveryComment', label: 'match status message', column: 1 },
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 3, columnCount: 1, fields: [
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
                    }
                ]
            }
        ];


    }


}


module.exports = CPRecoSettingSupplierRender;

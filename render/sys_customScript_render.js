'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class SysCustomScript extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        // this.title = 'document query';
        this.autoLoad = true;

        this.autoLoadFields = {};

        this.autoLoadFields[_cxSchema.sys_customScript.SCRIPTID] = null;
        this.autoLoadFields[_cxSchema.sys_customScript.SVCNAME] = null;
        this.autoLoadFields[_cxSchema.sys_customScript.MODULE] = null;
        this.autoLoadFields[_cxSchema.sys_customScript.PROCESS] = null;
        this.autoLoadFields[_cxSchema.sys_customScript.STAGE] = null;

        this.autoLoadFields[_cxSchema.sys_customScript.EXECSEQUENCE] = null;
        this.autoLoadFields['shopCount'] = { name: 'shopCount', title: 'stores' };
        this.autoLoadFields[_cxSchema.sys_customScript.SCRIPTNAME] = null;
        this.autoLoadFields[_cxSchema.sys_customScript.INACTIVE] = null;
        this.autoLoadFields[_cxSchema.sys_customScript.CREATED] = null;
        this.autoLoadFields[_cxSchema.sys_customScript.MODIFIED] = null;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.sys_customScript.EXECSEQUENCE) {
            column.addTotals = false;
            column.width = '30px';
        } else if (field.name == _cxSchema.sys_customScript.INACTIVE) {
            column.align = 'center';
            column.width = '50px';
        } else if (field.name == _cxSchema.sys_customScript.SVCNAME) {
            column.align = 'center';
            column.width = '50px';
        } else if (field.name == _cxSchema.sys_customScript.STAGE) {
            column.width = '100px';
        } else if (field.name == 'shopCount') {
            column.align = 'center';
            column.width = '50px';
        }
        // else if (field.name == _cxSchema.cp_queryType.REQUIRESDISPUTEDAMOUNT) {
        //     column.lookUps = _cxConst.CP_QUERY_TYPE_REQ_DISPUTED.toList();
        //     column.addTotals = false;
        //     column.align = 'center';
        //     column.width = '150px';
        // } else if (field.name == _cxSchema.cp_queryType.NAME) {
        //     column.width = '200px';
        // } else if (field.name == _cxSchema.cp_queryType.CODE) {
        //     column.width = '120px';
        // }
    }

    async initFilter(field, filter) {
        if (field.name == _cxSchema.sys_customScript.SVCNAME) {
            var svcList = _cxConst.CX_SERVICES.toList(' - all -');
            svcList.splice(3, 99);
            filter.replace = { label: 'service', fieldName: _cxSchema.sys_customScript.SVCNAME, lookUps: svcList }

        } else if (field.name == _cxSchema.sys_customScript.MODULE) {
            filter.replace = { label: 'module', fieldName: _cxSchema.sys_customScript.MODULE, lookUps: _cxConst.CX_MODULE.toList(' - all -') }

        } else if (field.name == _cxSchema.sys_customScript.PROCESS) {
            filter.replace = { label: 'process', fieldName: _cxSchema.sys_customScript.PROCESS, lookUps: _cxConst.SYS_CUSTOM_SCRIPT.PROCESS.toList(' - all -') }

        } else if (field.name == _cxSchema.sys_customScript.STAGE) {
            filter.replace = { label: 'stage', fieldName: _cxSchema.sys_customScript.STAGE, lookUps: _cxConst.SYS_CUSTOM_SCRIPT.STAGE.toList(' - all -') }

        } else if (field.name == _cxSchema.sys_customScript.INACTIVE) {
            //filter.type = _cxConst.RENDER.CTRL_TYPE.CHECK;
            filter.hide = true;
        } else if (field.name == 'shopCount' || field.name == _cxSchema.sys_customScript.EXECSEQUENCE || field.name == _cxSchema.sys_customScript.CREATED || field.name == _cxSchema.sys_customScript.MODIFIED) {
            filter.hide = true;
        }
    }

    async _list() {
        this.options.highlights = [
            { column: 'inactive', op: '=', value: true, style: 'color: var(--element-color-faint);' },
        ];
    }

    async getShopListOptions() {
        var shops = this.dataSource.cx.table(_cxSchema.sys_customScriptShop);
        await shops.select({ scriptId: this.dataSource.scriptId });

        var shopListOptions = {
            listView: true,
            columns: [
                { name: 'scriptShopId', dataHidden: 'script-shop-id' },
                { name: 'shopCode', title: 'shop code' },
                { name: 'shopName', title: 'shop name' },
                { name: 'inactive', title: 'inactive' },
            ],
            records: shops.records
        }

        if (this.options.mode == 'view') {
            shopListOptions.actions = [
                { label: 'toggle inactive', funcName: 'toggleShopInactive' },
                { label: 'remove', funcName: 'removeShop' }
            ];
            shopListOptions.showButtons = [{ id: 'cr_shop_add', text: 'Add Stores', function: 'addShop' }];
        }

        shopListOptions.quickSearch = true;
        return shopListOptions;
    }

    async _record() {
        var svcList = _cxConst.CX_SERVICES.toList();
        svcList.splice(2, 99);

        var readOnly = (this.options.mode == 'view' || !this.dataSource.isNew());


        var header = { group: 'head', title: 'script info', columnCount: 3, styles: ['width: 350px', 'width: 325px'], fields: [] };
        header.fields.push({ name: _cxSchema.sys_customScript.SCRIPTNAME, label: 'script name', column: 1, validation: '{"mandatory": true}' });
        header.fields.push({
            group: 'stage_seq', label: '', column: 1, columnCount: 2, styles: ['width: calc(100% - 120px)', 'width: 125px'], fields: [
                { name: _cxSchema.sys_customScript.STAGE, label: 'stage', column: 1, items: _cxConst.SYS_CUSTOM_SCRIPT.STAGE.toList(), validation: '{"mandatory": true}' },
                { name: _cxSchema.sys_customScript.EXECSEQUENCE, label: 'exec sequence', column: 2, validation: '{"mandatory": true}' }
            ]
        });
        header.fields.push({
            group: 'svc_info', label: '', column: 2, columnCount: 3, styles: ['width: 125px', 'width: 125px', 'width: 125px'], fields: [
                { name: _cxSchema.sys_customScript.SVCNAME, label: 'service', items: svcList, column: 1, validation: '{"mandatory": true}', width: '100px', readOnly: readOnly },
                { name: _cxSchema.sys_customScript.MODULE, label: 'module', items: _cxConst.CX_MODULE.toList(), column: 2, validation: '{"mandatory": true}', width: '100px', readOnly: readOnly },
                { name: _cxSchema.sys_customScript.PROCESS, label: 'process', items: _cxConst.SYS_CUSTOM_SCRIPT.PROCESS.toList(), column: 3, validation: '{"mandatory": true}', width: '100px', readOnly: readOnly }
            ]
        });

        header.fields.push({ name: _cxSchema.sys_customScript.INACTIVE, label: 'is inactive', column: 2 });

        var sqlText = {
            group: 'sql', title: 'script sql', columnCount: 1, fields: [
                { name: _cxSchema.sys_customScript.SCRIPTTEXT, label: 'sql', column: 1, type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 25, validation: '{"mandatory": true}' }
            ]
        };

        this.options.fields = [];
        this.options.fields.push(header);
        this.options.fields.push(sqlText);

        if (readOnly) {
            var shopListOptions = await this.getShopListOptions();
            this.options.fields.push({ group: 'shops', title: 'the script will only run against the stores listed above', column: 1, fields: [shopListOptions] });
        }

    }
}

module.exports = SysCustomScript;
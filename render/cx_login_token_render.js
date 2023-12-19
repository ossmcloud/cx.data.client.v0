'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CXLoginToken extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);

        this.title = 'login tokens';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.cx_login_token.LOGINTOKENID] = null;
        this.autoLoadFields[_cxSchema.cx_login_token.TYPE] = null;
        this.autoLoadFields[_cxSchema.cx_login_token.STATUS] = null;
        this.autoLoadFields['loginName'] = { name: 'loginName' };
        this.autoLoadFields[_cxSchema.cx_login_token.DTFSSETTINGID] = null;
        
        this.autoLoadFields[_cxSchema.cx_login_token.EXPIRYDATE] = null;
        this.autoLoadFields[_cxSchema.cx_login_token.MODIFIED] = null;
        this.autoLoadFields[_cxSchema.cx_login_token.MODIFIEDBY] = null;
        
        
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.cx_login_token.TYPE) {
            column.title = 'type';
            column.addTotals = false;
            column.align = 'center';
            column.width = '50px';
            //column.lookUps = _cxConst.CX_LOGIN_TOKEN_STATUS.CX_LOGIN_TOKEN_STATUS.toList();
            column.hide = false;
        } else if (field.name == _cxSchema.cx_login_token.STATUS) {
            column.title = 'token status';
            column.addTotals = false;
            column.align = 'center';
            column.width = '100px';
            column.lookUps = _cxConst.CX_LOGIN_TOKEN_STATUS.toList();
        } else if (field.name == _cxSchema.cx_login_token.DTFSSETTINGID) {
            column.title = 'setting id';
            column.addTotals = false;
            column.align = 'center';
            column.width = '100px';
        } 
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.cx_login_token.TYPE) {

        } else if (field.name == _cxSchema.cx_login_token.EXPIRYDATE) {
            
        } else {
            filter.hide = true;
        }
    }

    async _list() {
        this.options.title = 'login tokens';
        this.options.actionsShowFirst = true;
      
        this.options.showButtons = [];
        this.options.showButtons.push({ id: 'cx_login_token_new_onedrive', text: 'One Drive', function: 'getOneDriveToken' });
        this.options.showButtons.push({ id: 'cx_login_token_new_therefore', text: 'Therefore', function: 'setThereforeToken' });
    }



    async _record() {
        var newRecord = this.dataSource.isNew();
        var validation = '{ "mandatory": true  }';

        this.options.fields = [];

        var header = { group: 'head', title: 'token info', columnCount: 2, styles: ['width: 300px',''], fields: [] };
        header.fields.push(
            { name: _cxSchema.cx_login_token.TYPE, label: 'type', items: _cxConst.CX_LOGIN_TOKEN_TYPE.toList(), readOnly: true },
            { name: 'loginName', label: 'user', readOnly: true },
            { name: _cxSchema.cx_login_token.DTFSSETTINGID, label: 'settingId', formatMoney: 'N0', readOnly: true },
            { name: _cxSchema.cx_login_token.EXPIRYDATE, label: 'expiry date', readOnly: true },
            { name: _cxSchema.cx_login_token.STATEKEY, label: 'state key', readOnly: true },
            //{ name: _cxSchema.cx_login_token.TOKEN, label: 'token', readOnly: true },
        );
        

        this.options.fields.push(header);

        if (this.options.mode == 'view') {
            if (this.dataSource.createdBy == this.dataSource.cx.userId) {   
                if (this.dataSource.type != _cxConst.CX_LOGIN_TOKEN_TYPE.THEREFORE) {
                    this.options.buttons.push({ id: 'cx_login_token_refresh', text: 'Refresh this Token', function: 'getNewToken' });
                }
            }

            if (this.dataSource.type == _cxConst.CX_LOGIN_TOKEN_TYPE.ONE) {
                this.options.buttons.push({ id: 'cx_login_one_list_files', text: 'List items in Root Folder', function: 'oneDrive_listRoot' });
            }

        }
    }

}

module.exports = CXLoginToken;





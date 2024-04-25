'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class CxAttachment extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);

        this.title = 'attachments';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.cx_attachment.EXTERNALLINK] = null;
        this.autoLoadFields[_cxSchema.cx_attachment.JSONOPTIONS] = null;
        if (!options.listView) {
            this.autoLoadFields[_cxSchema.cx_attachment.RECORDTYPE] = null;
            this.autoLoadFields[_cxSchema.cx_attachment.SHOPID] = null;
        }
        this.autoLoadFields['sourceIcon'] = { name: 'sourceIcon', width: '30px', align: 'center', title: 'src' };
        this.autoLoadFields[_cxSchema.cx_attachment.SOURCE] = null;
        this.autoLoadFields[_cxSchema.cx_attachment.TYPEID] = null;
        
        
        this.autoLoadFields[_cxSchema.cx_attachment.NAME] = null;
        this.autoLoadFields[_cxSchema.cx_attachment.DESCRIPTION] = null;
        this.autoLoadFields[_cxSchema.cx_attachment.EXTERNALREFERENCE] = null;

        this.autoLoadFields[_cxSchema.cx_attachment.ERROR] = null;
        this.autoLoadFields[_cxSchema.cx_attachment.CREATED] = null;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.cx_attachment.SHOPID) {
            column.name = 'shopInfo';
            column.title = 'store';
            column.addTotals = false;
            column.align = 'left';
        } else if (field.name == _cxSchema.cx_attachment.TYPEID) {
            column.lookUps = _cxConst.CX_ATTACHMENT.TYPE.toList();
            column.addTotals = false;
            column.align = 'left';
            column.width = '50px';
            column.title = 'type';
        } else if (field.name == _cxSchema.cx_attachment.SOURCE || field.name == _cxSchema.cx_attachment.ERROR) {
            column.align = 'center';
            column.width = '50px';
        } else if (field.name == _cxSchema.cx_attachment.EXTERNALREFERENCE) {
            column.width = '150px';
        } else if (field.name == _cxSchema.cx_attachment.EXTERNALLINK) {
            column.link = { url: '{' + column.name + '}', text: '&#128279;' };
            column.width = '30px';
            column.align = 'center';
            column.title = '&#128279;';
        } else if (field.name == _cxSchema.cx_attachment.JSONOPTIONS) {
            column.link = { onclick: 'viewAttachmentJsonOptions', text: '&#x1F6C8;' };
            column.width = '30px';
            column.align = 'center';
            column.title = '&#x1F6C8;';
        }
    }
    async initFilter(field, filter) {
        
    }

    async _list() {
        this.options.title = 'attachments';

    }



    async _record() {
        
    }

}

module.exports = CxAttachment;





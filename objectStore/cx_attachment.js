'use strict'
//
const _declarations = require('../cx-client-declarations');
const _persistentTable = require('./persistent/p-cx_attachment');
//
class cx_attachment_Collection extends _persistentTable.Table {
    createNew(defaults) {
        return new cx_attachment(this, defaults);
    }

    async select(params) {
        if (!params) { params = {} };

        var query = {};
        if (params && params.sql) {
            query = params;

        } else {

            query.sql = `
            select  a.*, s.shopCode, s.shopName
            from    cx_attachment a
            join    cx_shop s ON s.shopId = a.shopId

            where   1 = 1
            `;

            this.queryFromParams(query, params, 'a');
            query.sql += ' order by a.name';
        }



        return await super.select(query);
    }



    toHtmlList() {
        var shortList = `<table class="jx-info-table">
            <thead>
                <tr>
                    <th style="width: 20px"></th>
                    <th style="width: 30px">link</th>
                    <th style="width: 50px">type</th>
                    <th style="width: auto">name</th>
                    <th style="width: 20px">flags</th>
                </tr>
            </thead>
            <tbody>`;

        this.each(att => {
            var extLink = att.externalLink;
            if (extLink) { extLink = `<a class="jx-list-view-link" href="${extLink}" target="_blank">&#128279;</a>`; }
            shortList += `<tr${((att.externalFlags) ? ' class="jx-flashy-background"' : '')}>
                <td>${att.sourceIcon}</td>
                <td>${extLink}</td>
                <td>${att.type}</td>
                <td>${att.name}</td>
                <td>${att.externalFlags || ''}</td>
            </tr>`
        })

        shortList += '</tbody></table>'
        return shortList;
    }

}
//
// ----------------------------------------------------------------------------------------
//
class cx_attachment extends _persistentTable.Record {
    #shopCode = '';
    #shopName = '';
    constructor(table, defaults) {
        super(table, defaults);
        if (!defaults) { defaults = {}; }

        this.#shopCode = defaults['shopCode'] || '';
        this.#shopName = defaults['shopName'] || '';
    };

    get shopCode() { return this.#shopCode; }
    get shopName() { return this.#shopName; }
    get shopInfo() { return `[${this.#shopCode}] ${this.#shopName}`; }

    get type() {
        return _declarations.CX_ATTACHMENT.TYPE.getName(this.typeId);
    }

    get sourceIcon() {

        if (this.source.indexOf(_declarations.CX_ATTACHMENT.SOURCE.Therefore) == 0) {
            return `<img src="/public/images/therefore.ico" style="width: 16px" title="Therefore ${this.type}" />`;
        } else if (this.source == _declarations.CX_ATTACHMENT.SOURCE.OneDrive) {
            return `<img src="/public/images/onedrive.ico" style="width: 16px" title="One Drive ${this.type}" />`;
        }

        return `<img src="/public/images/attach_${this.cx.theme}.png" style="width: 16px" title="${_declarations.CX_ATTACHMENT.SOURCE.getName(this.source)} ${this.type}" />`;
    }

    async save() {
        // NOTE: BUSINESS CLASS LEVEL VALIDATION
        await super.save()
    }
}
//
// ----------------------------------------------------------------------------------------
//
module.exports = {
    Table: cx_attachment_Collection,
    Record: cx_attachment,
}


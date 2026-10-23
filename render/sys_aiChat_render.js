'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

// NOTE: table cells and read-only fields are rendered as raw html: user / model text is only shown through the escaped getters
//       (titleHtml, pathHtml, promptPreview, argumentsHtml...), the full prompt and reply are shown by jsys_aiChat.js (viewTurn)
class SysAiChatRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'ai chat';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.sys_aiChat.AICHATID] = null;
        this.autoLoadFields[_cxSchema.sys_aiChat.CREATED] = null;
        this.autoLoadFields[_cxSchema.sys_aiChat.LASTUSED] = null;
        this.autoLoadFields[_cxSchema.sys_aiChat.CREATEDBY] = null;
        this.autoLoadFields[_cxSchema.sys_aiChat.TITLE] = null;
        this.autoLoadFields[_cxSchema.sys_aiChat.PATH] = null;
        this.autoLoadFields[_cxSchema.sys_aiChat.TURNCOUNT] = null;
        this.autoLoadFields[_cxSchema.sys_aiChat.TOKENSIN] = null;
        this.autoLoadFields[_cxSchema.sys_aiChat.TOKENSCACHED] = null;
        this.autoLoadFields[_cxSchema.sys_aiChat.TOKENSOUT] = null;
        this.autoLoadFields[_cxSchema.sys_aiChat.COSTIN] = null;
        this.autoLoadFields[_cxSchema.sys_aiChat.COSTOUT] = null;
    }

    get isAdmin() { return this.dataSource.cx.roleId >= _cxConst.CX_ROLE.CX_ADMIN; }

    async initColumn(field, column) {
        if (field.name == _cxSchema.sys_aiChat.CREATEDBY) {
            if (!this.isAdmin) { column.hide = true; }
            column.title = 'login';
            column.width = '150px';
        } else if (field.name == _cxSchema.sys_aiChat.TITLE) {
            column.name = 'titleHtml';
        } else if (field.name == _cxSchema.sys_aiChat.PATH) {
            column.name = 'pathHtml';
            column.width = '200px';
        } else if (field.name == _cxSchema.sys_aiChat.TURNCOUNT) {
            column.title = 'turns';
            column.width = '60px';
        } else if (field.name == _cxSchema.sys_aiChat.TOKENSIN || field.name == _cxSchema.sys_aiChat.TOKENSCACHED || field.name == _cxSchema.sys_aiChat.TOKENSOUT) {
            column.width = '90px';
        } else if (field.name == _cxSchema.sys_aiChat.COSTIN || field.name == _cxSchema.sys_aiChat.COSTOUT) {
            column.title = (field.name == _cxSchema.sys_aiChat.COSTIN) ? 'cost in (EUR)' : 'cost out (EUR)';
            column.align = 'right';
            column.formatMoney = 'N4';
            column.addTotals = true;
            column.width = '90px';
        }
    }

    async initFilter(field, filter) {
        // NOTE: the filters are added in _list
        filter.hide = true;
    }

    async _list() {
        this.options.title = 'ai chat history';

        this.options.filters.push({ label: 'created (from)', fieldName: 'df', type: _cxConst.RENDER.CTRL_TYPE.DATE, width: '120px' });
        this.options.filters.push({ label: 'created (to)', fieldName: 'dt', type: _cxConst.RENDER.CTRL_TYPE.DATE, width: '120px' });
        this.options.filters.push({ label: 'title', fieldName: 'title', type: _cxConst.RENDER.CTRL_TYPE.TEXT, width: '250px' });
        if (this.isAdmin) {
            this.options.filters.push(await this.filterDropDownOptions(_cxSchema.cx_login, { label: 'login', fieldName: 'loginId' }));
        }

        // NOTE: view is the pk link, restore only for the chats of the logged in user
        var loginId = this.dataSource.cx.tUserId;
        this.options.actionsTitle = 'restore';
        this.options.actions = [{
            label: '&#8634;', toolTip: 'restore chat',
            funcExec: (obj) => { return { funcName: 'restoreChat', funcArgument: `'${obj.chatGuid}'` }; }
        }];
        this.options.allowActionCondition = (action, obj) => { return obj.loginId == loginId; };
    }

    async getTurnListOptions() {
        var turns = this.dataSource.cx.table(_cxSchema.sys_aiChatTurn);
        await turns.select({ aiChatId: this.dataSource.aiChatId });

        return {
            listView: true,
            actionsShowFirst: true,
            actionsTitle: '',
            actions: [{
                label: '&#128269;', toolTip: 'view prompt and reply',
                funcExec: (obj) => { return { funcName: 'viewTurn', funcArgument: `'${obj.aiChatTurnId}'` }; }
            }],
            columns: [
                { name: 'turnNo', title: '#', width: '30px', align: 'center' },
                { name: 'created', title: 'created', width: '130px', align: 'center' },
                { name: 'model', title: 'model', width: '120px' },
                { name: 'effort', title: 'effort', width: '60px', nullText: '' },
                { name: 'promptPreview', title: 'prompt' },
                { name: 'finishReason', title: 'finish', width: '80px', nullText: '' },
                { name: 'errorMessageHtml', title: 'error', width: '200px', nullText: '' },
                { name: 'toolRounds', title: 'rounds', width: '50px', align: 'right' },
                { name: 'tokensIn', title: 'tokens in', width: '80px', align: 'right', formatNumber: 'N0', addTotals: true },
                { name: 'tokensCached', title: 'tokens cached', width: '80px', align: 'right', formatNumber: 'N0', addTotals: true },
                { name: 'tokensOut', title: 'tokens out', width: '80px', align: 'right', formatNumber: 'N0', addTotals: true },
                { name: 'costIn', title: 'cost in (EUR)', width: '90px', align: 'right', formatMoney: 'N4', addTotals: true },
                { name: 'costOut', title: 'cost out (EUR)', width: '90px', align: 'right', formatMoney: 'N4', addTotals: true },
                { name: 'durationMs', title: 'ms', width: '70px', align: 'right', formatNumber: 'N0', addTotals: true },
            ],
            records: turns.records
        }
    }

    async getToolCallListOptions() {
        var toolCalls = this.dataSource.cx.table(_cxSchema.sys_aiChatToolCall);
        await toolCalls.select({ aiChatId: this.dataSource.aiChatId });

        return {
            listView: true,
            columns: [
                { name: 'turnNo', title: 'turn', width: '40px', align: 'center' },
                { name: 'round', title: 'round', width: '40px', align: 'center' },
                { name: 'seq', title: 'seq', width: '40px', align: 'center' },
                { name: 'toolName', title: 'tool', width: '160px' },
                { name: 'argumentsHtml', title: 'arguments', nullText: '' },
                { name: 'outputChars', title: 'output chars', width: '90px', align: 'right', formatNumber: 'N0', addTotals: true },
                { name: 'isError', title: 'error', width: '50px', align: 'center' },
                { name: 'durationMs', title: 'ms', width: '70px', align: 'right', formatNumber: 'N0', addTotals: true },
            ],
            records: toolCalls.records
        }
    }

    async _record() {
        this.options.title = `ai chat [${this.dataSource.aiChatId}]`;

        this.options.fields = [
            {
                group: 'all', title: '', columnCount: 2, styles: ['width: calc(100% - 400px);', 'min-width: 400px; max-width: 400px'], fields: [
                    {
                        group: 'main', title: 'chat info', column: 1, columnCount: 3, fields: [
                            { name: 'titleHtml', label: 'title', column: 1, readOnly: true },
                            { name: 'pathHtml', label: 'page', column: 1, readOnly: true },
                            { name: _cxSchema.sys_aiChat.CHATGUID, label: 'session', column: 1, readOnly: true },
                            { name: _cxSchema.sys_aiChat.TURNCOUNT, label: 'turns', column: 2, readOnly: true },
                            { name: _cxSchema.sys_aiChat.COSTIN, label: 'cost in (EUR)', column: 2, readOnly: true },
                            { name: _cxSchema.sys_aiChat.COSTOUT, label: 'cost out (EUR)', column: 2, readOnly: true },
                            { name: _cxSchema.sys_aiChat.TOKENSIN, label: 'tokens in', column: 3, readOnly: true },
                            { name: _cxSchema.sys_aiChat.TOKENSCACHED, label: 'tokens cached', column: 3, readOnly: true },
                            { name: _cxSchema.sys_aiChat.TOKENSOUT, label: 'tokens out', column: 3, readOnly: true },
                            
                        ]
                    },
                    {
                        group: 'audit', title: 'audit info', column: 2, columnCount: 1, fields: [
                            {
                                group: 'audit1', title: '', column: 1, columnCount: 2, inline: true, fields: [
                                    { name: _cxSchema.sys_aiChat.CREATED, label: 'created', column: 1, readOnly: true },
                                    { name: _cxSchema.sys_aiChat.CREATEDBY, label: 'login', column: 2, readOnly: true },
                                ]
                            },
                            {
                                group: 'audit2', title: '', column: 1, columnCount: 1, inline: true, fields: [
                                    { name: _cxSchema.sys_aiChat.LASTUSED, label: 'last used', column: 1, readOnly: true },
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        this.options.fields.push({ group: 'turns', title: 'turns', column: 1, fields: [await this.getTurnListOptions()] });
        this.options.fields.push({ group: 'toolCalls', title: 'tool calls', column: 1, fields: [await this.getToolCallListOptions()] });

        if (this.dataSource.isMine) {
            this.options.buttons.push({ id: 'sys_aiChat_restore', text: 'Restore Chat', function: 'restoreChat' });
        }
    }
}


module.exports = SysAiChatRender;

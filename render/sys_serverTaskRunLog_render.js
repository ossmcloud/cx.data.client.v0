'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class SysServerTaskRunLogRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'server task run logs';
        this.autoLoad = true;

        if (!options.path) { options.path = '../sys/server-task-run-log'; }
        if (!options.listPath) { options.listPath = '../sys/server-task-run-logs'; }

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.sys_serverTaskRunLog.TASKRUNLOGID] = null;
        if (!options.listView) {
            this.autoLoadFields['taskName'] = { name: 'taskName', title: 'task name' };
        }
        this.autoLoadFields[_cxSchema.sys_serverTaskRunLog.LOGTYPE] = null;
        this.autoLoadFields[_cxSchema.sys_serverTaskRunLog.LOGMESSAGE] = null;
        this.autoLoadFields[_cxSchema.sys_serverTaskRunLog.LOGADDITIONALINFO] = null;
        this.autoLoadFields[_cxSchema.sys_serverTaskRunLog.CREATED] = null;
    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.sys_serverTaskRunLog.LOGTYPE) {
            column.align = 'center';
            column.width = '75px';
        } else if (field.name == _cxSchema.sys_serverTaskRunLog.CREATED) {
            column.title = 'log created on';
        }
    }
    async initFilter(field, filter) {
        // if (field.name == _cxSchema.sys_serverTaskRunLog.TASKID || field.name == _cxSchema.sys_serverTaskRunLog.TASKRUNID || field.name == _cxSchema.sys_serverTaskRunLog.TASKSTARTED
        //     || field.name == _cxSchema.sys_serverTaskRunLog.TASKCOMPLETED || field.name == _cxSchema.sys_serverTaskRunLog.CREATED) {
        //     filter.hide = true;
        // } else if (field.name == _cxSchema.sys_serverTaskRunLog.RUNSTATUSID) {
        //     filter.replace = { label: 'run status', fieldName: field.name, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList(true) }
        // }
    }

    async _list() {
        this.options.title = 'server tasks run logs';

        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        this.options.cellHighlights = [
            { column: 'logType', op: '=', value: _cxConst.SYS_SERVER_TASK.LOG_TYPE.INFO, style: 'color: white; background-color: rgba(200,200,200,0.5);' + applyStyle, columns: ['logType'] },
            { column: 'logType', op: '=', value: _cxConst.SYS_SERVER_TASK.LOG_TYPE.WARN, style: 'color: black; background-color: rgba(255,202,58,0.75);' + applyStyle, columns: ['logType'] },
            { column: 'logType', op: '=', value: _cxConst.SYS_SERVER_TASK.LOG_TYPE.ERROR, style: 'color: white; background-color: rgba(234,30,37,0.75);' + applyStyle, columns: ['logType'] },
            { column: 'logType', op: '=', value: _cxConst.SYS_SERVER_TASK.LOG_TYPE.CRITICAL, style: 'color: white; background-color: rgba(234,30,37,1);' + applyStyle, columns: ['logType'] },
        ];
    }

    async _record() {

        // var header = { group: 'head', title: 'server task info', columnCount: 4, styles: ['width: 450px', 'width: 450px', 'width: 400px'], fields: [] };
        // header.fields.push({
        //     group: 'task_name', label: '', column: 1, columnCount: 2, styles: ['width: 100px', 'width: 350px'], fields: [
        //         { name: _cxSchema.sys_serverTaskRunLog.TASKTYPEID, label: 'type', column: 1, items: _cxConst.SYS_SERVER_TASK.TASK_TYPE.toList(), readOnly: true },
        //         { name: _cxSchema.sys_serverTaskRunLog.TASKNAME, label: 'task name', column: 2, readOnly: true },
        //     ]
        // });
        // header.fields.push({ name: _cxSchema.sys_serverTaskRunLog.TASKDESCRIPTION, label: 'description', type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, , column: 1 });


        // header.fields.push({
        //     group: 'run_info', label: '', column: 2, columnCount: 4, styles: ['width: 150px', 'width: 100px', 'width: 100px', 'width: 100px'], fields: [
        //         { name: _cxSchema.sys_serverTaskRunLog.TASKSTATUSID, label: 'status', column: 1, items: _cxConst.SYS_SERVER_TASK.TASK_STATUS.toList() },
        //         { name: _cxSchema.sys_serverTaskRunLog.RUNTIME, label: 'run time', column: 2 },
        //         { name: _cxSchema.sys_serverTaskRunLog.RUNFREQUENCY, label: 'freq. (mins)', column: 3 },
        //         { name: _cxSchema.sys_serverTaskRunLog.RUNSEQUENCE, label: 'run seq.', column: 4 }
        //     ]
        // });
        // header.fields.push({ name: _cxSchema.sys_serverTaskRunLog.RUNPARAMETERS, label: 'run parameters', type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 7, column: 2 });

        // header.fields.push({
        //     group: 'run_status', label: '', column: 3, columnCount: 2, styles: ['width: 100px', 'width: 350px'], fields: [
        //         { name: _cxSchema.sys_serverTaskRunLog.RUNSTATUSID, label: 'run status', column: 1, items: _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList(), readOnly: true },
        //         { name: _cxSchema.sys_serverTaskRunLog.LASTRUNTIME, label: 'last run time', column: 2, readOnly: true }
        //     ]
        // });
        // header.fields.push({ name: _cxSchema.sys_serverTaskRunLog.RUNSTATUSMESSAGE, label: 'status message', column: 3, readOnly: true });

        // this.options.fields = [header];

    }
}


module.exports = SysServerTaskRunLogRender;

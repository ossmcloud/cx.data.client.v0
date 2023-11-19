'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class SysServerTaskRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'server tasks';
        this.autoLoad = true;

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.sys_serverTask.TASKID] = null;
        this.autoLoadFields[_cxSchema.sys_serverTask.TASKTYPEID] = null;
        this.autoLoadFields[_cxSchema.sys_serverTask.TASKSTATUSID] = null;
        this.autoLoadFields[_cxSchema.sys_serverTask.TASKNAME] = null;
        this.autoLoadFields[_cxSchema.sys_serverTask.RUNTIME] = null;
        this.autoLoadFields[_cxSchema.sys_serverTask.RUNFREQUENCY] = null;
        this.autoLoadFields[_cxSchema.sys_serverTask.RUNSTATUSID] = null;
        this.autoLoadFields[_cxSchema.sys_serverTask.RUNSTATUSMESSAGE] = null;
        this.autoLoadFields[_cxSchema.sys_serverTask.RUNSEQUENCE] = null;
        this.autoLoadFields[_cxSchema.sys_serverTask.LASTRUNTIME] = null;
        this.autoLoadFields[_cxSchema.sys_serverTask.LASTRUNSTATUSID] = null;


    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.sys_serverTask.TASKTYPEID) {
            column.title = 'task type';
            column.addTotals = false;
            column.align = 'center';
            column.width = '100px';
            column.lookUps = _cxConst.SYS_SERVER_TASK.TASK_TYPE.toList();
        } else if (field.name == _cxSchema.sys_serverTask.TASKSTATUSID) {
            column.title = 'task status';
            column.addTotals = false;
            column.align = 'center';
            column.width = '100px';
            column.lookUps = _cxConst.SYS_SERVER_TASK.TASK_STATUS.toList();
        } else if (field.name == _cxSchema.sys_serverTask.RUNSTATUSID) {
            column.title = 'run status';
            column.addTotals = false;
            column.align = 'center';
            column.width = '100px';
            column.lookUps = _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList();
        } else if (field.name == _cxSchema.sys_serverTask.LASTRUNSTATUSID) {
            column.title = 'last run status';
            column.addTotals = false;
            column.align = 'center';
            column.width = '100px';
            column.lookUps = _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList();
        } else if (field.name == _cxSchema.sys_serverTask.RUNFREQUENCY) {
            column.title = 'frequency<br />(mins)';
            column.addTotals = false;
            column.align = 'center';
            column.width = '100px';
        } else if (field.name == _cxSchema.sys_serverTask.RUNTIME) {
            column.align = 'center';
            column.width = '100px';
        } else if (field.name == _cxSchema.sys_serverTask.RUNSEQUENCE) {
            column.addTotals = false;
            column.width = '100px';
        }
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.sys_serverTask.TASKID || field.name == _cxSchema.sys_serverTask.RUNTIME || field.name == _cxSchema.sys_serverTask.RUNFREQUENCY
            || field.name == _cxSchema.sys_serverTask.RUNSEQUENCE || field.name == _cxSchema.sys_serverTask.LASTRUNSTATUSID) {
            filter.hide = true;
        } else if (field.name == _cxSchema.sys_serverTask.TASKTYPEID) {
            filter.replace = { label: 'task type', fieldName: field.name, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.SYS_SERVER_TASK.TASK_TYPE.toList(true) }
        } else if (field.name == _cxSchema.sys_serverTask.TASKSTATUSID) {
            filter.replace = { label: 'task status', fieldName: field.name, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.SYS_SERVER_TASK.TASK_STATUS.toList(true) }
        } else if (field.name == _cxSchema.sys_serverTask.RUNSTATUSID) {
            filter.replace = { label: 'run status', fieldName: field.name, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList(true) }
        }
    }

    async _list() {
        this.options.title = 'server tasks';

        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        var statuses = _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList();
        for (let sx = 0; sx < statuses.length; sx++) {
            const s = statuses[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.sys_serverTask.RUNSTATUSID,
                op: '=',
                value: s.value,
                style: _cxConst.SYS_SERVER_TASK.RUN_STATUS.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.sys_serverTask.RUNSTATUSID]
            })
        }

        for (let sx = 0; sx < statuses.length; sx++) {
            const s = statuses[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.sys_serverTask.LASTRUNSTATUSID,
                op: '=',
                value: s.value,
                style: _cxConst.SYS_SERVER_TASK.RUN_STATUS.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.sys_serverTask.LASTRUNSTATUSID]
            })
        }

        var taskStatuses = _cxConst.SYS_SERVER_TASK.TASK_STATUS.toList();
        for (let sx = 0; sx < taskStatuses.length; sx++) {
            const s = taskStatuses[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.sys_serverTask.TASKSTATUSID,
                op: '=',
                value: s.value,
                style: _cxConst.SYS_SERVER_TASK.TASK_STATUS.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.sys_serverTask.TASKSTATUSID]
            })
        }

        var taskTypes = _cxConst.SYS_SERVER_TASK.TASK_TYPE.toList();
        for (let sx = 0; sx < taskTypes.length; sx++) {
            const s = taskTypes[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.sys_serverTask.TASKTYPEID,
                op: '=',
                value: s.value,
                style: _cxConst.SYS_SERVER_TASK.TASK_TYPE.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.sys_serverTask.TASKTYPEID]
            })
        }

    }


    async getTaskRunListOptions() {
        var taskRuns = this.dataSource.cx.table(_cxSchema.sys_serverTaskRun);
        await taskRuns.select({ taskId: this.options.query.id });

        var taskRunsOptions = await this.listOptions(taskRuns, { listView: true });
        taskRunsOptions.quickSearch = true;
        taskRunsOptions.title = '<span>task runs</span>';
        return taskRunsOptions;
    }

    async _record() {
        this.options.fields = [];
        this.options.fields.push({ name: 'action', id: 'action', hidden: true })


        var header = { group: 'head', title: 'server task info', columnCount: 4, styles: ['width: 450px', 'width: 450px', 'width: 450px'], fields: [] };
        header.fields.push({
            group: 'task_name', label: '', column: 1, columnCount: 2, styles: ['width: 100px', 'width: 350px'], fields: [
                { name: _cxSchema.sys_serverTask.TASKTYPEID, label: 'type', column: 1, items: _cxConst.SYS_SERVER_TASK.TASK_TYPE.toList(), readOnly: true },
                { name: _cxSchema.sys_serverTask.TASKNAME, label: 'task name', column: 2, readOnly: true },
            ]
        });
        header.fields.push({ name: _cxSchema.sys_serverTask.TASKDESCRIPTION, label: 'description', type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 7, column: 1 });


        header.fields.push({
            group: 'run_info', label: '', column: 2, columnCount: 4, styles: ['width: 150px', 'width: 100px', 'width: 100px', 'width: 100px'], fields: [
                { name: _cxSchema.sys_serverTask.TASKSTATUSID, label: 'status', column: 1, items: _cxConst.SYS_SERVER_TASK.TASK_STATUS.toList() },
                { name: _cxSchema.sys_serverTask.RUNTIME, label: 'run time', column: 2 },
                { name: _cxSchema.sys_serverTask.RUNFREQUENCY, label: 'freq. (mins)', column: 3 },
                { name: _cxSchema.sys_serverTask.RUNSEQUENCE, label: 'run seq.', column: 4 }
            ]
        });
        header.fields.push({ name: _cxSchema.sys_serverTask.RUNPARAMETERS, label: 'run parameters', type: _cxConst.RENDER.CTRL_TYPE.TEXT_AREA, rows: 7, column: 2 });

        header.fields.push({
            group: 'run_status', label: '', column: 3, columnCount: 2, styles: ['width: 150px', 'width: 350px'], fields: [
                { name: _cxSchema.sys_serverTask.RUNSTATUSID, label: 'run status', column: 1, items: _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList(), readOnly: true },
                { name: _cxSchema.sys_serverTask.LASTRUNTIME, label: 'last run time', column: 2, readOnly: true }
            ]
        });
        header.fields.push({ name: _cxSchema.sys_serverTask.RUNSTATUSMESSAGE, label: 'status message', column: 3, readOnly: true });

        var taskRunsOptions = await this.getTaskRunListOptions();

        this.options.fields.push(header);
        this.options.fields.push({ group: 'runs', title: 'server runs', column: 1, fields: [taskRunsOptions] });

        if (this.options.mode == 'edit') {
            if (this.dataSource.cx.roleId >= _cxConst.CX_ROLE.SUPERVISOR) {
                if (this.dataSource.taskStatusId != _cxConst.SYS_SERVER_TASK.TASK_STATUS.Disabled &&
                    (this.dataSource.runStatusId == _cxConst.SYS_SERVER_TASK.RUN_STATUS.Idle || this.dataSource.runStatusId == _cxConst.SYS_SERVER_TASK.RUN_STATUS.ERROR)) {
                    this.options.buttons.push({ id: 'sys_task_manual_start', text: 'Run Task Now', function: 'manualStart' });
                }
            }
        }

    }
}


module.exports = SysServerTaskRender;

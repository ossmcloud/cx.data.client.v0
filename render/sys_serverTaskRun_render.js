'use script';

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const RenderBase = require('./render_base');

class SysServerTaskRunRender extends RenderBase {
    constructor(dataSource, options) {
        super(dataSource, options);
        this.title = 'server task runs';
        this.autoLoad = true;

        if (!options.path) { options.path = '../sys/server-task-run'; }
        if (!options.listPath) { options.listPath = '../sys/server-task-runs'; }

        this.autoLoadFields = {};
        this.autoLoadFields[_cxSchema.sys_serverTaskRun.TASKRUNID] = null;
        if (!options.listView) {
            this.autoLoadFields['taskName'] = { name: 'taskName', title: 'task name' };
        }
        this.autoLoadFields[_cxSchema.sys_serverTaskRun.RUNSTATUSID] = null;
        this.autoLoadFields[_cxSchema.sys_serverTaskRun.RUNSTATUSMESSAGE] = null;
        this.autoLoadFields[_cxSchema.sys_serverTaskRun.RUNPARAMETERS] = null;
        this.autoLoadFields[_cxSchema.sys_serverTaskRun.CREATED] = null;
        this.autoLoadFields[_cxSchema.sys_serverTaskRun.TASKSTARTED] = null;
        this.autoLoadFields[_cxSchema.sys_serverTaskRun.TASKCOMPLETED] = null;
        


    }

    async initColumn(field, column) {
        if (field.name == _cxSchema.sys_serverTaskRun.RUNSTATUSID) {
            column.title = 'run status';
            column.addTotals = false;
            column.align = 'center';
            column.width = '100px';
            column.lookUps = _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList();

        } else if (field.name == _cxSchema.sys_serverTaskRun.CREATED) {
            column.title='run created on';
        } 
    }
    async initFilter(field, filter) {
        if (field.name == _cxSchema.sys_serverTaskRun.TASKID || field.name == _cxSchema.sys_serverTaskRun.TASKRUNID || field.name == _cxSchema.sys_serverTaskRun.TASKSTARTED
            || field.name == _cxSchema.sys_serverTaskRun.TASKCOMPLETED || field.name == _cxSchema.sys_serverTaskRun.CREATED) {
            filter.hide = true;
        } else if (field.name == _cxSchema.sys_serverTaskRun.RUNSTATUSID) {
            filter.replace = { label: 'run status', fieldName: field.name, type: _cxConst.RENDER.CTRL_TYPE.SELECT, items: _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList(true) }
        }
    }

    async _list() {
        this.options.title = 'server tasks runs';

        
        this.options.cellHighlights = [];
        
        var applyStyle = 'padding: 5px 7px 1px 7px; border-radius: 5px; width: calc(100% - 14px); display: block; overflow: hidden; text-align: center;';
        var statuses = _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList();
        for (let sx = 0; sx < statuses.length; sx++) {
            const s = statuses[sx];
            this.options.cellHighlights.push({
                column: _cxSchema.sys_serverTaskRun.RUNSTATUSID,
                op: '=',
                value: s.value,
                style: _cxConst.SYS_SERVER_TASK.RUN_STATUS.getStyleInverted(s.value) + applyStyle,
                columns: [_cxSchema.sys_serverTaskRun.RUNSTATUSID]
            })
        }
    }

    async getTaskRunLogListOptions() {
        var taskRuns = this.dataSource.cx.table(_cxSchema.sys_serverTaskRunLog);
        await taskRuns.select({ taskRunId: this.options.query.id });

        var taskRunsOptions = await this.listOptions(taskRuns, { listView: true });
        taskRunsOptions.quickSearch = true;
        taskRunsOptions.title = '<span>task run logs</span>';
        return taskRunsOptions;
    }


    async _record() {
        this.options.fields = [];

        var header = { group: 'head', title: 'server task run info', columnCount: 4, styles: ['width: 450px', 'width: 450px', 'width: 400px'], fields: [] };
        
        header.fields.push({
            group: 'run_status', label: '', column: 1, columnCount: 3, styles: ['width: 100px', 'width: 150px', 'width: 150px'], fields: [
                { name: _cxSchema.sys_serverTaskRun.RUNSTATUSID, label: 'run status', column: 1, items: _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList(), readOnly: true },
                { name: _cxSchema.sys_serverTaskRun.TASKSTARTED, label: 'started', column: 2, readOnly: true },
                { name: _cxSchema.sys_serverTaskRun.TASKCOMPLETED, label: 'completed', column: 3, readOnly: true }
            ]
        });
        
        header.fields.push({ name: _cxSchema.sys_serverTaskRun.RUNSTATUSMESSAGE, label: 'status message', column: 2, readOnly: true });
        header.fields.push({ name: _cxSchema.sys_serverTaskRun.RUNPARAMETERS, label: 'run parameters', column: 3, readOnly: true });

        this.options.fields.push(header);

        var taskRunLogsOptions = await this.getTaskRunLogListOptions();
        this.options.fields.push({ group: 'runs', title: 'run logs', column: 1, fields: [taskRunLogsOptions] });
 
    }
}


module.exports = SysServerTaskRunRender;

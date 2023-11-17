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
            column.align = 'left';
            column.lookUps = _cxConst.SYS_SERVER_TASK.TASK_TYPE.toList();
        } else if (field.name == _cxSchema.sys_serverTask.TASKSTATUSID) {
            column.title = 'task status';
            column.addTotals = false;
            column.align = 'left';
            column.lookUps = _cxConst.SYS_SERVER_TASK.TASK_STATUS.toList();
        } else if (field.name == _cxSchema.sys_serverTask.RUNSTATUSID) {
            column.title = 'run status';
            column.addTotals = false;
            column.align = 'left';
            column.lookUps = _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList();
        } else if (field.name == _cxSchema.sys_serverTask.LASTRUNSTATUSID) {
            column.title = 'last run status';
            column.addTotals = false;
            column.align = 'left';
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

    }

    async _record() {
        this.options.fields = [];


        var header = { group: 'head', title: 'server task info', columnCount: 4, styles: ['width: 450px', 'width: 450px', 'width: 400px'], fields: [] };
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
            group: 'run_status', label: '', column: 3, columnCount: 2, styles: ['width: 100px', 'width: 350px'], fields: [
                { name: _cxSchema.sys_serverTask.RUNSTATUSID, label: 'run status', column: 1, items: _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList(), readOnly: true },        
                { name: _cxSchema.sys_serverTask.LASTRUNTIME, label: 'last run time', column: 2, readOnly: true }
            ]
        });
        header.fields.push({ name: _cxSchema.sys_serverTask.RUNSTATUSMESSAGE, label: 'status message', column: 3, readOnly: true });
        


        //header.fields.push({ name: _cxSchema.sys_serverTask.TASKTYPEID, label: 'type', column: 2, items: _cxConst.SYS_SERVER_TASK.RUN_STATUS.toList() });
        // header.fields.push({
        //     group: 'stage_seq', label: '', column: 1, columnCount: 2, styles: ['width: calc(100% - 120px)', 'width: 125px'], fields: [
        //         { name: _cxSchema.sys_customScript.STAGE, label: 'stage', column: 1, items: _cxConst.SYS_CUSTOM_SCRIPT.STAGE.toList(), validation: '{"mandatory": true}' },
        //         { name: _cxSchema.sys_customScript.EXECSEQUENCE, label: 'exec sequence', column: 2, validation: '{"mandatory": true}' }
        //     ]
        // });
        // header.fields.push({
        //     group: 'svc_info', label: '', column: 2, columnCount: 3, styles: ['width: 125px', 'width: 125px', 'width: 125px'], fields: [
        //         { name: _cxSchema.sys_customScript.SVCNAME, label: 'service', items: svcList, column: 1, validation: '{"mandatory": true}', width: '100px', readOnly: readOnly },
        //         { name: _cxSchema.sys_customScript.MODULE, label: 'module', items: _cxConst.CX_MODULE.toList(), column: 2, validation: '{"mandatory": true}', width: '100px', readOnly: readOnly },
        //         { name: _cxSchema.sys_customScript.PROCESS, label: 'process', items: _cxConst.SYS_CUSTOM_SCRIPT.PROCESS.toList(), column: 3, validation: '{"mandatory": true}', width: '100px', readOnly: readOnly }
        //     ]
        // });

        // header.fields.push({ name: _cxSchema.sys_customScript.INACTIVE, label: 'is inactive', column: 2 });

        this.options.fields.push(header);

    }
}


module.exports = SysServerTaskRender;

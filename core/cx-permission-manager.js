'use strict'

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const { trimRight } = require('cx-core/core/cx-core-text');

async function getPermission(recordType, role) {
    var permission = { allowNew: false, allowEdit: false, allowView: true };
    if (role < 0) {
        return { allowNew: (recordType.indexOf('raw_') < 0), allowEdit: true, allowView: true };
    }

    //  
    
    if (recordType.indexOf('raw_') == 0 ||
        recordType == _cxSchema.epos_dtfs_ping.TBL_NAME ||
        recordType == _cxSchema.epos_dtfs_transmission.TBL_NAME) {
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    } 
    if (recordType == _cxSchema.raw_getRequest.TBL_NAME) {
        permission.allowNew = (role >= _cxConst.CX_ROLE.MANAGER);
    }

    if (recordType == _cxSchema.cx_shop.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowNew = (role >= _cxConst.CX_ROLE.ADMIN);
    }
    if (recordType == _cxSchema.cx_shop_group.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowNew = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowView = (role >= _cxConst.CX_ROLE.USER);
    }
    if (recordType == _cxSchema.cx_login.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowNew = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
        permission.allowDelete = (role >= _cxConst.CX_ROLE.ADMIN);
    }

    
    if (recordType == _cxSchema.cr_tran_type_config.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowNew = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
        permission.allowDelete = (role > _cxConst.CX_ROLE.ADMIN);
    }
    if (recordType == _cxSchema.cr_tran_type_config_shop.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowNew = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
        permission.allowDelete = (role > _cxConst.CX_ROLE.ADMIN);
    }
    if (recordType == _cxSchema.cx_map_config_dep.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowNew = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }
    if (recordType == _cxSchema.cx_map_config_tax.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowNew = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }

    if (recordType == _cxSchema.epos_shop_setting.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowNew = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }
    if (recordType == _cxSchema.epos_shop_configs.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowNew = false;
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }
    if (recordType == _cxSchema.epos_dtfs_setting.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowNew = (role > _cxConst.CX_ROLE.ADMIN);
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }
    if (recordType == _cxSchema.epos_dtfs_configs.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowNew = false;
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }

    if (recordType == _cxSchema.cx_traderAccount.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.USER);
        permission.allowNew = (role >= _cxConst.CX_ROLE.USER);
    }
    if (recordType == _cxSchema.cp_documentImport.TBL_NAME) {
        permission.allowNew = (role >= _cxConst.CX_ROLE.USER);
    }
    
    if (recordType == _cxSchema.erp_traderAccount.TBL_NAME) {
        permission.allowEdit = false;
        // @REVIEW: should we let users add accounts here, as long as they provide the right code when the account is received from erps itt'll be updated
        //          this could let user go on with posting if they need to map something
        permission.allowNew = false;
    }

    if (recordType == _cxSchema.erp_dtfs_setting.TBL_NAME ) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowNew = (role > _cxConst.CX_ROLE.ADMIN);
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }
    if (recordType == _cxSchema.erp_dtfs_configs.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowNew = false;
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }

    if (recordType == _cxSchema.erp_shop_setting.TBL_NAME ||
        recordType == _cxSchema.cx_map_config.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowNew = false;
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }
    if (recordType == _cxSchema.erp_shop_configs.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.MANAGER);
        permission.allowNew = false;
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }

   
    if (recordType == _cxSchema.epos_dtfs_upgradeAudit.TBL_NAME) {
        permission.allowEdit = false;
        permission.allowNew = (role > _cxConst.CX_ROLE.ADMIN);
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }
    if (recordType == _cxSchema.erp_dtfs_upgradeAudit.TBL_NAME) {
        permission.allowEdit = false;
        permission.allowNew = (role > _cxConst.CX_ROLE.ADMIN);
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }

    if (recordType == _cxSchema.cr_preference.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowNew = false;
        permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }

    if (recordType == _cxSchema.cr_preference_config.TBL_NAME) {
        permission.allowEdit = (role >= _cxConst.CX_ROLE.ADMIN);
        permission.allowNew = (role >= _cxConst.CX_ROLE.ADMIN);
        //permission.allowView = (role >= _cxConst.CX_ROLE.SUPERVISOR);
    }

    if (!permission.allowView) {
        var ex = new Error('You have no permission to access this record');
        ex.permissionViolation = true;
        throw ex;
    }

    return permission;
}

module.exports = {
    get: async function (recordType, role) {
        return await getPermission(recordType, role);
    }
}
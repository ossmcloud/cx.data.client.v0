'use strict'

const _cxSchema = require('../cx-client-schema');

async function getPermission(recordType, role) {
    var permission = { allowNew: false, allowEdit: false, allowView: true };
    // if (recordType.indexOf('raw_') == 0) {
    //     permission.allowEdit = false;
    //     permission.allowNew = false;
    // } else
    if (recordType == _cxSchema.cx_shop.TBL_NAME ||
        recordType == _cxSchema.cx_shop_group.TBL_NAME ||
        recordType == _cxSchema.cx_login.TBL_NAME) {
        permission.allowEdit = true;
        permission.allowNew = true;
    }


    return permission;
}

module.exports = {
    get: async function (recordType, role) {
        return await getPermission(recordType, role);
    }
}
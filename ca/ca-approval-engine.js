'use strict'

const _cxSchema = require('../cx-client-schema');
const _cxConst = require('../cx-client-declarations');
const _core = require('cx-core');
const _cored = require('cx-core/core/cx-core-date');

class CAApprovalEngine {
    #cx = null;
    #approverConfigs = null;
    constructor(cx) {
        this.#cx = cx;
    }

    get cx() { return this.#cx; }

    async init() {
        if (!this.#approverConfigs) {
            this.#approverConfigs = this.#cx.table(_cxSchema.ca_settingApprover);
            await this.#approverConfigs.select({ [_cxSchema.ca_settingApprover.LOGINID]: this.#cx.tUserId })
        }
    }


    async canApprove(document) {
        // NA or not required can never be approved
        if (document.approvalStatus == _cxConst.CP_DOCUMENT.APPROVAL_STATUS.NA || document.approvalStatus == _cxConst.CP_DOCUMENT.APPROVAL_STATUS.NotRequired) { return false; }
        // if already approved or rejected then can no longer approve
        if (document.approvalStatus == _cxConst.CP_DOCUMENT.APPROVAL_STATUS.Approved || document.approvalStatus == _cxConst.CP_DOCUMENT.APPROVAL_STATUS.Rejected) { return false; }

        await this.init();
        // check if logged in user is an approver for the current level

        var approveLevel = document.approvedLevel + 1;

        var canApprove = false;


        // @@TODO: what about the suppliers...

        for (var rx = 0; rx < this.#approverConfigs.records.length; rx++) {
            var a = this.#approverConfigs.records[rx];
            if (a.level == approveLevel) {
                if (a.shopCount > 0) {
                    var shop = await a.getShop(document.shopId);
                    if (!shop) { break; }
                }
                canApprove = true;
                break;
            }
        }

        return canApprove;
    }

    async approve(documentId, message) {
        var document = await this.cx.table(_cxSchema.cp_invoiceCredit).fetch(documentId);
        try {
            document.approvedLevel++;
            if (document.approvedLevel == document.approvalLevel) {
                document.approvalStatus = _cxConst.CP_DOCUMENT.APPROVAL_STATUS.Approved;
            } else {
                document.approvalStatus = _cxConst.CP_DOCUMENT.APPROVAL_STATUS.Approving;
            }

            document.approvalStatusMessage = message.substring(0, 255);
            document.approvedBy = this.cx.tUserId;
            document.approvedOn = new Date();
            await document.save();
            await document.logApproval(`${_cxConst.CP_DOCUMENT.APPROVAL_STATUS.getName(document.approvalStatus)} (lvl ${document.approvedLevel}): ${message || 'no message'}`);

        } catch (error) {
            await document.logError(error, 'error while approving');
            throw error;
        }

    }

    async reject(documentId, message) {
        var document = await this.cx.table(_cxSchema.cp_invoiceCredit).fetch(documentId);
        try {
            document.approvedLevel++;
            document.approvalStatus = _cxConst.CP_DOCUMENT.APPROVAL_STATUS.Rejected;
            document.approvalStatusMessage = message.substring(0, 255);
            document.approvedBy = this.cx.tUserId;
            document.approvedOn = new Date();
            await document.save();
            await document.logApproval(`${_cxConst.CP_DOCUMENT.APPROVAL_STATUS.getName(document.approvalStatus)}: ${message}`);

        } catch (error) {
            await document.logError(error, 'error while approving');
            throw error;
        }

    }
}



module.exports = {
    get: (cx) => {
        return new CAApprovalEngine(cx);
    }
}
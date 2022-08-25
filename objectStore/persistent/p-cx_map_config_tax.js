'use strict'
//
//*****************************************************************************************
//                                                                                        *
//  IMPORTANT NOTE: THIS FILE IS AUTOMATICALLY CREATED BY [peppo.nodejs.objectBuilder]    *
//                  DO NOT EDIT OR ADD CODE IN ANY WAY AS IT WILL BE OVERWRITTEN WHEN     *
//                  [peppo.nodejs.objectBuilder] REGENERATES THE FILE                     *
//                                                                                        *
//*****************************************************************************************
// 
// CORE SDK REQUIRE
//
const _cx_data = require('cx-data');
// 
// TABLE NAME
//
const _tableName = 'cx_map_config_tax';
//
// FIELD NAMES (just because they are handy to have here)
//
const _fieldNames = {
    TAXMAPCONFIGID: 'taxMapConfigId',
    MAPCONFIGID: 'mapConfigId',
    EPOSCURRENCYCODE: 'eposCurrencyCode',
    EPOSTAXCODE: 'eposTaxCode',
    EPOSTAXRATE: 'eposTaxRate',
    EPOSDESCRIPTION: 'eposDescription',
    TAXACCOUNTID: 'taxAccountId',
    CREATED: 'created',
    CREATEDBY: 'createdBy',
    MODIFIED: 'modified',
    MODIFIEDBY: 'modifiedBy',

}
//
// FIELD SPECIFICATIONS
//
const _fields = {
    taxMapConfigId: { name: 'taxMapConfigId', dataType: 'int', pk: true, identity: true, maxLength: 4, null: false },
    mapConfigId: { name: 'mapConfigId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: false },
    eposCurrencyCode: { name: 'eposCurrencyCode', dataType: 'varchar', pk: false, identity: false, maxLength: 3, null: false },
    eposTaxCode: { name: 'eposTaxCode', dataType: 'varchar', pk: false, identity: false, maxLength: 20, null: false },
    eposTaxRate: { name: 'eposTaxRate', dataType: 'decimal', pk: false, identity: false, maxLength: 5, null: true },
    eposDescription: { name: 'eposDescription', dataType: 'varchar', pk: false, identity: false, maxLength: 255, null: true },
    taxAccountId: { name: 'taxAccountId', dataType: 'int', pk: false, identity: false, maxLength: 4, null: true },
    created: { name: 'created', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: false, default: 'now' },
    createdBy: { name: 'createdBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },
    modified: { name: 'modified', dataType: 'datetime', pk: false, identity: false, maxLength: 8, null: true },
    modifiedBy: { name: 'modifiedBy', dataType: 'bigint', pk: false, identity: false, maxLength: 8, null: true },

}
//
// PERSISTENT TABLE OBJECT (THIS REPRESENTS A COLLECTION OF RECORDS)
//
class Persistent_cx_map_config_tax_Collection extends _cx_data.DBTable {
    constructor() {
        super(_tableName, _fields);
    }
    get FieldNames() { return _fieldNames; }
}
//
// PERSISTENT RECORD OBJECT (THIS REPRESENT A RECORD )
//
class Persistent_cx_map_config_tax extends _cx_data.DBRecord {
    constructor(table, defaults) {
        super(table, defaults);
    }
    get FieldNames() { return _fieldNames; }

    // DEFINE TABLE FIELDS AS PROPERTIES
    get taxMapConfigId() {
        return super.getValue(_fieldNames.TAXMAPCONFIGID);
    }

    get mapConfigId() {
        return super.getValue(_fieldNames.MAPCONFIGID);
    } set mapConfigId(val) {
        super.setValue(_fieldNames.MAPCONFIGID, val);
    }

    get eposCurrencyCode() {
        return super.getValue(_fieldNames.EPOSCURRENCYCODE);
    } set eposCurrencyCode(val) {
        super.setValue(_fieldNames.EPOSCURRENCYCODE, val);
    }

    get eposTaxCode() {
        return super.getValue(_fieldNames.EPOSTAXCODE);
    } set eposTaxCode(val) {
        super.setValue(_fieldNames.EPOSTAXCODE, val);
    }

    get eposTaxRate() {
        return super.getValue(_fieldNames.EPOSTAXRATE);
    } set eposTaxRate(val) {
        super.setValue(_fieldNames.EPOSTAXRATE, val);
    }

    get eposDescription() {
        return super.getValue(_fieldNames.EPOSDESCRIPTION);
    } set eposDescription(val) {
        super.setValue(_fieldNames.EPOSDESCRIPTION, val);
    }

    get taxAccountId() {
        return super.getValue(_fieldNames.TAXACCOUNTID);
    } set taxAccountId(val) {
        super.setValue(_fieldNames.TAXACCOUNTID, val);
    }

    get created() {
        return super.getValue(_fieldNames.CREATED);
    } set created(val) {
        super.setValue(_fieldNames.CREATED, val);
    }

    get createdBy() {
        return super.getValue(_fieldNames.CREATEDBY);
    } set createdBy(val) {
        super.setValue(_fieldNames.CREATEDBY, val);
    }

    get modified() {
        return super.getValue(_fieldNames.MODIFIED);
    } set modified(val) {
        super.setValue(_fieldNames.MODIFIED, val);
    }

    get modifiedBy() {
        return super.getValue(_fieldNames.MODIFIEDBY);
    } set modifiedBy(val) {
        super.setValue(_fieldNames.MODIFIEDBY, val);
    }


}
//
//  MODULE EXPORTS
//
module.exports = {
    Table: Persistent_cx_map_config_tax_Collection,
    Record: Persistent_cx_map_config_tax,
}
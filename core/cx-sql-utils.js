'use strict'

// keeps only the integer values of a comma separated list (or array) so it is safe to use in an sql 'in (...)' clause
// NOTE: returns 'null' for an empty list as 'in (null)' matches nothing
function _toIntList(values) {
    if (values === undefined || values === null) { return 'null'; }
    if (!Array.isArray(values)) { values = String(values).split(','); }
    var ints = [];
    values.forEach(value => {
        value = String(value).trim();
        if (/^-?\d+$/.test(value)) { ints.push(parseInt(value)); }
    });
    return (ints.length > 0) ? ints.join(',') : 'null';
}

module.exports = {
    toIntList: _toIntList,
}

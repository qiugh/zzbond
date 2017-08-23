const DEFAULT_OPT = require('./config.json');

function merge_default_options(optname, options) {

    let default_options = DEFAULT_OPT[optname];
    return merge_options(extract_options(optname, options), default_options);
}

function extract_options(optname, options) {

    let result = {};
    let limit_opt_keys = Object.keys(DEFAULT_OPT[optname]);
    limit_opt_keys.forEach(function (key) {
        if (options[key]) {
            result[key] = clone(options[key]);
        }
    });
    return result;
}

function merge_options(new_options, default_options) {

    let def_keys = Object.keys(default_options);
    for (let i = 0; i < def_keys.length; i++) {
        if (!(def_keys[i] in new_options) && default_options[def_keys[i]] !== 'not_set') {
            let type = typeof default_options[def_keys[i]];
            new_options[def_keys[i]] = (type === 'object') ? JSON.parse(JSON.stringify(default_options[def_keys[i]])) : default_options[def_keys[i]];
        } else if ((def_keys[i] in new_options) && (typeof default_options[def_keys[i]] === 'object')) {
            new_options[def_keys[i]] = merge_options(new_options[def_keys[i]], default_options[def_keys[i]])
        }
    }
    return new_options;
}

function clone(item) {

    if (!item || !!~(['number', 'string', 'boolean'].indexOf(typeof item))) return item;
    return JSON.parse(JSON.stringify(item));
}

exports.merge_options = merge_options;
exports.extract_options = extract_options;
exports.merge_default_options = merge_default_options;

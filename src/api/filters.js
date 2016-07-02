/*
 * @Author: fengyun2
 * @Date:   2016-06-22 10:02:47
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-06-27 13:06:54
 */

'use strict';
export const timeToNow = (time) => {
    const t = parseFloat(new Date - new Date(time)) / 1000;
    let str;
    if (t) {
        if (t > 60 && t < 3600) {
            str = `${parseInt(t / 60.0, 10)}分钟前`;
        } else if (t >= 3600 && t < 86400) {
            str = `${parseInt(t / 3600.0, 10)}小时前`;
        } else if (t >= 86400 && t < 86400 * 30) {
            str = `${parseInt(t / 86400.0, 10)}天前`;
        } else if (t >= 86400 * 30 && t < 86400 * 365) {
            str = `${parseInt(t / (86400.0 * 30), 10)}个月前`;
        } else if (t >= 86400 * 365) {
            str = `${parseInt(t / (86400.0 * 365), 10)}年前`;
        } else {
            str = `${parseInt(t, 10)}秒前`;
        }
    }
    return str;
};
export const isEmpty = (v) => {
    switch (typeof v) {
        case 'undefined':
            return true;
        case 'string':
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true;
            break;
        case 'boolean':
            if (!v) return true;
            break;
        case 'number':
            if (0 === v || isNaN(v)) return true;
            break;
        case 'object':
            if (null === v || v.length === 0) return true;
            for (var i in v) {
                return false;
            }
            return true;
    }
    return false;
    return v
};

export const isImage = (v) => {
    let ext = v.substring(v.lastIndexOf('.') + 1)
    switch (ext) {
        case 'jpg':
        case 'png':
        case 'gif':
        return true;
        default:
        return false;
    }
};


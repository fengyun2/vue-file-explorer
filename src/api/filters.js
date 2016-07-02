/*
 * @Author: fengyun2
 * @Date:   2016-06-22 10:02:47
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-07-02 11:57:41
 */

'use strict';

/**
 * 是否是数组
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
const isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};
/**
 * 是否是字符串
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
const isString = function(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
};
/**
 * 是否为数字
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
const isNumber = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
};
/**
 * 是否为undefined
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
const isUndefined = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Undefined]';
};
/**
 * 是否为Boolean
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
const isBoolean = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Boolean]';
};
/**
 * 是否为Object
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
const isObject = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
/**
 * 是否为Function
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
const isFunction = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
};

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
    if (isUndefined(v)) {
        return true;
    } else if (isString(v)) {
        if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true;
    } else if (isBoolean(v)) {
        if (!v) return true;
    } else if (isNumber(v)) {
        if (0 === v || isNaN(v)) return true;
    } else if (isObject(v)) {
        if (null === v || v.length === 0) return true;
        for (var i in v) {
            return false;
        }
        return true;
    } else if (isArray(v)) {
        if (null === v || v.length === 0) return true;
        for (var i in v) {
            return false;
        }
        return true;
    }
    return false;
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

export const reverse = (v) => {
    return v.split('').reverse().join('')
};

/**
 * CDN路径拼接
 * @param  {[type]} v url路径
 * @param  {[type]} t 类型(按比例/定宽高)
 * @param  {[type]} w 宽度
 * @param  {[type]} h 高度
 * @param  {[type]} p 百分比
 * @return {[type]}   [description]
 */
export const SpliceCDNUrl = (v, t, w, h, p) => {
    let ext = v.substring(v.lastIndexOf('.') + 1)
    let old_url = v.substring(0, v.lastIndexOf('.'))
    return v + '_' + '_' + '';
};

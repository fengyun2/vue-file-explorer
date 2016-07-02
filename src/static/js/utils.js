/*
 * @Author: fengyun2
 * @Date:   2016-05-17 14:28:56
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-07-02 14:31:47
 */

// 'use strict';

function SpliceCDNUrl (v, w = 100, h = 100, p = 50, t = 'fix') {
    w = isNumber(w) ? w: 100;
    h = isNumber(h) ? h: 100;
    p = isNumber(p) ? p: 50;
    if (t == 'fix') { // 定宽高
        v += '@' + w + 'w_' + h + 'h' + '_0e_80Q.';
    } else if (t == 'scale') { // 按比例缩放
        v += '@' + p + 'p';
    }
    console.log('new_url: ', v)
    return v;
};


//查询的hash
function getHashStringArgs() {

    //取得查询的hash，并去除开头的#号

    var hashStrings = (window.location.hash.length > 0 ? window.location.hash.substring(1) : ""),

        //保持数据的对象

        hashArgs = {},



        //取得每一项hash对

        items = hashStrings.length > 0 ? hashStrings.split("&") : [],

        item = null,

        name = null,

        value = null,

        i = 0,

        len = items.length;



    //逐个将每一项添加到hashArgs中

    for (i = 0; i < len; i++) {

        item = items[i].split("=");

        name = decodeURIComponent(item[0]);

        value = decodeURIComponent(item[1]);

        if (name.length > 0) {

            hashArgs[name] = value;

        }

    }

    return hashArgs;

}

// 从 url 中获取参数对象
function getParamFromUrl() {
/*    var o = {};
    var url = location.search.substr(1);
    url = url.split('&');
    for (var i = 0; i < url.length; i++) {
        var param = url[i].split('=');
        o[param[0]] = param[1];
    }
    return o;*/

    return parseUrl()
}

function parseUrl() {
    var o = {};
    var url = location.search.substr(1);
    url = url.split('&');
    for (var i = 0; i < url.length; i++) {
        var param = url[i].split('=');
        o[param[0]] = param[1];
    }
    var hash_o = {};
    var hash_url = location.hash.split('?');
    if (hash_url.length > 1) {
        hash_url = hash_url[1]
        hash_url = hash_url.split('&');
        for (var j = 0; j < hash_url.length; j++) {
            var param = hash_url[j].split('=');
            hash_o[param[0]] = param[1];
        }
    }

    extend(o, hash_o)
    return o;
}

function extend(dest, from) {
    var props = Object.getOwnPropertyNames(from),
        destination;

    props.forEach(function(name) {
        if (typeof from[name] === 'object') {
            if (typeof dest[name] !== 'object') {
                dest[name] = {}
            }
            extend(dest[name], from[name]);
        } else {
            destination = Object.getOwnPropertyDescriptor(from, name);
            Object.defineProperty(dest, name, destination);
        }
    });
}


/*function getParams() {
    var uri = new URI(window.location.href);
    console.log('fragment: ', uri.fragment());
    console.log('query: ', uri.query());
}*/

/**
 * ajax请求[包括跨域]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
function ajax_go(config) {
    var site_id = sessionStorage.getItem('_site_id')

    var default_header = {
        fenghejia_token: sessionStorage.getItem('_fenghejia_token')
    };

    if(!!site_id){
        default_header['site_id'] = site_id;
    }

    var default_config = {
        url: "",
        dataType: "json",
        async: true,
        data: {},
        type: "POST",
        cache: false,
        // contentType: "application/form-data; charset=UTF-8", // 浏览器不支持这种方式传输
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        timeout: 20000,
        headers: default_header,
        beforeSend: function(xhr, settings) {

        },
        success: function(data, status, xhr) {

        },
        complete: function() {
            // 请求完成的处理
        },
        error: function(err) {
            $.toast("网络连接超时, 请刷新后重试! ");
        }
    };
    var new_config = $.extend({}, default_config, config);
    $.ajax(new_config);
}

/**
 * 文件上传
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
function file_upload(config) {
    var default_config = {
        url: "",
        dataType: "json",
        async: true,
        data: {},
        type: "POST",
        cache: false,

        contentType: false,
        /*必须false才会自动加上正确的Content-Type*/
        processData: false,
        /*必须false才会避开jQuery对 formdata 的默认处理, XMLHttpRequest会对 formdata 进行正确的处理*/
        // contentType: 'multipart/form-data',
        // contentType: "application/form-data; charset=UTF-8", // 浏览器不支持这种方式传输
        /*        xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,*/
        beforeSend: function() {
            // 请求前的处理
        },
        success: function(data) {

        },
        complete: function() {
            // 请求完成的处理
        },
        error: function(err) {
            $.toast("网络连接超时, 请刷新后重试! ");
        }
    };
    var new_config = $.extend({}, default_config, config);
    $.ajax(new_config);
}

/**=================无限分类 begin================**/
/**
 * 无限级分类
 * usage:
 * var json = [
{id: 1,pid:0,text:'1(一级)'},
{id: 2,pid:4,text:'2.1.1(三级)'},
{id: 3,pid:0,text:'2(一级)'},
{id: 4,pid:3,text:'2.1(二级)'},
{id: 5,pid:0,text:'3(一级)'},
{id: 6,pid:5,text:'3.1(二级)'},
{id: 7,pid:0,text:'4(一级)'},
{id: 8,pid:7,text:'4.1(二级)'},
{id: 9,pid:4,text:'2.1.2(三级)'},
{id:11,pid:2,text:'2.1.1.1(四级)'},
{id:12,pid:2,text:'2.1.1.2(四级)'},
{id:13,pid:5,text:'3.2(二级)'},
{id:19,pid:5,text:'3.3(二级)'}
];
console.log(tree(json, 0));
 * @param  {[type]} mid [description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function tree(obj, pid, key) {

    /*  var arr = [];
      for (var i in obj) {
        if (obj[i].pid == pid) {
          obj[i].child = tree(obj, obj[i].id);
          arr.push(obj[i]);
        }
      }
      return arr;*/
    key = key || 'parentid';

    //     console.log('key: ', key);

    var arr = [];
    for (var i = 0, len = obj.length; i < len; i++) {
        //          console.log('obj.parent_id: ', obj[i][key]);
        if (obj[i][key] == pid) {
            obj[i].child = tree(obj, obj[i].id, key);
            arr.push(obj[i]);
        }
    }
    return arr;

}


/**=================无限分类 end================**/



/**=================form-verify begin================**/

/**
 * 判断是否为空
 * @param  {[type]}  v [description]
 * @return {Boolean}   [description]
 */
function isEmpty(v) {
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
}
/**
 * 判断变量是否存在
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
var isExitsVar = function(obj) {
    try {
        if (typeof(obj) == "undefined") {
            return false;
        } else {
            return true;
        }
    } catch (e) {}
    return false;
};
/**
 * 是否是数组
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

/**
 * 是否是字符串
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
var isString = function(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
};
/**
 * 判断元素是否在数组内
 * @param  {[type]} obj [description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
var inArray = function(obj, arr) {
    if (!isArray(arr)) {
        return false;
    }
    var length = arr.length;
    for (var i = 0; i < length; i++) {
        if (arr[i] == obj) return true;
    }
    return false;
};

/**
 * 查找出数组中是否存在undefined,如果存在则返回false
 * @param  {[type]}  arr [description]
 * @return {Boolean}     [description]
 */
var findUndefined = function(arr) {
    if (null === arr || arr.length === 0) {
        return false;
    } else {
        for (var i in arr) {
            if (typeof arr[i]) {
                return false;
            } else {
                return true;
            }
        }
    }
};

/**
 * 用途: 验证ip地址是否正确
 * @param  {[type]}  strIP [description]
 * @return {Boolean}       [description]
 */
function isIP(strIP) {
    if (isEmpty(strIP)) {
        return false;
    }
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g; //匹配IP地址的正则表达式
    if (re.test(strIP)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
            return true;
        }
    }
    return false;
}
/*
用途：检查输入对象的值是否符合整数格式
@param：str 输入的字符串
@return：如果通过验证返回true,否则返回false

*/
function isInteger(str) {
    var regu = /^[-]{0,1}[0-9]{1,}$/;
    return regu.test(str);
}

/**
 * 判断是否是数字
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
function isNumber(obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
}

/**
 * 用途: 检查输对象的值是否是手机号
 * @param {[type]} text [description]
 */
function isMobile(text) {
    var _emp = /^\s*|\s*$/g;
    text = text.replace(_emp, "");
    var _d = /^1[3578][01379]\d{8}$/g;
    var _l = /^1[34578][01256]\d{8}$/g;
    var _y = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g;
    if (_d.test(text)) {
        return 3;
    } else if (_l.test(text)) {
        return 2;
    } else if (_y.test(text)) {
        return 1;
    }
    return 0;
}

/*
用途：检查输入对象的值是否符合E-Mail格式
输入：str 输入的字符串
返回：如果通过验证返回true,否则返回false
*/
function isEmail(str) {
    var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    if (myReg.test(str)) {
        return true
    }
    return false;
}
/*
用途：检查输入字符串是否符合金额格式
格式定义为带小数的正数，小数点后最多三位
输入：s：字符串
返回：如果通过验证返回true,否则返回false
*/
function isMoney(s) {
    var regu = "^[0-9]+[\.][0-9]{0,3}$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否是密码
 * @param  {[type]}  s [description]
 * @return {Boolean}   [description]
 */
function isPasswd(s) {
    var patrn = /^(\w){6,16}$/;
    if (!patrn.exec(s)) return false;
    return true;
}

/**
 * 手机号码校验
 * @return {[type]} [description]
 */
function isPhone(obj) {
    if (!(/^1[3|4|5|7|8]\d{9}$/.test(obj))) {
        return false;
    }
    return true;
}

/**
 * 用途: 获取字符串长度(英文占1个字符，中文汉字占2个字符)
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }
    }
    return len;
}
/**
 * 用途: 去掉字符串两边的空格
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 获取文件后缀名
 * @param  {[type]} filename [description]
 * @return {[type]}          [description]
 */
function getExt(filename) {
    return filename.substring(filename.lastIndexOf('.') + 1);
}

/**
 * 用途: 用于查找出带有aria-required="true"属性的输入框是否有空，返回其index的数组
 * @return {[type]}     [description]
 */
function findEmpty() {
    var arr = [],
        reqInput = $('[aria-required="true"]');
    reqInput.each(function(index) {
        if (isEmpty($(this).val())) {
            arr.push(index)
        }
    });
    return arr;
}


/**=================form-verify end================**/



/**=================device beigin================**/

/**
 * 判断是否是微信浏览器
 * @return {Boolean} [description]
 */
var isWeiXin = function() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
};


/**=================device end================**/

var utils = {};
// 封装本地存储
utils.localStorage = {
    getItem: function(key) {
        if (typeof localStorage === 'object') {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (e) {
                alert('本站无痕浏览模式,请关闭后再试!');
            }
        }
    },
    setItem: function(key, value) {
        if (typeof localStorage === 'object') {
            try {
                return localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                alert('请关闭[无痕浏览]模式后再试!');
            }
        }
    },
    removeItem: function(key) {
        if (typeof localStorage === 'object') {
            try {
                return localStorage.removeItem(key);
            } catch (e) {
                alert('请关闭[无痕浏览]模式后再试!');
            }
        }
    },
    getUseSize: function() {
        if (typeof localStorage === 'object') {
            try {
                return JSON.stringify(localStorage).length;
            } catch (e) {
                alert('请关闭[无痕浏览]模式后再试!');
            }
        }
    }
};

// 封装本地存储
utils.sessionStorage = {
    getItem: function(key) {
        if (typeof sessionStorage === 'object') {
            try {
                return JSON.parse(sessionStorage.getItem(key));
            } catch (e) {
                alert('本站无痕浏览模式,请关闭后再试!');
            }
        }
    },
    setItem: function(key, value) {
        if (typeof sessionStorage === 'object') {
            try {
                return sessionStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                alert('请关闭[无痕浏览]模式后再试!');
            }
        }
    },
    removeItem: function(key) {
        if (typeof sessionStorage === 'object') {
            try {
                return sessionStorage.removeItem(key);
            } catch (e) {
                alert('请关闭[无痕浏览]模式后再试!');
            }
        }
    },
    getUseSize: function() {
        if (typeof sessionStorage === 'object') {
            try {
                return JSON.stringify(sessionStorage).length;
            } catch (e) {
                alert('请关闭[无痕浏览]模式后再试!');
            }
        }
    }
};



/**=================other beigin================**/

Object.keys = Object.keys || function(o) {
    if (o !== Object(o))
        throw new TypeError('Object.keys called on a non-object');
    var k = [],
        p;
    for (p in o)
        if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
    return k;
};

/**=================other beigin================**/




/**=================form endform begin================**/

//获取指定form中的所有的<input><textarea><select>对象
function getElements(formId) {
    var form = document.getElementById(formId);
    var elements = form.elements;
    return elements;
}

//获取单个input中的[name,value]数组
function inputSelector(element) {
    if (element.checked)
        return [element.name, element.value];
}

// 选择框[选择一个]
function selectOne(element) {
    var value = '',
        opt, index = element.selectedIndex;
    if (index >= 0) {
        opt = element.options[index];
        value = opt.value;
        if (!value && !('value' in opt))
            value = opt.text;
    }
    return [element.name, value];
}

// 选择框[选择多个]
function selectMany(element) {
    var value = [];
    for (var i = 0; i < element.length; i++) {
        var opt = element.options[i];
        if (opt.selected) {
            var optValue = opt.value;
            if (!optValue && !('value' in opt))
                optValue = opt.text;
            value.push(optValue);
        }
    }
    return [element.name, value];
}

// 根据不同的input框类型,获取值
function input(element) {

    /*  console.log('tagName: ', element.tagName);
    console.log('tagType: ', element.type);*/

    // console.log('tagType: ', element.type);

    switch (element.type.toLowerCase()) {
        case 'submit':
        case 'hidden':
        case 'password':
        case 'text':
        case 'textarea':
            return [element.name, element.value];
        case 'checkbox':
        case 'radio':
            return inputSelector(element);
        case 'select-one': // 下拉框(单选)
            return selectOne(element);
        case 'select-multiple': // 下拉框(多选)
            return selectMany(element);
    }
    return false;
}

//组合URL
function serializeElement(element) {
    var method = element.tagName.toLowerCase();
    var parameter = input(element);

    // console.log('parameter: ', parameter);

    if (parameter) {
        var key = parameter[0];

        if (key.length === 0) return;

        if (parameter[1].constructor != Array)
            parameter[1] = [parameter[1]];

        var values = parameter[1];
        var new_values = [];
        var results = [];
        for (var i = 0, len = values.length; i < len; i++) {
            if (len > 1) {
                new_values.push(values[i]);
            } else {
                new_values = values[i];
            }
        }
        results.push(key, new_values);
        return results;
    }
}

//调用方法[返回一个对象]
function serializeForm(formId) {
    var elements = getElements(formId);

    var queryComponents = {};

    for (var i = 0, len = elements.length; i < len; i++) {
        var queryComponent = serializeElement(elements[i]);

        // console.log('queryComponent: ', queryComponent);
        if (queryComponent) {
            queryComponents[queryComponent[0]] = queryComponent[1];
        }
    }
    // console.log('queryComponents: ', queryComponents);
    return queryComponents;

}
/**=================form end================**/



/**================返回当前的日期，例如："2016-06-01" ===============**/
function CurentDate() {
    var now = new Date();

    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日

    var nowDate = year + "-";

    if (month < 10) { nowDate += "0"; }

    nowDate += month + "-";

    if (day < 10) { nowDate += "0"; }

    nowDate += day;

    return (nowDate);
}
/**================返回当前的日期end ===============**/



//是否含有全角字符
function hasNoFull(str) {
    for (var i = 0; i < str.length; i++) {
        strCode = str.charCodeAt(i);
        if ((strCode > 65248) || (strCode == 12288)) {
            return false;
        }
    }
    return true;
}
//是否含有非法字符@#$
function hasSpecialChar(str) {
    var txt = new RegExp("[ ,\\`,\\“,\\[,\\],\\-,\\——,\\……,\\、,\\~,\\！,\\!,\\@,\#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\/,\\?,\\？,\\|,\\：,\\:,\\.,\\。,\\<,\\>,\\{,\\},\\(,\\),\\',\\;,\\=,\"]");
    return txt.test(str);
}
//是否含有数字
function hasNum(str) {
    var reg = /[0-9]/;
    return reg.test(str);
}

/**================姓名是否正确  ===============**/
function isCorrectName(name) {
    var msg = '';
    if (!hasNoFull(name)) {
        msg = '姓名不能含有全角字符';
        return msg;
    } else if (hasSpecialChar(name)) {
        msg = '姓名不能含有非法字符，如@#$';
        return msg;
    } else if (hasNum(name)) {
        msg = '姓名不能含有数字';
        return msg;
    } else if (name == 0) {
        msg = '姓名不能为空';
        return msg;
    } else if (strlen(name) < 3 || strlen(name) > 20) {
        msg = '姓名长度3-20';
        return msg;
    }

}

/**================姓名是否正确 end  ===============**/

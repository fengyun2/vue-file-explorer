/*
 * @Author: fengyun2
 * @Date:   2016-07-10 15:14:12
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-07-10 19:08:52
 */
/**
 * 有 bug
 * @type {[type]}
 */
var exec = require('child_process').exec;
exec('npm run build | gulp clean | gulp', function(error, stdout, stderr) {
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});

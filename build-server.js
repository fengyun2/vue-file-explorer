/*
 * @Author: fengyun2
 * @Date:   2016-07-10 15:14:12
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-07-10 18:53:40
 */

var exec = require('child_process').exec;
exec('npm run build | gulp clean | gulp', function(error, stdout, stderr) {
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});

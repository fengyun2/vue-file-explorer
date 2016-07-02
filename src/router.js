/*
 * @Author: fengyun2
 * @Date:   2016-06-07 15:09:16
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-07-02 09:09:06
 */

export function configRouter(router) {
    router.map({
        '/': { // 首页
            name: 'index',
            component: function(resolve) {
                require(['./views/Index'], resolve)
            }
        },
        '/index': { // 首页
            name: 'index',
            component: function(resolve) {
                require(['./views/Index'], resolve)
            }
        }
    })

    router.beforeEach(({ to, from, next }) => {
        console.log('auth: ', to.auth);
        if (to.auth) { // 需要权限验证
            // 判断是否登录, 没有登录执行下面的逻辑
            let redirect = encodeURIComponent(to.path)
            transition.redirect('/login?redirect=' + redirect)
                //redirect 作为参数，登录之后跳转回来
        } else { // 不需要权限验证
            next()
        }

        /*        let toPath = to.path
                let fromPath = from.path
                console.log('to: ' + toPath + ' from: ' + fromPath)
                if (toPath.replace(/[^/]/g, '').length > 1) {
                    console.log('to and from: ', router.app.isIndex)
                    router.app.isIndex = false
                } else {
                    let depath = toPath === '/' || toPath === '/invite' || toPath === '/rank'
                    router.app.isIndex = depath ? 0 : 1
                }
                next()*/
    })

    router.afterEach(function({ to }) {
        console.log(`成功浏览到: ${to.path}`)
            // $.refreshScroller()
    })
}

// 引入pinia
import pinia from '@/store';
import { useUserInfoStore } from '@/store/modules/user'
const userInfoStore = useUserInfoStore(pinia)
// 引入路由
import router from '@/router'

router.beforeEach((to, from ,next) => {
    // matched：是父路由和子路由组成的数组
    let isLogin = to.matched.some(item => item.meta.isLogin)
    if (isLogin) {
        let token = userInfoStore.userInfo.token
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})
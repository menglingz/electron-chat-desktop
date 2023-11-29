import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    // 滚动行为
    scrollBehavior() {
        return {
            top: 0,
            left: 0
        }
    },
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login/index.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/Register/index.vue')
        },
        {
            path: '/',
            component: () => import('@/views/Layout/index.vue'),
            redirect: '/message',
            children: [
                {
                    path: 'message',
                    name: 'message',
                    component: () => import('@/views/Layout/Message/index.vue'),
                    meta: {
                        isLogin: true
                    }
                },
                {
                    path: 'contact',
                    name: 'contact',
                    component: () => import('@/views/Layout/Contact/index.vue'),
                    meta: {
                        isLogin: true
                    }
                },
                {
                    path: 'space',
                    name: 'space',
                    component: () => import('@/views/Layout/Space/index.vue'),
                    meta: {
                        isLogin: true
                    }
                },
                {
                    path: 'notes',
                    name: 'notes',
                    component: () => import('@/views/Layout/Notes/index.vue'),
                    meta: {
                        isLogin: true
                    }
                }
            ]
        },
        {
            path: '/video',
            name: 'video',
            component: () => import('@/views/Video/index.vue')
        },
        {
            path: '/edit/group',
            name: 'edit',
            component: () => import('@/views/Layout/Message/Edit/index.vue'),
            meta: {
                isLogin: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/About/index.vue')
        },
        {
            path: '/webview',
            name: 'webview',
            component: () => import('@/views/WebView/index.vue')
        },
        // 语音通话
        {
            path: '/telephone/voice',
            name: 'telephoneVoice',
            component: () => import('@/views/Telephone/Voice/index.vue'),
            meta: {
                isLogin: true
            }
        },
        // 视频通话
        {
            path: '/telephone/video',
            name: 'telephoneVideo',
            component: () => import('@/views/Telephone/Video/index.vue'),
            meta: {
                isLogin: true
            }
        },
        // 屏幕共享
        {
            path: '/telephone/screen',
            name: 'telephoneScreen',
            component: () => import('@/views/Telephone/ScreenShare/index.vue'),
            meta: {
                isLogin: true
            }
        }
    ]
})
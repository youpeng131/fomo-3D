import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Help from '@/components/help/help'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/',
            name: 'help',
            component: Help
        },
        {
            path: '*',
            component: {
                template: '<h1>404</h1>'
            }
        }
    ]
})

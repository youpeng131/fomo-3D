import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Help from '@/components/help/help'
import Rank from '@/components/rank/rank'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/fomo/'
        },
        {
            path: '/fomo/:id?',
            name: 'fomo',
            component: Home
        },
        {
            path: '/help',
            name: 'help',
            component: Help
        },
        {
            path: '/rank',
            name: 'rank',
            component: Rank
        },
        {
            path: '*',
            component: {
                template: '<h1>404</h1>'
            }
        }
    ]
})

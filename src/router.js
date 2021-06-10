import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './auth/Register'
import Login from './auth/Login'
import store from './store.js'
import dashboard from '@/layouts/dashboard.vue'


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/about',
        name: 'about',
        component: () => import('./views/About.vue')
    }, {
        path: '/projects',
        name: 'projects',
        component: () => import('./views/Projects.vue')
    }, {
        path: '/contact',
        name: 'contact',
        component: () => import('./views/Contact.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard,
    }
]


const router = new Router({
    history: true,
    mode: 'history',
    routes,
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
            next('/login')
    } else {
        next()
    }
})


export default router



import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/home/Home.vue'
import test1 from '@/views/test/Test1.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '/',
            redirect: "/home",
            children:[
                {
                    path: '/home',
                    name: 'home',
                    component: HomeView
                },
            ]
        },
        {
            path: "/test",
            redirect: "/test1",
            children: [
                {
                    path: '/test/test1',
                    name: 'test1',
                    component: test1
                },
            ]
        }
    ]
})

export default router

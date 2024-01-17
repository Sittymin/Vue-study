import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/homePage.vue'
import DaisyUIPage from '@/views/daisyUI.vue'
import ElementPlusPage from '@/views/elementPlus.vue'
import DaisyUIRead from '@/components/daisyUI/ReadPage.vue'
import elementPlusRead from '@/components/elementPlus/ReadPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/daisyui',
    name: 'DaisyUI',
    component: DaisyUIPage
  },
  {
    path: '/elementplus',
    name: 'ElementPlus',
    component: ElementPlusPage
  },
  {
    path: '/daisyui/read',
    name: 'DaisyUIRead',
    component: DaisyUIRead
  },
  {
    path: '/elementplus/read',
    name: 'elementPlusRead',
    component: elementPlusRead
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

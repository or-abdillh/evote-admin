import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
  	path: '/DPT',
  	name: 'DPT',
  	component: () => import('@/views/DPT.vue')
  },
  {
     path: '/newUser',
     name: 'Tambah Pemilih',
     component: () => import('@/views/NewUser.vue')
  },
  {
     path: '/candidates',
     name: 'Kandidat',
     component: () => import('@/views/Candidates.vue')
  },
  {
  	path: '/newCandidate',
  	name: 'Tambah Paslon',
  	component: () => import('@/views/NewCandidate.vue')
  },
  {
     path: '/event',
     name: 'Kelola Acara',
     component: () => import('@/views/Event.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/helper/http'
import ajax from '@/helper/ajax'
import { darkModeKey } from '@/config.js'

import './css/main.css'

/* Fetch sample data */
store.dispatch('fetch', 'clients')
store.dispatch('fetch', 'history')

/* Dark mode */
const localStorageDarkModeValue = localStorage.getItem(darkModeKey)

if ((localStorageDarkModeValue === null && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorageDarkModeValue === '1') {
  store.dispatch('darkMode')
}

/* Default title tag */
const defaultDocumentTitle = 'Admin Electronic Vote System HIMA TI Polihasnur'

//Navigation Guard
router.beforeEach( async (to, from) => {
   /* Collapse mobile aside menu on route change */
  store.dispatch('asideMobileToggle', false)
  store.dispatch('asideLgToggle', false)
  try {
    const res = await ajax.get('/admin/auth')
  } catch(err) {
    if (err?.response && to.name !== 'login') {
      console.log( err?.response?.data?.results?.message )
      return { name: 'login' }
    }
    else if (err?.request) console.log( err?.request?.data )
  }
  // try {
  //   const res = await ajax.get('/admin/auth')
  //   console.log(res?.data)
  //   // User has authenticated
	// 	if ( res?.data?.status ) {
  //     if ( to.name === 'login' ) 
  //     else next()
  //   }
  // } catch(err) {
  //   if (err?.response) {
  //     if ( to.name !== 'login' ) {
  //       router.push({ name: 'login' })
  //       next()
  //     }
  //   }
  // }
})

router.afterEach(to => {
  /* Set document title from route meta */
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }

  /* Full screen mode */
  store.dispatch('fullScreenToggle', !!to.meta.fullScreen)
})

createApp(App).use(store).use(router).mount('#app')

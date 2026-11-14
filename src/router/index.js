// import { createRouter, createWebHistory } from 'vue-router'
// // import HomeView from '../views/HomeView.vue'

// import HomeView from '../views/HomeView.vue'
// import ServicePage from '../views/ServicePage.vue'
// import Impressum from '../views/Impressum.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   scrollBehavior() {
//     return { top: 0 }
//   },
//   routes: [
//     { path: '/', name: 'home', component: HomeView },
//     { path: '/impressum', name: 'impressum', component: Impressum },
//     { path: '/:slug', name: 'service', component: ServicePage },
//   ],
// })

// export default router



import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicePage from '../views/ServicePage.vue'
import PlaceholderPage from '../views/PlaceholderPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/fuhrpark', component: PlaceholderPage, meta: { title: 'Fuhrpark' } },
    { path: '/arbeiten', component: PlaceholderPage, meta: { title: 'Arbeiten' } },
    { path: '/kontakt', component: PlaceholderPage, meta: { title: 'Kontakt' } },
    { path: '/:slug', name: 'service', component: ServicePage },
  ],
})

export default router

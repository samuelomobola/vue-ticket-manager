import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import AppLanding from '@/components/pages/AppLanding.vue'
import AppAuth from '@/components/pages/AppAuth.vue'
import AppDashboard from '@/components/pages/AppDashboard.vue'
import AppTickets from '@/components/pages/AppTickets.vue'

const routes = [
  { path: '/', name: 'Landing', component: AppLanding },
  { path: '/auth/login', name: 'Login', component: AppAuth, props: { type: 'login' } },
  { path: '/auth/signup', name: 'Signup', component: AppAuth, props: { type: 'signup' } },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: AppDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: AppTickets,
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Global navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Load user state from localStorage on refresh
  if (!authStore.user) authStore.loadUser()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router

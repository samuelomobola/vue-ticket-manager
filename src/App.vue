<template>
  <div>
    <!-- Handles loading state globally -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      Loading...
    </div>

    <div v-else>
      <!-- Router view displays matched route component -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from './utils/auth'

// Setup router instance
const router = useRouter()
const loading = ref(true)
const auth = ref(false)

onMounted(() => {
  // Simulate auth check like your React useEffect
  auth.value = isAuthenticated()
  loading.value = false
})

// Watch for navigation and handle protected routes
router.beforeEach((to, from, next) => {
  const protectedRoutes = ['/dashboard', '/tickets']
  const loggedIn = isAuthenticated()

  if (protectedRoutes.includes(to.path) && !loggedIn) {
    // Redirect to login if not authenticated
    next('/auth/login')
  } else {
    next()
  }
})
</script>

<style scoped>
/* optional: same as React’s Tailwind class usage */
</style>

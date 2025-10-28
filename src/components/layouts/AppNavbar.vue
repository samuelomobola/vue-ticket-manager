<template>
  <nav class="sticky top-0 z-50 bg-white shadow-sm">
    <div class="max-w-[1440px] mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <span class="ml-3 text-xl font-bold text-gray-900">PR!MA Ticket Manager</span>
        </router-link>

        <!-- Navigation Links -->
        <div class="flex items-center !space-x-5">
          <template v-if="authenticated">
            <router-link to="/dashboard" class="font-medium text-gray-600 transition-colors hover:text-gray-900">
              Dashboard
            </router-link>
            <router-link to="/tickets" class="font-medium text-gray-600 transition-colors hover:text-gray-900">
              Tickets
            </router-link>
            <span class="hidden text-lg font-bold text-blue-500 sm:block">
              {{ user?.name || user?.email }}
            </span>
            <button @click="handleLogout"
              class="px-4 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg !hover:bg-gray-200">
              Logout
            </button>
          </template>
          <template v-else>
            <router-link to="/auth/login" class="font-medium text-gray-600 transition-colors hover:text-gray-900">
              Login
            </router-link>
            <router-link to="/auth/signup"
              class="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
              Sign Up
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated, logout, getCurrentUser } from '../../utils/auth'

const router = useRouter()

// Reactive state
const authenticated = ref(isAuthenticated())
const userData = ref(getCurrentUser())

// Computed property for reactive user info
const user = computed(() => (authenticated.value ? userData.value : null))

// Logout handler
const handleLogout = () => {
  logout()
  authenticated.value = false
  userData.value = null
  router.push('/')
}
</script>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppNavbar from '@/components/layouts/AppNavbar.vue'
import AppFooter from '@/components/layouts/AppFooter.vue'
import { login, signup } from '@/utils/auth'
import { VSnackbar, VAlert } from 'vuetify/components'

// Props
const props = defineProps({
  type: { type: String, default: 'login' },
})

// Router
const router = useRouter()
const isLogin = computed(() => props.type === 'login')

// Reactive State
const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const errors = ref({})
const toast = ref({
  open: false,
  message: '',
  severity: 'error',
})

// Handlers
const handleChange = (key, value) => {
  formData.value[key] = value
  if (errors.value[key]) delete errors.value[key]
}

const validate = () => {
  const newErrors = {}

  if (!isLogin.value && !formData.value.name.trim()) {
    newErrors.name = 'Name is required'
  }

  if (!formData.value.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    newErrors.email = 'Email is invalid'
  }

  if (!formData.value.password) {
    newErrors.password = 'Password is required'
  } else if (formData.value.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
  }

  if (!isLogin.value) {
    if (!formData.value.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.value.password !== formData.value.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = (e) => {
  e.preventDefault()

  if (!validate()) {
    toast.value = {
      open: true,
      message: 'Please fix the errors in the form',
      severity: 'error',
    }
    return
  }

  const result = isLogin.value
    ? login(formData.value.email, formData.value.password)
    : signup(formData.value.email, formData.value.password, formData.value.name)

  if (result.success) {
    toast.value = {
      open: true,
      message: `${isLogin.value ? 'Login' : 'Signup'} successful! Redirecting...`,
      severity: 'success',
    }
    setTimeout(() => router.push('/tickets'), 1500) // <-- changed path here
  } else {
    toast.value = {
      open: true,
      message: result.error,
      severity: 'error',
    }
  }
}

</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <AppNavbar />

    <div class="relative flex items-center justify-center flex-1 px-4 py-12 overflow-hidden">
      <div class="absolute w-[300px] h-[300px] bg-blue-500 rounded-full opacity-5 -top-20 -right-20"></div>
      <div class="absolute w-[250px] h-[250px] bg-indigo-500 rounded-full opacity-5 -bottom-20 -left-20"></div>

      <div class="!relative !z-20 w-full max-w-md">
        <div class="p-8 bg-white shadow-lg rounded-xl">
          <div class="mb-6 text-center">
            <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 class="mb-2 text-3xl font-bold text-gray-900">
              {{ isLogin ? 'Welcome Back' : 'Create Account' }}
            </h2>
            <p class="text-gray-600">
              {{ isLogin
                ? 'Login to manage your tickets'
                : 'Sign up to start managing tickets' }}
            </p>
          </div>

          <form @submit="handleSubmit" class="!space-y-4">
            <!-- Name (Signup only) -->
            <div v-if="!isLogin">
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Full Name <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="formData.name" @input="handleChange('name', $event.target.value)"
                class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.name }" placeholder="John Doe" />
              <p v-if="errors.name" class="mt-1 text-sm text-red-500">
                {{ errors.name }}
              </p>
            </div>


            <!-- Email -->
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Email Address <span class="text-red-500">*</span>
              </label>
              <input type="email" v-model="formData.email" @input="handleChange('email', $event.target.value)"
                class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.email }" placeholder="you@example.com" />
              <p v-if="errors.email" class="mt-1 text-sm text-red-500">
                {{ errors.email }}
              </p>
            </div>



            <!-- Password -->
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Password <span class="text-red-500">*</span>
              </label>
              <input type="password" v-model="formData.password" @input="handleChange('password', $event.target.value)"
                class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.password }" placeholder="••••••••" />
              <p v-if="errors.password" class="mt-1 text-sm text-red-500">
                {{ errors.password }}
              </p>
            </div>


            <!-- Confirm Password (Signup only) -->
            <div v-if="!isLogin">
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Confirm Password <span class="text-red-500">*</span>
              </label>
              <input type="password" v-model="formData.confirmPassword"
                @input="handleChange('confirmPassword', $event.target.value)"
                class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.confirmPassword }" placeholder="••••••••" />
              <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-500">
                {{ errors.confirmPassword }}
              </p>
            </div>


            <button type="submit"
              class="w-full py-3 mt-6 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
              {{ isLogin ? 'Login' : 'Sign Up' }}
            </button>
          </form>


          <!-- Switch Auth Type -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
              <RouterLink :to="isLogin ? '/auth/signup' : '/auth/login'"
                class="font-medium text-blue-600 hover:text-blue-700">
                {{ isLogin ? 'Sign up' : 'Login' }}
              </RouterLink>
            </p>
          </div>

          <!-- Demo Credentials -->
          <div v-if="isLogin" class="p-4 mt-4 border border-blue-200 rounded-lg bg-blue-50">
            <p class="mb-2 text-sm font-semibold text-gray-700">
              Demo Credentials:
            </p>
            <div class="space-y-1 text-sm text-gray-600">
              <p><strong>Email:</strong> admin@example.com</p>
              <p><strong>Password:</strong> password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />

    <!-- Snackbar / Alert -->
    <VSnackbar v-model="toast.open" location="top" timeout="4000">
      <VAlert :type="toast.severity" prominent border="start" class="w-full">
        {{ toast.message }}
      </VAlert>
    </VSnackbar>
  </div>
</template>

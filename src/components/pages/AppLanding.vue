<script setup>
import AppNavbar from '../layouts/AppNavbar.vue'
import AppFooter from '../layouts/AppFooter.vue'
import { useRouter } from 'vue-router'
import wave from '../../assets/wave.svg'



const router = useRouter()

const goToSignup = () => router.push('/auth/signup')
const goToLogin = () => router.push('/auth/login')
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50 ">
    <!-- Navbar -->
    <AppNavbar />

    <!-- Hero Section -->
    <section class="relative flex-1 overflow-hidden bg-linear-to-br from-blue-50 to-indigo-50">
      <!-- Decorative Circles -->
      <div
        class="absolute w-[400px] h-[400px] bg-blue-500 rounded-full opacity-10 -top-32 -right-20 pointer-events-none" />
      <div
        class="absolute w-[300px] h-[300px] bg-indigo-500 rounded-full opacity-10 top-1/2 left-0 -translate-x-1/2 pointer-events-none" />

      <v-container class="relative z-10 py-20 text-center md:py-32">
        <h1 class="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
          Ticket Manager Pro
        </h1>
        <p class="max-w-3xl mx-auto mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
          Streamline your workflow with our powerful ticket management system.
          Create, track, and resolve tickets with ease. Stay organized and boost productivity.
        </p>

        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <v-btn color="blue" class="px-8 py-3 font-semibold text-white rounded-lg shadow-md hover:bg-blue-700"
            @click="goToSignup">
            Get Started
          </v-btn>

          <v-btn variant="outlined" color="blue"
            class="px-8 py-3 font-semibold bg-white border-2 border-blue-600 rounded-lg shadow-md hover:bg-gray-50"
            @click="goToLogin">
            Login
          </v-btn>
        </div>
      </v-container>

      <!-- Wave SVG -->
      <div class="absolute bottom-0 left-0 w-full">
        <img :src="wave" alt="wave" class="object-cover w-full h-24 md:h-32" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <v-container>
        <h2 class="mb-12 text-3xl font-bold text-center text-gray-900 md:text-4xl">
          Why Choose PR!MA Ticket Manager?
        </h2>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <!-- Feature 1 -->
          <div class="p-8 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
            <div class="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-lg">
              <v-icon color="blue">mdi-clipboard-list-outline</v-icon>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900">Easy Tracking</h3>
            <p class="text-gray-600">
              Keep all your tickets organized in one place. Track progress from creation to resolution.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="p-10 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
            <div class="flex items-center justify-center w-12 h-12 mb-4 bg-green-100 rounded-lg">
              <v-icon color="green">mdi-flash</v-icon>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900">Lightning Fast</h3>
            <p class="text-gray-600">
              Built for speed and efficiency. Create and update tickets in seconds, not minutes.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="p-8 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
            <div class="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 rounded-lg">
              <v-icon color="purple">mdi-shield-check-outline</v-icon>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900">Secure & Reliable</h3>
            <p class="text-gray-600">
              Your data is protected with industry-standard security. Access from anywhere, anytime.
            </p>
          </div>
        </div>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="relative py-20 overflow-hidden bg-linear-to-r from-blue-600 to-indigo-600 ">
      <div
        class="absolute w-[250px] h-[250px] bg-white rounded-full opacity-10 bottom-0 right-10 pointer-events-none" />

      <v-container class="relative z-10 text-center">
        <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
          Ready to Get Started?
        </h2>
        <p class="max-w-2xl mx-auto mb-8 text-xl text-blue-100">
          Join thousands of teams already using Ticket Manager to streamline their workflow.
        </p>

        <v-btn color="white" class="px-8 py-3 font-semibold text-blue-600 rounded-lg shadow-lg hover:bg-gray-100"
          @click="goToSignup">
          Create Free Account
        </v-btn>
      </v-container>
    </section>
    <br />

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

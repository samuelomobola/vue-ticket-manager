<script setup>
import AppNavbar from '../layouts/AppNavbar.vue'
import AppFooter from '../layouts/AppFooter.vue'
import { useRouter } from 'vue-router'
import wave from '../../../../assets/wave.svg'



const router = useRouter()

const goToSignup = () => router.push('/auth/signup')
const goToLogin = () => router.push('/auth/login')
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col ">
    <!-- Navbar -->
    <AppNavbar />

    <!-- Hero Section -->
    <section class="relative bg-linear-to-br from-blue-50 to-indigo-50 overflow-hidden flex-1">
      <!-- Decorative Circles -->
      <div
        class="absolute w-[400px] h-[400px] bg-blue-500 rounded-full opacity-10 -top-32 -right-20 pointer-events-none" />
      <div
        class="absolute w-[300px] h-[300px] bg-indigo-500 rounded-full opacity-10 top-1/2 left-0 -translate-x-1/2 pointer-events-none" />

      <v-container class="py-20 md:py-32 relative z-10 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Ticket Manager Pro
        </h1>
        <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
          Streamline your workflow with our powerful ticket management system.
          Create, track, and resolve tickets with ease. Stay organized and boost productivity.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <v-btn color="blue" class="text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700"
            @click="goToSignup">
            Get Started
          </v-btn>

          <v-btn variant="outlined" color="blue"
            class="bg-white hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg border-2 border-blue-600 shadow-md"
            @click="goToLogin">
            Login
          </v-btn>
        </div>
      </v-container>

      <!-- Wave SVG -->
      <div class="absolute bottom-0 left-0 w-full">
        <img :src="wave" alt="wave" class="w-full h-24 md:h-32 object-cover" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <v-container>
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose PR!MA Ticket Manager?
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <v-icon color="blue">mdi-clipboard-list-outline</v-icon>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Easy Tracking</h3>
            <p class="text-gray-600">
              Keep all your tickets organized in one place. Track progress from creation to resolution.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white rounded-xl shadow-md p-10 hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <v-icon color="green">mdi-flash</v-icon>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p class="text-gray-600">
              Built for speed and efficiency. Create and update tickets in seconds, not minutes.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <v-icon color="purple">mdi-shield-check-outline</v-icon>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
            <p class="text-gray-600">
              Your data is protected with industry-standard security. Access from anywhere, anytime.
            </p>
          </div>
        </div>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="relative py-20 bg-linear-to-r from-blue-600 to-indigo-600 overflow-hidden  ">
      <div
        class="absolute w-[250px] h-[250px] bg-white rounded-full opacity-10 bottom-0 right-10 pointer-events-none" />

      <v-container class="text-center relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of teams already using Ticket Manager to streamline their workflow.
        </p>

        <v-btn color="white" class="text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100"
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

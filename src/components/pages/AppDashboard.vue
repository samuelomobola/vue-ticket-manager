<script setup>
import AppNavbar from '@/components/layouts/AppNavbar.vue'
import AppFooter from '@/components/layouts/AppFooter.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import { getTicketStats } from '@/utils/storage'
import { RouterLink } from 'vue-router'

const stats = getTicketStats()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppNavbar />

    <main class="max-w-[1440px] mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p class="text-gray-600">
          Overview of your ticket management system
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Tickets" :value="stats.total" bgColor="bg-blue-100" iconColor="text-blue-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </StatCard>

        <StatCard title="Open Tickets" :value="stats.open" bgColor="bg-green-100" iconColor="text-green-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </StatCard>

        <StatCard title="In Progress" :value="stats.in_progress" bgColor="bg-amber-100" iconColor="text-amber-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </StatCard>

        <StatCard title="Closed Tickets" :value="stats.closed" bgColor="bg-gray-100" iconColor="text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </StatCard>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-md p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RouterLink to="/tickets"
            class="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">
                View All Tickets
              </h3>
              <p class="text-sm text-gray-600">
                Manage and track your tickets
              </p>
            </div>
            <svg class="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </RouterLink>

          <RouterLink to="/tickets?action=create"
            class="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">
                Create New Ticket
              </h3>
              <p class="text-sm text-gray-600">
                Add a new ticket to the system
              </p>
            </div>
            <svg class="w-6 h-6 text-green-600 group-hover:translate-x-1 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </RouterLink>
        </div>
      </div>

      <!-- Activity Section -->
      <div class="mt-8 bg-white rounded-xl shadow-md p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <p class="text-gray-600">
          You have {{ stats.open }} open tickets and
          {{ stats.in_progress }} tickets in progress.
          Keep up the great work managing your tasks!
        </p>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

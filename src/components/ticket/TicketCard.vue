<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  ticket: { type: Object, required: true },
  onEdit: { type: Function, required: true },
  onDelete: { type: Function, required: true },
})

// Status and Priority Config
const statusConfig = {
  open: { bg: 'bg-green-100', text: 'text-green-600', label: 'Open' },
  in_progress: { bg: 'bg-amber-100', text: 'text-amber-600', label: 'In Progress' },
  closed: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Closed' },
}

const priorityConfig = {
  low: { color: 'text-blue-600', label: 'Low' },
  medium: { color: 'text-yellow-600', label: 'Medium' },
  high: { color: 'text-red-600', label: 'High' },
}

// Computed values for status and priority
const status = computed(() => statusConfig[props.ticket.status] || statusConfig.open)
const priority = computed(() => priorityConfig[props.ticket.priority] || priorityConfig.medium)

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Handlers
const handleEdit = () => props.onEdit(props.ticket)
const handleDelete = () => props.onDelete(props.ticket)
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <span :class="`${status.bg} ${status.text} text-xs font-semibold px-3 py-1 rounded-full`">
        {{ status.label }}
      </span>
      <div class="flex space-x-2">
        <button @click="handleEdit" class="text-blue-600 hover:text-blue-700 transition-colors" title="Edit">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button @click="handleDelete" class="text-red-600 hover:text-red-700 transition-colors" title="Delete">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
      {{ ticket.title }}
    </h3>

    <!-- Description -->
    <p v-if="ticket.description" class="text-gray-600 text-sm mb-4 line-clamp-3">
      {{ ticket.description }}
    </p>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
      <div class="flex items-center space-x-1">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-xs text-gray-500">{{ formatDate(ticket.createdAt) }}</span>
      </div>

      <span v-if="ticket.priority" :class="`text-xs font-medium ${priority.color}`">
        {{ priority.label }} Priority
      </span>
    </div>
  </div>
</template>

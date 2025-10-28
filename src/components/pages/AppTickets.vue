<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <main class="flex-1 max-w-[1440px] mx-auto px-4 py-8 w-full">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Ticket Management
          </h1>
          <p class="text-gray-600">Create, view, edit, and delete your tickets</p>
        </div>
        <button @click="showForm = true"
          class="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md flex items-center justify-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Ticket</span>
        </button>
      </div>

      <!-- Filter Tabs -->
      <div class="bg-white rounded-xl shadow-md p-4 mb-6">
        <div class="flex flex-wrap gap-2">
          <button v-for="status in ['all', 'open', 'in_progress', 'closed']" :key="status" @click="filter = status"
            :class="filterButtonClass(status)">
            {{ statusLabel(status) }} ({{ ticketsCount(status) }})
          </button>
        </div>
      </div>

      <!-- Tickets List -->
      <div v-if="filteredTickets.length === 0" class="bg-white rounded-xl shadow-md p-12 text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No tickets found</h3>
        <p class="text-gray-600 mb-4">
          {{ filter === 'all' ? 'Get started by creating your first ticket' : `No tickets with status
          "${filter.replace('_', ' ')}"` }}
        </p>
        <button v-if="filter === 'all'" @click="showForm = true"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
          Create Ticket
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TicketCard v-for="ticket in filteredTickets" :key="ticket.id" :ticket="ticket" @edit="handleEdit"
          @delete="handleDelete" />
      </div>
    </main>

    <Footer />

    <!-- Create/Edit Ticket Modal -->
    <TicketForm v-if="showForm" :ticket="editingTicket" @submit="editingTicket ? handleUpdate : handleCreate"
      @cancel="handleCloseForm" />

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteConfirm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Confirm Delete</h2>
        <p class="mb-6">Are you sure you want to delete the ticket "{{ deleteConfirm.title }}"? This action cannot be
          undone.</p>
        <div class="flex justify-end gap-2">
          <button @click="deleteConfirm = null" class="px-4 py-2 rounded-lg border">Cancel</button>
          <button @click="confirmDelete" class="px-4 py-2 rounded-lg bg-red-600 text-white">Delete</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast.open" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div :class="toastClass">
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppNavbar from '../layouts/AppNavbar.vue'
import AppFooter from '../layouts/AppFooter.vue'
import TicketCard from '../ticket/TicketCard.vue'
import TicketForm from '../ticket/TicketForm.vue'
import { getTickets, createTicket, updateTicket, deleteTicket } from '../../utils/storage'

const tickets = ref([])
const showForm = ref(false)
const editingTicket = ref(null)
const deleteConfirm = ref(null)
const filter = ref('all')

const toast = ref({
  open: false,
  message: '',
  severity: 'success',
})

// Load tickets on mount
onMounted(() => {
  loadTickets()
})

const loadTickets = () => {
  tickets.value = getTickets()
}

// Filtered tickets
const filteredTickets = computed(() => {
  return tickets.value.filter((t) => (filter.value === 'all' ? true : t.status === filter.value))
})

// Helpers
const ticketsCount = (status) => {
  if (status === 'all') return tickets.value.length
  return tickets.value.filter((t) => t.status === status).length
}

const statusLabel = (status) => {
  switch (status) {
    case 'all': return 'All'
    case 'open': return 'Open'
    case 'in_progress': return 'In Progress'
    case 'closed': return 'Closed'
  }
}

const filterButtonClass = (status) => {
  const base = 'px-4 py-2 rounded-lg font-medium transition-colors'
  if (filter.value === status) {
    switch (status) {
      case 'all': return base + ' bg-blue-600 text-white'
      case 'open': return base + ' bg-green-600 text-white'
      case 'in_progress': return base + ' bg-amber-600 text-white'
      case 'closed': return base + ' bg-gray-600 text-white'
    }
  } else {
    return base + ' bg-gray-100 text-gray-700 hover:bg-gray-200'
  }
}

// CRUD Handlers
const handleCreate = (data) => {
  try {
    createTicket(data)
    loadTickets()
    showForm.value = false
    showToast('Ticket created successfully!', 'success')
  } catch (e) {
    console.error(e)
    showToast('Failed to create ticket', 'error')
  }
}

const handleUpdate = (data) => {
  try {
    updateTicket(editingTicket.value.id, data)
    loadTickets()
    editingTicket.value = null
    showForm.value = false
    showToast('Ticket updated successfully!', 'success')
  } catch (e) {
    console.error(e)
    showToast('Failed to update ticket', 'error')
  }
}

const handleDelete = (ticket) => {
  deleteConfirm.value = ticket
}

const confirmDelete = () => {
  try {
    deleteTicket(deleteConfirm.value.id)
    loadTickets()
    deleteConfirm.value = null
    showToast('Ticket deleted successfully!', 'success')
  } catch (e) {
    console.error(e)
    showToast('Failed to delete ticket', 'error')
  }
}

const handleEdit = (ticket) => {
  editingTicket.value = ticket
  showForm.value = true
}

const handleCloseForm = () => {
  showForm.value = false
  editingTicket.value = null
}

const showToast = (message, severity = 'success') => {
  toast.value = { open: true, message, severity }
  setTimeout(() => {
    toast.value.open = false
  }, 4000)
}

const toastClass = computed(() => {
  const base = 'px-6 py-3 rounded-lg shadow-md text-white font-semibold transition'
  switch (toast.value.severity) {
    case 'success': return base + ' bg-green-600'
    case 'error': return base + ' bg-red-600'
    default: return base + ' bg-gray-600'
  }
})
</script>

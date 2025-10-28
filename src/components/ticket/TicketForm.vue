<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  ticket: { type: Object, default: null },
  onSubmit: { type: Function, required: true },
  onCancel: { type: Function, required: true },
})

// Reactive form data and errors
const formData = ref({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium',
})

const errors = ref({})

// Watch for ticket prop changes to populate form
watch(
  () => props.ticket,
  (newTicket) => {
    if (newTicket) {
      formData.value = {
        title: newTicket.title || '',
        description: newTicket.description || '',
        status: newTicket.status || 'open',
        priority: newTicket.priority || 'medium',
      }
    }
  },
  { immediate: true }
)

// Handlers
const handleChange = (key, value) => {
  formData.value[key] = value
  if (errors.value[key]) delete errors.value[key]
}

// Validation
const validate = () => {
  const newErrors = {}

  if (!formData.value.title.trim()) {
    newErrors.title = 'Title is required'
  } else if (formData.value.title.length > 100) {
    newErrors.title = 'Title must be less than 100 characters'
  }

  const validStatuses = ['open', 'in_progress', 'closed']
  if (!validStatuses.includes(formData.value.status)) {
    newErrors.status = 'Status must be: open, in_progress, or closed'
  }

  if (formData.value.description && formData.value.description.length > 500) {
    newErrors.description = 'Description must be less than 500 characters'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = (e) => {
  e.preventDefault()
  if (!validate()) return
  props.onSubmit(formData.value)
}
</script>

<template>
  <form @submit="handleSubmit" class="space-y-4 mt-4">
    <!-- Title -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Title <span class="text-red-500">*</span>
      </label>
      <input type="text" v-model="formData.title" @input="handleChange('title', $event.target.value)"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        placeholder="Enter ticket title" />
      <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea v-model="formData.description" @input="handleChange('description', $event.target.value)" rows="4"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
        placeholder="Enter ticket description (optional)"></textarea>
      <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
    </div>

    <!-- Status -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Status <span class="text-red-500">*</span>
      </label>
      <select v-model="formData.status" @change="handleChange('status', $event.target.value)"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white">
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
    </div>

    <!-- Priority -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
      <select v-model="formData.priority" @change="handleChange('priority', $event.target.value)"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <!-- Buttons -->
    <div class="flex gap-3 pt-4">
      <button type="submit"
        class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        {{ ticket ? 'Update Ticket' : 'Create Ticket' }}
      </button>
      <button type="button" @click="props.onCancel"
        class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors">
        Cancel
      </button>
    </div>
  </form>
</template>

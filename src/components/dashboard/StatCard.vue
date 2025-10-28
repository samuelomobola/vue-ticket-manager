<script setup>
defineProps({
  title: String,
  value: [String, Number],
  bgColor: String,
  iconColor: String,
})
</script>

<template>
  <div class="rounded-xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition" :class="bgColor">
    <div>
      <h3 class="text-gray-700 text-sm font-medium mb-1">{{ title }}</h3>
      <p class="text-3xl font-bold text-gray-900">{{ value }}</p>
    </div>
    <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="iconColor">
      <slot></slot>

    </div>
  </div>
</template>

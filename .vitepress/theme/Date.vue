<template>
  <dl>
    <dt class="sr-only">Published on</dt>
    <dd class="text-base leading-6 font-medium text-gray-500">
      <time :datetime="date">{{ format(date) }}</time>
    </dd>
  </dl>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  date: String
})

function format(date) {
  const d = new Date(date)
  d.setHours(24)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
<script setup lang="ts">
defineProps<{
  date: string;
  tags?: string[];
}>();
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
    <time :datetime="date">{{ formatDate(date) }}</time>
    <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-2">
      <NuxtLink
        v-for="tag in tags"
        :key="tag"
        :to="`/tags/${tag}`"
        class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        #{{ tag }}
      </NuxtLink>
    </div>
  </div>
</template>

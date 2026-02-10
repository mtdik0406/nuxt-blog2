<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
  >
    <div class="max-w-4xl mx-auto px-4 py-8">
      <p class="text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {{ currentYear }} Blog. All rights reserved.
      </p>
    </div>
  </footer>
</template>

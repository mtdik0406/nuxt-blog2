<script setup lang="ts">
defineProps<{
  post: {
    path: string;
    title: string;
    description?: string;
    date: string;
    tags?: string[];
  };
}>();
</script>

<template>
  <article
    class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
  >
    <NuxtLink :to="post.path" class="block group">
      <h2
        class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
      >
        {{ post.title }}
      </h2>
      <p
        v-if="post.description"
        class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2"
      >
        {{ post.description }}
      </p>
    </NuxtLink>
    <PostMeta :date="post.date" :tags="post.tags" />
  </article>
</template>

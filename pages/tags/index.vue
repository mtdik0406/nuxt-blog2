<script setup lang="ts">
useHead({
  title: "Tags - Blog",
});

const { data: posts } = await useAsyncData("all-posts-tags", () =>
  queryCollection("blog").select("tags").all(),
);

const tags = computed(() => {
  const tagCount = new Map<string, number>();
  posts.value?.forEach((post) => {
    post.tags?.forEach((tag: string) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
});
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Tags</h1>

    <div v-if="tags.length > 0" class="flex flex-wrap gap-3">
      <NuxtLink
        v-for="tag in tags"
        :key="tag.name"
        :to="`/tags/${tag.name}`"
        class="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
      >
        <span class="text-gray-900 dark:text-white">#{{ tag.name }}</span>
        <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
          ({{ tag.count }})
        </span>
      </NuxtLink>
    </div>

    <p v-else class="text-gray-600 dark:text-gray-400">タグがまだありません。</p>
  </div>
</template>

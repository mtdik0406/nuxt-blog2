<script setup lang="ts">
const route = useRoute();
const tag = computed(() => route.params.tag as string);

useHead({
  title: `#${tag.value} - Blog`,
});

const { data: allPosts } = await useAsyncData(`posts-tag-${tag.value}`, () =>
  queryCollection("blog").order("date", "DESC").all(),
);

const posts = computed(() =>
  allPosts.value?.filter((post) => post.tags?.includes(tag.value)) ?? [],
);
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="mb-8">
      <NuxtLink
        to="/tags"
        class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
      >
        &larr; All Tags
      </NuxtLink>
    </div>

    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      #{{ tag }}
    </h1>

    <div v-if="posts && posts.length > 0" class="space-y-6">
      <PostCard v-for="post in posts" :key="post.path" :post="post" />
    </div>

    <p v-else class="text-gray-600 dark:text-gray-400">
      このタグの記事はありません。
    </p>
  </div>
</template>

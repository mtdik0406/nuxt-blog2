<script setup lang="ts">
import type { Post } from "~/types";

useHead({
  title: "Blog",
});

const { data: posts } = await useAsyncData("posts", () =>
  queryCollection<Post>("content")
    .where("_path", "LIKE", "/blog/%")
    .order("date", "DESC")
    .all(),
);
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      Latest Posts
    </h1>

    <div v-if="posts && posts.length > 0" class="space-y-6">
      <PostCard v-for="post in posts" :key="post._path" :post="post" />
    </div>

    <p v-else class="text-gray-600 dark:text-gray-400">記事がまだありません。</p>
  </div>
</template>

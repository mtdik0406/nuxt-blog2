<script setup lang="ts">
import type { Post } from "~/types";

const route = useRoute();
const slug = computed(() => {
  const params = route.params.slug;
  return Array.isArray(params) ? params.join("/") : params;
});

const { data: post } = await useAsyncData(`post-${slug.value}`, () =>
  queryCollection<Post>("content")
    .where("_path", "=", `/blog/${slug.value}`)
    .first(),
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

useHead({
  title: post.value?.title,
});

const { data: surroundings } = await useAsyncData(
  `surroundings-${slug.value}`,
  () =>
    queryCollectionItemSurroundings("content", `/blog/${slug.value}`, {
      fields: ["_path", "title"],
    }),
);

const prevPost = computed(() => surroundings.value?.[0]);
const nextPost = computed(() => surroundings.value?.[1]);
</script>

<template>
  <article class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ post?.title }}
      </h1>
      <PostMeta
        v-if="post?.date"
        :date="post.date"
        :tags="post.tags"
      />
    </header>

    <div class="prose dark:prose-invert max-w-none">
      <ContentRenderer v-if="post" :value="post" />
    </div>

    <nav
      v-if="prevPost || nextPost"
      class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
    >
      <div class="flex justify-between gap-4">
        <NuxtLink
          v-if="prevPost"
          :to="prevPost._path"
          class="flex-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
        >
          <span class="text-sm text-gray-500 dark:text-gray-400">Previous</span>
          <p class="font-medium text-gray-900 dark:text-white">
            {{ prevPost.title }}
          </p>
        </NuxtLink>
        <div v-else class="flex-1" />

        <NuxtLink
          v-if="nextPost"
          :to="nextPost._path"
          class="flex-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-right"
        >
          <span class="text-sm text-gray-500 dark:text-gray-400">Next</span>
          <p class="font-medium text-gray-900 dark:text-white">
            {{ nextPost.title }}
          </p>
        </NuxtLink>
        <div v-else class="flex-1" />
      </div>
    </nav>
  </article>
</template>

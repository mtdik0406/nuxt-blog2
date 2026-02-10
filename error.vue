<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const handleError = () => clearError({ redirect: "/" });

const is404 = computed(() => props.error.statusCode === 404);
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900"
  >
    <div class="text-center px-4">
      <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">
        {{ error.statusCode }}
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
        {{ is404 ? "ページが見つかりませんでした" : "エラーが発生しました" }}
      </p>
      <button
        type="button"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        @click="handleError"
      >
        ホームに戻る
      </button>
    </div>
  </div>
</template>

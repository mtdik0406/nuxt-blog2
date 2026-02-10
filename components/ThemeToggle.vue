<script setup lang="ts">
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const isDark = computed(() => colorMode.value === "dark");
</script>

<template>
  <button
    type="button"
    :aria-label="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'"
    class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    @click="toggleTheme"
  >
    <span v-if="isDark" class="text-xl">☀️</span>
    <span v-else class="text-xl">🌙</span>
  </button>
</template>

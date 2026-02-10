<script setup lang="ts">
const route = useRoute();

const navigation = [
  { name: "Home", href: "/" },
  { name: "Tags", href: "/tags" },
];

const isActive = (href: string) => {
  if (href === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(href);
};
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
  >
    <div class="max-w-4xl mx-auto px-4 py-4">
      <nav class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Blog
        </NuxtLink>

        <div class="flex items-center gap-4">
          <ul class="flex items-center gap-4">
            <li v-for="item in navigation" :key="item.href">
              <NuxtLink
                :to="item.href"
                :class="[
                  'text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                ]"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>

          <ThemeToggle />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { PaginationState } from '@/api/types/paginationState'
const route = useRoute()
defineProps<{
  state: PaginationState
}>()
</script>

<template>
  <div>
    <RouterLink
      class="button"
      :class="{ disabled: state.currentPage <= state.firstPage }"
      :to="{ name: route.name, query: { ...route.query, page: state.firstPage } }"
      >&lt;&lt;</RouterLink
    >
    <RouterLink
      class="button"
      :class="{ disabled: state.currentPage == state.firstPage }"
      :to="{ name: route.name, query: { ...route.query, page: state.currentPage - 1 } }"
      >&lt;</RouterLink
    >
    <span class="current">{{ state.currentPage }}</span>
    <RouterLink
      class="button"
      :class="{ disabled: state.currentPage == state.lastPage }"
      :to="{ name: route.name, query: { ...route.query, page: state.currentPage + 1 } }"
      >&gt;</RouterLink
    >
    <RouterLink
      class="button"
      :class="{ disabled: state.currentPage >= state.lastPage }"
      :to="{ name: route.name, query: { ...route.query, page: state.lastPage } }"
      >&gt;&gt;</RouterLink
    >
  </div>
</template>

<style scoped>
div > * {
  margin-left: 0.2em;
  margin-right: 0.2em;
}

span.current {
  margin-left: 0.6em;
  margin-right: 0.6em;
}

.disabled {
  opacity: 0.3;
  pointer-events: none;
}
</style>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { type LocationQuery, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const props = defineProps<{
  to: string
}>()

const filters = reactive<{ search: string | undefined }>({
  search: ''
})
watch(
  () => route.query,
  (params: LocationQuery) => {
    filters.search = params.search as string
  },
  { immediate: true, deep: true }
)

function submit() {
  for (const key in filters) {
    if (
      filters[key as keyof typeof filters] === null ||
      filters[key as keyof typeof filters] === ''
    ) {
      filters[key as keyof typeof filters] = undefined
    }
  }
  router.push({ name: props.to, query: filters })
}
</script>

<template>
  <form autocomplete="off" @submit.prevent="() => submit()">
    <input type="search" v-model="filters.search" placeholder="Search name..." />
    <button type="submit" class="accent">Search</button>
  </form>
</template>

<style scoped></style>

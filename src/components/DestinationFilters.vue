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
    <div class="filters">
      <input type="search" v-model="filters.search" placeholder="Search name..." />
    </div>
    <div class="buttons">
      <button type="submit" class="accent">Search</button>
    </div>
  </form>
</template>

<style scoped>
form {
  display: grid;
  grid-template-columns: auto min-content;
  gap: 1rem;
  height: min-content;
}

@media (min-width: 992px) {
  form {
    grid-template-columns: unset;
    grid-template-rows: auto min-content;
  }
}

form > .filters {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

form > .filters > * {
  width: 100%;
}

form > .buttons {
  display: flex;
  align-items: center;
}

form > .buttons > * {
  width: 100%;
}
</style>

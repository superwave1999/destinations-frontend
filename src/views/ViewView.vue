<template>
  <div v-if="data" class="page">
    <div class="top">
      <span class="icon">{{ destinationTypeToEmoji(data.type) }}</span>
      <h1>{{ data.name }}</h1>
      <h2>{{ data.countryCode }}</h2>
    </div>
    <div class="details">
      <p>{{ data.description }}</p>
    </div>
    <p class="lower">Last updated: {{ isoStringToLocalFormat(data.updatedAt || '') }}</p>
  </div>
  <div v-else class="page">
    <p class="lower">Loading...</p>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  max-width: 52ch;
  margin: 0 auto;
}

.top > .icon {
  font-size: 3rem;
}

p.lower {
  font-size: 0.75rem;
  text-align: center;
  padding: 1rem;
}
</style>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Destinations from '@/api/destinations'
import { onMounted, ref } from 'vue'
import type { Destination } from '@/api/types/destination'
import { destinationTypeToEmoji } from '@/helpers/string'
import { isoStringToLocalFormat } from '@/helpers/date'
const route = useRoute()
const router = useRouter()

const data = ref<Destination | null>(null)
onMounted(async () => {
  let response
  try {
    response = await new Destinations().show(route.params.id as string)
  } catch (e) {
    // Handled later...
  }
  if (!response) {
    await router.replace({ name: '404' })
    return
  }
  data.value = response
})
</script>

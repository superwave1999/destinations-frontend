<template>
  <div class="page">
    <DestinationFilters :to="route.name as string"></DestinationFilters>
    <DataTable
      :rows="data"
      :headers="['ID', 'Name', 'Description', 'Country', 'Type', 'Updated']"
      @remove="removeRow"
      class="table"
      :class="{ loading: loading }"
    ></DataTable>
    <Paginator class="paginator" v-if="paginationState" :state="paginationState" />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.table {
  overflow: scroll;
}

.loading {
  opacity: 0.3;
  pointer-events: none;
}

.paginator {
  margin: 0 auto;
}
</style>

<script setup lang="ts">
import DestinationFilters from '@/components/DestinationFilters.vue'
import DataTable from '@/components/DataTable.vue'
import Paginator from '@/components/Paginator.vue'
import { ref, watch } from 'vue'
import { type LocationQuery, useRoute } from 'vue-router'
import Destinations from '@/api/destinations'
import type { Destination } from '@/api/types/destination'
import type { PaginationState } from '@/api/types/paginationState'
const route = useRoute()
const api = new Destinations()
const data = ref<Destination[]>([])
const paginationState = ref<PaginationState | null>(null)
const loading = ref(false)
const currentFilters = ref<LocationQuery | null>(null)

watch(
  () => route.query,
  (params: LocationQuery) => {
    currentFilters.value = params
    fetchData(params)
  },
  { immediate: true, deep: true }
)

function clearData() {
  data.value = []
  paginationState.value = null
}

async function fetchData(params: LocationQuery) {
  loading.value = true
  let response
  try {
    response = await api.index(params)
  } catch (e) {
    // Handled later...
  }
  if (response) {
    data.value = response.data
    paginationState.value = response.pagination
  } else {
    clearData()
  }
  loading.value = false
}

async function removeRow(id: number) {
  loading.value = true
  try {
    await api.destroy(id)
  } catch (err) {
    alert('Request failed.')
  }
  loading.value = false
  await fetchData(currentFilters.value!)
}
</script>

<template>
  <form class="page" autocomplete="off" @submit.prevent="() => submit()">
    <FormControl label="Name" :error="serverErrors?.find((e) => e.field === 'name')?.message">
      <input type="text" v-model="data.name" />
    </FormControl>
    <FormControl label="Type" :error="serverErrors?.find((e) => e.field === 'type')?.message">
      <select v-model="data.type">
        <option :value="DestinationType.Alpine" selected>Alpine</option>
        <option :value="DestinationType.City" selected>City</option>
        <option :value="DestinationType.Coast">Coast</option>
      </select>
    </FormControl>
    <FormControl
      label="Description"
      :error="serverErrors?.find((e) => e.field === 'description')?.message"
    >
      <textarea rows="3" placeholder="Description" v-model="data.description"></textarea>
    </FormControl>
    <FormControl
      label="Country (alpha-3 code)"
      :error="serverErrors?.find((e) => e.field === 'countryCode')?.message"
    >
      <input type="text" v-model="data.countryCode" />
    </FormControl>
    <button type="submit" class="accent" :disabled="loading">Submit</button>
  </form>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  max-width: 52ch;
  margin: 0 auto;
}
</style>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Destinations from '@/api/destinations'
import { ref, watch } from 'vue'
import {
  type Destination,
  type DestinationEditable,
  DestinationType
} from '@/api/types/destination'
import type { ResponseBody } from '@/api/types/response'
import type { ValidationError } from '@/api/types/validationError'
import FormControl from '@/components/form/FormControl.vue'
const route = useRoute()
const router = useRouter()
const api = new Destinations()

const loading = ref(false)
const serverErrors = ref<ValidationError[]>([])
const data = ref<DestinationEditable>({
  name: '',
  description: '',
  countryCode: '',
  type: DestinationType.Alpine
})
watch(
  () => route.params.id,
  async (id) => {
    if (id !== undefined) {
      loading.value = true
      let response
      try {
        response = await api.show(id as string)
      } catch (e) {
        // Handled later...
      }
      if (!response) {
        clearData()
        await router.replace({ name: '404' })
        return
      }
      data.value = response
      loading.value = false
    } else {
      clearData()
    }
  },
  { immediate: true }
)

function clearData() {
  data.value = {
    name: '',
    description: '',
    countryCode: '',
    type: DestinationType.Alpine
  }
}

async function submit() {
  loading.value = true
  let response: ResponseBody | null = null
  try {
    if (route.params.id !== undefined) {
      response = await api.update(route.params.id as string, data.value!)
    } else {
      response = await api.store(data.value!)
    }
  } catch (e) {
    // Handled later...
  }
  serverErrors.value = []
  if (response && response.errors) {
    serverErrors.value = response.errors
  } else if (response) {
    data.value = response.data as Destination
    await router.push({ name: 'home' })
    return
  } else {
    alert('Network error during save!')
  }
  loading.value = false
}
</script>

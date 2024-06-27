<script setup lang="ts">
import { type Destination } from '@/api/types/destination'
import { computed } from 'vue'
import { destinationTypeToEmoji } from '@/helpers/string'
import { isoStringToLocalFormat } from '@/helpers/date'
const props = defineProps<{
  row: Destination
}>()
defineEmits(['remove'])

const type = computed(() => destinationTypeToEmoji(props.row.type))
const date = computed(() => isoStringToLocalFormat(props.row.updatedAt || ''))
</script>

<template>
  <tr>
    <td>#{{ row.id }}</td>
    <td>{{ row.name }}</td>
    <td class="truncate">{{ row.description }}</td>
    <td>{{ row.countryCode }}</td>
    <td>{{ type }}</td>
    <td>{{ date }}</td>
    <td class="actions">
      <RouterLink :to="`/view/${row.id}`">🔍</RouterLink>
      <RouterLink :to="`/edit/${row.id}`">✏️</RouterLink>
      <button type="button" @click="$emit('remove', row.id)">❌</button>
    </td>
  </tr>
</template>

<style scoped>
.truncate {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 400px;
}

button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
</style>

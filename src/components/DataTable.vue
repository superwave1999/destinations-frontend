<script setup lang="ts">
import type { Destination } from '@/api/types/destination'
import DataTableRow from '@/components/DataTableRow.vue'
defineProps<{
  rows: Destination[]
  headers: string[]
}>()
defineEmits(['remove'])
</script>

<template>
  <table>
    <thead>
      <tr>
        <td v-for="(header, index) in headers" :key="index">{{ header }}</td>
        <td>Actions</td>
      </tr>
    </thead>
    <tbody>
      <DataTableRow
        v-for="(row, index) in rows"
        :key="index"
        :row="row"
        @remove="$emit('remove', $event)"
      ></DataTableRow>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
}
</style>

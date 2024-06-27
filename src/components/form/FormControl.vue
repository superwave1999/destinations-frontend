<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
const uuid = ref(instance!.uid)
defineProps<{
  label: string
  error?: string
}>()
</script>

<template>
  <div class="form-control">
    <label :for="`form-control-${uuid}`">{{ label }}</label>
    <slot :id="`form-control-${uuid}`" />
    <span class="error">{{ error || '&nbsp;' }}</span>
  </div>
</template>

<style scoped>
.form-control {
  display: flex;
  flex-direction: column;
}

.error {
  font-size: 0.8rem;
  color: orangered;
}
</style>

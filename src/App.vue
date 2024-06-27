<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/" class="link"> Destinations </RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.link {
  margin: 0 auto;
  font-size: 2rem;
}

main {
  padding: 1rem;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}
</style>

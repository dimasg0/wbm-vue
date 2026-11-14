<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main class="placeholder-page">
    <div class="wrap">
      <h1>{{ route.meta.title }}</h1>
      <p>Diese Seite entsteht gerade.</p>
    </div>
  </main>
</template>

<style scoped>
.placeholder-page {
  padding: 140px 0 80px;
}
</style>
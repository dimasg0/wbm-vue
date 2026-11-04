<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { services } from '../data/services.js'

const route = useRoute()
const service = computed(() => services.find(s => s.slug === route.params.slug))
</script>

<template>
  <main class="service-page">
    <div class="wrap" v-if="service">
      <h1>{{ service.title }}</h1>
      <p>{{ service.text }}</p>
      <img :src="service.image" :alt="service.alt">
      <ul>
        <li v-for="item in service.items" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div class="wrap" v-else>
      <h1>Seite nicht gefunden</h1>
    </div>
  </main>
</template>

<style scoped>
.service-page {
  padding: 140px 0 80px;
}
</style>
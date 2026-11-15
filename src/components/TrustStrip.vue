<script setup>
import { trustItems } from '../data/trust.js'
</script>

<template>
  <section class="trust-strip" aria-label="Unsere Leistungsversprechen">
    <div class="wrap trust-strip__grid">
      <div class="trust-strip__item" v-for="item in trustItems" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-strip {
  background: var(--navy);
  color: #fff;
  padding: 44px 0;
}

.trust-strip__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.trust-strip__item {
  padding: 0 28px;
  border-left: 1px solid rgba(255, 255, 255, 0.14);
}

.trust-strip__item:first-child {
  padding-left: 0;
  border-left: 0;
}

.trust-strip__item::before {
  content: "";
  display: block;
  width: 28px;
  height: 2px;
  margin-bottom: 14px;
  background: var(--accent);
}

.trust-strip__item h3 {
  margin: 0 0 8px;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0;
  color: #fff;
}

.trust-strip__item p {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: #b7c3d6;
}

@media (max-width: 900px) {
  .trust-strip__grid {
    grid-template-columns: 1fr 1fr;
    row-gap: 32px;
  }

  .trust-strip__item:nth-child(odd) {
    padding-left: 0;
    border-left: 0;
  }
}

@media (max-width: 560px) {
  .trust-strip__grid {
    grid-template-columns: 1fr;
  }

  .trust-strip__item {
    padding: 0;
    border-left: 0;
  }
}
</style>
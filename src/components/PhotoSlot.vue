<script setup>
defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  label: { type: String, default: 'Foto folgt' },
})
</script>

<template>
  <div class="photo-slot">
    <img v-if="src" :src="src" :alt="alt">
    <div v-else class="photo-slot__empty" role="img" :aria-label="alt || label">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
        <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
        <circle cx="12" cy="13.5" r="3.5" />
      </svg>
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
.photo-slot {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
}

.photo-slot img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-slot__empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #9fb0c8;
  font-size: 15px;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, #25385a 0%, #162238 100%);
}
</style>
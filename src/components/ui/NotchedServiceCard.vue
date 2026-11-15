
<script setup>
import { ArrowUpRight } from 'lucide-vue-next'

defineProps({
  service: {
    type: Object,
    required: true,
  },
  wide: {
    type: Boolean,
    default: false,
  },
  monochrome: {
    type: Boolean,
    default: true,
  },
  surface: {
    type: String,
    default: '#ffffff',
  },
  accent: {
    type: String,
    default: '#c82333',
  },
})
</script>

<template>
<RouterLink
  class="notch-card"
  :class="{ 'notch-card--wide': wide }"
  :to="{ name: 'service', params: { slug: service.slug } }"
  @click.capture="service.preview && $event.preventDefault()"
  :style="{
    '--notch-surface': surface,
    '--notch-accent': accent,
  }"
>


    <div class="notch-card__visual">
      <!-- Фотография -->
      <div class="notch-card__cover">
        <img
          class="notch-card__image"
          :class="{ 'notch-card__image--mono': monochrome }"
          :src="service.image"
          :alt="service.alt || service.title"
          loading="lazy"
          decoding="async"
        />

        <span v-if="service.label" class="notch-card__badge">
          {{ service.label }}
        </span>
      </div>

      <!-- Закруглённый вырез -->
      <span
        class="notch-card__notch"
        aria-hidden="true"
      ></span>

      <!-- Верхнее плавное скругление выреза -->
      <span
        class="notch-card__fillet notch-card__fillet--top"
        aria-hidden="true"
      ></span>

      <!-- Левое плавное скругление выреза -->
      <span
        class="notch-card__fillet notch-card__fillet--left"
        aria-hidden="true"
      ></span>

      <!-- Круглая кнопка -->
      <span class="notch-card__arrow" aria-hidden="true">
        <ArrowUpRight :size="23" :stroke-width="1.8" />
      </span>
    </div>

    <!-- Текст под фотографией -->
    <div class="notch-card__content">
      <h3>{{ service.title }}</h3>

      <p>{{ service.text }}</p>

      <ul
        v-if="service.items?.length"
        class="notch-card__tags"
      >
        <li
          v-for="item in service.items.slice(0, 3)"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </RouterLink>
</template>

<style scoped>
.notch-card {
  display: flex;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  color: var(--ink);
  text-decoration: none;
  outline: none;
}

/* Фокус с клавиатуры */
.notch-card:focus-visible {
  outline: 2px solid var(--notch-accent);
  outline-offset: 7px;
  border-radius: 12px;
}

.notch-card__visual {
  position: relative;
  isolation: isolate;
}

.notch-card__cover {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 26px;
  background: #dce3eb;
}

.notch-card--wide .notch-card__cover {
  aspect-ratio: 16 / 10;
}

.notch-card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 650ms cubic-bezier(.22, 1, .36, 1),
    filter 650ms ease;
}

.notch-card__image--mono {
  filter: grayscale(1);
}

/* Номер услуги поверх фотографии */
.notch-card__badge {
  position: absolute;
  z-index: 2;
  top: 18px;
  left: 18px;
  max-width: calc(100% - 36px);
  padding: 9px 14px;
  border-radius: 100px;
  background: rgba(13, 28, 47, 0.70);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #ffffff;
  backdrop-filter: blur(8px);
  font: 600 11px/1.3 system-ui, sans-serif;
  letter-spacing: .09em;
  text-transform: uppercase;
}

/* Основной вырез: 80 на 80 пикселей */
.notch-card__notch {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 80px;
  height: 80px;
  background: var(--notch-surface);
  border-top-left-radius: 48px;
  pointer-events: none;
}

/* Плавные переходы от изображения к вырезу */
.notch-card__fillet {
  position: absolute;
  width: 28px;
  height: 28px;
  background: radial-gradient(
    circle at top left,
    transparent 27.5px,
    var(--notch-surface) 28px
  );
  pointer-events: none;
}

.notch-card__fillet--top {
  right: 0;
  bottom: 80px;
}

.notch-card__fillet--left {
  right: 80px;
  bottom: 0;
}

/* Круглая стрелка */
.notch-card__arrow {
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  display: flex;
  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--navy);
  color: #ffffff;
  transition:
    background 300ms ease,
    transform 300ms ease;
}

.notch-card__arrow svg {
  transition: transform 300ms ease;
}

/* Типографика */
.notch-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 3px;
}

.notch-card__content h3 {
  margin: 21px 0 9px;
  color: var(--navy);
  font-family: var(--ff-head, Georgia, serif);
  font-size: clamp(23px, 2vw, 28px);
  font-weight: 700;
  line-height: 1.17;
  letter-spacing: -0.025em;
}

.notch-card__content p {
  margin: 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.65;
}

/* Небольшие категории под описанием */
.notch-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: auto 0 0;
  padding: 20px 0 0;
}

.notch-card__tags li {
  padding: 7px 10px;
  border: 1px solid #dce3ea;
  border-radius: 6px;
  color: #34445a;
  background: #f4f7fa;
  font: 500 12px/1.4 system-ui, sans-serif;
}

/* Наведение и фокус */
@media (hover: hover) {
  .notch-card:hover .notch-card__image {
    transform: scale(1.045);
  }

  .notch-card:hover .notch-card__image--mono {
    filter: grayscale(0);
  }

  .notch-card:hover .notch-card__arrow {
    background: var(--notch-accent);
    transform: scale(1.06);
  }

  .notch-card:hover .notch-card__arrow svg {
    transform: translate(2px, -2px);
  }
}

.notch-card:focus-visible .notch-card__image--mono {
  filter: grayscale(0);
}

.notch-card:focus-visible .notch-card__arrow {
  background: var(--notch-accent);
}

/* На сенсорных устройствах фотографии остаются цветными */
@media (hover: none) {
  .notch-card__image--mono {
    filter: none;
  }
}

@media (max-width: 1020px) {
  .notch-card--wide .notch-card__cover {
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 700px) {
  .notch-card__cover {
    border-radius: 21px;
  }

  .notch-card__content h3 {
    font-size: 25px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .notch-card__image,
  .notch-card__arrow,
  .notch-card__arrow svg {
    transition: none;
  }
}
</style>

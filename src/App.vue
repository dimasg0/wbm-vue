
<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import DyeWhorl from './components/DyeWhorl.vue'
</script>

<template>
  <DyeWhorl
    class="wbm-fluid-page"
    :viewport="true"
    :density="0.65"
    :speed="0.8"
    :stir="0.8"
  >
    <AppHeader />
    <RouterView />
    <AppFooter />
  </DyeWhorl>
</template>

<style>
/* =========================================
   WBM — GLOBAL COLORS
========================================= */

/* .wbm-fluid-page {
  --navy: #162b46;
  --ink: #162b46;
  --muted: #354b67;
  --accent: #c82333;
} */

.wbm-fluid-page {
  --navy: #162b46;
  --ink: #162b46;
  --muted: #354b67;
  --accent: #c82333;
  --wave-color: #587ca6;
}

/* =========================================
   TRANSPARENT SECTIONS
========================================= */

.wbm-fluid-page .wbm-site-header,
.wbm-fluid-page .wbm-hero,
.wbm-fluid-page .abt,
.wbm-fluid-page .svc,
.wbm-fluid-page .trust-strip,
.wbm-fluid-page .contact,
.wbm-fluid-page footer {
  background: transparent !important;
}

/* Убираем старую вуаль Hero */
.wbm-fluid-page .wbm-hero__veil {
  display: none;
}

/* =========================================
   SOFT BACKGROUND BEHIND HERO TEXT
========================================= */

.wbm-fluid-page .wbm-hero__copy {
  position: relative;
  isolation: isolate;
}

.wbm-fluid-page .wbm-hero__copy::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: -85px -95px;
  pointer-events: none;

  background: radial-gradient(
    ellipse at 42% 50%,
    rgba(244, 247, 250, 0.88) 0%,
    rgba(244, 247, 250, 0.62) 42%,
    rgba(244, 247, 250, 0) 78%
  );
}

/* =========================================
   TYPOGRAPHY
========================================= */

.wbm-fluid-page h1,
.wbm-fluid-page h2,
.wbm-fluid-page h3 {
  color: var(--navy);
}

.wbm-fluid-page .wbm-hero__copy > p {
  color: #30445f;
}

.wbm-fluid-page .wbm-hero__kicker {
  color: #344b68;
}

.wbm-fluid-page .wbm-hero h1 span {
  color: var(--accent);
}

/* =========================================
   TRUST STRIP
========================================= */

.wbm-fluid-page .trust-strip {
  color: var(--navy);
  border-top: 1px solid rgba(22, 34, 56, 0.12);
  border-bottom: 1px solid rgba(22, 34, 56, 0.12);
}

.wbm-fluid-page .trust-strip__item {
  border-color: rgba(22, 34, 56, 0.12);
}

.wbm-fluid-page .trust-strip__item h3 {
  color: var(--navy);
}

.wbm-fluid-page .trust-strip__item p {
  color: var(--muted);
}

/* =========================================
   FOOTER
========================================= */

.wbm-fluid-page footer {
  color: var(--navy);
  border-top: 1px solid rgba(22, 34, 56, 0.12);
}

.wbm-fluid-page .footer-brand p,
.wbm-fluid-page .footer-col a,
.wbm-fluid-page .footer-bottom {
  color: var(--muted);
}

.wbm-fluid-page .footer-col b {
  color: var(--navy);
}

.wbm-fluid-page .footer-top {
  border-bottom-color: rgba(22, 34, 56, 0.12);
}

.wbm-fluid-page footer .brand small {
  color: var(--muted) !important;
}

/* =========================================
   NOTCHED SERVICE CARDS
========================================= */

/* .wbm-fluid-page .notch-card__cover {
  -webkit-mask-image: radial-gradient(
    circle 80px at 100% 100%,
    transparent 79px,
    #000 80px
  );

  mask-image: radial-gradient(
    circle 80px at 100% 100%,
    transparent 79px,
    #000 80px
  );
} */



/* Плавный фигурный вырез вокруг стрелки */


/* Плавная форма карточки с вырезом под стрелку */

.wbm-fluid-page .notch-card__cover {
  /* Полностью отключаем старые маски */
  -webkit-mask: none !important;
  mask: none !important;

  border-radius: 0;

  /* Единый контур с плавными кривыми */
  clip-path: shape(
    from 26px 0,

    /* Верхняя сторона и правый верхний угол */
    line to calc(100% - 26px) 0,
    curve to 100% 26px with 100% 0,

    /* Правый край до выреза */
    line to 100% calc(100% - 108px),

    /* Плавный вход в вырез */
    curve to
      calc(100% - 28px) calc(100% - 80px)
      with 100% calc(100% - 80px),

    /* Основная вогнутая часть */
    curve to
      calc(100% - 80px) calc(100% - 28px)
      with calc(100% - 80px) calc(100% - 80px),

    /* Плавный выход из выреза */
    curve to
      calc(100% - 108px) 100%
      with calc(100% - 80px) 100%,

    /* Нижняя и левая стороны */
    line to 26px 100%,
    curve to 0 calc(100% - 26px) with 0 100%,
    line to 0 26px,
    curve to 26px 0 with 0 0,

    close
  );
}



.wbm-fluid-page .notch-card__notch,
.wbm-fluid-page .notch-card__fillet {
  display: none;
}

/* =========================================
   LIGHT OVERLAY
========================================= */

.wbm-fluid-page .dye-whorl__content::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  background: rgba(244, 247, 250, 0.32);
  pointer-events: none;
}
</style>

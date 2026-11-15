<script setup>
import PhotoSlot from './PhotoSlot.vue'
//import DyeWhorl from './DyeWhorl.vue'
</script>

<template>
  <section class="wbm-hero">
    <!-- <DyeWhorl :density="0.8"> -->
      <div class="wbm-hero__veil"></div>

      <div class="wrap wbm-hero__grid">
        <div class="wbm-hero__copy">
          <span class="wbm-hero__kicker">Korntal-Münchingen &amp; Umgebung</span>
          <h1>Ein neuer Ort.<br><span>Ein gutes Gefühl.</span></h1>
          <p>
            Ob Umzug, Transport oder Entrümpelung – wir kümmern uns zuverlässig um alles,
            was in Bewegung kommt. Persönlich, sorgfältig und unkompliziert.
          </p>

          <div class="wbm-hero__actions">
            <RouterLink class="wbm-hero__btn wbm-hero__btn--solid" :to="{ path: '/', hash: '#kontakt' }">Umzug anfragen</RouterLink>
            <RouterLink class="wbm-hero__btn wbm-hero__btn--line" :to="{ path: '/', hash: '#leistungen' }">Leistungen ansehen</RouterLink>
          </div>

          <p class="wbm-hero__facts">Privat &amp; Gewerbe · Transporte bis 3,5 t zGG</p>
        </div>

        <figure class="wbm-hero__photo">
          <PhotoSlot label="Foto: WBM-Transporter" alt="WBM-Transporter bis 3,5 t zGG" />
          <figcaption>Unser Transporter bis 3,5 t zGG</figcaption>
        </figure>
      </div>
    <!-- </DyeWhorl> -->
  </section>
</template>

<style scoped>
/* светлая вуаль слева: текст остаётся читаемым поверх чернил */
.wbm-hero__veil {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(244, 247, 250, 0.94) 0%,
    rgba(244, 247, 250, 0.8) 40%,
    rgba(244, 247, 250, 0) 72%
  );
}

.wbm-hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 64px;
  align-items: center;
  padding: 140px 0 80px;
}

.wbm-hero__kicker {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.wbm-hero__kicker::before {
  content: "";
  width: 32px;
  height: 1px;
  background: var(--accent);
}

.wbm-hero h1 {
  margin: 22px 0 22px;
  font-size: clamp(42px, 5vw, 68px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--navy);
}

.wbm-hero h1 span {
  color: var(--accent);
}

.wbm-hero__copy > p:not(.wbm-hero__facts) {
  max-width: 470px;
  margin: 0 0 30px;
  font-size: 18px;
  line-height: 1.6;
  color: var(--muted);
}

.wbm-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.wbm-hero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 0 26px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: background 0.2s, color 0.2s;
}

.wbm-hero__btn--solid {
  background: var(--accent);
  color: #fff;
}

.wbm-hero__btn--solid:hover {
  background: #a81c2a;
}

.wbm-hero__btn--line {
  border: 1.5px solid var(--navy);
  color: var(--navy);
}

.wbm-hero__btn--line:hover {
  background: var(--navy);
  color: #fff;
}

.wbm-hero__facts {
  margin: 28px 0 0;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: var(--navy);
}

.wbm-hero__photo {
  margin: 0;
}

.wbm-hero__photo > :first-child {
  aspect-ratio: 5 / 4;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 24px 50px rgba(22, 34, 56, 0.16);
}

.wbm-hero__photo figcaption {
  margin-top: 12px;
  font-size: 14px;
  font-style: italic;
  color: var(--muted);
}

@media (max-width: 900px) {
  .wbm-hero__veil {
    background: rgba(244, 247, 250, 0.82);
  }

  .wbm-hero__grid {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 120px 0 56px;
  }
}
</style>
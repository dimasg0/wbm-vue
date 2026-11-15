<script setup>
import { services } from '../data/services.js'
import PhotoSlot from './PhotoSlot.vue'
</script>

<template>
  <section class="svc" id="leistungen">
    <div class="wrap">
      <div class="svc__head">
        <div>
          <span class="svc__kicker">Unser Leistungsangebot</span>
          <h2>Alles aus einer Hand.<br>Genau so, wie Sie es brauchen.</h2>
        </div>
        <p>
          Von der ersten Kiste bis zur letzten Fahrt: Wählen Sie einzelne Leistungen oder kombinieren Sie mehrere
          Services zu einem passenden Gesamtpaket.
        </p>
      </div>

      <div class="svc__grid">
        <RouterLink
          class="svc__card"
          v-for="(service, i) in services"
          :key="i"
          :to="'/' + service.slug"
        >
          <div class="svc__photo">
            <PhotoSlot :src="service.photo" :alt="service.alt" :label="service.title" />
          </div>
          <div class="svc__body">
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
            <ul>
              <li v-for="item in service.items" :key="item">{{ item }}</li>
            </ul>
            <span class="svc__more">Mehr erfahren</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.svc {
  padding: 96px 0 104px;
  background: #fff;
}

.svc__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  margin-bottom: 48px;
}

.svc__kicker {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.svc__kicker::before {
  content: "";
  width: 32px;
  height: 1px;
  background: var(--accent);
}

.svc h2 {
  max-width: 640px;
  margin: 18px 0 0;
  font-size: clamp(34px, 4.2vw, 54px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--navy);
}

.svc__head > p {
  max-width: 380px;
  margin: 0;
  font-size: 17px;
  line-height: 1.6;
  color: var(--muted);
}

/* сетка на 12 колонок: первые две карточки крупные, остальные по 3 колонки */
.svc__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.svc__card {
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 12px;
  transition: transform 0.25s, box-shadow 0.25s;
}

.svc__card:nth-child(-n + 2) {
  grid-column: span 6;
}

.svc__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(22, 34, 56, 0.12);
}

.svc__photo {
  aspect-ratio: 4 / 3;
}

.svc__card:nth-child(-n + 2) .svc__photo {
  aspect-ratio: 16 / 9;
}

.svc__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px 24px 22px;
}

.svc__body h3 {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--navy);
}

.svc__body p {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 1.55;
  color: var(--muted);
}

.svc__body ul {
  margin: 0 0 20px;
  padding: 0;
  list-style: none;
}

.svc__body li {
  position: relative;
  padding: 4px 0 4px 18px;
  font-size: 15px;
  line-height: 1.45;
  color: var(--ink);
}

.svc__body li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.8em;
  width: 7px;
  height: 7px;
  background: var(--accent);
  border-radius: 1px;
}

.svc__more {
  margin-top: auto;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--navy);
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}

@media (max-width: 1000px) {
  .svc__card,
  .svc__card:nth-child(-n + 2) {
    grid-column: span 6;
  }

  .svc__card:nth-child(-n + 2) .svc__photo {
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 700px) {
  .svc {
    padding: 72px 0 80px;
  }

  .svc__head {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .svc__card,
  .svc__card:nth-child(-n + 2) {
    grid-column: 1 / -1;
  }
}
</style>
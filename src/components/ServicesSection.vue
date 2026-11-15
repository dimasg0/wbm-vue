
<script setup>
import { RouterLink } from 'vue-router'
import NotchedServiceCard from './ui/NotchedServiceCard.vue'

// Временные данные только для тестирования дизайна
const placeholderImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=85',
]

const services = Array.from({ length: 6 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')

  return {
    slug: `beispiel-${number}`,
    preview: true,
    label: `${number} / BEISPIEL`,
    title: `Beispielkarte ${number}`,
    text: 'Dies ist ein kurzer Beispieltext für die Darstellung der Karte. Er dient dazu, das Layout, die Abstände und die Typografie besser beurteilen zu können.',
    image: placeholderImages[index],
    alt: `Beispielbild ${number}`,
    items: [
      'Kategorie Eins',
      'Kategorie Zwei',
      'Kategorie Drei',
    ],
  }
})
</script>

<template>
  <section class="svc" id="leistungen">
    <div class="wrap">

      <div class="svc__head">
        <div class="svc__heading">
          <span class="svc__kicker">
            Unser Leistungsangebot
          </span>

          <h2>
            Alles aus einer Hand.<br />
            Genau so, wie Sie es brauchen.
          </h2>
        </div>

        <p>
          Von der ersten Kiste bis zur letzten Fahrt:
          Wählen Sie einzelne Leistungen oder
          kombinieren Sie mehrere Services zu einem
          passenden Gesamtpaket.
        </p>
      </div>

      <div class="svc__grid">
        <div
          v-for="service in services"
          :key="service.slug"
          class="svc__item"
        >
          <NotchedServiceCard
            :service="service"
            :wide="false"
            :monochrome="true"
            surface="#ffffff"
            accent="#c82333"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.svc {
  padding: 105px 0 120px;
  background: #ffffff;
}

.svc__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 48px;
  margin-bottom: 56px;
}

.svc__heading {
  min-width: 0;
}

.svc__kicker {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.svc__kicker::before {
  content: "";
  width: 32px;
  height: 1px;
  flex-shrink: 0;
  background: var(--accent);
}

.svc h2 {
  max-width: 730px;
  margin: 18px 0 0;
  color: var(--navy);
  font-family: var(--ff-head, Georgia, serif);
  font-size: clamp(35px, 4.2vw, 56px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -.025em;
}

.svc__head > p {
  max-width: 345px;
  flex: 0 1 345px;
  margin: 0 0 4px;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.65;
}

/* 6 одинаковых карточек, 3 колонки */
.svc__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 26px;
  row-gap: 55px;
  align-items: stretch;
}

.svc__item {
  min-width: 0;
}

/* Планшеты: 2 колонки */
@media (max-width: 1020px) {
  .svc__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 22px;
    row-gap: 42px;
  }
}

/* Телефоны: 1 колонка */
@media (max-width: 700px) {
  .svc {
    padding: 75px 0 88px;
  }

  .svc__head {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 35px;
  }

  .svc h2 {
    font-size: clamp(32px, 8vw, 43px);
  }

  .svc__head > p {
    flex: auto;
    max-width: 100%;
    font-size: 16px;
  }

  .svc__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
}
</style>

<script setup>
import PhotoSlot from './PhotoSlot.vue'

const facts = [
  { label: 'Einsatzgebiet', value: 'Korntal-Münchingen & Umgebung' },
  { label: 'Für wen', value: 'Privathaushalte und Unternehmen' },
  { label: 'Leistungen', value: 'Umzug, Transport, Verpackung, Entrümpelung, Reinigung' },
  { label: 'Anfragen', value: 'Über das Formular – wir melden uns persönlich bei Ihnen' },
]
</script>

<template>
  <section class="abt" id="unternehmen">
    <div class="wrap abt__grid">
      <figure class="abt__photo">
        <PhotoSlot label="Foto: Team von WBM" alt="Das Team von WBM" />
      </figure>

      <div class="abt__copy">
        <span class="abt__kicker">Über WBM</span>
        <h2>Ein Ansprechpartner.<br>Viele Möglichkeiten.</h2>
        <p>
          Bei einem Umzug ist schon genug zu organisieren. Deshalb können Sie bei WBM verschiedene
          Leistungen verbinden: Verpacken, Transportieren, Räumen und auf Wunsch die Endreinigung.
        </p>
        <p>
          Wir besprechen mit Ihnen vorab, was tatsächlich gebraucht wird – für private Haushalte
          genauso wie für Unternehmen.
        </p>

        <dl class="abt__facts">
          <div v-for="fact in facts" :key="fact.label">
            <dt>{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.abt {
  padding: 96px 0 104px;
  background: var(--bg);
}

.abt__grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 72px;
  align-items: center;
}

.abt__photo {
  margin: 0;
  aspect-ratio: 4 / 5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 50px rgba(22, 34, 56, 0.14);
}

.abt__kicker {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.abt__kicker::before {
  content: "";
  width: 32px;
  height: 1px;
  background: var(--accent);
}

.abt h2 {
  margin: 18px 0 22px;
  font-size: clamp(34px, 4.2vw, 54px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--navy);
}

.abt__copy > p {
  max-width: 520px;
  margin: 0 0 16px;
  font-size: 18px;
  line-height: 1.6;
  color: var(--muted);
}

/* таблица фактов: тонкие линии между строками */
.abt__facts {
  margin: 32px 0 0;
  border-bottom: 1px solid var(--line);
}

.abt__facts > div {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 20px;
  padding: 15px 0;
  border-top: 1px solid var(--line);
}

.abt__facts dt {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.abt__facts dd {
  margin: 0;
  font-size: 17px;
  line-height: 1.45;
  color: var(--navy);
}

@media (max-width: 900px) {
  .abt {
    padding: 72px 0 80px;
  }

  .abt__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .abt__photo {
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 560px) {
  .abt__facts > div {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
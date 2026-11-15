<script setup>
import { ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'

/* Real service categories already used by WBM.
   The duplicate Reinigung entry from services.js is intentionally not reproduced. */
const services = [
  {
    number: '01',
    slug: 'umzuege',
    name: 'Umzüge',
    description: 'Privatumzüge, Firmen- und Büroumzüge – vom einzelnen Zimmer bis zum Standortwechsel.',
    details: 'Privat · Gewerbe · Büro'
  },
  {
    number: '02',
    slug: 'transport',
    name: 'Transporte',
    description: 'Möbel, Waren oder Baumaterialien: passende Transportleistungen mit Fahrzeugen bis 3,5 t zGG.',
    details: 'Möbel · Waren · Kurierdienste'
  },
  {
    number: '03',
    slug: 'verpackung',
    name: 'Verpackungsservice',
    description: 'Unterstützung beim Einpacken und passende Verpackungsmaterialien für Ihre Gegenstände.',
    details: 'Einpacken · Material · Kartons'
  },
  {
    number: '04',
    slug: 'raeumung',
    name: 'Entrümpelung',
    description: 'Räumung von Wohnungen, Kellern und Dachböden sowie Haushaltsauflösungen.',
    details: 'Wohnung · Keller · Haushalt'
  },
  {
    number: '05',
    slug: 'reinigung',
    name: 'Reinigung',
    description: 'Endreinigung im Zusammenhang mit Ihrem Umzug – für eine ordentliche Übergabe.',
    details: 'Endreinigung · Übergabe'
  }
]

const steps = [
  {
    number: '01',
    title: 'Anfrage schicken',
    description: 'Sagen Sie uns, was transportiert werden soll, von wo nach wo und wann der Umzug geplant ist.'
  },
  {
    number: '02',
    title: 'Details abstimmen',
    description: 'Wir besprechen den Umfang, die gewünschten Leistungen und die organisatorischen Fragen.'
  },
  {
    number: '03',
    title: 'Umzug umsetzen',
    description: 'Zum vereinbarten Termin kümmern wir uns um die abgestimmten Arbeiten und den Transport.'
  }
]

const isSending = ref(false)
const formStatus = ref('')
const formState = ref('')

async function sendForm(event) {
  if (isSending.value) return

  const form = event.currentTarget
  const data = Object.fromEntries(new FormData(form).entries())

  formStatus.value = ''
  formState.value = ''
  isSending.value = true

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    // Handles unexpected non-JSON responses gracefully.
    const result = await response.json().catch(() => ({}))
    if (!response.ok || result.success === false) {
      throw new Error(result.message || 'Server error')
    }

    form.reset()
    formState.value = 'success'
    formStatus.value = 'Vielen Dank! Ihre Anfrage wurde gesendet.'
  } catch (error) {
    console.error('Kontaktformular:', error)
    formState.value = 'error'
    formStatus.value = 'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.'
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <main class="wbm-home" id="start">
    <!-- Leave the currently approved hero as it is. -->
    <HeroSection />

    <!-- SERVICES: editorial list, not a bento grid -->
    <section id="leistungen" class="wbm-home__section wbm-home__services" aria-labelledby="wbm-services-title">
      <div class="wrap">
        <div class="wbm-home__section-heading">
          <div>
            <p class="wbm-home__intro-line">WBM · Unsere Leistungen</p>
            <h2 id="wbm-services-title">Was können wir für<br>Sie übernehmen?</h2>
          </div>
          <p class="wbm-home__heading-aside">
            Ein Umzug, viele Aufgaben. Wählen Sie, wobei wir Sie unterstützen sollen –
            von der Planung bis zu den letzten Kartons.
          </p>
        </div>

        <div class="wbm-home__service-list">
          <RouterLink
            v-for="service in services"
            :key="service.slug"
            :to="'/' + service.slug"
            class="wbm-home__service-item"
          >
            <span class="wbm-home__service-number">{{ service.number }}</span>
            <div class="wbm-home__service-main">
              <h3>{{ service.name }}</h3>
              <p>{{ service.description }}</p>
            </div>
            <span class="wbm-home__service-detail">{{ service.details }}</span>
            <span class="wbm-home__service-arrow" aria-hidden="true">↗</span>
          </RouterLink>
        </div>
        <div class="wbm-home__service-tail">
          <span>Nicht sicher, welche Leistung passt?</span>
          <a href="#kontakt">Erzählen Sie uns von Ihrem Vorhaben <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

    <!-- ABOUT: real specifics, no invented testimonials or ratings -->
    <section id="unternehmen" class="wbm-home__section wbm-home__about" aria-labelledby="wbm-about-title">
      <div class="wrap">
        <div class="wbm-home__about-lead">
          <div class="wbm-home__about-heading">
            <p class="wbm-home__intro-line">Über WBM</p>
            <h2 id="wbm-about-title">Ein Ansprechpartner.<br>Viele Möglichkeiten.</h2>
          </div>
          <div class="wbm-home__about-copy">
            <p>
              Bei einem Umzug ist schon genug zu organisieren. Deshalb können Sie bei WBM
              verschiedene Leistungen verbinden: Verpacken, Transportieren, Räumen
              und auf Wunsch die Endreinigung.
            </p>
            <p>
              Wir besprechen mit Ihnen vorab, was tatsächlich gebraucht wird –
              für private Haushalte genauso wie für Unternehmen.
            </p>
          </div>
        </div>

        <div class="wbm-home__principles">
          <article>
            <span class="wbm-home__principle-no">I</span>
            <h3>Persönlich abgestimmt</h3>
            <p>Sie schildern Ihr Vorhaben. Gemeinsam klären wir den Umfang und die passende Unterstützung.</p>
          </article>
          <article>
            <span class="wbm-home__principle-no">II</span>
            <h3>Flexibel kombiniert</h3>
            <p>Nur Transport oder zusätzlich Verpackung und Räumung – Sie wählen die Leistungen.</p>
          </article>
          <article>
            <span class="wbm-home__principle-no">III</span>
            <h3>In Ihrer Region</h3>
            <p>Ausgangspunkt ist Korntal-Münchingen. Einsätze in der Umgebung stimmen wir individuell ab.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- SINGLE GROUNDED FACT, NOT FAKE METRICS -->
    <section class="wbm-home__factband" aria-label="Transportinformationen">
      <div class="wrap wbm-home__factband-inner">
        <p>Für kleine und große Aufgaben.</p>
        <div class="wbm-home__factband-main">
          <strong>3,5<span> t</span></strong>
          <span>Transporte mit Fahrzeugen bis 3,5 t zulässigem Gesamtgewicht.</span>
        </div>
        <a href="#kontakt">Transport anfragen <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <!-- PROCESS: grounded three-step description -->
    <section id="ablauf" class="wbm-home__section wbm-home__process" aria-labelledby="wbm-process-title">
      <div class="wrap">
        <div class="wbm-home__process-intro">
          <div>
            <p class="wbm-home__intro-line">So läuft es ab</p>
            <h2 id="wbm-process-title">Von der Anfrage<br>bis zum Umzugstag.</h2>
          </div>
          <p>Einfach mit Ihrem Vorhaben anfangen. Die Details klären wir im Gespräch.</p>
        </div>

        <div class="wbm-home__steps">
          <article v-for="step in steps" :key="step.number" class="wbm-home__step">
            <span>{{ step.number }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </article>
        </div>

        <a class="wbm-home__process-link" href="#kontakt">Jetzt unverbindlich anfragen <span aria-hidden="true">→</span></a>
      </div>
    </section>

    <!-- CONTACT: same field names and endpoint as existing Express server -->
    <section id="kontakt" class="wbm-home__section wbm-home__contact" aria-labelledby="wbm-contact-title">
      <div class="wrap wbm-home__contact-grid">
        <div class="wbm-home__contact-copy">
          <p class="wbm-home__intro-line">Kontakt</p>
          <h2 id="wbm-contact-title">Erzählen Sie uns,<br>was ansteht.</h2>
          <p>
            Ein Zimmer, eine ganze Wohnung oder ein gewerblicher Transport?
            Beschreiben Sie kurz Ihr Vorhaben. Wir melden uns persönlich bei Ihnen.
          </p>
          <div class="wbm-home__contact-place">
            <span>Unser Einsatzgebiet</span>
            <strong>Korntal-Münchingen<br>&amp; Umgebung</strong>
          </div>
        </div>

        <form class="wbm-home__form" id="contactForm" @submit.prevent="sendForm">
          <div class="wbm-home__form-head">
            <h3>Umzug anfragen</h3>
            <p>Die Anfrage ist unverbindlich.</p>
          </div>

          <div class="wbm-home__fields">
            <div class="wbm-home__field">
              <label for="wbm-name">Name <span>*</span></label>
              <input id="wbm-name" name="name" type="text" autocomplete="name" maxlength="100" placeholder="Ihr Name" required>
            </div>
            <div class="wbm-home__field">
              <label for="wbm-email">E-Mail <span>*</span></label>
              <input id="wbm-email" name="email" type="email" autocomplete="email" maxlength="254" placeholder="name@beispiel.de" required>
            </div>
            <div class="wbm-home__field">
              <label for="wbm-phone">Telefon</label>
              <input id="wbm-phone" name="phone" type="tel" autocomplete="tel" maxlength="40" placeholder="+49 ...">
            </div>
            <div class="wbm-home__field">
              <label for="wbm-service">Leistung</label>
              <select id="wbm-service" name="service">
                <option value="">Bitte auswählen</option>
                <option value="Privatumzug">Privatumzug</option>
                <option value="Firmenumzug">Firmenumzug</option>
                <option value="Transportdienstleistung">Transport</option>
                <option value="Verpackungsservice">Verpackungsservice</option>
                <option value="Entrümpelung / Haushaltsauflösung">Entrümpelung / Haushaltsauflösung</option>
                <option value="Reinigung">Reinigung</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>
            <div class="wbm-home__field wbm-home__field--wide">
              <label for="wbm-message">Ihre Nachricht <span>*</span></label>
              <textarea id="wbm-message" name="message" rows="5" maxlength="5000" placeholder="Was soll transportiert werden? Von wo nach wo? Wann ist der Umzug geplant?" required></textarea>
            </div>
          </div>

          <div class="wbm-home__form-footer">
            <p>Ihre Angaben werden zur Bearbeitung Ihrer Anfrage übermittelt.</p>
            <button type="submit" :disabled="isSending">
              {{ isSending ? 'Wird gesendet ...' : 'Anfrage senden' }}
              <span v-if="!isSending" aria-hidden="true">→</span>
            </button>
          </div>
          <p
            v-if="formStatus"
            class="wbm-home__form-status"
            :class="'wbm-home__form-status--' + formState"
            role="status"
            aria-live="polite"
          >{{ formStatus }}</p>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Bellhop-inspired editorial direction, original WBM layout and copy.
   Isolated component classes avoid the three legacy CSS files. */
.wbm-home {
  --wbm-navy: #172940;
  --wbm-deep: #101f33;
  --wbm-red: #bf2c3c;
  --wbm-muted: #627082;
  --wbm-border: #dbe2e9;
  --wbm-soft: #eef3f7;
  --wbm-cream: #f9fafb;
  color: var(--wbm-navy);
  background: var(--wbm-cream);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.wbm-home *, .wbm-home *::before, .wbm-home *::after { box-sizing: border-box; }
.wbm-home__section { padding: clamp(88px, 10vw, 140px) 0; }
.wbm-home__intro-line {
  margin: 0 0 23px;
  font: 600 13px/1.4 system-ui, sans-serif;
  letter-spacing: .01em;
  color: var(--wbm-red);
}
.wbm-home h2 {
  margin: 0;
  max-width: 740px;
  font: 650 clamp(38px, 4.7vw, 64px)/1.105 system-ui, sans-serif;
  letter-spacing: -.048em;
  color: var(--wbm-navy);
}
.wbm-home h3 { letter-spacing: -.025em; }
.wbm-home a:focus-visible, .wbm-home button:focus-visible,
.wbm-home input:focus-visible, .wbm-home select:focus-visible,
.wbm-home textarea:focus-visible {
  outline: 3px solid #cf5964;
  outline-offset: 3px;
}

/* Services */
.wbm-home__services { background: #fbfcfd; }
.wbm-home__section-heading {
  display: grid;
  grid-template-columns: 1.38fr .62fr;
  align-items: end;
  gap: 70px;
  margin-bottom: clamp(48px, 6vw, 75px);
}
.wbm-home__heading-aside {
  max-width: 345px;
  margin: 0 0 8px;
  font: 400 16px/1.75 system-ui, sans-serif;
  color: var(--wbm-muted);
}
.wbm-home__service-list { border-top: 1px solid var(--wbm-border); }
.wbm-home__service-item {
  display: grid;
  grid-template-columns: 62px minmax(300px, 1fr) minmax(160px, .45fr) 44px;
  align-items: center;
  gap: clamp(14px, 2vw, 32px);
  min-height: 162px;
  padding: 23px 7px;
  border-bottom: 1px solid var(--wbm-border);
  color: inherit;
  text-decoration: none;
  transition: background .22s ease, padding .22s ease;
}
.wbm-home__service-item:hover { background: #f0f4f7; padding-inline: 19px; }
.wbm-home__service-number { color: #8190a0; font-size: 13px; align-self: start; padding-top: 10px; }
.wbm-home__service-main h3 {
  margin: 0 0 11px;
  font: 650 clamp(24px, 2.8vw, 36px)/1.2 system-ui, sans-serif;
  letter-spacing: -.04em;
}
.wbm-home__service-main p {
  margin: 0;
  max-width: 550px;
  font: 400 15px/1.7 system-ui, sans-serif;
  color: var(--wbm-muted);
}
.wbm-home__service-detail {
  color: #596b7e;
  font-size: 13px;
  line-height: 1.65;
}
.wbm-home__service-arrow {
  font-size: 25px;
  justify-self: end;
  color: var(--wbm-red);
  transform: translate(0, 0);
  transition: transform .22s ease;
}
.wbm-home__service-item:hover .wbm-home__service-arrow { transform: translate(3px, -3px); }
.wbm-home__service-tail {
  padding-top: 28px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  font-size: 14px;
  color: var(--wbm-muted);
}
.wbm-home__service-tail a { color: var(--wbm-navy); text-decoration: underline; text-underline-offset: 5px; font-weight: 600; }
.wbm-home__service-tail a span { margin-left: 9px; }

/* About */
.wbm-home__about { background: var(--wbm-soft); }
.wbm-home__about-lead {
  display: grid;
  grid-template-columns: 1.13fr .87fr;
  gap: clamp(55px, 7vw, 120px);
  align-items: start;
  margin-bottom: clamp(60px, 8vw, 105px);
}
.wbm-home__about-copy { padding-top: 38px; }
.wbm-home__about-copy p {
  margin: 0 0 22px;
  max-width: 480px;
  font: 400 17px/1.78 system-ui, sans-serif;
  color: #45586d;
}
.wbm-home__principles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: clamp(30px, 4vw, 55px);
  border-top: 1px solid #cdd7e1;
}
.wbm-home__principles article { padding-top: 29px; }
.wbm-home__principle-no { display: block; margin-bottom: 36px; color: var(--wbm-red); font-size: 14px; }
.wbm-home__principles h3 { margin: 0 0 13px; font: 650 22px/1.2 system-ui, sans-serif; }
.wbm-home__principles p { margin: 0; color: #617185; font: 400 15px/1.7 system-ui, sans-serif; }

/* Factband */
.wbm-home__factband { background: var(--wbm-deep); color: #fff; padding: clamp(52px, 6vw, 78px) 0; }
.wbm-home__factband-inner { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 32px; align-items: center; }
.wbm-home__factband-inner > p { margin: 0; color: #ccd5df; font-size: 16px; line-height: 1.5; }
.wbm-home__factband-main { display: flex; align-items: center; gap: 27px; }
.wbm-home__factband-main strong { font: 650 clamp(64px, 7vw, 108px)/1 system-ui, sans-serif; letter-spacing: -.085em; white-space: nowrap; }
.wbm-home__factband-main strong span { font-size: .43em; letter-spacing: -.02em; }
.wbm-home__factband-main > span { max-width: 230px; font-size: 14px; line-height: 1.6; color: #c0ccd8; }
.wbm-home__factband-inner > a { color: white; text-decoration: underline; text-underline-offset: 5px; justify-self: end; font-weight: 600; font-size: 14px; white-space: nowrap; }
.wbm-home__factband-inner > a span { margin-left: 8px; }

/* Process */
.wbm-home__process { background: #fff; }
.wbm-home__process-intro { display: flex; align-items: end; justify-content: space-between; gap: 60px; margin-bottom: 65px; }
.wbm-home__process-intro > p { max-width: 345px; margin: 0 0 8px; font-size: 16px; line-height: 1.7; color: var(--wbm-muted); }
.wbm-home__steps { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: clamp(20px, 3.5vw, 54px); }
.wbm-home__step { border-top: 2px solid var(--wbm-navy); padding-top: 23px; }
.wbm-home__step > span { color: var(--wbm-red); font: 600 14px/1 system-ui, sans-serif; }
.wbm-home__step h3 { margin: 48px 0 15px; font: 650 clamp(21px, 2.2vw, 27px)/1.2 system-ui, sans-serif; }
.wbm-home__step p { max-width: 340px; margin: 0; color: var(--wbm-muted); font-size: 15px; line-height: 1.75; }
.wbm-home__process-link { display: inline-flex; gap: 22px; margin-top: 53px; align-items: center; font: 600 14px/1.5 system-ui, sans-serif; color: var(--wbm-navy); border-bottom: 1px solid currentColor; padding-bottom: 7px; text-decoration: none; }
.wbm-home__process-link span { font-size: 20px; }

/* Contact */
.wbm-home__contact { background: #e9eff4; }
.wbm-home__contact-grid { display: grid; grid-template-columns: .88fr 1.12fr; gap: clamp(36px, 6vw, 100px); align-items: start; }
.wbm-home__contact-copy { padding-top: 32px; }
.wbm-home__contact-copy > p:not(.wbm-home__intro-line) { margin: 26px 0 0; max-width: 385px; color: #556a7e; font: 400 17px/1.78 system-ui, sans-serif; }
.wbm-home__contact-place { margin-top: 70px; padding-top: 25px; border-top: 1px solid #c8d3de; max-width: 400px; }
.wbm-home__contact-place span { display: block; color: #5c7186; font-size: 13px; margin-bottom: 10px; }
.wbm-home__contact-place strong { font: 650 20px/1.4 system-ui, sans-serif; }
.wbm-home__form { padding: clamp(27px, 3.2vw, 48px); background: #fff; border-radius: 9px; box-shadow: 0 16px 35px rgba(20,42,64,.035); }
.wbm-home__form-head { margin-bottom: 30px; }
.wbm-home__form-head h3 { margin: 0 0 7px; font: 650 29px/1.2 system-ui, sans-serif; }
.wbm-home__form-head p { margin: 0; color: #637388; font-size: 14px; }
.wbm-home__fields { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 21px 18px; }
.wbm-home__field { display: flex; flex-direction: column; gap: 9px; min-width: 0; }
.wbm-home__field--wide { grid-column: 1 / -1; }
.wbm-home__field label { font: 600 13px/1.3 system-ui, sans-serif; color: #293d51; }
.wbm-home__field label span { color: var(--wbm-red); }
.wbm-home__field input, .wbm-home__field select, .wbm-home__field textarea {
  display: block; width: 100%; min-width: 0;
  background: #f9fbfc; border: 1px solid #d8e1e9; border-radius: 4px;
  font: 400 15px/1.5 system-ui, sans-serif; color: #172940;
  padding: 13px 15px; box-shadow: none;
}
.wbm-home__field input, .wbm-home__field select { min-height: 50px; }
.wbm-home__field textarea { resize: vertical; min-height: 120px; }
.wbm-home__field input::placeholder, .wbm-home__field textarea::placeholder { color: #8b98a7; }
.wbm-home__form-footer { display: flex; justify-content: space-between; align-items: center; gap: 25px; margin-top: 23px; }
.wbm-home__form-footer p { margin: 0; max-width: 250px; color: #66778a; font: 400 12px/1.55 system-ui, sans-serif; }
.wbm-home__form-footer button { display: inline-flex; justify-content: center; align-items: center; gap: 14px; border: 0; background: var(--wbm-red); color: white; padding: 0 21px; min-height: 50px; border-radius: 4px; white-space: nowrap; cursor: pointer; font: 650 13px/1.3 system-ui, sans-serif; transition: background .2s ease; }
.wbm-home__form-footer button:hover:not(:disabled) { background: #9d2130; }
.wbm-home__form-footer button:disabled { opacity: .67; cursor: wait; }
.wbm-home__form-status { margin: 20px 0 0; font-size: 14px; line-height: 1.5; }
.wbm-home__form-status--success { color: #116337; }
.wbm-home__form-status--error { color: #a82737; }

/* Responsive */
@media (max-width: 1030px) {
  .wbm-home__section-heading, .wbm-home__about-lead { gap: 44px; }
  .wbm-home__service-item { grid-template-columns: 46px 1fr 35px; }
  .wbm-home__service-detail { display: none; }
  .wbm-home__factband-inner { grid-template-columns: 1fr 1.6fr; }
  .wbm-home__factband-inner > a { justify-self: start; grid-column: 2; }
}
@media (max-width: 780px) {
  .wbm-home__section { padding: 79px 0; }
  .wbm-home h2 { font-size: clamp(35px, 6.2vw, 49px); }
  .wbm-home__section-heading, .wbm-home__about-lead, .wbm-home__contact-grid { grid-template-columns: 1fr; gap: 27px; }
  .wbm-home__heading-aside { max-width: 520px; }
  .wbm-home__about-copy { padding-top: 0; }
  .wbm-home__principles { grid-template-columns: 1fr; gap: 22px; }
  .wbm-home__principles article { padding-top: 24px; border-bottom: 1px solid #d0dbe4; padding-bottom: 23px; }
  .wbm-home__principle-no { margin-bottom: 19px; }
  .wbm-home__principles article:last-child { border-bottom: 0; }
  .wbm-home__process-intro { display: block; margin-bottom: 43px; }
  .wbm-home__process-intro > p { margin-top: 26px; }
  .wbm-home__steps { gap: 22px; }
  .wbm-home__step h3 { margin-top: 30px; }
  .wbm-home__contact-copy { padding-top: 0; }
  .wbm-home__contact-place { margin: 30px 0 10px; }
}
@media (max-width: 600px) {
  .wbm-home__section { padding: 66px 0; }
  .wbm-home__intro-line { margin-bottom: 17px; }
  .wbm-home h2 { font-size: clamp(33px, 9vw, 44px); letter-spacing: -.044em; }
  .wbm-home__service-item { grid-template-columns: 30px minmax(0,1fr) 24px; min-height: 136px; gap: 9px; padding: 20px 0; }
  .wbm-home__service-item:hover { padding-inline: 0; }
  .wbm-home__service-number { padding-top: 5px; font-size: 11px; }
  .wbm-home__service-main h3 { font-size: 23px; }
  .wbm-home__service-main p { font-size: 13px; line-height: 1.6; }
  .wbm-home__service-arrow { font-size: 20px; }
  .wbm-home__service-tail { display: block; line-height: 1.8; }
  .wbm-home__service-tail a { display: block; margin-top: 9px; }
  .wbm-home__about-copy p { font-size: 15px; }
  .wbm-home__factband { padding: 53px 0; }
  .wbm-home__factband-inner { grid-template-columns: 1fr; gap: 18px; }
  .wbm-home__factband-main { gap: 21px; }
  .wbm-home__factband-main strong { font-size: clamp(66px, 17vw, 88px); }
  .wbm-home__factband-main > span { font-size: 13px; }
  .wbm-home__factband-inner > a { grid-column: 1; }
  .wbm-home__steps { grid-template-columns: 1fr; gap: 38px; }
  .wbm-home__step h3 { margin: 24px 0 10px; }
  .wbm-home__process-link { margin-top: 39px; }
  .wbm-home__contact-copy > p:not(.wbm-home__intro-line) { font-size: 15px; }
  .wbm-home__form { padding: 24px 19px; }
  .wbm-home__form-head h3 { font-size: 26px; }
  .wbm-home__fields { grid-template-columns: 1fr; gap: 18px; }
  .wbm-home__form-footer { flex-direction: column; align-items: stretch; gap: 17px; }
  .wbm-home__form-footer p { max-width: none; }
  .wbm-home__form-footer button { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .wbm-home *, .wbm-home *::before, .wbm-home *::after { transition: none !important; scroll-behavior: auto !important; }
}
</style>

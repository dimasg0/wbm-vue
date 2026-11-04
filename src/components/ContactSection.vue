<script setup>
import { ref } from 'vue'

const status = ref('')

async function sendForm(event) {
  const form = event.target
  const data = Object.fromEntries(new FormData(form).entries())
  status.value = 'Ihre Anfrage wird gesendet...'

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.message)

    status.value = 'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.'
    form.reset()
  } catch (error) {
    status.value = 'Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
    console.error(error)
  }
}
</script>

<template>
  <section class="content contact" id="kontakt">
    <div class="wrap contact-grid">
      <div class="contact-copy">
        <span class="eyebrow">Kontakt</span>
        <h2>Bereit für den nächsten Schritt?</h2>
        <p>
          Erzählen Sie uns kurz von Ihrem Vorhaben. Wir melden uns persönlich bei Ihnen und besprechen, wie wir Sie
          unterstützen können.
        </p>
        <div class="contact-info">
          <div><b>Telefon</b><span>+49 (0) 000 0000000</span></div>
          <div><b>E-Mail</b><span>hallo@x-move.de</span></div>
          <div><b>Einsatzgebiet</b><span>Ihre Region — sprechen Sie uns an.</span></div>
        </div>
      </div>

      <form class="form" id="contactForm" @submit.prevent="sendForm">
        <h3>Unverbindlich anfragen</h3>
        <p>Ein paar Angaben genügen – wir kümmern uns um den Rest.</p>

        <div class="fields">
          <div class="field">
            <label for="name">Name *</label>
            <input id="name" name="name" type="text" placeholder="Ihr Name" required>
          </div>

          <div class="field">
            <label for="phone">Telefon *</label>
            <input id="phone" name="phone" type="tel" placeholder="+49 ..." required>
          </div>

          <div class="field full">
            <label for="email">E-Mail *</label>
            <input id="email" name="email" type="email" placeholder="name@beispiel.de" required>
          </div>

          <div class="field full">
            <label for="service">Wobei dürfen wir helfen?</label>
            <select id="service" name="service">
              <option value="">Bitte Leistung auswählen</option>
              <option>Privatumzug</option>
              <option>Firmenumzug</option>
              <option>Transportdienstleistung</option>
              <option>Verpackungsservice</option>
              <option>Entrümpelung / Haushaltsauflösung</option>
              <option>Reinigung</option>
              <option>Sonstiges</option>
            </select>
          </div>

          <div class="field full">
            <label for="message">Ihre Nachricht</label>
            <textarea
              id="message"
              name="message"
              placeholder="Erzählen Sie uns kurz von Ihrem Vorhaben ..."
              required
            ></textarea>
          </div>
        </div>

        <div class="form-foot">
          <small>
            Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung
            Ihrer Anfrage zu.
          </small>
          <button class="submit" type="submit">Anfrage senden ↗</button>
        </div>

        <p id="formStatus" role="status">{{ status }}</p>
      </form>
    </div>
  </section>
</template>
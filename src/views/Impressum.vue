<template>
  <main class="legal-page">
    <div class="wrap">
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Musterfirma GmbH<br>
        Max Mustermann<br>
        Musterstraße 12<br>
        70173 Stuttgart<br>
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: +49 (0) 711 12345678<br>
        E-Mail: info@musterfirma.de
      </p>
    </div>
  </main>
</template>

<style scoped>
.legal-page {
  padding: 140px 0 80px;
}
.legal-page h1 {
  font: 800 clamp(36px, 5vw, 56px) / 1.05 var(--ff-head);
  letter-spacing: -0.05em;
  margin-bottom: 28px;
}
.legal-page h2 {
  font: 700 22px / 1.2 var(--ff-head);
  margin: 28px 0 8px;
}
</style>
<template>
  <footer>
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <RouterLink class="brand" to="/">
            <span>WBM<small style="color:#b5b7aa">WALDEMAR BOHR MOBIL</small></span>
          </RouterLink>
          <p>Umzüge, Transporte und Services rund um Ihre Immobilie. Sorgfältig geplant. Zuverlässig umgesetzt.</p>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <b>Navigation</b>

            <RouterLink :to="{ path: '/', hash: '#leistungen' }">Leistungen</RouterLink>
            <RouterLink to="/fuhrpark">Fuhrpark</RouterLink>
            <RouterLink to="/arbeiten">Arbeiten</RouterLink>
            <RouterLink to="/kontakt">Kontakt</RouterLink>
          </div>
          <div class="footer-col">
            <b>Kontakt</b>
            <a href="tel:+490000000000">+49 (0) 000 0000000</a>
            <a href="mailto:hallo@x-move.de">hallo@x-move.de</a>
            <RouterLink :to="{ path: '/', hash: '#kontakt' }">Anfrage senden</RouterLink>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 WBM – Waldemar Bohr Mobil. Alle Rechte vorbehalten.</span>
        <RouterLink to="/impressum">Impressum</RouterLink>
      </div>
    </div>
  </footer>
</template>
<script setup>
import AppLogo from './AppLogo.vue'
</script>

<template>
  <header>
    <div class="wrap">
      <nav class="nav">
        <RouterLink class="brand" to="/" aria-label="WBM – Startseite">
          <AppLogo />
        </RouterLink>

        <div class="navlinks">
          <RouterLink :to="{ path: '/', hash: '#leistungen' }">Leistungen</RouterLink>
          <RouterLink to="/fuhrpark">Fuhrpark</RouterLink>
          <RouterLink to="/arbeiten">Arbeiten</RouterLink>
          <RouterLink to="/kontakt">Kontakt</RouterLink>
        </div>

        <div class="nav-actions">
          <RouterLink class="pill" :to="{ path: '/', hash: '#kontakt' }">Kontakt aufnehmen</RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style>
/* меню и кнопка собраны в группу справа */
.nav .navlinks {
  margin-left: auto;
  margin-right: 36px;
  gap: 34px;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: var(--ink);
}

/* кнопка: прямоугольник со скруглением 6px */
.nav .nav-actions .pill {
  height: 46px;
  padding: 0 24px;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.03em;
}
</style>
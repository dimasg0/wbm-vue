<script setup>
import logo from '../assets/Logo.png'
</script>

<template>
  <header>
    <div class="wrap">
      <nav class="nav">
        <RouterLink class="brand" to="/">
          <!-- <img :src="logo" alt="WBM – Waldemar Bohr Mobil" class="brand-logo"> -->
        </RouterLink>

        <RouterLink :to="{ path: '/', hash: '#leistungen' }">Leistungen</RouterLink>
        <RouterLink to="/fuhrpark">Fuhrpark</RouterLink>
        <RouterLink to="/arbeiten">Arbeiten</RouterLink>
        <RouterLink to="/kontakt">Kontakt</RouterLink>
        <div class="nav-actions">
          <RouterLink class="pill" :to="{ path: '/', hash: '#kontakt' }">Kontakt aufnehmen</RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.brand-logo {
  height: 56px;
  width: auto;
}
</style>
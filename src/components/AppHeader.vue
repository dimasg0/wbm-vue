<script setup>
import AppLogo from './AppLogo.vue'
</script>

<template>
  <header>
    <div class="wrap">
      <nav class="nav">
        <a class="brand" href="#start">
          <AppLogo />
        </a>

        <div class="navlinks">
          <a href="#leistungen">Leistungen</a>
          <a href="#unternehmen">Über uns</a>
          <a href="#ablauf">So arbeiten wir</a>
          <a href="#kontakt">Kontakt</a>
        </div>

        <div class="nav-actions">
          <a class="pill" href="#kontakt">Kontakt aufnehmen</a>
        </div>
      </nav>
    </div>
  </header>
</template>
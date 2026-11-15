<!-- <script setup>
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
.nav .navlinks {
  margin-left: auto;
  margin-right: 36px;
  gap: 34px;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: var(--ink);
}

.nav .nav-actions .pill {
  height: 46px;
  padding: 0 24px;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.03em;
}
</style> -->




<script setup>
import { ref } from 'vue'
import AppLogo from './AppLogo.vue'

const menuOpen = ref(false)
const closeMenu = () => { menuOpen.value = false }
</script>

<template>
  <header class="wbm-site-header">
    <div class="wrap">
      <nav class="nav wbm-nav" aria-label="Hauptnavigation">
        <RouterLink
          class="brand wbm-brand"
          to="/"
          aria-label="WBM – Startseite"
          @click="closeMenu"
        >
          <AppLogo />
        </RouterLink>

        <div
          class="navlinks wbm-navlinks"
          :class="{ 'is-open': menuOpen }"
          id="wbm-navigation"
        >
          <RouterLink
            :to="{ path: '/', hash: '#leistungen' }"
            @click="closeMenu"
          >Leistungen</RouterLink>

          <RouterLink to="/fuhrpark" @click="closeMenu">
            Fuhrpark
          </RouterLink>

          <RouterLink to="/arbeiten" @click="closeMenu">
            Arbeiten
          </RouterLink>

          <RouterLink to="/kontakt" @click="closeMenu">
            Kontakt
          </RouterLink>

          <RouterLink
            class="wbm-mobile-contact"
            :to="{ path: '/', hash: '#kontakt' }"
            @click="closeMenu"
          >
            Kontakt aufnehmen
          </RouterLink>
        </div>

        <div class="nav-actions wbm-nav-actions">
          <RouterLink
            class="pill wbm-nav-cta"
            :to="{ path: '/', hash: '#kontakt' }"
          >
            Kontakt aufnehmen
          </RouterLink>
        </div>

        <button
          class="wbm-menu-trigger"
          type="button"
          aria-label="Menü öffnen oder schließen"
          aria-controls="wbm-navigation"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <span></span>
          <span></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.wbm-site-header {
  position: relative;
  z-index: 30;
  padding: 17px 0 13px;
  background: var(--bg);
}

.wbm-nav {
  position: relative;
  min-height: 70px;
  padding: 0 5px;
  gap: 24px;
}

.wbm-nav .wbm-brand {
  flex: 0 0 auto;
}

.wbm-nav .wbm-navlinks {
  margin-left: auto;
  margin-right: 10px;
  gap: clamp(18px, 2.4vw, 34px);
  align-items: center;
  font: 500 13px/1.4 system-ui, -apple-system, sans-serif;
  letter-spacing: .005em;
  color: #27354a;
}

.wbm-navlinks a {
  padding: 10px 0;
  transition: color .2s ease;
}

.wbm-navlinks a:hover {
  color: #a52531;
  opacity: 1;
}

.wbm-nav .wbm-nav-cta {
  height: 45px;
  border-radius: 5px;
  padding: 0 21px;
  background: #13243a;
  font: 600 12px system-ui, -apple-system, sans-serif;
  letter-spacing: 0;
  transition: background .2s ease, transform .2s ease;
}

.wbm-nav .wbm-nav-cta:hover {
  background: #263b54;
  transform: translateY(-1px);
}

.wbm-menu-trigger,
.wbm-mobile-contact {
  display: none;
}

@media (max-width: 920px) {
  .wbm-nav .wbm-navlinks {
    display: none;
    position: absolute;
    z-index: 10;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    margin: 0;
    padding: 16px 23px;
    background: #fff;
    border: 1px solid #e0e5eb;
    box-shadow: 0 20px 40px rgba(13, 29, 48, .12);
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  .wbm-nav .wbm-navlinks.is-open {
    display: flex;
  }

  .wbm-navlinks a {
    padding: 13px 3px;
    border-bottom: 1px solid #edf0f3;
  }

  .wbm-navlinks a:last-child {
    border: 0;
  }

  .wbm-nav .wbm-nav-actions {
    margin-left: auto;
  }

  .wbm-menu-trigger {
    display: flex;
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    border: 1px solid #d5dde6;
    border-radius: 5px;
    background: transparent;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 6px;
    cursor: pointer;
  }

  .wbm-menu-trigger span {
    width: 20px;
    height: 1.5px;
    background: #13243a;
  }
}

@media (max-width: 600px) {
  .wbm-site-header {
    padding: 12px 0 8px;
  }

  .wbm-nav {
    min-height: 61px;
    padding: 0 2px;
  }

  .wbm-nav .wbm-nav-actions {
    display: none;
  }

  .wbm-menu-trigger {
    margin-left: auto;
  }

  .wbm-mobile-contact {
    display: block;
    font-weight: 700;
    color: #a52531;
  }
}
</style>

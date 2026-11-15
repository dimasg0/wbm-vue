<script setup>
import { ref } from 'vue'

// Новые фотографии, не из папки WBM. Это временные иллюстрации.
const photo = ref('https://images.pexels.com/photos/4246099/pexels-photo-4246099.jpeg?auto=compress&cs=tinysrgb&w=1500')
const photoFailed = ref(false)

function handlePhotoError() {
  if (photo.value.includes('/4246099/')) {
    photo.value = 'https://images.pexels.com/photos/4246009/pexels-photo-4246009.jpeg?auto=compress&cs=tinysrgb&w=1500'
  } else {
    photoFailed.value = true
  }
}
</script>

<template>
  <section class="wbm-bellhop" aria-labelledby="wbm-bellhop-title">
    <div class="wrap">
      <div class="wbm-bellhop__layout">
        <div class="wbm-bellhop__copy">
          <p class="wbm-bellhop__location">Korntal-Münchingen &amp; Umgebung</p>
          <h1 id="wbm-bellhop-title">Umziehen kann einfach sein.</h1>
          <p class="wbm-bellhop__description">
            Privatumzüge, Firmenumzüge, Transporte und Entrümpelungen –
            mit persönlicher Abstimmung und einem klaren Plan für Ihren Umzug.
          </p>
          <div class="wbm-bellhop__actions">
            <a class="wbm-bellhop__primary" href="#kontakt">Umzug anfragen</a>
            <a class="wbm-bellhop__secondary" href="#leistungen">Leistungen ansehen <span aria-hidden="true">→</span></a>
          </div>
          <p class="wbm-bellhop__detail">Transportdienstleistungen bis 3,5 t zGG</p>
        </div>

        <figure class="wbm-bellhop__figure">
          <div class="wbm-bellhop__photo" :class="{ 'wbm-bellhop__photo--empty': photoFailed }">
            <img
              v-if="!photoFailed"
              :src="photo"
              alt="Zwei Personen tragen beim Umzug einen Karton über eine Treppe"
              fetchpriority="high"
              decoding="async"
              @error="handlePhotoError"
            />
          </div>
          <figcaption>Symbolbild · Foto: Ketut Subiyanto / Pexels</figcaption>
        </figure>
      </div>

      <nav class="wbm-bellhop__services" aria-label="WBM Leistungen">
        <a href="#leistungen"><span>01</span> Umzüge</a>
        <a href="#leistungen"><span>02</span> Transporte</a>
        <a href="#leistungen"><span>03</span> Verpackungsservice</a>
        <a href="#leistungen"><span>04</span> Entrümpelung</a>
      </nav>
    </div>
  </section>
</template>

<style scoped>
/* Inspired by Bellhop's airy layout, customized for WBM. Only this component. */
.wbm-bellhop {
  --wbm-navy: #172b45;
  --wbm-red: #bc2939;
  --wbm-muted: #58677b;
  --wbm-line: #dce2e9;
  background: transparent;
  color: var(--wbm-navy);
  padding: 38px 0 14px;
  font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
}
.wbm-bellhop * { box-sizing: border-box; }
.wbm-bellhop__layout {
  display: grid;
  grid-template-columns: minmax(0, .93fr) minmax(0, 1.07fr);
  align-items: center;
  gap: clamp(40px, 5vw, 86px);
  min-height: 565px;
}
.wbm-bellhop__copy {
  min-width: 0;
  padding: 8px 0 28px clamp(0px, 2.2vw, 30px);
  animation: wbm-copy-arrive .7s ease both;
}
.wbm-bellhop__location {
  color: var(--wbm-muted);
  font: 600 14px/1.5 'Manrope', system-ui, sans-serif;
  letter-spacing: 0;
  margin: 0 0 25px;
}
.wbm-bellhop__copy h1 {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  color: var(--wbm-navy);
  font-size: clamp(45px, 4.15vw, 65px);
  font-weight: 800;
  line-height: 1.11;
  letter-spacing: -.053em;
  max-width: 590px;
  margin: 0 0 27px;
  text-wrap: balance;
}
.wbm-bellhop__description {
  font-family: 'Manrope', system-ui, sans-serif;
  max-width: 425px;
  color: #4f5e70;
  font-size: clamp(15px, 1.15vw, 17px);
  line-height: 1.78;
  font-weight: 400;
  margin: 0 0 29px;
}
.wbm-bellhop__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 23px;
}
.wbm-bellhop__primary {
  display: inline-flex;
  min-height: 54px;
  align-items: center;
  justify-content: center;
  padding: 0 27px;
  border-radius: 7px;
  background: var(--wbm-red);
  color: white;
  font: 700 14px/1.2 'Manrope', system-ui, sans-serif;
  transition: background .2s ease, transform .2s ease;
}
.wbm-bellhop__primary:hover,
.wbm-bellhop__primary:focus-visible {
  background: #a91d2e;
  transform: translateY(-2px);
}
.wbm-bellhop__secondary {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--wbm-navy);
  font: 700 14px/1.2 'Manrope', system-ui, sans-serif;
  padding: 11px 0;
  border-bottom: 1px solid rgba(23, 43, 69, .4);
  transition: border-color .2s ease, color .2s ease;
}
.wbm-bellhop__secondary:hover,
.wbm-bellhop__secondary:focus-visible {
  color: var(--wbm-red);
  border-color: var(--wbm-red);
}
.wbm-bellhop__secondary span { font-size: 19px; font-weight: 400; }
.wbm-bellhop__detail {
  margin: 31px 0 0;
  color: #6b7888;
  font: 500 12px/1.5 'Manrope', system-ui, sans-serif;
}

/* Photography: architectural cropping, not a separate dark panel */
.wbm-bellhop__figure {
  margin: 0;
  width: 100%;
  min-width: 0;
  animation: wbm-photo-arrive .9s cubic-bezier(.2, .7, .2, 1) both;
}
.wbm-bellhop__photo {
  position: relative;
  background: #dcd7cd;
  width: 100%;
  height: clamp(430px, 44vw, 580px);
  overflow: hidden;
  border-radius: 135px 10px 10px 10px;
}
.wbm-bellhop__photo img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center 47%;
}
.wbm-bellhop__photo--empty {
  background: linear-gradient(135deg, #d8dce0, #b7c3cb);
}
.wbm-bellhop__figure figcaption {
  font: 400 10px/1.4 'Manrope', system-ui, sans-serif;
  color: #7f8996;
  text-align: right;
  margin-top: 9px;
}

/* Practical service navigation; no fake metrics */
.wbm-bellhop__services {
  margin-top: 29px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--wbm-line);
  border-bottom: 1px solid var(--wbm-line);
}
.wbm-bellhop__services a {
  min-width: 0;
  padding: 22px 15px 22px 0;
  font: 650 14px/1.4 'Manrope', system-ui, sans-serif;
  color: var(--wbm-navy);
  display: flex;
  align-items: baseline;
  gap: 13px;
  transition: color .2s ease;
}
.wbm-bellhop__services a + a {
  border-left: 1px solid var(--wbm-line);
  padding-left: 22px;
}
.wbm-bellhop__services a:hover,
.wbm-bellhop__services a:focus-visible { color: var(--wbm-red); }
.wbm-bellhop__services span {
  color: #9aa4b2;
  font: 500 11px/1 'Manrope', system-ui, sans-serif;
}

@keyframes wbm-copy-arrive {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes wbm-photo-arrive {
  from { opacity: 0; transform: translateY(19px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 990px) {
  .wbm-bellhop { padding-top: 24px; }
  .wbm-bellhop__layout {
    gap: 28px;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    min-height: 480px;
  }
  .wbm-bellhop__copy { padding-left: 0; }
  .wbm-bellhop__copy h1 { font-size: clamp(39px, 5vw, 53px); }
  .wbm-bellhop__photo { height: 480px; border-top-left-radius: 96px; }
  .wbm-bellhop__services a { font-size: 12px; gap: 8px; }
  .wbm-bellhop__services a + a { padding-left: 14px; }
}
@media (max-width: 720px) {
  .wbm-bellhop { padding: 22px 0 12px; }
  .wbm-bellhop__layout {
    grid-template-columns: 1fr;
    min-height: 0;
    gap: 32px;
  }
  .wbm-bellhop__copy { padding: 0; }
  .wbm-bellhop__location { margin-bottom: 15px; font-size: 12px; }
  .wbm-bellhop__copy h1 {
    font-size: clamp(38px, 9vw, 57px);
    max-width: 580px;
    margin-bottom: 18px;
  }
  .wbm-bellhop__description { max-width: 540px; margin-bottom: 21px; font-size: 14px; }
  .wbm-bellhop__detail { margin-top: 20px; font-size: 11px; }
  .wbm-bellhop__photo { height: clamp(280px, 70vw, 440px); border-top-left-radius: 90px; }
  .wbm-bellhop__services { grid-template-columns: 1fr 1fr; margin-top: 22px; }
  .wbm-bellhop__services a { padding: 17px 8px 17px 0; font-size: 13px; }
  .wbm-bellhop__services a:nth-child(3) { border-left: 0; padding-left: 0; }
  .wbm-bellhop__services a:nth-child(n + 3) { border-top: 1px solid var(--wbm-line); }
}
@media (max-width: 390px) {
  .wbm-bellhop__actions { gap: 14px; }
  .wbm-bellhop__primary { min-height: 48px; padding: 0 15px; font-size: 12px; }
  .wbm-bellhop__secondary { font-size: 12px; gap: 6px; }
  .wbm-bellhop__services a { font-size: 11px; gap: 7px; }
  .wbm-bellhop__services a + a { padding-left: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  .wbm-bellhop__copy, .wbm-bellhop__figure { animation: none; }
  .wbm-bellhop__primary, .wbm-bellhop__secondary, .wbm-bellhop__services a { transition: none; }
}
</style>

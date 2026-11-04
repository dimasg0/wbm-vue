<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { initHeroScene } from '../scenes/heroScene.js'

const sceneBox = ref(null)
let stopScene

onMounted(() => {
  stopScene = initHeroScene(sceneBox.value)
})

onUnmounted(() => {
  if (stopScene) stopScene()
})
</script>

<template>
  <section class="hero">
    <div class="wrap">
      <div class="hero-frame">
        <div class="hero-bg"></div>
        <!-- <div class="hero-scene" id="hero-scene" aria-hidden="true"></div> -->
        <div class="hero-scene" ref="sceneBox" aria-hidden="true"></div>

        <div class="hero-content">
          <div class="hero-copy">
            <span class="eyebrow">Mehr als nur ein Umzug</span>
            <h1>Ein neuer Ort.<br><span>Ein gutes Gefühl.</span></h1>

            <p>
              Ob Umzug, Transport oder Entrümpelung – wir kümmern uns zuverlässig um alles,
              was in Bewegung kommt. Persönlich, sorgfältig und unkompliziert.
            </p>

            <a class="hero-cta" href="#leistungen">Leistungen <i>↗</i></a>
            <a class="hero-cta" href="#kontakt">Kontakt <i>↗</i></a>
          </div>
        </div>

        <div class="hero-bottom">
          <small>Privat · Gewerbe · Transport bis 3,5 t zGG</small>
          <strong>Mit Sorgfalt von Anfang bis Ankunft.</strong>
        </div>
      </div>
    </div>
  </section>
</template>
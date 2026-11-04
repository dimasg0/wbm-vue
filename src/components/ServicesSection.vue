<script setup>
import { services } from '../data/services.js'
</script>

<template>
  <section class="content services" id="leistungen">
    <div class="wrap">
      <div class="section-top">
        <div>
          <span class="eyebrow">Unser Leistungsangebot</span>
          <h2>Alles aus einer Hand.<br>Genau so, wie Sie es brauchen.</h2>
        </div>
        <p>
          Von der ersten Kiste bis zur letzten Fahrt: Wählen Sie einzelne Leistungen oder kombinieren Sie mehrere
          Services zu einem passenden Gesamtpaket.
        </p>
      </div>

      <div class="service-grid">

        <!-- <article class="service-card" v-for="service in services" :key="service.slug">
          <div class="service-img">
            <img :src="service.image" :alt="service.alt">
            <span class="service-no">{{ service.label }}</span>
          </div>
          <div class="service-body">
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
            <ul class="service-list">
              <li v-for="item in service.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </article> -->


        <RouterLink class="service-card" v-for="service in services" :key="service.slug" :to="'/' + service.slug">
          <div class="service-img">
            <img :src="service.image" :alt="service.alt">
            <span class="service-no">{{ service.label }}</span>
          </div>
          <div class="service-body">
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
            <ul class="service-list">
              <li v-for="item in service.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </RouterLink>

      </div>
    </div>
  </section>
</template>
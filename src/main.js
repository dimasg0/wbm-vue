import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import './assets/hero-scene.css'
import './assets/typography.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

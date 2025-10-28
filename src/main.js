// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Global Styles
import './assets/design-token.css'
import './index.css' //  Tailwind entry file


// Vuetify setup
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({ components, directives })

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(vuetify)
app.mount('#app')

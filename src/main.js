import { createApp } from 'vue'
import storage from './storage/storage.js'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(storage)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/global.scss'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'

window.Pusher = Pusher

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
})

const app = createApp(App)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import { registerSW } from 'virtual:pwa-register'
import Vue3ColorPicker from "vue3-colorpicker"
import "vue3-colorpicker/style.css"
import './assets/style.css'
const intervalMS = 60 * 60 * 1000
const updateSW = registerSW({
  onNeedRefresh(r) {
    r && setInterval(() => {
        r.update()
    }, intervalMS)
  },
  onOfflineReady() {},
})

const app = createApp(App)
app.use(updateSW)
app.use(Vue3ColorPicker)
app.mount('#app')

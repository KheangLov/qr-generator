import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import { registerSW } from 'virtual:pwa-register'
import Vue3ColorPicker from 'vue3-colorpicker'
// @ts-ignore
import QrReader from 'vue3-qr-reader'
// @ts-ignore
import LitepieDatepicker from 'litepie-datepicker'
import 'vue3-colorpicker/style.css'
import './assets/style.css'

const intervalMS = 60 * 60 * 1000
const updateSW = registerSW({
  onNeedRefresh(r: any) {
    r && setInterval(() => {
        r.update()
    }, intervalMS)
  },
  onOfflineReady() {},
})

const app = createApp(App)
app.use(updateSW)
app.use(Vue3ColorPicker)
app.use(QrReader)
app.use(LitepieDatepicker)
app.mount('#app')

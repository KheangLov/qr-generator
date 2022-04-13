import { createApp } from 'vue'
// @ts-ignore
import { registerSW } from 'virtual:pwa-register'
// @ts-ignore
import QrReader from 'vue3-qr-reader'
// @ts-ignore
import LitepieDatepicker from 'litepie-datepicker'
import Vue3ColorPicker from 'vue3-colorpicker'
import App from './App.vue'
import 'vue3-colorpicker/style.css'
import './assets/style.css'

const app = createApp(App)

if ('serviceWorker' in navigator) {
    const intervalMS = 60 * 60 * 1000
    const updateSW = registerSW({
        immediate: true,
        onNeedRefresh(r: any) {
            r && setInterval(() => r.update(), intervalMS)
        },
    })

    app.use(updateSW)
}

app.use(Vue3ColorPicker)
app.use(QrReader)
app.use(LitepieDatepicker)
app.mount('#app')

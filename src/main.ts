import { createApp } from 'vue'
// @ts-ignore
import { registerSW } from 'virtual:pwa-register'
import Vue3ColorPicker from 'vue3-colorpicker'
// @ts-ignore
import QrReader from 'vue3-qr-reader'
// @ts-ignore
import LitepieDatepicker from 'litepie-datepicker'
// @ts-ignore
import Toastify from 'toastify-js'
import App from './App.vue'  
import 'vue3-colorpicker/style.css'
import './assets/style.css'

const app = createApp(App)

if ('serviceWorker' in navigator) {    
    const updateSW = registerSW({
        onNeedRefresh() {
            Toastify({
                text: `<h4 style='display: inline'>An update is available!</h4>
                    <br><br>
                    <a class='do-sw-update'>Click to update and reload</a>  `,
                escapeMarkup: false,
                gravity: "bottom",
                onClick() {
                    updateSW(true);
                }
            }).showToast();
        },
    })

    app.use(updateSW)
}

app.use(Vue3ColorPicker)
app.use(QrReader)
app.use(LitepieDatepicker)
app.mount('#app')

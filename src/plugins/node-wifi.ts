
// @ts-ignore
import wifi from 'node-wifi'

interface WifiInfo {
    ssid: string,
    password: string,
}

const wifiConnect = (wifiInfo: WifiInfo) => {
    wifi.connect(wifiInfo, () => console.log('Connected'))
}

export default {
    wifiConnect
}
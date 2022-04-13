import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

declare let self: ServiceWorkerGlobalScope

// @ts-ignore
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        // @ts-ignore
        self.skipWaiting()
    }    
})

clientsClaim()
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)
<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure as="nav" class="bg-gray-800 drop-shadow-lg border-0">
    <div class="container mx-auto">
      <div class="relative flex items-center justify-between sm:h-20 h-16">
        <div class="flex-1 flex items-center justify-center justify-items-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-8 w-8 mr-3" src="/pwa-512x512.png" alt="QR Generator" />
            <h2 class="font-bold tracking-widest uppercase text-xl text-white">QR Generator</h2>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
})
</script>
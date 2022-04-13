<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f0f3f4;
}

.fullscreen {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

#qr-code {
  max-width: 300px !important;
  max-height: 300px !important;
}

#qr-code canvas {
  max-width: 300px !important;
  width: 100% !important;
  border-radius: 0.5rem !important;
}

.checkbox {
  position: relative;
  overflow: hidden;
}

.checkbox__input {
  position: absolute;
  top: -100px;
  left: -100px;
}
 
.checkbox__inner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #626262;
  background: transparent no-repeat center;
}

.checkbox__input:checked + .checkbox__inner {
  border-color: #52C6C4;
  background-color: #52C6C4;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='14px' height='10px' viewBox='0 0 14 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 59.1 (86144) - https://sketch.com --%3E%3Ctitle%3Echeck%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='ios_modification' transform='translate(-27.000000, -191.000000)' fill='%23FFFFFF' fill-rule='nonzero'%3E%3Cg id='Group-Copy' transform='translate(0.000000, 164.000000)'%3E%3Cg id='ic-check-18px' transform='translate(25.000000, 23.000000)'%3E%3Cpolygon id='check' points='6.61 11.89 3.5 8.78 2.44 9.84 6.61 14 15.56 5.05 14.5 4'%3E%3C/polygon%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 14px 10px;
}

</style>

<script lang="ts">
import { defineComponent } from 'vue'
import QRCodeStyling, {
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  FileExtension,
  Gradient,
  GradientType
} from 'qr-code-styling'
import { CameraIcon, LightningBoltIcon, SwitchHorizontalIcon, ExternalLinkIcon } from "@heroicons/vue/outline"
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import Navbar from './components/Navbar.vue'

interface Vcard {
  firstname: string,
  lastname: string,
  bd: Array<string>|string,
  gender: string,
  address: string,
  city: string,
  postal: string,
  region: string,
  country: string,
  tel: string,
  email: string,
  web: string,
  job: string,
  company: string,
}

declare type CameraType = 'auto' | 'rear' | 'front'

export default defineComponent({
  components: {
    Navbar,
    CameraIcon,
    LightningBoltIcon,
    SwitchHorizontalIcon,
    ExternalLinkIcon,
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  mounted() {
    this.loadQR()
  },
  watch: {
    size(val) {
      if (val < 300) {
        val = 300
      }
      this.options.width = val
      this.options.height = val
    },
    activeKeyBg(val) {
      if (val === 'gradient') {
        const gradientObj: Gradient = {
          type: 'linear' as GradientType,
          rotation: parseInt(this.gradientBgArray[0]),
          colorStops: this.gradientBgArray.slice(1, 3).map((v, i) => ({
            offset: i,
            color: this.rgbaToHex(v.match(/\d+/g)!.slice(0, 3)) as string
          })),
        }
        this.options.backgroundOptions.gradient = gradientObj 
        const refEle = this.$refs['container_4'] as HTMLCollection
        const findChild = refEle[0].firstChild as HTMLElement
        setTimeout(() => this.accordionMaxHeight = findChild.offsetHeight, 500)
      } else {
        this.options.backgroundOptions.gradient = false as unknown as Gradient
      }
    },    
    gradientBgType(val) {
      if (this.options.backgroundOptions.gradient) {
        this.options.backgroundOptions.gradient.type = val
      }
    },
    gradientBg(val) {    
      this.gradientBgArray = this.splitLinear(val)
      if (this.activeKeyBg === 'gradient') {          
        this.options.backgroundOptions.gradient = {
          type: this.gradientBgType as GradientType,
          rotation: parseInt(this.gradientBgArray[0]),
          colorStops: this.gradientBgArray.slice(1, 3).map((v, i) => ({
            offset: i,
            color: this.rgbaToHex(v.match(/\d+/g)!.slice(0, 3)) as string
          })),
        }
      }
    },
    activeKeyDot(val) {
      if (val === 'gradient') {
        this.options.cornersDotOptions.gradient = {
          type: 'linear' as GradientType,
          rotation: parseInt(this.gradientDotArray[0]),
          colorStops: this.gradientDotArray.slice(1, 3).map((v, i) => ({
            offset: i,
            color: this.rgbaToHex(v.match(/\d+/g)!.slice(0, 3)) as string
          })),
        }    
        const refEle = this.$refs['container_3'] as HTMLCollection
        const findChild = refEle[0].firstChild as HTMLElement    
        setTimeout(() => this.accordionMaxHeight = findChild.offsetHeight, 500)
      } else {
        this.options.cornersDotOptions.gradient = false as unknown as Gradient
      }
    },    
    gradientDotType(val) {
      if (this.options.cornersDotOptions.gradient) {
        this.options.cornersDotOptions.gradient.type = val
      }
    },
    gradientDot(val) {    
      this.gradientDotArray = this.splitLinear(val)
      if (this.activeKeyDot === 'gradient') {          
        this.options.cornersDotOptions.gradient = {
          type: this.gradientDotType as GradientType,
          rotation: parseInt(this.gradientDotArray[0]),
          colorStops: this.gradientDotArray.slice(1, 3).map((v, i) => ({
            offset: i,
            color: this.rgbaToHex(v.match(/\d+/g)!.slice(0, 3)) as string
          })),
        }
      }
    },
    activeKeySquare(val) {
      if (val === 'gradient') {
        this.options.cornersSquareOptions.gradient = {
          type: 'linear',
          rotation: parseInt(this.gradientSquareArray[0]),
          colorStops: this.gradientSquareArray.slice(1, 3).map((v, i) => ({
            offset: i,
            color: this.rgbaToHex(v.match(/\d+/g)!.slice(0, 3)) as string
          })),
        }        
        const refEle = this.$refs['container_2'] as HTMLCollection
        const findChild = refEle[0].firstChild as HTMLElement   
        setTimeout(() => this.accordionMaxHeight = findChild.offsetHeight, 500)
      } else {
        this.options.cornersSquareOptions.gradient = false as unknown as Gradient
      }
    },    
    gradientSquareType(val) {
      if (this.options.cornersSquareOptions.gradient) {
        this.options.cornersSquareOptions.gradient.type = val
      }
    },
    gradientSquare(val) {    
      this.gradientSquareArray = this.splitLinear(val)
      if (this.activeKeySquare === 'gradient') {          
        this.options.cornersSquareOptions.gradient = {
          type: this.gradientSquareType as GradientType,
          rotation: parseInt(this.gradientSquareArray[0]),
          colorStops: this.gradientSquareArray.slice(1, 3).map((v, i) => ({
            offset: i,
            color: this.rgbaToHex(v.match(/\d+/g)!.slice(0, 3)) as string
          })),
        }
      }
    },
    activeKey(val) {
      if (val === 'gradient') {
        this.options.dotsOptions.gradient = {
          type: 'linear',
          rotation: parseInt(this.gradientArray[0]),
          colorStops: this.gradientArray.slice(1, 3).map((v, i) => ({
            offset: i,
            color: this.rgbaToHex(v.match(/\d+/g)!.slice(0, 3)) as string
          })),
        }        
        const refEle = this.$refs['container_1'] as HTMLCollection
        const findChild = refEle[0].firstChild as HTMLElement   
        setTimeout(() => this.accordionMaxHeight = findChild.offsetHeight, 100)
      } else {
        this.options.dotsOptions.gradient = false as unknown as Gradient
      }
    },
    gradientType(val) {
      if (this.options.dotsOptions.gradient) {
        this.options.dotsOptions.gradient.type = val
      }
    },
    gradient(val) {    
      this.gradientArray = this.splitLinear(val)
      if (this.activeKey === 'gradient') {          
        this.options.dotsOptions.gradient = {
          type: this.gradientType as GradientType,
          rotation: parseInt(this.gradientArray[0]),
          colorStops: this.gradientArray.slice(1, 3).map((v, i) => ({
            offset: i,
            color: this.rgbaToHex(v.match(/\d+/g)!.slice(0, 3)) as string
          })),
        }
      }
    },
    options: {
      handler() {    
        if (!this.options.data) {
          setTimeout(() => this.qrCode.update(this.options), 500)
        } else {
          if (this.options.imageOptions.imageSize > 1) {
            this.options.imageOptions.imageSize = 1
          } else if (this.options.imageOptions.imageSize < 0) {
            this.options.imageOptions.imageSize = 0
          }

          if (this.options.width >= 300 && this.options.height >= 300) {
            setTimeout(() => {
              if (this.$refs.qrCode) {
                this.loadQR()
              }
              setTimeout(() => this.qrCode.update(this.options), 500)
            }, 1000)
          }  
        }         
      },
      deep: true,
    },
    captureSelected(val) {
      if (!val.value) {
        const prox = this.$refs.qrCaptureUpload as any
        const ele = prox.$el as HTMLElement
        ele.removeAttribute('capture')
      }
    },
    form: {
      handler(val) {
        if (val.ssid && val.encrytion && val.password) {
          this.disableButton = false
        }
      },
      deep: true,
    },
    seletedAccordion(val) {
      if (val >= 0) {
        const refEle = this.$refs[`container_${val}`] as HTMLCollection 
        this.accordionMaxHeight = refEle[0].scrollHeight
      } else {
        this.accordionMaxHeight = 0
      }
    },
    fullscreen(enterFullscreen) {
      if (enterFullscreen) {
        this.requestFullscreen()
      } else {
        this.exitFullscreen()
      }
    },
  },
  methods: {
    onFullscreenChange() {
      this.fullscreen = document.fullscreenElement !== null
    },
    requestFullscreen() {
      const elem = this.$refs.wrapper as HTMLElement

      if (elem.requestFullscreen) {
        elem.requestFullscreen()
        // @ts-ignore
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        // @ts-ignore
        elem.mozRequestFullScreen()
        // @ts-ignore
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        // @ts-ignore
        elem.webkitRequestFullscreen()
        // @ts-ignore
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        // @ts-ignore
        elem.msRequestFullscreen()
      }
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        // @ts-ignore
      } else if (document.mozCancelFullScreen) { /* Firefox */
        // @ts-ignore
        document.mozCancelFullScreen()
        // @ts-ignore
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        // @ts-ignore
        document.webkitExitFullscreen()
        // @ts-ignore
      } else if (document.msExitFullscreen) { /* IE/Edge */
        // @ts-ignore
        document.msExitFullscreen()
      }
    },
    onToggle() {
      this.isOpen = !this.isOpen
    },
    loadQR() {
      const qrEle = this.$refs.qrCode as HTMLElement
      this.qrCode.append(qrEle)
    },
    handleVCard() {
      if (this.vcard.bd.length) {
        this.vcard.bd = this.vcard.bd[0]
      }

      this.options.data = 'BEGIN:VCARD\nVERSION:3.0\n'
      this.options.data += `N:${this.vcard.lastname};${this.vcard.firstname}\n`
      this.options.data += `FN:${this.vcard.firstname} ${this.vcard.lastname}\n`
      this.options.data += `BDAY:${this.vcard.bd}\n`
      this.options.data += `X-GENDER:${this.vcard.gender}\n`
      this.options.data += `ADR:;;${this.vcard.address};${this.vcard.city};${this.vcard.region};${this.vcard.postal};${this.vcard.country}\n`
      this.options.data += `TEL;CELL:${this.vcard.tel}\n`
      this.options.data += `EMAIL;WORK;INTERNET:${this.vcard.email}\n`
      this.options.data += `URL:${this.vcard.web}\n`
      this.options.data += `ORG:${this.vcard.company}\n`
      this.options.data += `TITLE:${this.vcard.job}\n`
      this.options.data += 'END:VCARD'
    },
    handleActiveKey(val: string) {
      this.activeKey = val
    },
    handleActiveKeySquare(val: string) {
      this.activeKeySquare = val
    },
    handleActiveKeyDot(val: string) {
      this.activeKeyDot = val
    },
    handleActiveKeyBg(val: string) {
      this.activeKeyBg = val
    },
    rgbaToHex(rgbs: Array<string>) {
      if (rgbs && rgbs.length === 3) {
        return `#${rgbs.map(v => `0${parseInt(v, 10).toString(16)}`.slice(-2)).join('')}`
      }
      return ''
    },
    splitLinear(str: string) {
      return str.substring(str.indexOf('(') + 1, str.lastIndexOf(')')).split(/,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/)
    },
    generateQr() {
      if (this.seletedButton === 0) {
        this.options.data = `WIFI:S:${this.form.ssid};T:${this.form.encrytion};P:${this.form.password};;`
        this.disableButton = true
      } else if (this.seletedButton === 1) {
        this.options.data = this.text_qr
      }
    },
    download() {
      this.qrCode.download({ extension: this.extension as FileExtension })
    },
    passwordVisible() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    handleUpload(e: any) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        this.options.image = reader.result as string
      }
      reader.onerror = error => {
        console.log('Error: ', error)
      }
    },
    async onInit(promise: Promise<any>) {
      try {
        const { capabilities } = await promise
        // console.log(capabilities)
        this.torchNotSupported = !capabilities.torch
        this.qrLoaded = true
      } catch (error: any) {
        const triedFrontCamera = this.camera === 'front'
        const triedRearCamera = this.camera === 'rear'

        if (error.name === 'OverconstrainedError') {
          if (triedRearCamera) {
            this.noRearCamera = true
          } else if (triedFrontCamera) {
            this.noFrontCamera = true
          }
        } else if (error.name === 'NotAllowedError') {
          this.noPermissionCamera = true
        } else if (error.name === 'NotFoundError') {
          this.noCamera = true
        } else if (error.name === 'NotSupportedError') {
          this.noServedCamera = true
        } else if (error.name === 'NotReadableError') {
          this.noReadableCamera = true
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.lackingFeature = true
        }

        console.error(error)
      }
    },
    onDecode(data: any) {
      this.scanResult = data
    },
    switchCamera() {
      if (this.noRearCamera && this.noFrontCamera) {
        this.camera = 'auto'
        this.noRearCamera = false
        this.noFrontCamera = false
      } else if (this.camera === 'front') {
        this.camera = 'rear'
      } else {
        this.camera = 'front'
      }
    },
  },
  data() {
    const size = 300
    const options = {
      width: size,
      height: size,
      data: 'WIFI:S:bora_down_5G;T:WPA;P:26119955_B0r@;;',
      image: '/favicon.ico',
      margin: 10,
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: 'Byte' as Mode,
        errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 20,
        crossOrigin: 'anonymous',
      },
      dotsOptions: {
        color: '#41b583',
        type: 'rounded' as DotType,
        gradient: false as unknown as Gradient
      },
      backgroundOptions: {
        color: '#ffffff',
        gradient: false as unknown as Gradient
      },
      cornersSquareOptions: {
        color: '#35495E',
        type: 'extra-rounded' as CornerSquareType,
        gradient: false as unknown as Gradient
      },
      cornersDotOptions: {
        color: '#35495E',
        type: 'dot' as CornerDotType,
        gradient: false as unknown as Gradient
      }
    }

    const captureOptions = [
      { text: "Rear Camera", value: "environment" },
      { text: "Front Camera", value: "user" },
      { text: "File Dialog", value: false },
    ]

    return {
      activeKey: 'pure',      
      gradient: '',
      gradientArray: [] as Array<string>,
      gradientType: 'linear',
      activeKeySquare: 'pure',
      gradientSquare: '',
      gradientSquareArray: [] as Array<string>,
      gradientSquareType: 'linear',
      activeKeyDot: 'pure',
      gradientDot: '',
      gradientDotArray: [] as Array<string>,
      gradientDotType: 'linear',
      activeKeyBg: 'pure',
      gradientBg: '',
      gradientBgArray: [] as Array<string>,
      gradientBgType: 'linear',
      size,
      passwordType: 'password',
      disableButton: true,
      form: {
        ssid: '',
        encrytion: 'WPA',
        password: '',
      },
      options,
      extension: 'svg',
      qrCode: new QRCodeStyling(options) as QRCodeStyling,
      seletedAccordion: -1,
      accordionMaxHeight: 0,
      accordionNames: [
        'Main Options',
        'Dots Options',
        'Corners Square Options',
        'Corners Dot Options',
        'Background Options',
      ],
      text_qr: '',
      seletedButton: 0,
      buttonTabs: [
        'WIFI',
        'Text',
        'vCard'
      ],
      vcard: {
        firstname: '',
        lastname: '',
        bd: [],
        gender: 'Male',
        address: '',
        city: '',
        postal: '',
        region: '',
        country: '',
        tel: '',
        email: '',
        web: '',
        job: '',
        company: '',
      } as Vcard,
      isOpen: false as boolean,
      torchActive: false as boolean,
      torchNotSupported: false as boolean,
      qrLoaded: false as boolean,
      camera: 'auto' as CameraType,
      noCamera: false as boolean,
      noRearCamera: false as boolean,
      noFrontCamera: false as boolean,
      noReadableCamera: false as boolean,
      noPermissionCamera: false as boolean,
      noServedCamera: false as boolean,
      lackingFeature: false as boolean,
      fullscreen: false as boolean,
      captureOptions,
      captureSelected: captureOptions[0],
      scanResult: '' as any,
    }
  }
})
</script>

<template>
  <Navbar />
  <div class="container mx-auto sm:py-10">
    <div class="w-full gap-10 md:flex">
      <div class="w-full md:w-3/5">
        <div class="text-left p-10 sm:drop-shadow-lg bg-white sm:rounded-lg">
          <div class="flex justify-between items-start">
            <h2 class="text-gray-700 mb-6 font-semibold text-xl uppercase tracking-widest">
              QR Data              
            </h2>
            <button @click="onToggle" type="button" class="bg-trasparent">
              <CameraIcon class="h-5 w-5 text-gray-700" />
            </button> 
            <teleport to="body">
              <TransitionRoot as="template" :show="isOpen">
                <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="onToggle">
                  <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                      <DialogOverlay class="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
                    </TransitionChild>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                      <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div class="mt-3 text-center sm:mt-0 sm:text-left">
                            <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 uppercase tracking-wider"> Scan QR-Code </DialogTitle>
                            <div class="mt-2">
                              <p v-if="torchNotSupported" class="text-red-500 mb-2">
                                Torch not supported for active camera!
                              </p>        
                              <p class="text-red-500 mb-2" v-if="noFrontCamera">
                                You don't seem to have a front camera on your device!
                              </p>
                              <p class="text-red-500 mb-2" v-if="noRearCamera">
                                You don't seem to have a rear camera on your device!
                              </p>     
                              <p class="text-red-500 mb-2" v-if="noCamera">
                                There's seem to be no camera on your device!
                              </p>     
                              <p class="text-red-500 mb-2" v-if="noReadableCamera">
                                There's seem to be camera not readable on your device!
                              </p>       
                              <p class="text-red-500 mb-2" v-if="noPermissionCamera">
                                There's seem to be no permission to access on your device camera!
                              </p>   
                              <p class="text-red-500 mb-2" v-if="noServedCamera">
                                Can't access to the camera from current host!
                              </p>  
                              <p class="text-red-500 mb-2" v-if="lackingFeature">
                                Your browser is lacking feature!
                              </p>   

                              <div class="sm:flex sm:justify-between">
                                <select 
                                  id="captureOptions" 
                                  v-model="captureSelected" 
                                  name="captureOptions" 
                                  class="mb-2 mr-2 py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                  <option 
                                    v-for="option in captureOptions" 
                                    :key="option.text" 
                                    :value="option"
                                  >
                                    {{ option.text }}
                                  </option>
                                </select>
                                <p class="text-gray-700 mb-2">
                                  Result: {{ scanResult }}
                                </p>
                              </div>

                              <div 
                                class="relative"
                                :class="{ 'fullscreen': fullscreen }" 
                                ref="wrapper" 
                                @fullscreenchange="onFullscreenChange"
                              >
                                <qr-stream 
                                  class="mb"
                                  @decode="onDecode" 
                                  :torch="torchActive" 
                                  :camera="camera"
                                  @init="onInit"                                                                 
                                >
                                  <button               
                                    class="absolute bottom-0 right-0 w-12 h-12 m-3 py-2 px-3 text-white text-sm font-semibold rounded-lg shadow focus:outline-none"
                                    :class="!torchActive ? 'bg-gray-400' : 'bg-indigo-500'"
                                    @click="torchActive = !torchActive" 
                                    :disabled="torchNotSupported"
                                  >
                                    <LightningBoltIcon />
                                  </button>
                                  <button 
                                    v-if="!noCamera && !noReadableCamera"
                                    class="absolute left-0 w-12 h-12 m-3 py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow focus:outline-none"                                  
                                    @click="switchCamera"
                                  >
                                    <SwitchHorizontalIcon />
                                  </button>
                                  <button 
                                    @click="fullscreen = !fullscreen"
                                    class="absolute bottom-0 left-0 w-12 h-12 m-3 py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow focus:outline-none"                                   
                                  >
                                    <ExternalLinkIcon />
                                  </button>
                                  <label 
                                    v-if="qrLoaded"
                                    for="qr-capture-upload" 
                                    class="absolute right-0 m-3 cursor-pointer bg-transparent rounded-lg font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                  >
                                    <span
                                      class="inline-flex w-12 h-12 justify-center py-2 px-3 border border-transparent shadow text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                      <CameraIcon />
                                    </span>
                                    <qr-capture  
                                      ref="qrCaptureUpload"                                    
                                      id="qr-capture-upload" 
                                      name="qr-capture-upload"  
                                      class="mb-2 sr-only"
                                      capture="" 
                                      @decode="onDecode" 
                                    />
                                  </label>    
                                </qr-stream>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button 
                            type="button" 
                            class="mt-3 w-full inline-flex justify-center rounded-lg border border-red-600 shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
                            @click="onToggle" 
                            ref="cancelButtonRef"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </TransitionChild>
                  </div>
                </Dialog>
              </TransitionRoot>
            </teleport>
          </div>
          <div class="flex flex-nowrap mb-5">
            <div v-for="(v, i) in buttonTabs" :key="i">
              <button 
                :class="`bg-transaparent border-b-2 border-${seletedButton === i ? 'gray-700' : 'transparent'} text-gray-700 mr-5`"
                @click="seletedButton = i"
              >
                {{ v }}
              </button>
            </div>
          </div>
          <transition name="fade" mode="out-in">
            <div v-if="seletedButton === 0" class="grid sm:grid-cols-2 gap-5">       
              <div>
                <label for="ssid" class="block text-sm font-medium text-gray-700">SSID</label>
                <input 
                  type="text" 
                  name="ssid" 
                  v-model="form.ssid"
                  id="ssid" 
                  autocomplete="off" 
                  class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                />
              </div>
              <div class="relative">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input 
                  :type="passwordType" 
                  name="password" 
                  v-model="form.password"
                  id="password" 
                  autocomplete="off" 
                  class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                />                    
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button 
                    @click="passwordVisible"
                    class="mt-6"
                    v-text="passwordType === 'password' ? 'show' : 'hide'"
                  >
                  </button>
                </div>
              </div>
              <div>
                <label for="encrytion" class="block text-sm font-medium text-gray-700">Encrytion</label>
                <select id="encrytion" v-model="form.encrytion" name="encrytion" class="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="WPA">WPA/WPA2/WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
              <div class="py-6 text-right">
                <button :disabled="disableButton" @click="generateQr" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Generate
                </button>
              </div>
            </div>
            <div v-else-if="seletedButton === 1">
              <textarea 
                id="text_qr" 
                name="text_qr" 
                v-model="text_qr"
                rows="3"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-lg" 
                placeholder="Input your text to generate QR code." 
              />
              <div class="py-6 text-right">
                <button :disabled="!text_qr" @click="generateQr" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Generate
                </button>
              </div>
            </div>        
            <div v-else-if="seletedButton === 2">
              <div class="grid sm:grid-cols-2 gap-5">        
                <div>
                  <label for="firstname" class="block text-sm font-medium text-gray-700">Firstname</label>
                  <input 
                    type="text" 
                    name="firstname" 
                    v-model="vcard.firstname"
                    id="firstname" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
                <div>
                  <label for="lastname" class="block text-sm font-medium text-gray-700">Lastname</label>
                  <input 
                    type="text" 
                    name="lastname" 
                    v-model="vcard.lastname"
                    id="lastname" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
                <div>
                  <label for="birthday" class="block text-sm font-medium text-gray-700">Birthday</label>
                  <litepie-datepicker
                    id="birthday"
                    :formatter="{
                      date: 'DD MMM YYYY',
                      month: 'MMM'
                    }"
                    class="mt-1"
                    as-single
                    v-model="vcard.bd"
                  ></litepie-datepicker>
                </div>
                <div>
                  <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                  <select id="gender" v-model="vcard.gender" name="gender" class="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                  <input 
                    type="text" 
                    name="address" 
                    v-model="vcard.address"
                    id="address" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                  <input 
                    type="text" 
                    name="city" 
                    v-model="vcard.city"
                    id="city" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
                <div>
                  <label for="postal" class="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input 
                    type="text" 
                    name="postal" 
                    v-model="vcard.postal"
                    id="postal" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
                <div>
                  <label for="region" class="block text-sm font-medium text-gray-700">Region</label>
                  <input 
                    type="text" 
                    name="region" 
                    v-model="vcard.region"
                    id="region" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
                <div>
                  <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                  <input 
                    type="text" 
                    name="country" 
                    v-model="vcard.country"
                    id="country" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
                <div>
                  <label for="tel" class="block text-sm font-medium text-gray-700">Tel</label>
                  <input 
                    type="text" 
                    name="tel" 
                    v-model="vcard.tel"
                    id="tel" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="text" 
                    name="email" 
                    v-model="vcard.email"
                    id="email" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
                <div>
                  <label for="web" class="block text-sm font-medium text-gray-700">Web</label>
                  <input 
                    type="text" 
                    name="web" 
                    v-model="vcard.web"
                    id="web" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
                <div>
                  <label for="job" class="block text-sm font-medium text-gray-700">Job</label>
                  <input 
                    type="text" 
                    name="job" 
                    v-model="vcard.job"
                    id="job" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">Company</label>
                  <input 
                    type="text" 
                    name="name" 
                    v-model="vcard.company"
                    id="name" 
                    autocomplete="off" 
                    class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                  />
                </div>
              </div>
              <div class="py-6 text-right">
                <button @click="handleVCard" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Generate
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="w-full sm:mt-10 md:mt-0 md:w-2/5">
        <div class="p-10 sm:drop-shadow-lg bg-white sm:rounded-lg">
          <transition name="fade" mode="out-in">
            <div 
              v-if="options.data"
              class="text-center overflow-hidden"
            >
              <div class="w-full mb-3">
                <transition name="fade" mode="out-in">
                  <div id="qr-code" class="p-2 text-center mx-auto rounded-lg drop-shadow-md transition-all duration-700" ref="qrCode"></div>
                </transition>
              </div>
              <label class="block text-sm font-medium text-gray-700">
                <select v-model="extension" class="mt-1 mr-5 mb-3 py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="svg">SVG</option>
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WEBP</option>
                </select>
                <button 
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="download"
                >
                  Download
                </button>
              </label>
            </div>
            <div 
              v-else
              class="text-center overflow-hidden flex items-center"
            >
              <div class="w-full">
                <span class="text-gray-400">Insert data to generate QR code.</span>
              </div>
            </div>
          </transition>
          <div class="bg-white border border-gray-300 rounded-lg shadow mt-5">
            <ul>
              <li 
                v-for="(v, i) in accordionNames"
                class="relative border-b border-gray-300"
                :key="i"
              >
                <button 
                  type="button" 
                  class="w-full p-5 text-left"
                  @click="seletedAccordion = seletedAccordion === i ? -1 : i"
                >
                  <div class="flex items-center justify-between">
                    <h4 class="block font-medium text-gray-700">
                      {{ v }}:
                    </h4>
                    <span class="ico-plus"></span>
                  </div>
                </button>
                <div 
                  :ref="`container_${i}`"
                  class="relative overflow-hidden transition-all max-h-0 duration-700"     
                  :style="seletedAccordion === i ? `max-height: ${accordionMaxHeight}px` : ''"                                    
                >
                  <div class="grid gap-4 p-5 pt-0">
                    <template 
                      v-if="i === 0"
                      class="relative overflow-hidden transition-all duration-700" 
                    >   
                      <div class="col-span-12">
                        <label class="block text-sm font-medium text-gray-700">
                          Image
                        </label>
                        <div class="flex text-sm text-gray-600 mt-1">
                          <label 
                            for="file-upload" 
                            class="relative cursor-pointer bg-white rounded-lg font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span
                              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Upload a file
                            </span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              class="sr-only" 
                              accept="image/png, image/jpg, image/jpeg"
                              @change="handleUpload"               
                            />
                          </label>
                          <button 
                            v-if="options.image"
                            @click="options.image = ''" 
                            class="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Clear
                          </button>
                        </div>
                      </div> 
                      <div class="col-span-12">
                        <label for="hide_bg" class="block text-sm font-medium text-gray-700">Hide Background</label>
                        <input 
                          id="hide_bg" 
                          name="hide_bg"
                          v-model="options.imageOptions.hideBackgroundDots" 
                          type="checkbox" 
                          class="checkbox__input focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg" 
                        />
                        <label for="hide_bg" class="mt-1 checkbox__inner border-gray-300"></label>
                      </div>
                      <div class="col-span-6">
                        <label for="image_size" class="block text-sm font-medium text-gray-700">Image Size</label>                    
                        <input 
                          type="number" 
                          name="image_size" 
                          v-model="options.imageOptions.imageSize"
                          id="image_size" 
                          autocomplete="off" 
                          min="0"
                          max="1"
                          step="0.1"
                          class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                        />
                      </div>
                      <div class="col-span-6">
                        <label for="image_margin" class="block text-sm font-medium text-gray-700">Image Margin</label>
                        <input 
                          type="number" 
                          name="image_margin" 
                          v-model="options.imageOptions.margin"
                          id="image_margin" 
                          autocomplete="off" 
                          min="0"
                          max="1"
                          step="0.1"
                          class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                        />
                      </div>   
                      <div class="col-span-6">
                        <label for="size" class="block text-sm font-medium text-gray-700">Size</label>
                        <input 
                          type="number" 
                          name="size" 
                          v-model="size"
                          id="size" 
                          autocomplete="off" 
                          min="300"
                          class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                        />
                      </div>
                      <div class="col-span-6">
                        <label for="margin" class="block text-sm font-medium text-gray-700">Margin</label>
                        <input 
                          type="number" 
                          name="margin" 
                          v-model="options.margin"
                          id="margin" 
                          autocomplete="off" 
                          class="relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20 mt-1" 
                        />
                      </div>
                      <div class="col-span-12">
                        <label for="errorCorrectionLevel" class="block text-sm font-medium text-gray-700">Error Correction Level</label>
                        <select 
                          id="errorCorrectionLevel" 
                          v-model="options.qrOptions.errorCorrectionLevel" 
                          name="square_type" 
                          class="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="L">L</option>
                          <option value="M">M</option>
                          <option value="Q">Q</option>
                          <option value="H">H</option>
                        </select>
                      </div>
                    </template>
                    <template 
                      v-else-if="i === 1"
                      class="relative overflow-hidden transition-all duration-700"
                    >       
                      <div class="col-span-12">
                        <label for="dots_type" class="block text-sm font-medium text-gray-700">Dots Type</label>
                        <select id="dots_type" v-model="options.dotsOptions.type" name="dots_type" class="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="square">Square</option>
                          <option value="dots">Dots</option>
                          <option value="rounded">Rounded</option>
                          <option value="extra-rounded">Extra rounded</option>
                          <option value="classy">Classy</option>
                          <option value="classy-rounded">Classy rounded</option>
                        </select>
                      </div>
                      <div 
                        v-if="activeKey === 'gradient'"
                        class="col-span-12"
                      >
                        <div class="space-y-4">
                          <div 
                            v-for="(v, k) in ['linear', 'radial']"
                            class="flex items-center"
                            :key="k"
                          >
                            <input 
                              :id="`gradient_type_${v}`" 
                              :name="`gradient_type_${v}`" 
                              type="radio"
                              :value="v"
                              v-model="gradientType"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" 
                            />
                            <label 
                              :for="`gradient_type_${v}`" 
                              class="ml-3 block text-sm font-medium text-gray-700 capitalize"
                            > 
                              {{ v }} 
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-6">
                        <label for="dots_color" class="block text-sm font-medium text-gray-700">Dots Color</label>
                        <color-picker 
                          id="dots_color"
                          v-model:pureColor="options.dotsOptions.color" 
                          v-model:gradientColor="gradient" 
                          @update:activeKey="handleActiveKey($event)"
                          picker-type="fk" 
                          shape="circle"
                          format="hex"
                          use-type="both"
                          lang="en"
                        />
                      </div>
                    </template>
                    <template 
                      v-else-if="i === 2"
                      class="relative overflow-hidden transition-all duration-700"
                    >       
                      <div class="col-span-12">
                        <label for="square_type" class="block text-sm font-medium text-gray-700">Corners Square Type</label>
                        <select id="square_type" v-model="options.cornersSquareOptions.type" name="square_type" class="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="">None</option>
                          <option value="square">Square</option>
                          <option value="dot">Dot</option>
                          <option value="extra-rounded">Extra rounded</option>
                        </select>
                      </div>
                      <div 
                        v-if="activeKeySquare === 'gradient'"
                        class="col-span-12"
                      >
                        <div class="space-y-4">
                          <div 
                            v-for="(v, k) in ['linear', 'radial']"
                            class="flex items-center"
                            :key="k"
                          >
                            <input 
                              :id="`gradient_square_type_${v}`" 
                              :name="`gradient_square_type_${v}`" 
                              type="radio"
                              :value="v"
                              v-model="gradientSquareType"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" 
                            />
                            <label 
                              :for="`gradient_square_type_${v}`" 
                              class="ml-3 block text-sm font-medium text-gray-700 capitalize"
                            > 
                              {{ v }} 
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-6">
                        <label for="square_color" class="block text-sm font-medium text-gray-700">Corners Square Color</label>
                        <color-picker 
                          id="square_color"
                          v-model:pureColor="options.cornersSquareOptions.color" 
                          v-model:gradientColor="gradientSquare" 
                          @update:activeKey="handleActiveKeySquare($event)"
                          picker-type="fk" 
                          shape="circle"
                          format="hex"
                          use-type="both"
                          lang="en"
                        />
                      </div>
                    </template>
                    <template 
                      v-else-if="i === 3"
                      class="relative overflow-hidden transition-all duration-700"
                    >       
                      <div class="col-span-12">
                        <label for="dot_type" class="block text-sm font-medium text-gray-700">Corners Dot Type</label>
                        <select id="dot_type" v-model="options.cornersDotOptions.type" name="dot_type" class="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="">None</option>
                          <option value="square">Square</option>
                          <option value="dot">Dot</option>
                        </select>
                      </div>
                      <div 
                        v-if="activeKeyDot === 'gradient'"
                        class="col-span-12"
                      >
                        <div class="space-y-4">
                          <div 
                            v-for="(v, k) in ['linear', 'radial']"
                            class="flex items-center"
                            :key="k"
                          >
                            <input 
                              :id="`gradient_dot_type_${v}`" 
                              :name="`gradient_dot_type_${v}`" 
                              type="radio"
                              :value="v"
                              v-model="gradientDotType"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" 
                            />
                            <label 
                              :for="`gradient_dot_type_${v}`" 
                              class="ml-3 block text-sm font-medium text-gray-700 capitalize"
                            > 
                              {{ v }} 
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-6">
                        <label for="dot_color" class="block text-sm font-medium text-gray-700">Corners Dot Color</label>
                        <color-picker 
                          id="dot_color"
                          v-model:pureColor="options.cornersDotOptions.color" 
                          v-model:gradientColor="gradientDot" 
                          @update:activeKey="handleActiveKeyDot($event)"
                          picker-type="fk" 
                          shape="circle"
                          format="hex"
                          use-type="both"
                          lang="en"
                        />
                      </div>
                    </template>
                    <template 
                      v-else-if="i === 4"
                      class="relative overflow-hidden transition-all duration-700"
                    >       
                      <div 
                        v-if="activeKeyBg === 'gradient'"
                        class="col-span-12"
                      >
                        <div class="space-y-4">
                          <div 
                            v-for="(v, k) in ['linear', 'radial']"
                            class="flex items-center"
                            :key="k"
                          >
                            <input 
                              :id="`gradient_bg_type_${v}`" 
                              :name="`gradient_bg_type_${v}`" 
                              type="radio"
                              :value="v"
                              v-model="gradientBgType"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" 
                            />
                            <label 
                              :for="`gradient_bg_type_${v}`" 
                              class="ml-3 block text-sm font-medium text-gray-700 capitalize"
                            > 
                              {{ v }} 
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-6">
                        <color-picker 
                          id="bg_color"
                          v-model:pureColor="options.backgroundOptions.color" 
                          v-model:gradientColor="gradientBg" 
                          @update:activeKey="handleActiveKeyBg($event)"
                          picker-type="fk" 
                          shape="circle"
                          format="hex"
                          use-type="both"
                          lang="en"
                        />
                        <label for="bg_color" class="text-sm font-medium text-gray-700">Color</label>
                      </div>
                    </template>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

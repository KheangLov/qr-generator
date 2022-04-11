<style>
#qr-code {
  max-width: 300px !important;
  max-height: 300px !important;
}

#qr-code canvas {
  max-width: 300px !important;
  width: 100% !important;
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
  Extension
} from 'qr-code-styling'
import Navbar from './components/Navbar.vue'

export default defineComponent({
  components: {
    Navbar
  },
  mounted() {
    this.qrCode.append(this.$refs.qrCode)
  },
  watch: {
    size(val) {
      if (val < 300) {
        val = 300
      }
      this.options.width = val
      this.options.height = val
    },
    activeKeySquare(val) {
      if (val === 'gradient') {
        this.options.cornersSquareOptions.gradient = {
          type: 'linear',
          rotation: parseInt(this.gradientArray[0]),
          colorStops: this.gradientArray.slice(1, 3).map((v, i) => ({
            offset: i,
            color: this.rgbaToHex(v.match(/\d+/g).slice(0, 3))
          })),
        }        
        setTimeout(() => this.accordionMaxHeight = this.$refs['container_2'][0].firstChild.offsetHeight, 500)
      } else {
        this.options.cornersSquareOptions.gradient = false
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
          type: this.gradientSquareType,
          rotation: parseInt(this.gradientSquareArray[0]),
          colorStops: this.gradientSquareArray.slice(1, 3).map((v, i) => ({
            offset: i,
            color: this.rgbaToHex(v.match(/\d+/g).slice(0, 3))
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
            color: this.rgbaToHex(v.match(/\d+/g).slice(0, 3))
          })),
        }        
        setTimeout(() => this.accordionMaxHeight = this.$refs['container_1'][0].firstChild.offsetHeight, 500)
      } else {
        this.options.dotsOptions.gradient = false
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
          type: this.gradientType,
          rotation: parseInt(this.gradientArray[0]),
          colorStops: this.gradientArray.slice(1, 3).map((v, i) => ({
            offset: i,
            color: this.rgbaToHex(v.match(/\d+/g).slice(0, 3))
          })),
        }
      }
    },
    options: {
      handler() {     
        if (this.options.width >= 300 && this.options.height >= 300) {
          this.qrCode.update(this.options)
        }        
      },
      deep: true,
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
        this.accordionMaxHeight = this.$refs[`container_${val}`][0].scrollHeight
      } else {
        this.accordionMaxHeight = 0
      }
    }
  },
  methods: {
    handleActiveKey(val: string) {
      this.activeKey = val
    },
    handleActiveKeySquare(val: string) {
      this.activeKeySquare = val
    },
    rgbaToHex(rgbs: Array<string>) {
      if (rgbs && rgbs.length === 3) {
        return `#${rgbs.map(v => `0${parseInt(v, 10).toString(16)}`.slice(-2)).join('')}`
      }
      return ''
    },
    splitLinear(str: string) {
      return str.substring(str.indexOf('(') + 1, str.lastIndexOf(')')).split(/,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/);
    },
    generateQr() {
      this.options.data = `WIFI:S:${this.form.ssid};T:${this.form.encrytion};P:${this.form.password};;`
      this.disableButton = true
    },
    download() {
      this.qrCode.download({ extension: this.extension as Extension })
    },
    passwordVisible() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    handleUpload(e) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        this.options.image = reader.result
      }
      reader.onerror = error => {
        console.log('Error: ', error)
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
        type: 'rounded' as DotType
      },
      backgroundOptions: {
        color: '#ffffff',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
        // },
      },
      cornersSquareOptions: {
        color: '#35495E',
        type: 'extra-rounded' as CornerSquareType,
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
        // },
      },
      cornersDotOptions: {
        color: '#35495E',
        type: 'dot' as CornerDotType,
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
        // },
      }
    }
    
    return {
      activeKey: 'pure',
      activeKeySquare: 'pure',
      gradient: '',
      gradientArray: [] as Array<string>,
      gradientType: 'linear',
      gradientSquare: '',
      gradientSquareArray: [] as Array<string>,
      gradientSquareType: 'linear',
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
      qrCode: new QRCodeStyling(options),
      seletedAccordion: -1,
      accordionMaxHeight: 0,
      accordionNames: [
        'Main Options',
        'Dots Options',
        'Corners Square Options',
        'Corners Dot Options',
      ],
    }
  }
})
</script>

<template>
  <Navbar />
  <div class="sm:container sm:mx-auto sm:py-10 mx-5 py-5">
    <div class="w-full drop-shadow-lg bg-white overflow-hidden rounded md:flex">
      <div class="md:w-1/3 text-left p-10">
        <h2 class="text-gray-700 mb-6 font-semibold text-xl uppercase tracking-widest">
          QR Data
        </h2>
        <div class="grid grid-cols-3 gap-4">        
          <div class="col-span-12">
            <label for="ssid" class="block text-sm font-medium text-gray-700">SSID</label>
            <input 
              type="text" 
              name="ssid" 
              v-model="form.ssid"
              id="ssid" 
              autocomplete="off" 
              class="py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border border-solid border-gray-300 rounded-md" 
            />
          </div>
          <div class="col-span-12">
            <label for="encrytion" class="block text-sm font-medium text-gray-700">Encrytion</label>
            <select id="encrytion" v-model="form.encrytion" name="encrytion" class="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="WPA">WPA/WPA2/WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </select>
          </div>
          <div class="col-span-12 relative">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input 
              :type="passwordType" 
              name="password" 
              v-model="form.password"
              id="password" 
              autocomplete="off" 
              class="py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border border-solid border-gray-300 rounded-md" 
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
        </div>
        <div class="py-6 text-right">
          <button :disabled="disableButton" @click="generateQr" type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Generate
          </button>
        </div>
      </div>
      <div class="md:w-1/3 p-10">
        <h2 class="text-gray-700 mb-6 font-semibold text-xl uppercase tracking-widest">
          QR Options
        </h2>
        <div class="bg-white border border-gray-300 rounded shadow-sm">
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
                    {{ v }}
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
                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                      </div>
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
                        class="py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border border-solid border-gray-300 rounded-md" 
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
                        class="py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border border-solid border-gray-300 rounded-md" 
                      />
                    </div>
                  </template>
                  <template 
                    v-else-if="i === 1"
                    class="relative overflow-hidden transition-all duration-700"
                  >       
                    <div class="col-span-12">
                      <label for="dots_type" class="block text-sm font-medium text-gray-700">Dots Type</label>
                      <select id="dots_type" v-model="options.dotsOptions.type" name="dots_type" class="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                            for="gradient_type" 
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
                      <select id="square_type" v-model="options.cornersSquareOptions.type" name="square_type" class="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                            for="gradient_type" 
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
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="md:w-1/3 text-center overflow-hidden p-10">
        <div class="w-full mb-3">
          <div id="qr-code" class="text-center mx-auto" ref="qrCode"></div>
        </div>
        <label class="block text-sm font-medium text-gray-700">
          <select v-model="extension" class="mt-1 mr-5 mb-3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="svg">SVG</option>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </select>
          <button 
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="download"
          >
            Download
          </button>
        </label>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #e5e5e5;
}
</style>

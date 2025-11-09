import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import vSelect from 'vue-select'            
import 'vue-select/dist/vue-select.css'  
// 1. Importa as classes necessárias do Chart.jsv

// 2. Importa o adaptador de data (apenas a importação já o registra)
import 'chartjs-adapter-date-fns';
createApp(App)
  .component("v-select", vSelect)
  .use(router)
  .mount("#app")
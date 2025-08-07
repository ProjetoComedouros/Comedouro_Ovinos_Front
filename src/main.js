import { createApp } from 'vue'
<<<<<<< HEAD
import App           from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).mount('#app')
=======
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
>>>>>>> 988e5d76501a038c36552744bee0f731345d9c5b

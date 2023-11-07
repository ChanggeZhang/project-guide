import { createApp } from 'vue'
import App from './App.vue'
import '@/css/light.css'

/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// /* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import BrowserPlugin from "@/js/plugins/BrowserPlugin";
import Layer from "@/js/plugins/Layer";
import Tip from "@/js/plugins/Tip";
//
// /* add icons to the library */
library.add(fas)
library.add(far)
library.add(fab)

let app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
    .use(BrowserPlugin)
    .mount('#app')
app.config.globalProperties.$layer = Layer
app.config.globalProperties.$tip = Tip
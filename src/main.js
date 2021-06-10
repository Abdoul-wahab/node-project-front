import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import axios from 'axios'
import Antd from 'ant-design-vue'
import vmodal from 'vue-js-modal'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAddressCard, faHome, faBox, faBriefcase, faBook, faLink, faLeaf, faWifi, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faTwitter, faSpotify, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(VueRouter)
Vue.use(Antd)
Vue.use(vmodal)
library.add(faAddressCard, faBook, faBox, faBriefcase, faHome, faLink, faLeaf, faWifi, faEnvelope, faGithub, faLinkedin, faTwitter, faSpotify, faInstagram, faWhatsapp);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:5000'//`${process.env.VUE_APP_API_URL}`
Vue.prototype.$axios = axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

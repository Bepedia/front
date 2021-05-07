import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VCalendar from 'v-calendar';
import {createStore} from "./services/store.service";
import {createRouter} from "./services/router.service";

const store = createStore();
const router = createRouter();

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

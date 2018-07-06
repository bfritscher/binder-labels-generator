import Vue from "vue";

import Croppa from "vue-croppa";
import Multiselect from "vue-multiselect";

import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "vue-multiselect/dist/vue-multiselect.min.css";
import "vue-croppa/dist/vue-croppa.css";

Vue.use(Croppa);
Vue.component("multiselect", Multiselect);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

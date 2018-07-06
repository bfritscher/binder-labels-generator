import Vue from "vue";
import Multiselect from "vue-multiselect";

import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "vue-multiselect/dist/vue-multiselect.min.css";

// register globally
Vue.component("multiselect", Multiselect);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

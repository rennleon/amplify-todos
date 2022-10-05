import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";

import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

/*
 * @Author: haopeiwei
 * @Date: 2019-08-18 14:33:47
 * @LastEditors: haopeiwei
 * @LastEditTime: 2019-08-19 14:09:56
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./common/stylus/index.styl";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

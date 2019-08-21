/*
 * @Author: haopeiwei
 * @Date: 2019-08-18 14:33:47
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-21 20:29:58
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";
import FastClick from "fastclick";
import "./common/stylus/index.styl";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require("common/image/default.png"),
  error: require("common/image/default.png"),
  attempt: 1
});

(FastClick as any).attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

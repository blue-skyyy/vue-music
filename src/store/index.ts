/*
 * @Author: haopeiwei
 * @Date: 2019-08-18 14:33:47
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-23 11:27:59
 */
import Vue from "vue";
import Vuex from "vuex";
import singer from "./modules/singer";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    singer
  }
});

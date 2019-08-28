/*
 * @Author: haopeiwei
 * @Date: 2019-08-18 14:33:47
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-28 16:28:41
 */
import Vue from "vue";
import Vuex from "vuex";
import singer from "./modules/singer";
import player from "./modules/player";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    singer,
    player
  }
});

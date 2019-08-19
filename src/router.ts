/*
 * @Author: hpw
 * @Date: 2019-08-18 14:33:47
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-19 14:32:00
 */
import Vue from "vue";
import Router from "vue-router";
import Rank from "./components/rank/rank.vue";
import Singer from "./components/singer/singer.vue";
import Recommend from "./components/recommend/recommend.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Recommend",
      component: Recommend
    },
    {
      path: "/singer",
      name: "Singer",
      component: Singer
    },
    {
      path: "/rank",
      name: "Rank",
      component: Rank
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

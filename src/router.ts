/*
 * @Author: hpw
 * @Date: 2019-08-18 14:33:47
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-21 17:40:10
 */
import Vue from "vue";
import Router from "vue-router";
import Rank from "./components/rank/rank.vue";
import Singer from "./views/Singer.vue";
import Recommend from "./views/Recommend.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/recommend",
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

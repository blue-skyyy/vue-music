<!--
 * @Author: haopeiwei
 * @Date: 2019-08-18 14:33:47
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-28 16:26:55
 -->
<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script lang="ts">
import MHeader from "@/components/m-header/m-header.vue";
import tab from "@/components/tab/tab.vue";
import Player from "@/views/Player.vue";
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {
    MHeader,
    tab,
    Player
    // Test
  }
})
export default class Home extends Vue {}
</script>
<style lang="stylus"></style>

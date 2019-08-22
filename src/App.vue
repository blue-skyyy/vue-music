<!--
 * @Author: haopeiwei
 * @Date: 2019-08-18 14:33:47
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-22 16:56:54
 -->
<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>

    </keep-alive>
  </div>
</template>
<script lang="ts">
import MHeader from "@/components/m-header/m-header.vue";
import tab from "@/components/tab/tab.vue";
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {
    MHeader,
    tab
    // Test
  }
})
export default class Home extends Vue {}
</script>
<style lang="stylus"></style>

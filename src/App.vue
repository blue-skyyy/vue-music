<!--
 * @Author: haopeiwei
 * @Date: 2019-08-18 14:33:47
 * @LastEditors: haopeiwei
 * @LastEditTime: 2019-08-19 14:10:37
 -->
<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
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

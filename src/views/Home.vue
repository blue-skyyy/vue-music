<!--
 * @Author: haopeiwei
 * @Date: 2019-08-18 14:33:47
 * @LastEditors: haopeiwei
 * @LastEditTime: 2019-08-18 16:42:43
 -->
<template>
  <div class="home">
    <img alt="Vue logo"
         src="../assets/logo.png">
    <!-- <MHeader></MHeader> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import MHeader from "@/components/m-header/m-header.vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>

<style lang="stylus" scoped>
@import '@/stylus/variable.styl';
</style>

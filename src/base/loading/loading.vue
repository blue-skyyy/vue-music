<!--
 * @Author: hpw
 * @Date: 2019-08-21 16:00:59
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-21 19:55:32
 -->
<template>
  <div class="loading">
    <img width="24"
         height="24"
         src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Scroll extends Vue {
  @Prop({
    type: String,
    default: "正在加载",
    required: false // 是否必填
  })
  title?: string;
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.loading {
  width: 100%;
  text-align: center;

  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>

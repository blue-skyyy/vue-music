<!--
 * @Author: hpw
 * @Date: 2019-08-21 19:36:26
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-21 20:40:57
 -->
<template>
  <Scroll class="listview"
          :data="data">
    <ul class="list-group">
      <h2 class="list-group-title">{{title}}</h2>
      <li v-for="(d, index) in data"
          :key="index"
          class="list-group-item">
        <img class="avatar"
             v-lazy="d.singer_pic" />
        <span class="name">{{d.singer_name}}</span>
        <!-- <p>{{d.singer_name}}</p> -->
        <!-- <h2 class="list-group-title">{{d.}}</h2> -->
      </li>
    </ul>

    <ul class="list-shortcut">
      <li v-for="(d, index) in configData"
          class="item"
          :key="index">
        {{index === 0 ? d.name.slice(0,1) : d.name}}
      </li>
    </ul>
  </Scroll>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Scroll from "@/base/scroll/scroll.vue";
import configData from "./singerConfig";
@Component({
  components: {
    Scroll
  }
})
export default class Listview extends Vue {
  @Prop({
    type: Array,
    default: () => ({}),
    required: true // 是否必填
  })
  data: Array<object> | undefined;

  @Prop({
    type: String,
    default: " ",
    required: true
  })
  title?: string;

  configData = configData;

  created() {
    this.configData.pop();
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group-title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
    background: $color-highlight-background;
  }

  .list-group {
    padding-bottom: 30px;

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

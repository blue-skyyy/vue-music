<!--
 * @Author: hpw
 * @Date: 2019-08-21 19:36:26
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-23 10:57:34
 -->
<template>
  <Scroll class="listview"
          ref="scroll"
          :data="data">
    <ul class="list-group">
      <h2 class="list-group-title">{{title}}</h2>
      <li v-for="(d, index) in data"
          :key="index"
          @click.prevent="selectSinger(d)"
          class="list-group-item">
        <img class="avatar"
             v-lazy="d.singer_pic" />
        <span class="name">{{d.singer_name}}</span>
      </li>
    </ul>

    <ul class="list-shortcut">
      <li v-for="(d, index) in configData"
          class="item"
          :class="{current:String(d.id) === titleIndex}"
          @click.prevent="getSingerListsByTag(String(d.id))"
          :key="index">
        {{index === 0 ? d.name.slice(0,1) : d.name}}
      </li>
    </ul>
  </Scroll>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
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

  @Prop({
    type: String,
    default: " ",
    required: true
  })
  titleIndex?: string;

  @Prop({
    type: Function
  })
  getSingerLists?: Function;

  @Prop({
    type: Function
  })
  selectSingerById?: Function;

  configData = configData;

  created() {
    this.configData.pop();
  }

  $refs!: {
    scroll: Scroll;
  };

  @Emit("getSingerLists")
  getSingerListsByTag(id: string) {
    this.$refs.scroll.scrollTo(0, 0);
  }

  @Emit("selectSingerById")
  selectSinger(singer: object) {}
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

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

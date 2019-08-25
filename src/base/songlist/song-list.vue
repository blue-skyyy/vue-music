<!--
 * @Author: hpw
 * @Date: 2019-08-19 16:40:59
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-20 17:05:12
 -->
<template>
  <div class="song-list">
    <ul>
      <li v-for="(d, index) in list" :key="index" class="item">
        <div class="content">
          <h2 class="name">{{d.songName}}</h2>
          <p class="desc">{{getDesc(d)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class List extends Vue {
  @Prop({
    type: Array,
    default: "",
    required: true
  })
  list?: Array<object>;

  get getDesc() {
    return function(d: any) {
      return `${d.singerName}-${d.albumName}`;
    };
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>

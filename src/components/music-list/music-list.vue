<!--
 * @Author: hpw
 * @Date: 2019-08-23 17:10:26
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-29 15:24:57
 -->
<template>
  <div class="music-list">
    <div class="back"
         @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title"
        v-html="singerName"></h1>
    <div class="bg-image"
         :style="bgStyle(bgImage)"
         ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn"
             v-show="songsData.length>0"
             class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <div class="bg-layer"
         ref="layer"></div>
    <scroll :data="songsData"
            :probeType="probeType"
            :listenScroll="listenScroll"
            @scroll="scroll"
            class="list"
            ref="list">
      <div class="song-list-wrapper">
        <song-list :list="songsData"
                   @select="selectItem"></song-list>
      </div>
      <div class="loading-container"
           v-show="!songsData.length">
        <loading />
      </div>
    </scroll>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import SongList from "@/base/songlist/song-list.vue";
import Scroll from "@/base/scroll/scroll.vue";
import { prefixStyle } from "@/common/ts/dom";
import Loading from "@/base/loading/loading.vue";
import { Action } from "vuex-class";
const namespace: string = "player";
interface Position {
  x: number;
  y: number;
}

const TRANS_FORM: any = prefixStyle("transform");

@Component({
  components: {
    SongList,
    Scroll,
    Loading
  }
})
export default class MusicList extends Vue {
  public translateY: number = 0;
  public imageHeight: number = 0;
  public minTranslateY: number = 0;
  public probeType: number = 3;
  public bgImgHeight: string = "40";
  scrollY = 0;
  listenScroll: boolean = true;

  @Prop({
    type: String,
    default: " ",
    required: true
  })
  bgImage?: string;

  @Prop({
    type: String,
    default: "",
    required: true
  })
  singerName?: string;

  @Prop({
    type: Array,
    default: "",
    required: true
  })
  songsData?: Array<object>;

  @Action("selectPlay", { namespace }) selectPlay: Function | any;

  mounted() {
    this.$nextTick(() => {
      ((this.$refs.list as any).$el as HTMLElement).style.top = `${
        (this.$refs.bgImage as HTMLElement).clientHeight
      }px`;
      this.imageHeight = (this.$refs.bgImage as HTMLElement).clientHeight - 40;
      this.minTranslateY = -this.imageHeight; // 负值向上
    });
  }

  get bgStyle() {
    return function(url: string) {
      return `background-image:url(${url})`;
    };
  }

  back() {
    this.$router.push("/singer");
  }

  scroll(pos: Position) {
    this.scrollY = pos.y;
  }

  selectItem(item: any, mid: string, index: number) {
    this.selectPlay({
      list: this.songsData,
      midId: mid,
      index: index
    });
  }

  @Watch("scrollY")
  watchScrollY(newY: number) {
    let zIndex = 0;
    let scale = 1;
    /* eslint-disable */
    let translateY = Math.max(this.minTranslateY, newY);
    const percent = Math.abs(newY / this.imageHeight); // 很重要！
    // 向下拖动
    if (newY > 0) {
      scale = 1 + percent;
    }
    // 控制图片大小
    if (newY < this.minTranslateY) {
      zIndex = 10;
      (this.$refs.bgImage as HTMLElement).style.paddingTop = "0";
      (this.$refs
        .bgImage as HTMLElement).style.height = `${this.bgImgHeight}px`;
      (this.$refs.playBtn as HTMLElement).style.display = "none";
    } else {
      (this.$refs.bgImage as HTMLElement).style.paddingTop = "70%";
      (this.$refs.bgImage as HTMLElement).style.height = "0";
      (this.$refs.playBtn as HTMLElement).style.display = "block";
    }
    /* eslint-disable */
    (this.$refs.bgImage as HTMLElement).style["zIndex"] = `${zIndex}`;
    (this.$refs.bgImage as HTMLElement).style[TRANS_FORM] = `scale(${scale})`;
    // 控制遮罩移动的距离
    (this.$refs.layer as HTMLElement).style[
      TRANS_FORM
    ] = `translate(0,${translateY}px)`;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.music-list {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    background-size: cover;
    background-repeat: no-repeat;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    // background: red;
    background: $color-background;
  }

  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;

    // overflow: hidden;
    .song-list-wrapper {
      padding: 20px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>

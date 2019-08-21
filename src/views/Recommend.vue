<!--
 * @Author: haopeiwei
 * @Date: 2019-08-19 13:58:11
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-21 18:59:55
 -->
<template>
  <div class="recommend"
       ref="recommend">
    <scroll ref="scroll"
            class="recommend-content">
      <div>
        <div v-if="sliderList.length"
             class="slider-wrapper"
             ref="sliderWrapper">
          <slider>
            <div v-for="(item,index) in sliderList"
                 :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl"
                     class="needsclick"
                     @load="loadImage">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(d,index) in songList"
                :key="index"
                class="item">
              <div class="icon">
                <img width="60"
                     height="60"
                     v-lazy="d.cover" />
              </div>
              <div class="text">
                <h2 class="name">{{d.title}}</h2>
                <p class="desc">{{_formatTenThous(d.listen_num) + "万"}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container"
           v-show="!songList.length">
        <Loading></Loading>
      </div>
    </scroll>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getRecommend, getSongLists } from "@/api/recommend";
import Slider from "@/base/slider/slider.vue";
import Scroll from "@/base/scroll/scroll.vue";
import Loading from "@/base/loading/loading.vue";

@Component({
  components: {
    Slider,
    Scroll,
    Loading
  }
})
export default class Recommend extends Vue {
  public name: string | null = null;
  public sliderList: Array<null | string> = [];
  public songList: Array<object> = [];
  public checkLoaded: boolean = false;

  $refs!: {
    scroll: Scroll;
  };

  created() {
    this._getRecommend();
    this._getSongLists();
  }
  private _getSongLists() {
    getSongLists().then((res: any) => {
      if (res.recomPlaylist.code === 0) {
        // 为你推荐
        this.songList = res.recomPlaylist.data.v_hot;
      }
    });
  }
  private _getRecommend() {
    getRecommend().then((res: any) => {
      if (res.code === 0) {
        this.sliderList = res.data.slider;
      }
    });
  }

  // commputed
  get _formatTenThous() {
    return function(param: number): string | number {
      return param >= 10000 ? (param / 10000).toFixed(1) : param;
    };
  }

  loadImage() {
    if (!this.checkLoaded) {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      });
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
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
}
</style>

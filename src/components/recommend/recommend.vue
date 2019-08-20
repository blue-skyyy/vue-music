<!--
 * @Author: haopeiwei
 * @Date: 2019-08-19 13:58:11
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-20 19:19:22
 -->
<template>
  <div class="recommend"
       ref="recommend">
    <!-- <scroll ref="scroll"
            class="recommend-content"
            :data="discList"> -->
    <div>
      <div v-if="sliderList.length"
           class="slider-wrapper"
           ref="sliderWrapper">
        <slider>
          <div v-for="(item,index) in sliderList"
               :key="index">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
    </div>
    <!-- </scroll> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getRecommend, getSongLists } from "../../api/recommend";
import Slider from "@/base/slider/slider.vue";

@Component({
  components: {
    Slider
  }
})
export default class Recommend extends Vue {
  public name: string | null = null;
  public sliderList: Array<null | string> = [];
  created() {
    this._getRecommend();
  }
  mounted() {
    getSongLists().then(res => {
      console.log(typeof res);
    });
  }

  private _getRecommend() {
    getRecommend().then((res: any) => {
      if (res.code === 0) {
        this.sliderList = res.data.slider;
      }
    });
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

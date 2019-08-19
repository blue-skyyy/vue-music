<!--
 * @Author: hpw
 * @Date: 2019-08-19 16:40:59
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-19 20:22:54
 -->
<template>
  <div class="slider"
       ref="slider">
    <div class="slider-group"
         ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <!-- <span class="dot"
            :class="{active: currentPageIndex === index }"
            v-for="(item, index) in dots"></span> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { addClass } from "@/common/js/dom";
import BScroll from "better-scroll";
@Component({})
export default class Slider extends Vue {
  // @Prop()
  // loop: Boolean = false;

  // @Prop()
  // autoPlay: Boolean = false;

  // @Prop()
  // interval: number = 4000;
  loop: boolean = true;
  slider: any = null;

  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initSlider();
    }, 20);
    // 网页加载大概17
  }

  _setSliderWidth() {
    /* eslint-disable */
    let children = (this.$refs.sliderGroup as Element).children;
    let width = 0;
    let sliderWidth = (this.$refs.slider as Element).clientWidth;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      addClass(child, "slider-item");
      (child as HTMLElement).style.width = sliderWidth + "px";
      width += sliderWidth;
    }
    // SE机型 1000 => 99.99
    (this.$refs.sliderGroup as HTMLElement).style.width = width + 1 + "px";
  }
  _initSlider() {
    this.slider = new BScroll(this.$refs.slider as Element, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: true,
      // snapLoop: 4000,
      // snapThreshold: 0.3,
      // snapSpeed: 400,
      click: true
    });
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>

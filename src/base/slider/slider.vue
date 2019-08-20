<!--
 * @Author: hpw
 * @Date: 2019-08-19 16:40:59
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-20 17:05:12
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
      <span class="dot"
            :key="index"
            :class="{active: currentPageIndex === index }"
            v-for="(item, index) in dots">
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { addClass } from "@/common/js/dom";
import BScroll from "better-scroll";
@Component({})
export default class Slider extends Vue {
  // @Prop()
  // loop: Boolean = false;

  // @Prop()
  // autoPlay: Boolean = false;

  // @Prop()
  interval: number = 4000;
  isLoop: boolean = true;
  slider: any = null;
  dots: Array<number> = [];
  children: HTMLCollection | any = null;
  currentPageIndex: number = 0;
  timer: any = null;
  isAutoPlay: boolean = true;

  mounted() {
    setTimeout(() => {
      this._setSliderWidth(false);
      this._initDots();
      this._initSlider();
      if (this.isAutoPlay) {
        this._autoPlay();
      }
    }, 20);
    // 网页加载大概17

    window.addEventListener("resize", () => {
      if (!this.slider) return;
      this._setSliderWidth(true);
      this.slider.refresh();
    });
  }

  destroy() {
    clearTimeout(this.timer);
  }

  _setSliderWidth(isResize: boolean) {
    /* eslint-disable */
    this.children = (this.$refs.sliderGroup as HTMLElement).children;
    let width = 0;
    let sliderWidth = (this.$refs.slider as HTMLElement).clientWidth;
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i];
      addClass(child, "slider-item");
      (child as HTMLElement).style.width = sliderWidth + "px";
      width += sliderWidth;
    }
    if (this.isLoop && !isResize) {
      width += 2 * sliderWidth;
    }
    // SE机型 1000 => 99.99
    (this.$refs.sliderGroup as HTMLElement).style.width = width + "px";
  }
  _initSlider() {
    this.slider = new BScroll(this.$refs.slider as HTMLElement, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: true,
        threshold: 0.3,
        speed: 400
      }
    });

    this.slider.on("scrollEnd", () => {
      let pageIndex = this.slider.getCurrentPage().pageX;
      this.currentPageIndex = pageIndex;
      // 清除定时器
      if (this.isAutoPlay) {
        clearTimeout(this.timer);
        this._autoPlay();
      }
    });
  }
  _initDots() {
    this.dots = new Array(this.children.length);
  }

  _autoPlay() {
    this.timer = setTimeout(() => {
      this.slider.next();
    }, this.interval);
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slider {
  min-height: 1px;
  position: relative;

  .slider-group {
    position: relative;
    overflow: hidden;
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

<!--
 * @Author: hpw
 * @Date: 2019-09-02 14:17:09
 * @LastEditors: hpw
 * @LastEditTime: 2019-09-02 17:17:51
 -->
<template>
  <div class="progress-bar"
       @click="clickProgress"
       ref="progressBar">
    <div class="bar-inner">
      <div class="progress"
           ref="progress"></div>
      <div class="progress-btn-wrapper"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend.prevent="progressTouchEnd"
           ref="progressBtn">

        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
const PROGRESS_BTN_WIDTH = 16;
const PROGRESS_ORIGIN_BTN_LEFT = 7;
interface ITouch {
  initiated: boolean;
  startX: number;
  left: number;
}
@Component({})
export default class Progress extends Vue {
  public touch: ITouch = {
    initiated: false,
    startX: 0,
    left: 0
  };
  @Prop({
    type: Number,
    default: 0,
    required: true
  })
  percent?: 0;

  $refs!: {
    progressBar: HTMLDivElement;
    progress: HTMLDivElement;
    progressBtn: HTMLDivElement;
  };

  progressTouchStart(e: Event) {
    this.touch.initiated = true;
    this.touch.startX = (<TouchEvent>e).touches[0].pageX;
    this.touch.left = this.$refs.progress.clientWidth;
  }

  clickProgress(e: Event) {
    const rect = this.$refs.progressBar.getBoundingClientRect();
    this.setBtnAndProgressAttr((<MouseEvent>e).pageX - rect.left);
    this.triggerPercent();
  }

  progressTouchMove(e: Event) {
    if (!this.touch.initiated) {
      return;
    }
    const moveX = (<TouchEvent>e).touches[0].pageX - this.touch.startX;
    // const deltaX = e.touches[0].pageX - this.touch.startX;
    const offsetWidth = Math.min(
      this.$refs.progressBar.clientWidth - PROGRESS_BTN_WIDTH,
      Math.max(0, this.touch.left + moveX)
    );
    this.setBtnAndProgressAttr(offsetWidth);
  }

  progressTouchEnd() {
    this.touch.initiated = false;
    this.triggerPercent();
  }

  triggerPercent() {
    const barWidth = this.$refs.progressBar.clientWidth - PROGRESS_BTN_WIDTH;
    const percent = this.$refs.progress.clientWidth / barWidth;
    this.$emit("percentChange", percent);
  }

  setBtnAndProgressAttr(width: number) {
    this.$refs.progress.style.width = width + "px";
    this.$refs.progressBtn.style.left = width - PROGRESS_ORIGIN_BTN_LEFT + "px";
  }

  @Watch("percent")
  watchPercent(newValue: number) {
    // 不在拖动状态再计算
    if (newValue > 0 && !this.touch.initiated) {
      const barWidth = this.$refs.progressBar.clientWidth - PROGRESS_BTN_WIDTH;
      const offsetWidth = newValue * barWidth;
      this.setBtnAndProgressAttr(offsetWidth);
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>

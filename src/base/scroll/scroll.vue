<!--
 * @Author: hpw
 * @Date: 2019-08-21 11:25:49
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-21 15:56:25
 -->
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import BScroll from "better-scroll";
@Component({})
export default class Scroll extends Vue {
  private probeType: number = 1;
  private click: boolean = true;
  private data: any = null;
  private scroll: any = null;

  mounted() {
    setTimeout(() => {
      this._initScroll();
    });
  }
  private _initScroll() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper as HTMLElement, {
        probeType: this.probeType,
        click: this.click
      });
    });
  }
  enable() {
    this.scroll && this.scroll.enable();
  }
  disable() {
    this.scroll && this.scroll.enable();
  }
  public refresh() {
    this.scroll && this.scroll.refresh();
  }

  @Watch("data")
  watchData(): void {
    setTimeout(() => {
      this.refresh();
    }, 20);
  }
}
</script>
